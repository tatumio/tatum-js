import { BigNumber } from 'bignumber.js'
import { ApiServices, TransferXrp, Withdrawal } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { Currency } from '@tatumio/api-client'
import { RippleAPI } from 'ripple-lib'
import { abstractBlockchainOffchain } from '@tatumio/shared-blockchain-abstract'

export const xrpOffchainService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainOffchain(args),
    sendOffchainTransaction,
    prepareSignedOffchainTransaction,
  }
}

export type TransferXrpOffchain = TransferXrp & Withdrawal

/**
 * Send Xrp transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendOffchainTransaction = async (body: TransferXrpOffchain) => {
  const { account, secret, ...withdrawal } = body
  if (!withdrawal.fee) {
    const xrpFee = await ApiServices.blockchain.xrp.xrpGetFee()

    // @TODO null check
    withdrawal.fee = new BigNumber(xrpFee!.drops!.base_fee!).dividedBy(1000000).toString()
  }
  const acc = await ApiServices.blockchain.xrp.xrpGetAccountInfo(account)
  const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal(withdrawal)
  const { amount, fee, address } = withdrawal

  let txData
  try {
    txData = await prepareSignedOffchainTransaction(
      amount,
      address,
      secret,
      acc,
      fee,
      withdrawal.sourceTag,
      withdrawal.attr,
    )
  } catch (e) {
    console.error(e)
    // @TODO id can be null
    await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id!)
    throw e
  }
  try {
    return {
      ...(await ApiServices.offChain.withdrawal.broadcastBlockchainTransaction({
        txData,
        withdrawalId: id,
        currency: Currency.XRP,
      })),
      id,
    }
  } catch (e) {
    console.error(e)
    try {
      // @TODO id can be null
      await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id!)
    } catch (e1) {
      console.log(e)
      return { id }
    }
    throw e
  }
}

/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param account Xrp source account
 * @param fee fee to pay
 * @param sourceTag source tag to include in transaction
 * @param destinationTag
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedOffchainTransaction = async (
  amount: string,
  address: string,
  secret: string,
  account: any,
  fee: string,
  sourceTag?: number,
  destinationTag?: string,
) => {
  const currency = 'XRP'
  const payment: any = {
    source: {
      address: account.account_data.Account,
      maxAmount: {
        currency,
        value: amount,
      },
      tag: sourceTag,
    },
    destination: {
      address,
      amount: {
        currency,
        value: amount,
      },
    },
  }
  if (destinationTag) {
    payment.destination.tag = parseInt(destinationTag)
  }
  const rippleAPI = new RippleAPI()
  const prepared = await rippleAPI.preparePayment(account.account_data.Account, payment, {
    fee: `${fee}`,
    sequence: account.account_data.Sequence,
    maxLedgerVersion: account.ledger_current_index + 5,
  })
  return (await rippleAPI.sign(prepared.txJSON, secret)).signedTransaction
}
