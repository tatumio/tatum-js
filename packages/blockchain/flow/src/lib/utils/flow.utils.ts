import {
  Account,
  AccountAuthorization,
  AccountSignature,
  FixedFlowCustomTransactionPK,
  FlowArgs,
  FlowPrivateKeyOrSignatureId,
  Transaction,
  TransactionResult,
} from '@tatumio/flow'
import {
  BurnNftFlowPK,
  FlowCreateAddressFromPubKeySecret,
  FlowTransactionPK,
  MintMultipleNftFlowPK,
  MintNftFlowPK,
  TransferNftFlowPK,
} from '@tatumio/api-client'
import * as elliptic from 'elliptic'
import SHA3 from 'sha3'
import fcl from '@onflow/fcl'
import _ from 'lodash'
import { FlowSdkError } from '../flow.sdk.errors'
import types from '@onflow/types'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { flowWalletUtils } from './flow.wallet.utils'

export type MintFlowNft = FlowPrivateKeyOrSignatureId<MintNftFlowPK>
export type MintMultipleFlowNft = FlowPrivateKeyOrSignatureId<MintMultipleNftFlowPK>
export type TransferFlowNft = FlowPrivateKeyOrSignatureId<TransferNftFlowPK>
export type BurnFlowNft = FlowPrivateKeyOrSignatureId<BurnNftFlowPK>
export type TransferFlowCustomTx = FlowPrivateKeyOrSignatureId<FixedFlowCustomTransactionPK>
export type TransferFlow = FlowPrivateKeyOrSignatureId<FlowTransactionPK>
export type CreateAddressFromPubKey = FlowPrivateKeyOrSignatureId<FlowCreateAddressFromPubKeySecret>

export type FlowApiCalls = {
  getSignKey: (isPayer: boolean) => Promise<{ keyId: number; address: string }>
  signWithKey: (data: string, isPayer: boolean) => Promise<{ signature: string }>
  broadcast: (
    txData: string,
    signatureId?: string,
    proposalKey?: number,
  ) => Promise<{ txId: string; failed?: boolean }>
}

function ArrayArgValue(arg: FlowArgs) {
  return arg.type === 'Array' ? types[arg.type](types[arg.subType as any]) : types[arg.type]
}

export const flowUtils = {
  sign: (pk: string, msg: Buffer) => {
    const keyPair = new elliptic.ec('secp256k1').keyFromPrivate(pk)
    const signature = keyPair.sign(new SHA3(256).update(msg).digest())
    const r = signature.r.toArrayLike(Buffer, 'be', 32)
    const s = signature.s.toArrayLike(Buffer, 'be', 32)

    return Buffer.concat([r, s]).toString('hex')
  },
  getSigner: (pk: string, address: string, keyId = 0) => {
    return {
      signer: async (account: Account): Promise<AccountAuthorization> => {
        return {
          ...account,
          tempId: `${address}-${keyId}`,
          addr: fcl.sansPrefix(address),
          keyId: Number(keyId),
          signingFunction: (data: { message: string }): AccountSignature => {
            return {
              addr: fcl.withPrefix(address),
              keyId: Number(keyId),
              signature: flowUtils.sign(pk, Buffer.from(data.message, 'hex')),
            }
          },
        }
      },
    }
  },
  getApiSigner: (apiCalls: FlowApiCalls, isPayer: boolean) => {
    const keyHash = _.uniqueId(`FLOW_PROPOSAL_KEY_`)

    const signer = async (account: Account): Promise<AccountAuthorization> => {
      const { address, keyId } = await flowUtils.getProposalKeyOrFetch(apiCalls, keyHash, isPayer)
      if (!isPayer) {
        flowUtils.storeProposalKey(keyHash, address, keyId)
      }
      return {
        ...account,
        tempId: `${address}-${keyId}`,
        addr: fcl.sansPrefix(address),
        keyId,
        signingFunction: async (data: { message: string }): Promise<AccountSignature> => {
          return {
            addr: fcl.withPrefix(address),
            keyId: Number(keyId),
            signature: (await apiCalls.signWithKey(data.message, isPayer)).signature,
          }
        },
      }
    }
    return { signer, keyHash: keyHash }
  },
  sendTransaction: async (
    apiCalls: FlowApiCalls,
    { code, txArgs, proposer, authorizations, payer, keyHash }: Transaction,
    provider: string,
  ): Promise<TransactionResult> => {
    fcl.config().put('accessNode.api', provider)
    let response
    try {
      response = await fcl.send([
        fcl.transaction(code),
        fcl.args(txArgs.map((arg) => fcl.arg(arg.value, ArrayArgValue(arg)))),
        fcl.proposer(proposer),
        fcl.authorizations(authorizations),
        fcl.payer(payer),
        fcl.limit(1000),
      ])
    } catch (e) {
      await flowUtils.unlockProposalKey(apiCalls, keyHash)
      throw new FlowSdkError({ error: e as Error })
    }

    const { transactionId } = response
    try {
      const { error, events } = await fcl.tx(response).onceSealed()
      if (error) {
        throw new FlowSdkError({ error: error })
      }
      return {
        id: transactionId,
        events,
      }
    } catch (e) {
      throw new FlowSdkError({ error: e as Error })
    } finally {
      await flowUtils.unlockProposalKey(apiCalls, keyHash)
    }
  },
  sendScript: async (code: string, scriptArgs: FlowArgs[], provider: string) => {
    fcl.config().put('accessNode.api', provider)
    const response = await fcl.send([
      fcl.script(code),
      fcl.args(scriptArgs.map((arg) => fcl.arg(arg.value, types[arg.type]))),
    ])
    return fcl.decode(response)
  },
  getPrivateKey: (body: FlowPrivateKeyOrSignatureId<{ privateKey: string }>) => {
    const { mnemonic, index, privateKey } = body
    if (privateKey) {
      return privateKey
    } else {
      if (mnemonic && !_.isNil(index) && index >= 0) {
        return flowWalletUtils.generatePrivateKeyFromMnemonic(mnemonic, index)
      } else throw new FlowSdkError({ code: SdkErrorCode.FLOW_MISSING_MNEMONIC })
    }
  },
  getProposalKeyOrFetch: (
    apiCalls: FlowApiCalls,
    keyHash: string,
    isPayer: boolean,
  ): Promise<{ address: string; keyId: number }> => {
    const value = process.env[keyHash]

    if (value) {
      return JSON.parse(value)
    } else {
      return apiCalls.getSignKey(isPayer)
    }
  },
  storeProposalKey: (keyHash: string, address: string, keyId: number) => {
    process.env[keyHash] = JSON.stringify({ address, keyId })
  },
  proposalKey: (keyHash: string): { address: string; keyId: number } | undefined => {
    const value = process.env[keyHash]
    if (!value) return undefined
    return keyHash ? JSON.parse(value) : undefined
  },
  unlockProposalKey: async (apiCalls: FlowApiCalls, keyHash?: string) => {
    try {
      if (keyHash) {
        const key = flowUtils.proposalKey(keyHash)
        if (key) {
          await apiCalls.broadcast('', undefined, key.keyId)
          delete process.env[keyHash]
        }
      }
    } catch (e) {
      throw new FlowSdkError({ error: e as Error })
    }
  },
}
