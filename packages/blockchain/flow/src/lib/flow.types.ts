import { PrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import { FlowCustomTransactionPK, TransactionHash } from '@tatumio/api-client'

export interface Account {
  addr?: string
}

export interface AccountSignature {
  addr: string
  keyId: number
  signature: string
}

export interface AccountAuthorization {
  tempId: string
  addr: string
  keyId: number
  signingFunction: (data: { message: string }) => AccountSignature | Promise<AccountSignature>
}

export interface AccountSigner {
  signer: (account: Account) => Promise<AccountAuthorization>
  keyHash?: string
}

export type Transaction = {
  code: string
  txArgs: FlowArgs[]
  proposer: AccountAuthorizer
  authorizations: AccountAuthorizer[]
  payer: AccountAuthorizer
  keyHash?: string
}

export type TransactionResult = {
  id: string
  events: { data: any }[]
}

export type TransactionHashWithAddress = TransactionHash & {
  address: string
}

export type AccountAuthorizer = (account: Account) => Promise<AccountAuthorization>

export type FlowPrivateKeyOrSignatureId<T extends { privateKey?: string }> = PrivateKeyOrSignatureId<T> & {
  account: string
}

// @TODO - openapi bug
export type FixedFlowCustomTransactionPK = Omit<FlowCustomTransactionPK, 'args'> & { args: FlowArgs[] }

const types = [
  'Identity',
  'UInt',
  'Int',
  'UInt8',
  'Int8',
  'UInt16',
  'Int16',
  'UInt32',
  'Int32',
  'UInt64',
  'Int64',
  'UInt128',
  'Int128',
  'UInt256',
  'Int256',
  'Word8',
  'Word16',
  'Word32',
  'Word64',
  'UFix64',
  'Fix64',
  'String',
  'Character',
  'Bool',
  'Address',
  'Void',
  'Optional',
  'Reference',
  'Array',
  'Dictionary',
  'Event',
  'Resource',
  'Struct',
]

type Types = typeof types[number]

export interface FlowArgs {
  value: string | string[]
  type: string
  subType?: Types
}
