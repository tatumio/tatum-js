import { ApiServices, TransferXrpBlockchain } from '@tatumio/api-client'
import { BigNumber } from 'bignumber.js'
import { RippleAPI } from 'ripple-lib'
import { Payment } from 'ripple-lib/dist/npm/transaction/payment'

export const xrpTxService = () => {
  return {
    sendTransaction,
    prepareSignedTransaction,
  }
}

/**
 * Send Xrp transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
const sendTransaction = async (body: TransferXrpBlockchain) => {
  return ApiServices.blockchain.xrp.xrpBroadcast({ txData: await prepareSignedTransaction(body) })
}

/**
 * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
const prepareSignedTransaction = async (body: TransferXrpBlockchain) => {
  const { fromAccount, fromSecret, to, amount, fee, sourceTag, destinationTag } = body

  const f = fee
    ? fee
    : new BigNumber((await ApiServices.blockchain.xrp.xrpGetFee()).drops.base_fee)
        .dividedBy(1000000)
        .toString()
  const payment: Payment = {
    source: {
      address: fromAccount,
      maxAmount: {
        currency: 'XRP',
        value: amount,
      },
      tag: sourceTag,
    },
    destination: {
      address: to,
      amount: {
        currency: 'XRP',
        value: amount,
      },
      tag: destinationTag,
    },
  }
  const accountInfo = await ApiServices.blockchain.xrp.xrpGetAccountInfo(fromAccount)
  const sequence = accountInfo.account_data.Sequence
  const maxLedgerVersion = accountInfo.ledger_current_index + 500
  const rippleAPI = new RippleAPI()
  const prepared = await rippleAPI.preparePayment(fromAccount, payment, {
    fee: f,
    sequence,
    maxLedgerVersion,
  })
  const signed = await rippleAPI.sign(prepared.txJSON, fromSecret)
  return signed.signedTransaction
}
