/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractJsonRpcSuite } from './AbstractJsonRpcSuite'

export interface SolanaAccountInfo {
  executable: boolean
  lamports: number
  owner: string
  rentEpoch: number
  data: string
}

export interface SolanaEpochInfo {
  epoch: number
  slotIndex: number
  slotsInEpoch: number
  absoluteSlot: number
}

export interface SolanaLeaderSchedule {
  [pubkey: string]: number[]
}

export interface SolanaPublicKey {
  _bn: string
  toString(): string
}

export interface SolanaTransactionSignature {
  _bn: string
  toString(): string
}

export interface SolanaTransaction {
  signatures: Array<string>
  message: {
    accountKeys: Array<string>
    header: {
      numReadonlySignedAccounts: number
      numReadonlyUnsignedAccounts: number
      numRequiredSignatures: number
    }
    instructions: Array<{
      accounts: Array<number>
      data: string
      programIdIndex: number
    }>
  }
}

export interface SolanaVoteAccount {
  commission: number
  epochCredits: Array<[number, number, number]>
  nodePubkey: string
  lastVote: number
  rootSlot: number
  votePubkey: string
}

export enum Commitment {
  Processed = 'processed',
  Confirmed = 'confirmed',
  Finalized = 'finalized',
}

export enum Encoding {
  Base58 = 'base58',
  Base64 = 'base64',
  Base64_ZSTD = 'base64+zstd',
  JsonParsed = 'jsonParsed',
}

export enum TransactionDetails {
  Full = 'full',
  Accounts = 'accounts',
  Signatures = 'signatures',
  None = 'none',
}

export interface SolanaRpcSuite extends AbstractJsonRpcSuite {
  //Account-related methods
  getAccountInfo: (publicKey: string, commitment?: Commitment) => Promise<SolanaAccountInfo | null>
  getBalance: (publicKey: string) => Promise<{ context: { slot: number }; value: number }>

  getBlockHeight: (commitment?: string, minContextSlot?: string) => Promise<number>
  getBlock: (
    block: number,
    options?: {
      commitment?: Commitment
      encoding?: Encoding
      transactionDetails?: TransactionDetails
      maxSupportedTransactionVersion?: number
      rewards?: boolean
    },
  ) => Promise<{
    blockhash: string
    previousBlockhash: string
    parentSlot: number
    transactions: Array<any>
    signatures: Array<any>
    rewards: Array<any> | undefined
    blockTime: number | null
    blockHeight: number | null
  } | null>
  getBlockProduction: (options?: {
    commitment?: Commitment
    identity?: string
    range?: {
      firstSlot: number
      lastSlot: number
    }
  }) => Promise<{
    context: { slot: number }
    value: {
      byIdentity: {
        [key: string]: Array<number>
      }
      range: { firstSlot: number; lastSlot: number }
    }
  }>

  getBlockCommitment: (block: number) => Promise<{ commitment: Array<number>; totalStake: number }>
  getBlocks: (endSlot: number, startSlot?: number, commitment?: Commitment) => Promise<Array<number>> /*
  getBlockTime: (block: number | 'recent', commitment?: Commitment) => Promise<number | null>
  // Cluster-related methods
  getClusterNodes: () => Promise<Array<{ pubkey: SolanaPublicKey; gossip: string; tpu?: string }>>
  getEpochInfo: (commitment?: Commitment) => Promise<SolanaEpochInfo>
  getEpochSchedule: (
    commitment?: Commitment,
  ) => Promise<Array<{ firstSlot: number; leader: SolanaPublicKey }>>
  getFeeForMessage: (message: any, commitment?: Commitment) => Promise<number>
  getFirstAvailableBlock: () => Promise<number>
  getGenesisHash: () => Promise<string>
  getHealth: () => Promise<boolean>
  getHighestSnapshotSlot: () => Promise<number>
  getIdentity: () => Promise<SolanaPublicKey>
  getInflationGovernor: (commitment?: Commitment) => Promise<{
    foundation: number
    foundationTerm: number
    initial: number
    taper: number
    terminal: number
  }>
  getInflationRate: (commitment?: Commitment) => Promise<number>
  getInflationReward: (epoch: number, commitment?: Commitment) => Promise<number>
  getLargestAccounts: (
    filter?: 'circulating' | 'nonCirculating',
    commitment?: Commitment,
  ) => Promise<Array<{ address: string; lamports: number }>>
  getLatestBlockhash: (commitment?: Commitment) => Promise<[string, string]>
  getLeaderSchedule: (epoch?: number, commitment?: Commitment) => Promise<SolanaLeaderSchedule>
  getMaxRetransmitSlot: () => Promise<number>
  getMaxShredInsertSlot: () => Promise<number>
  getMinimumBalanceForRentExemption: (dataSize: number, commitment?: Commitment) => Promise<number>
  getMultipleAccounts: (
    publicKeys: string[],
    commitment?: Commitment,
  ) => Promise<Array<{ account: SolanaAccountInfo | null; pubkey: SolanaPublicKey }>>
  getProgramAccounts: (
    programId: string,
    config: {
      commitment?: Commitment
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
    },
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: SolanaPublicKey; data: any }>>
  getRecentPerformanceSamples: (
    limit?: number,
    commitment?: Commitment,
  ) => Promise<Array<{ numSlots: number; numTransactions: number; samplePeriodSecs: number }>>
  getRecentPrioritizationFees: (
    commitment?: Commitment,
  ) => Promise<Array<{ fee: number; lastValidSlot: number; targetSlot: number }>>
  getSignaturesForAddress: (
    address: string,
    options?: {
      before?: SolanaTransactionSignature
      until?: SolanaTransactionSignature
      limit?: number
    },
    commitment?: Commitment,
  ) => Promise<Array<SolanaTransactionSignature>>
  getSignatureStatuses: (
    signatures: SolanaTransactionSignature[],
    commitment?: Commitment,
  ) => Promise<{ [signature: string]: { slot: number; err: any } | null }>
  getSlot: (commitment?: Commitment) => Promise<number>
  getSlotLeader: (commitment?: Commitment) => Promise<SolanaPublicKey>
  getSlotLeaders: (
    startSlot: number,
    limit?: number,
    commitment?: Commitment,
  ) => Promise<Array<{ pubkey: SolanaPublicKey; slot: number }>>
  getStakeActivation: (
    publicKey: string,
    commitment?: Commitment,
  ) => Promise<{ active: number; inactive: number }>
  getStakeMinimumDelegation: (commitment?: Commitment) => Promise<number>
  getSupply: (
    commitment?: Commitment,
  ) => Promise<{ circulating: number; nonCirculating: number; total: number }>
  getTokenAccountBalance: (
    publicKey: string,
    commitment?: Commitment,
  ) => Promise<{ value: number; decimals: number }>
  getTokenAccountsByDelegate: (
    delegate: string,
    options?: {
      mint?: string
      programId?: string
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
    },
    commitment?: Commitment,
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: SolanaPublicKey; data: any }>>
  getTokenAccountsByOwner: (
    owner: string,
    options?: {
      mint?: string
      programId?: string
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
    },
    commitment?: Commitment,
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: SolanaPublicKey; data: any }>>
  getTokenLargestAccounts: (
    mintAddress: string,
    commitment?: Commitment,
  ) => Promise<Array<{ address: string; amount: number }>>
  getTokenSupply: (mintAddress: string, commitment?: Commitment) => Promise<number>
  getTransaction: (
    signature: SolanaTransactionSignature,
    commitment?: Commitment,
  ) => Promise<SolanaTransaction>
  getTransactionCount: (commitment?: Commitment) => Promise<number>
  getVersion: () => Promise<number>
  getVoteAccounts: (
    commitment?: Commitment,
  ) => Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
  isBlockhashValid: (blockhash: string, commitment?: Commitment) => Promise<boolean>
  minimumLedgerSlot: () => Promise<number>
  requestAirdrop: (
    publicKey: string,
    amount: number,
    commitment?: Commitment,
  ) => Promise<SolanaTransactionSignature>
  sendTransaction: (
    transaction: SolanaTransaction,
    config?: {
      skipPreflight?: boolean
      preflightCommitment?: Commitment
      commitment?: Commitment
    },
  ) => Promise<SolanaTransactionSignature>
  simulateTransaction: (
    transaction: SolanaTransaction,
    signers?: Array<string>,
    commitment?: Commitment,
  ) => Promise<{ err: any }>*/
}
