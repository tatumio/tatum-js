import { ApiServices, TransferXlmBlockchain, TrustLineXlmBlockchain } from '@tatumio/api-client'
import { Account, Asset, Keypair, Memo, Networks, Operation, TransactionBuilder } from 'stellar-sdk'
import { XlmSdkError } from '../xlm.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { BigNumber } from 'bignumber.js'
import { FromSecretOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import { XlmApiCallsType } from '../../index'

type TransferXlm = FromSecretOrSignatureId<TransferXlmBlockchain>
type CreateTrustline = FromSecretOrSignatureId<TrustLineXlmBlockchain>

export const xlmTxService = (apiCalls: XlmApiCallsType) => {
  /**
   * Send Stellar transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param options mainnet or testnet version. If token and issuerAccount are present, instead of native XLM transfer, the transfer of a token is performed.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  const sendTransaction = async (
    body: TransferXlm,
    options?: { testnet: boolean; token?: string; issuerAccount?: string },
  ) => {
    if (body.signatureId) {
      return ApiServices.blockchain.xlm.xlmTransferBlockchain(body as any)
    }
    return ApiServices.blockchain.xlm.xlmBroadcast({ txData: await prepareSignedTransaction(body, options) })
  }

  /**
   * Send Stellar create trustline transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param options mainnet or testnet version.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  const sendTrustlineTransaction = async (body: CreateTrustline, options?: { testnet: boolean }) => {
    if (body.signatureId) {
      return ApiServices.blockchain.xlm.xlmTrustLineBlockchain(body as any)
    }
    return ApiServices.blockchain.xlm.xlmBroadcast({
      txData: await prepareSignedTrustlineTransaction(body, options),
    })
  }

  /**
   * Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param options mainnet or testnet version. If token and issuerAccount are present, instead of native XLM transfer, the transfer of a token is performed.
   * @param body content of the transaction to broadcast
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepareSignedTransaction = async (
    body: TransferXlm,
    options?: { testnet: boolean; token?: string; issuerAccount?: string },
  ) => {
    try {
      const { fromAccount, fromSecret, to, amount, message, initialize, signatureId } = body

      if (!fromSecret && !signatureId) {
        throw new XlmSdkError(SdkErrorCode.PARAMETER_MISMATCH)
      }
      if (fromSecret && signatureId) {
        throw new XlmSdkError(SdkErrorCode.PARAMETER_MISMATCH)
      }
      let memPhrase
      if (message) {
        memPhrase = message?.length > 28 ? Memo.hash(message) : Memo.text(message)
      }
      const memo = memPhrase
      const account = await apiCalls.getAccountInfo(fromAccount)
      const balance = account.balances?.find((b) => b.asset_type === Asset.native().getAssetType())
      const requiredBalance = new BigNumber(amount).plus(0.00001)
      const accountBalance = new BigNumber(balance?.balance || 0)
      if (!options?.token && !options?.issuerAccount && accountBalance.isLessThan(requiredBalance)) {
        throw new XlmSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds to create transaction from sender account ${fromAccount} -> available balance is ${accountBalance.toString()}, required balance is ${requiredBalance.toString()}.`,
        )
      }

      if (!account?.sequence || typeof account.sequence !== 'string') {
        throw new XlmSdkError(SdkErrorCode.XLM_NO_SEQUENCE)
      }

      const builder = new TransactionBuilder(new Account(fromAccount, account.sequence), {
        fee: '100',
        networkPassphrase: options?.testnet ? Networks.TESTNET : Networks.PUBLIC,
        memo,
      }).setTimeout(300)

      const operation = initialize
        ? Operation.createAccount({
            destination: to.trim(),
            startingBalance: amount,
          })
        : Operation.payment({
            destination: to.trim(),
            asset:
              options?.token && options?.issuerAccount
                ? new Asset(options.token, options.issuerAccount)
                : Asset.native(),
            amount,
          })

      const tx = builder.addOperation(operation).build()

      if (fromSecret) {
        tx.sign(Keypair.fromSecret(fromSecret))
      }
      return tx.toEnvelope().toXDR().toString('base64')
    } catch (e: any) {
      throw new XlmSdkError(e)
    }
  }

  /**
   * Sign Stellar create trustline transaction with private keys locally. Nothing is broadcast to the blockchain.
   * @param options mainnet or testnet version.
   * @param body content of the transaction to broadcast
   * @returns transaction data to be broadcast to blockchain.
   */
  const prepareSignedTrustlineTransaction = async (body: CreateTrustline, options?: { testnet: boolean }) => {
    try {
      const { fromAccount, fromSecret, issuerAccount, token, limit, signatureId } = body

      if (!fromSecret && !signatureId) {
        throw new XlmSdkError(
          SdkErrorCode.PARAMETER_MISMATCH,
          'either fromSecret or signatureId must be present.',
        )
      }
      if (fromSecret && signatureId) {
        throw new XlmSdkError(
          SdkErrorCode.PARAMETER_MISMATCH,
          'either fromSecret or signatureId must be present.',
        )
      }
      const account = await apiCalls.getAccountInfo(fromAccount)
      const balance = account.balances?.find((b) => b.asset_type === Asset.native().getAssetType())
      const accountBalance = new BigNumber(balance?.balance || 0)
      if (accountBalance.isLessThan(0.00001)) {
        throw new XlmSdkError(
          SdkErrorCode.INSUFFICIENT_FUNDS,
          `Insufficient funds to create trustline from sender account ${fromAccount} -> available balance is ${accountBalance.toString()}, required balance is 0.00001.`,
        )
      }

      if (!account?.sequence || typeof account.sequence !== 'string') {
        throw new XlmSdkError(SdkErrorCode.XLM_NO_SEQUENCE)
      }

      const builder = new TransactionBuilder(new Account(fromAccount, account.sequence), {
        fee: '100',
        networkPassphrase: options?.testnet ? Networks.TESTNET : Networks.PUBLIC,
      })

      const tx = builder
        .addOperation(
          Operation.changeTrust({
            limit,
            asset: new Asset(token, issuerAccount),
          }),
        )
        .setTimeout(30)
        .build()

      if (fromSecret) {
        tx.sign(Keypair.fromSecret(fromSecret))
      }
      return tx.toEnvelope().toXDR().toString('base64')
    } catch (e: any) {
      throw new XlmSdkError(e)
    }
  }

  return {
    sendTransaction,
    sendTrustlineTransaction,
    prepareSignedTransaction,
    prepareSignedTrustlineTransaction,
  }
}
