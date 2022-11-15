import { AccountSigner } from '../flow.types'
import { flowTxTemplates } from './flow.tx.templates'
import { FlowSdkError } from '../flow.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { FLOW_MAINNET_ADDRESSES, FLOW_TESTNET_ADDRESSES } from '../flow.constants'
import { Blockchain } from '@tatumio/shared-core'
import { ApiServices, FlowCustomTransactionKMS, FlowTransactionKMS } from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { FlowProvider } from './flow.provider'
import { FlowApiCalls, flowUtils, TransferFlow, TransferFlowCustomTx } from '../utils/flow.utils'
import { flowNftService } from './flow.nft'
import { flowAccountService } from './flow.account'

export const flowTxService = (provider: FlowProvider, apiCalls: FlowApiCalls) => {
  const txTemplates = flowTxTemplates()

  const customSignedTransaction = async (
    body: TransferFlowCustomTx,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; events: any[] }> => {
    const pk = await flowUtils.getPrivateKey(body)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    const auth = flowUtils.getSigner(pk, body.account).signer
    const { signer: proposalSigner, keyHash } = proposer
      ? proposer(false)
      : flowUtils.getApiSigner(apiCalls, false)
    const { signer: payerSigner } = payer ? payer(true) : flowUtils.getApiSigner(apiCalls, true)

    const result = await flowUtils.sendTransaction(
      apiCalls,
      {
        code: body.transaction,
        txArgs: body.args,
        proposer: proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payerSigner,
      },
      provider.getProvider(),
    )
    return { txId: result.id, events: result.events }
  }

  const transferSignedTransaction = async (
    body: TransferFlow,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string }> => {
    const testnet = provider.isTestnet()

    let tokenAddress
    let tokenName
    let tokenStorage
    if (body.currency === Blockchain.FLOW) {
      tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FlowToken : FLOW_MAINNET_ADDRESSES.FlowToken
      tokenName = 'FlowToken'
      tokenStorage = 'flowToken'
    } else {
      tokenAddress = testnet ? FLOW_TESTNET_ADDRESSES.FUSD : FLOW_MAINNET_ADDRESSES.FUSD
      tokenName = 'FUSD'
      tokenStorage = 'fusd'
    }
    const code = txTemplates.prepareTransferTxTemplate(testnet, tokenAddress, tokenName, tokenStorage)
    const txArgs = [
      { value: parseFloat(body.amount).toFixed(8), type: 'UFix64' },
      { value: body.to, type: 'Address' },
    ]
    const pk = await flowUtils.getPrivateKey(body)
    if (!pk) throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_PRIVATE_KEY })

    await checkBalanceOrThrow(body.account, tokenAddress, tokenName, tokenStorage, body.amount)

    const auth = flowUtils.getSigner(pk, body.account).signer
    const { signer: proposalSigner, keyHash } = proposer
      ? proposer(false)
      : flowUtils.getApiSigner(apiCalls, false)
    const { signer: payerSigner } = payer ? payer(true) : flowUtils.getApiSigner(apiCalls, true)

    const result = await flowUtils.sendTransaction(
      apiCalls,
      {
        code,
        txArgs,
        proposer: proposalSigner,
        authorizations: [auth],
        payer: payerSigner,
        keyHash,
      },
      provider.getProvider(),
    )
    return { txId: result.id }
  }

  return {
    templates: txTemplates,
    nft: flowNftService(provider, apiCalls),
    account: flowAccountService(provider, apiCalls),
    native: {
      send: {
        /**
         * Send FLOW or FUSD from account to account.
         * @param body content of the transaction to broadcast
         * @param proposer function to obtain proposer key from
         * @param payer function to obtain payer key from
         * @returns txId id of the transaction in the blockchain
         */
        transferSignedTransaction: async (
          body: TransferFlow,
          proposer?: (isPayer: boolean) => AccountSigner,
          payer?: (isPayer: boolean) => AccountSigner,
        ) => {
          if (body.signatureId) {
            return ApiServices.blockchain.flow.flowTransferBlockchain(body as FlowTransactionKMS)
          }
          return transferSignedTransaction(body, proposer, payer)
        },
        /**
         * Send custom transaction to the FLOW network
         * @param body content of the transaction to broadcast
         * @param proposer function to obtain proposer key from
         * @param payer function to obtain payer key from
         * @returns txId id of the transaction in the blockchain
         */
        customSignedTransaction: async (
          body: TransferFlowCustomTx,
          proposer?: (isPayer: boolean) => AccountSigner,
          payer?: (isPayer: boolean) => AccountSigner,
        ) => {
          if (body.signatureId) {
            return ApiServices.blockchain.flow.flowTransferCustomBlockchain(body as FlowCustomTransactionKMS)
          }
          return customSignedTransaction(body, proposer, payer)
        },
      },
    },
  }

  async function checkBalanceOrThrow(
    account: string,
    tokenAddress: string,
    tokenName: string,
    tokenStorage: string,
    amount: string,
  ) {
    const balanceTx = txTemplates.prepareBalanceTxTemplate(
      provider.isTestnet(),
      tokenAddress,
      tokenName,
      tokenStorage,
    )
    const balanceArgs = [{ value: account, type: 'Address' }]

    let result

    try {
      result = await flowUtils.sendScript(balanceTx, balanceArgs, provider.getProvider())
    } catch (_e) {
      console.error(_e)
    }

    if (result) {
      if (new BigNumber(result).lt(new BigNumber(amount))) {
        throw new FlowSdkError({
          code: SdkErrorCode.INSUFFICIENT_FUNDS,
          error: new Error(
            `Insufficient funds. Balance: ${result} on account ${account} is less than ${amount.toString()}`,
          ),
        })
      }
    }
  }
}
