import {
  AccountSettingsXrpBlockchain,
  ApiServices,
  TransferXrpBlockchain,
  TrustLineXrpBlockchain,
} from '@tatumio/api-client'
import { BigNumber } from 'bignumber.js'
import { Client, AccountSet, Payment, TrustSet, Wallet } from 'xrpl'
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

    const manualFee = xrpUtils.toDrops(fee ?? '0')
    const estimatedFee = new BigNumber((await apiCalls.getFee())?.drops?.base_fee!)

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

      const finalFeeInDrops = await prepareFee(fee)
      const xrpFee = xrpUtils.toAmount(finalFeeInDrops.toString())

      const accountInfo = await apiCalls.getAccountDetail(fromAccount)
      const balanceRequired = new BigNumber(amount).plus(xrpFee)
      const accountBalance = xrpUtils.toAmount(accountInfo.account_data?.Balance)
      if (accountBalance.isLessThan(balanceRequired)) {
        throw new XrpSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds. Balance: ${accountBalance.toString()} on account ${fromAccount} is less than ${balanceRequired.toString()}`,
        )
      }

      const payment: Payment = {
        Account: fromAccount,
        Amount: xrpUtils.toDrops(amount).toString(),
        SourceTag: sourceTag,
        Destination: to,
        TransactionType: 'Payment',
        Sequence: accountInfo.account_data?.Sequence,
        LastLedgerSequence: accountInfo.ledger_current_index! + 500,
        Fee: finalFeeInDrops.toString(),
        DestinationTag: destinationTag,
      }

      if (token && issuerAccount) {
        payment.Amount = { currency: token, value: amount, issuer: issuerAccount }
      }

      const client = new Client('wss://xrplcluster.com')
      const prepared = await client.autofill(payment)

      if (signatureId) {
        return JSON.stringify(prepared)
      }
      const wallet = Wallet.fromSeed(fromSecret!)

      const { tx_blob } = await wallet.sign(prepared)

      return tx_blob
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
      const finalFeeInDrops = await prepareFee(fee)
      const xrpFee = xrpUtils.toAmount(finalFeeInDrops.toString())

      const accountInfo = await apiCalls.getAccountDetail(fromAccount)

      const accountBalance = xrpUtils.toAmount(accountInfo.account_data?.Balance)
      if (accountBalance.isLessThan(xrpFee)) {
        throw new XrpSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds. Balance: ${accountBalance.toString()} on account ${fromAccount} is less than ${xrpFee.toString()}`,
        )
      }

      // https://xrpl.org/accountset.html#accountset-flags
      const flag = rippling === undefined ? 1 : 8

      const tx: AccountSet = {
        TransactionType: 'AccountSet',
        Account: fromAccount,
        Fee: finalFeeInDrops.toString(),
        Sequence: accountInfo.account_data?.Sequence,
        LastLedgerSequence: (accountInfo.ledger_current_index as number) + 500,
      }

      if (rippling === true || requireDestinationTag === true) {
        tx.SetFlag = flag
      } else {
        tx.ClearFlag = flag
      }

      const client = new Client('wss://xrplcluster.com')
      const prepared = await client.autofill(tx)

      if (signatureId) {
        return JSON.stringify(prepared)
      }
      const wallet = Wallet.fromSeed(fromSecret!)

      const { tx_blob } = await wallet.sign(prepared)

      return tx_blob
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

      const finalFeeInDrops = await prepareFee(fee)
      const xrpFee = xrpUtils.toAmount(finalFeeInDrops.toString())

      const accountInfo = await apiCalls.getAccountDetail(fromAccount)
      const accountBalance = xrpUtils.toAmount(accountInfo.account_data?.Balance)
      if (accountBalance.isLessThan(xrpFee)) {
        throw new XrpSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds. Balance: ${accountBalance.toString()} on account ${fromAccount} is less than ${xrpFee.toString()}`,
        )
      }

      const tx: TrustSet = {
        TransactionType: 'TrustSet',
        Account: fromAccount,
        Fee: finalFeeInDrops.toString(),
        LastLedgerSequence: (accountInfo.ledger_current_index as number) + 500,
        LimitAmount: {
          currency: token,
          issuer: issuerAccount,
          value: limit,
        },
        Sequence: accountInfo.account_data?.Sequence,
      }

      const client = new Client('wss://xrplcluster.com')
      const prepared = await client.autofill(tx)

      if (signatureId) {
        return JSON.stringify(prepared)
      }
      const wallet = Wallet.fromSeed(fromSecret!)

      const { tx_blob } = await wallet.sign(prepared)

      return tx_blob
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
