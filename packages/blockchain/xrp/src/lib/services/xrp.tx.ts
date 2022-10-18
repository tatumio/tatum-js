import { ApiServices, TransferXrpBlockchain } from '@tatumio/api-client'
import { BigNumber } from 'bignumber.js'
import { RippleAPI } from 'ripple-lib'
import { Payment } from 'ripple-lib/dist/npm/transaction/payment'
import { XrpSdkError } from '../xrp.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { XrpApiCallsType } from '../../index'

export const xrpTxService = (apiCalls: XrpApiCallsType) => {
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
    try {
      const { fromAccount, fromSecret, to, amount, fee, sourceTag, destinationTag } = body

      if (fee && new BigNumber(fee).isZero()) throw new XrpSdkError(SdkErrorCode.FEE_TOO_SMALL)
      const xrpFee = new BigNumber((await apiCalls.getFee())?.drops?.base_fee as string)
      const finalFee = Math.max(new BigNumber(fee || '0').toNumber(), xrpFee.toNumber())
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
      const accountInfo = await apiCalls.getAccountDetail(fromAccount)
      if (
        new BigNumber(accountInfo.account_data?.Balance as string).isLessThan(
          new BigNumber(amount).plus(finalFee),
        )
      ) {
        throw new XrpSdkError(SdkErrorCode.INSUFFICIENT_FUNDS)
      }
      const sequence = accountInfo.account_data?.Sequence
      const maxLedgerVersion = accountInfo.ledger_current_index! + 500
      const rippleAPI = new RippleAPI()
      const prepared = await rippleAPI.preparePayment(fromAccount, payment, {
        fee: `${finalFee}`,
        sequence,
        maxLedgerVersion,
      })
      const signed = rippleAPI.sign(prepared.txJSON, fromSecret)
      return signed.signedTransaction
    } catch (e: any) {
      throw new XrpSdkError(e)
    }
  }
  return {
    sendTransaction,
    prepareSignedTransaction,
  }
}
