import {
  AccountSettingsXrpBlockchain,
  ApiServices,
  TransferXrpBlockchain,
  TrustLineXrpBlockchain,
} from '@tatumio/api-client'
import { BigNumber } from 'bignumber.js'
import { RippleAPI } from 'ripple-lib'
import { Payment } from 'ripple-lib/dist/npm/transaction/payment'
import { XrpSdkError } from '../xrp.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { XrpApiCallsType } from '../../index'
import { FromSecretOrSignatureId } from '@tatumio/shared-blockchain-abstract'

type TransferXrp = FromSecretOrSignatureId<TransferXrpBlockchain> & { issuerAccount?: string; token?: string }
type Trustline = FromSecretOrSignatureId<TrustLineXrpBlockchain>
type AccountSettings = FromSecretOrSignatureId<AccountSettingsXrpBlockchain>

export const xrpTxService = (apiCalls: XrpApiCallsType) => {
  /**
   * Send Xrp transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  const sendTransaction = async (body: TransferXrp) => {
    return ApiServices.blockchain.xrp.xrpBroadcast({ txData: await prepareSignedTransaction(body) })
  }
  /**
   * Send Xrp  create/update/delete trustline transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * https://apidoc.tatum.io/tag/XRP#operation/XrpTrustLineBlockchain
   * This operation is irreversible.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  const sendTrustlineTransaction = async (body: Trustline) => {
    return ApiServices.blockchain.xrp.xrpBroadcast({ txData: await prepareSignedTrustlineTransaction(body) })
  }
  /**
   * Send Xrp update account settings transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * https://apidoc.tatum.io/tag/XRP#operation/XrpAccountSettings
   * This operation is irreversible.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  const sendAccountSettingsTransaction = async (body: AccountSettings) => {
    return ApiServices.blockchain.xrp.xrpBroadcast({
      txData: await prepareSignedAccountSettingsTransaction(body),
    })
  }

  /**
   * Sign Xrp transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param body content of the transaction to broadcast
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepareSignedTransaction = async (body: TransferXrp) => {
    try {
      const {
        fromAccount,
        fromSecret,
        to,
        amount,
        fee,
        sourceTag,
        destinationTag,
        signatureId,
        token,
        issuerAccount,
      } = body

      if (fee && new BigNumber(fee).isZero()) throw new XrpSdkError(SdkErrorCode.FEE_TOO_SMALL)
      const xrpFee = new BigNumber((await apiCalls.getFee())?.drops?.base_fee as string)
      const finalFee = Math.max(new BigNumber(fee || '0').toNumber(), xrpFee.toNumber()) / 100000
      const payment: Payment = {
        source: {
          address: fromAccount,
          maxAmount: {
            currency: token || 'XRP',
            counterparty: issuerAccount,
            value: amount,
          },
          tag: sourceTag,
        },
        destination: {
          address: to,
          amount: {
            currency: token || 'XRP',
            counterparty: issuerAccount,
            value: amount,
          },
          tag: destinationTag,
        },
      }
      const accountInfo = await apiCalls.getAccountDetail(fromAccount)
      const balanceRequired = new BigNumber(amount).plus(finalFee)
      const accountBalance = new BigNumber(accountInfo.account_data?.Balance as string)
      if (accountBalance.isLessThan(balanceRequired)) {
        throw new XrpSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds. Balance: ${accountBalance.toString()} on account ${fromAccount} is less than ${balanceRequired.toString()}`,
        )
      }
      const sequence = accountInfo.account_data?.Sequence
      const maxLedgerVersion = accountInfo.ledger_current_index! + 500
      const rippleAPI = new RippleAPI()
      const prepared = await rippleAPI.preparePayment(fromAccount, payment, {
        fee: `${finalFee}`,
        sequence,
        maxLedgerVersion,
      })
      if (signatureId) {
        return prepared.txJSON
      }
      const signed = rippleAPI.sign(prepared.txJSON, fromSecret)
      return signed.signedTransaction
    } catch (e: any) {
      throw new XrpSdkError(e)
    }
  }

  /**
   * Sign Xrp change account settings transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param body content of the transaction to broadcast
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepareSignedAccountSettingsTransaction = async (body: AccountSettings) => {
    try {
      const { fromAccount, fromSecret, rippling, requireDestinationTag, fee, signatureId } = body

      if (rippling !== undefined && requireDestinationTag !== undefined) {
        throw new XrpSdkError(
          SdkErrorCode.PARAMETER_MISMATCH,
          'rippling and requireDestinationTag cannot be set at the same time',
        )
      }
      if (fee && new BigNumber(fee).isZero()) throw new XrpSdkError(SdkErrorCode.FEE_TOO_SMALL)
      const xrpFee = new BigNumber((await apiCalls.getFee())?.drops?.base_fee as string)
      const finalFee = Math.max(new BigNumber(fee || '0').toNumber(), xrpFee.toNumber()) / 1000000
      const rippleAPI = new RippleAPI()

      const accountInfo = await apiCalls.getAccountDetail(fromAccount)

      const accountBalance = new BigNumber(accountInfo.account_data?.Balance || 0)
      if (accountBalance.isLessThan(finalFee)) {
        throw new XrpSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds. Balance: ${accountBalance.toString()} on account ${fromAccount} is less than ${finalFee.toString()}`,
        )
      }

      const sequence = accountInfo.account_data?.Sequence
      const maxLedgerVersion = (accountInfo.ledger_current_index as number) + 500
      const settings = rippling === undefined ? { requireDestinationTag } : { defaultRipple: rippling }
      const prepared = await rippleAPI.prepareSettings(fromAccount, settings, {
        fee: finalFee.toString(),
        sequence,
        maxLedgerVersion,
      })
      if (signatureId) {
        return prepared.txJSON
      }
      const signed = rippleAPI.sign(prepared.txJSON, fromSecret)
      return signed.signedTransaction
    } catch (e: any) {
      throw new XrpSdkError(e)
    }
  }

  /**
   * Sign Xrp trustline transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param body content of the transaction to broadcast
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepareSignedTrustlineTransaction = async (body: Trustline) => {
    try {
      const { fromAccount, fromSecret, issuerAccount, token, limit, fee, signatureId } = body

      if (fee && new BigNumber(fee).isZero()) throw new XrpSdkError(SdkErrorCode.FEE_TOO_SMALL)
      const xrpFee = new BigNumber((await apiCalls.getFee())?.drops?.base_fee as string)
      const finalFee = Math.max(new BigNumber(fee || '0').toNumber(), xrpFee.toNumber()) / 1000000
      const rippleAPI = new RippleAPI()
      const accountInfo = await apiCalls.getAccountDetail(fromAccount)
      const accountBalance = new BigNumber(accountInfo.account_data?.Balance || 0)
      if (accountBalance.isLessThan(finalFee)) {
        throw new XrpSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds. Balance: ${accountBalance.toString()} on account ${fromAccount} is less than ${finalFee.toString()}`,
        )
      }

      const sequence = accountInfo.account_data?.Sequence
      const maxLedgerVersion = (accountInfo.ledger_current_index as number) + 500

      const prepared = await rippleAPI.prepareTrustline(
        fromAccount,
        {
          currency: token,
          counterparty: issuerAccount,
          limit,
        },
        {
          fee: finalFee.toString(),
          sequence,
          maxLedgerVersion,
        },
      )
      if (signatureId) {
        return prepared.txJSON
      }
      const signed = rippleAPI.sign(prepared.txJSON, fromSecret)
      return signed.signedTransaction
    } catch (e: any) {
      throw new XrpSdkError(e)
    }
  }

  return {
    sendTransaction,
    sendTrustlineTransaction,
    sendAccountSettingsTransaction,
    prepareSignedTransaction,
    prepareSignedAccountSettingsTransaction,
    prepareSignedTrustlineTransaction,
  }
}
