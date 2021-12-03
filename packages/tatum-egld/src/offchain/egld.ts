import BigNumber from 'bignumber.js'
import { Currency, validateBody, offchainBroadcast, offchainCancelWithdrawal, offchainStoreWithdrawal } from '@tatumio/tatum-core'
import { EgldTransferOffchain } from '../model'
import { prepareEgldSignedTransaction } from '../transaction'
import { generatePrivateKeyFromMnemonic } from '../wallet'
import { offchainTransferEgldKMS } from './kms'

/**
 * Send EGLD transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendEgldOffchainTransaction = async (testnet: boolean, body: EgldTransferOffchain) => {
  if (body.signatureId) {
    return offchainTransferEgldKMS(body)
  }
  await validateBody(body, EgldTransferOffchain)
  const { mnemonic, index, fromPrivateKey, gasLimit, gasPrice, ...withdrawal } = body
  const { value, receiver } = withdrawal

  const fromPriv =
    mnemonic && index !== undefined ? await generatePrivateKeyFromMnemonic(testnet, mnemonic, index) : (fromPrivateKey as string)

  const fee = {
    gasLimit: `${gasLimit || '50000'}`,
    gasPrice: `${gasPrice || '1000000000'}`,
  }
  const txData = await prepareEgldSignedTransaction({
    amount: value,
    fromPrivateKey: fromPriv,
    fee,
    to: receiver,
  })
  // @ts-ignore
  withdrawal.fee = new BigNumber(fee.gasLimit).multipliedBy(fee.gasPrice).toString()
  const { id } = await offchainStoreWithdrawal(withdrawal)
  try {
    return { ...(await offchainBroadcast({ txData, withdrawalId: id, currency: Currency.EGLD })), id }
  } catch (e) {
    console.error(e)
    try {
      await offchainCancelWithdrawal(id)
    } catch (e1) {
      console.log(e)
      return { id }
    }
  }
}
