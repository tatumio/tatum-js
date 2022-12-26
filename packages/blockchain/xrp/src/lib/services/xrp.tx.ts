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
import { xrpUtils } from './xrp.utils'

type TransferXrp = FromSecretOrSignatureId<TransferXrpBlockchain> & { issuerAccount?: string; token?: string }
type Trustline = FromSecretOrSignatureId<TrustLineXrpBlockchain>
type AccountSettings = FromSecretOrSignatureId<AccountSettingsXrpBlockchain>

export const xrpTxService = (apiCalls: XrpApiCallsType) => {
  const prepareFee = async (fee?: string): Promise<number> => {
    if (fee && new BigNumber(fee).lte(0)) throw new XrpSdkError(SdkErrorCode.FEE_TOO_SMALL)

    const manualFee = new BigNumber(fee ?? '0')
    const estimatedFee = xrpUtils.toAmount((await apiCalls.getFee())?.drops?.base_fee)

    return Math.max(manualFee.toNumber(), estimatedFee.toNumber())
  }

  /**
   * Send Xrp transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  const sendTransaction = async (body: TransferXrp) => {
    if (body.signatureId) {
      return ApiServices.blockchain.xrp.xrpTransferBlockchain(body as any)
    }
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
    if (body.signatureId) {
      return ApiServices.blockchain.xrp.xrpTrustLineBlockchain(body as any)
    }
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
    if (body.signatureId) {
      return ApiServices.blockchain.xrp.xrpAccountSettings(body as any)
    }
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

      const finalFee = await prepareFee(fee)

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
      const accountBalance = xrpUtils.toAmount(accountInfo.account_data?.Balance)
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
      const finalFee = await prepareFee(fee)
      const rippleAPI = new RippleAPI()

      const accountInfo = await apiCalls.getAccountDetail(fromAccount)

      const accountBalance = xrpUtils.toAmount(accountInfo.account_data?.Balance)
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

      const finalFee = await prepareFee(fee)

      const rippleAPI = new RippleAPI()
      const accountInfo = await apiCalls.getAccountDetail(fromAccount)
      const accountBalance = xrpUtils.toAmount(accountInfo.account_data?.Balance)
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
