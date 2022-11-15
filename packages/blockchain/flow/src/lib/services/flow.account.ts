import { FlowProvider } from './flow.provider'
import { CreateAddressFromPubKey, FlowApiCalls, flowUtils } from '../utils/flow.utils'
import { flowTxTemplates } from './flow.tx.templates'
import { AccountSigner } from '@tatumio/flow'
import { ECDSA_secp256k1, encodeKey, SHA3_256 } from '@onflow/util-encode-key'
import { FlowSdkError } from '../flow.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { ApiServices, FlowCreateAddressFromPubKeyKMS } from '@tatumio/api-client'

export const flowAccountService = (provider: FlowProvider, apiCalls: FlowApiCalls) => {
  const txTemplates = flowTxTemplates()

  const createSignedTransaction = async (
    body: CreateAddressFromPubKey,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; address: string }> => {
    const code = txTemplates.prepareCreateAccountWithFUSDFromPublicKeyTxTemplate(provider.isTestnet())
    const encodedPublicKey = encodeKey(body.publicKey, ECDSA_secp256k1, SHA3_256, 1000)
    const txArgs = [{ type: 'String', value: encodedPublicKey }]

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
        code,
        txArgs,
        proposer: proposalSigner,
        authorizations: [auth],
        payer: payerSigner,
        keyHash,
      },
      provider.getProvider(),
    )
    return {
      txId: result.id,
      address: result.events.find((e: any) => e.type === 'flow.AccountCreated')?.data.address,
    }
  }

  const publicKeySignedTransaction = async (
    body: CreateAddressFromPubKey,
    proposer?: (isPayer: boolean) => AccountSigner,
    payer?: (isPayer: boolean) => AccountSigner,
  ): Promise<{ txId: string; address: string }> => {
    const code = txTemplates.prepareAddPublicKeyToAccountTxTemplate()
    const encodedPublicKey = encodeKey(body.publicKey, ECDSA_secp256k1, SHA3_256, body.weight || 0)
    const txArgs = [{ type: 'String', value: encodedPublicKey }]

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
        code,
        txArgs,
        proposer: proposalSigner,
        authorizations: [auth],
        keyHash,
        payer: payerSigner,
      },
      provider.getProvider(),
    )
    return { txId: result.id, address: result.events[0].data.address }
  }

  return {
    send: {
      /**
       * Create account on the FLOW network. It automatically creates 100 0-weight proposal keys, which are managed by Tatum API - index 1-100.
       * Main 1000 weight authorizer key is stored as a first one on index 0.
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       */
      createSignedTransaction: async (
        body: CreateAddressFromPubKey,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return ApiServices.blockchain.flow.flowCreateAddressFromPubKey(
            body as FlowCreateAddressFromPubKeyKMS,
          )
        }
        return createSignedTransaction(body, proposer, payer)
      },
      /**
       * Add public key to existing blockchain address with defined weight
       * @param body content of the transaction to broadcast
       * @param proposer function to obtain proposer key from
       * @param payer function to obtain payer key from
       */
      publicKeySignedTransaction: async (
        body: CreateAddressFromPubKey,
        proposer?: (isPayer: boolean) => AccountSigner,
        payer?: (isPayer: boolean) => AccountSigner,
      ) => {
        if (body.signatureId) {
          return ApiServices.blockchain.flow.flowAddPubKeyToAddress(body as FlowCreateAddressFromPubKeyKMS)
        }
        return publicKeySignedTransaction(body, proposer, payer)
      },
    },
  }
}
