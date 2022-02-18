import { BigNumber } from 'bignumber.js'
import { ApiServices, TransferXrp, Withdrawal, Currency } from '@tatumio/api-client'
import { Blockchain } from '@tatumio/shared-core'
import { RippleAPI } from 'ripple-lib'
import { abstractBlockchainOffchain } from '@tatumio/shared-blockchain-abstract'
import { XrpSdkError } from '../xrp.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { Payment } from 'ripple-lib/dist/npm/transaction/payment'

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
    try {
      withdrawal.fee = new BigNumber(await (await ApiServices.blockchain.xrp.xrpGetFee()).drops.base_fee).dividedBy(1000000).toString()
    } catch (e) {
      withdrawal.fee = '0'
    }
  }
  
  if (!withdrawal.fee || Number(withdrawal.fee)<=0) throw new XrpSdkError(SdkErrorCode.FEE_TOO_SMALL)

  const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal(withdrawal)
  const { amount, fee, address } = withdrawal
  let txData:string

  try {
    txData = await prepareSignedOffchainTransaction(
      amount,
      address,
      secret,
      account,
      fee,
      withdrawal.sourceTag,
      withdrawal.attr,
    )
  } catch (e) {
    id && await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id)
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
    id && await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id)
    throw e
  }
}

/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param fromAccount Xrp source account
 * @param fee fee to pay
 * @param sourceTag source tag to include in transaction
 * @param destinationTag
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedOffchainTransaction = async (
  amount: string,
  address: string,
  secret: string,
  fromAccount: string,
  fee: string,
  sourceTag?: number,
  destinationTag?: string,
) => {
  const currency = Currency.XRP
  const accountInfo = await ApiServices.blockchain.xrp.xrpGetAccountInfo(fromAccount)

  const payment: Payment = {
    source: {
      address: fromAccount,
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
  const prepared = await rippleAPI.preparePayment(address, payment, {
    fee: `${fee}`,
    sequence: accountInfo?.account_data.Sequence,
    maxLedgerVersion: accountInfo?.ledger_current_index + 5,
  })

  return (await rippleAPI.sign(prepared.txJSON, secret)).signedTransaction
}
