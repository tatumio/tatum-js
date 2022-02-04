import { Currency } from './Currency'

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
  signingFunction: (data: { message: string }) => AccountSignature
}

export type Transaction = {
  code: string
  args: FlowArgs[]
  proposer: AccountAuthorizer
  authorizations: AccountAuthorizer[]
  payer: AccountAuthorizer
  keyHash?: string
}

export type TransactionResult = {
  id: string
  error: string
  events: { data: any }[]
}

export type AccountAuthorizer = (account?: Account) => Promise<AccountAuthorization>

export interface FlowMnemonicOrPrivateKeyOrSignatureId {
  account: string
  mnemonic?: string
  index?: number
  privateKey?: string
  signatureId?: string
}

export interface TransferFlow extends FlowMnemonicOrPrivateKeyOrSignatureId {
  to: string
  amount: string
  currency: 'FLOW' | 'FUSD'
}

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

export interface FlowArgs {
  value: string | string[]
  type: string
  subType?: string
}

export interface TransferFlowCustomTx extends FlowMnemonicOrPrivateKeyOrSignatureId {
  transaction: string
  args: FlowArgs[]
}

export interface FlowBurnNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
  tokenId: string
  chain: Currency
  contractAddress: string
}

export type ChainFlowBurnNft = Omit<FlowBurnNft, 'chain'>

export interface FlowTransferNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
  to: string
  tokenId: string
  chain: Currency
  contractAddress: string
}

export type ChainFlowTransferNft = Omit<FlowTransferNft, 'chain'>

export interface FlowMintMultipleNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
  to: string[]
  url: string[]
  chain: Currency
  contractAddress: string
}

export type ChainFlowMintMultipleNft = Omit<FlowMintMultipleNft, 'chain'>

export interface FlowMintNft extends FlowMnemonicOrPrivateKeyOrSignatureId {
  to: string
  url: string
  chain: Currency
  contractAddress: string
}

export type ChainFlowMintNft = Omit<FlowMintNft, 'chain'>
