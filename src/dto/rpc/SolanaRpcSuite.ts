/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractJsonRpcSuite } from './AbstractJsonRpcSuite'

export interface SolanaAccountInfo {
  lamports: number
  owner: string
  data: string
  executable: boolean
  rentEpoch: number
  size: number
}

export interface SolanaMint {
  mint: string
}
export interface SolanaProgramId {
  programId: string
}
export interface SolanaVersion {
  'solana-core': string
  'feature-set': string
}
export interface SolanaEpochInfo {
  absoluteSlot: number
  blockHeight: number
  epoch: number
  slotIndex: number
  slotsInEpoch: number
  transactionCount: number
}

export interface SolanaEpochSchedule {
  slotsPerEpoch: number
  leaderScheduleSlotOffset: number
  warmup: boolean
  firstNormalEpoch: number
  firstNormalSlot: number
}

export interface SolanaLeaderSchedule {
  [pubkey: string]: number[]
}

export interface SolanaTransaction {
  slot: number
  transaction: any
  meta: any
  blockTime: number | null
  version: number | string | null
}

export interface SolanaVoteAccount {
  votePubkey: string
  nodePubkey: string
  activatedStake: number
  epochVoteAccount: boolean
  commission: number
  lastVote: number
  epochCredits: Array<[number, number, number]>
  rootSlot: number
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
  getBlocks: (endSlot: number, startSlot?: number, commitment?: Commitment) => Promise<Array<number>>
  getBlockTime: (block: number) => Promise<number | null>
  getClusterNodes: () => Promise<
    Array<{
      pubkey: string
      gossip?: string
      tpu?: string
      rpc?: string
      version?: string
      featureSet?: number
      shredVersion?: number
    }>
  >
  getEpochInfo: (
    pubkey: string,
    options?: { commitment?: Commitment; minContextSlot?: number },
  ) => Promise<SolanaEpochInfo>
  getEpochSchedule: () => Promise<SolanaEpochSchedule>
  getFeeForMessage: (
    message: any,
    options?: { commitment?: Commitment; minContextSlot?: number },
  ) => Promise<number | null>
  getFirstAvailableBlock: () => Promise<number>
  getGenesisHash: () => Promise<string>
  getHealth: () => Promise<string>
  getHighestSnapshotSlot: () => Promise<{ full: number; incremental: number }>
  getIdentity: () => Promise<{ identity: string }>
  getInflationGovernor: (options?: { commitment?: Commitment }) => Promise<{
    initial: number
    terminal: number
    taper: number
    foundation: number
    foundationTerm: number
  }>
  getInflationRate: () => Promise<{ total: number; validator: number; foundation: number; epoch: number }>
  getInflationReward: (
    addresses?: string[],
    options?: {
      commitment?: Commitment
      epoch?: number
      minContextSlot?: number
    },
  ) => Promise<
    Array<{
      epoch: number
      effectiveSlot: number
      amount: number
      postBalance: number
      commission: number
    }>
  >
  getLargestAccounts: (options?: {
    commitment?: Commitment
    filter?: 'circulating' | 'nonCirculating'
  }) => Promise<{ context: { slot: number }; value: Array<{ address: string; lamports: number }> }>
  getLatestBlockhash: (options?: { commitment?: Commitment; minContextSlot?: number }) => Promise<{
    context: { slot: number }
    value: {
      blockhash: string
      lastValidBlockHeight: number
    }
  }>
  getLeaderSchedule: (
    slot?: number,
    options?: {
      commitment?: Commitment
      identity?: string
    },
  ) => Promise<SolanaLeaderSchedule | null>
  getMaxRetransmitSlot: () => Promise<number>
  getMaxShredInsertSlot: () => Promise<number>
  getMinimumBalanceForRentExemption: (
    dataSize?: number,
    options?: { commitment?: Commitment },
  ) => Promise<number>
  getMultipleAccounts: (
    pubKeys: string[],
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      dataSlice?: { offset: number; length: number }
      encoding?: Encoding
    },
  ) => Promise<{ context: { slot: number }; value: Array<SolanaAccountInfo | null> }>
  getProgramAccounts: (
    programId: string,
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      withContext?: boolean
      encoding?: Encoding
      dataSlice?: { offset: number; length: number }
      filters?: Array<{ memcmp: { offset: number; bytes: string } | { dataSize: number } }>
    },
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: string }>>
  getRecentPerformanceSamples: (limit?: number) => Promise<
    Array<{
      slot: number
      numTransactions: number
      numSlots: number
      samplePeriodSecs: number
      numNonVoteTransaction: number
    }>
  >
  getRecentPrioritizationFees: (
    addresses?: string[],
  ) => Promise<Array<{ slot: number; prioritizationFee: number }>>
  getSignaturesForAddress: (
    address: string,
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      limit?: number
      before?: string
      until?: string
    },
  ) => Promise<
    Array<{
      signature: string
      slot: number
      err: any | null
      memo: string | null
      blockTime: number | null
      confirmationStatus: string | null
    }>
  >
  getSignatureStatuses: (
    signatures?: string[],
    options?: {
      searchTransactionHistory?: boolean
    },
  ) => Promise<{
    context: { slot: number }
    value: {
      slot: number
      confirmations: number | null
      err: any | null
      confirmationStatus: string | null
    }
  }>
  getSlot: (options?: { commitment?: Commitment; minContextSlot?: number }) => Promise<number>
  getSlotLeader: (options?: { commitment?: Commitment; minContextSlot?: number }) => Promise<string>
  getSlotLeaders: (startSlot?: number, limit?: number) => Promise<Array<string>>
  getStakeActivation: (
    pubkey: string,
    options?: { commitment?: Commitment; minContextSlot?: number; epoch?: number },
  ) => Promise<{ state: string; active: number; inactive: number }>
  getStakeMinimumDelegation: (options?: {
    commitment?: Commitment
  }) => Promise<{ context: { slot: number }; value: number }>
  getSupply: (options?: { commitment?: Commitment; excludeNonCirculatingAccountsList?: boolean }) => Promise<{
    context: { slot: number }
    value: {
      circulating: number
      nonCirculating: number
      nonCirculatingAccounts: Array<string>
      total: number
    }
  }>
  getTokenAccountBalance: (
    pubkey: string,
    options?: { commitment?: Commitment },
  ) => Promise<{
    context: { slot: number }
    value: { amount: number; decimals: number; uiAmount: number | null; uiAmountString: string }
  }>
  getTokenAccountsByDelegate: (
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      dataSlice?: { offset: number; length: number }
      encoding?: Encoding
    },
  ) => Promise<{
    context: { slot: number }
    value: Array<{ account: SolanaAccountInfo; pubkey: string }>
  }>
  getTokenAccountsByOwner: (
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: {
      commitment?: Commitment
      minContextSlot?: number
      dataSlice?: { offset: number; length: number }
      encoding?: Encoding
    },
  ) => Promise<{
    context: { slot: number }
    value: Array<{ account: SolanaAccountInfo; pubkey: string }>
  }>
  getTokenLargestAccounts: (
    pubkey: string,
    options?: {
      commitment?: Commitment
    },
  ) => Promise<{
    context: { slot: number }
    value: Array<{
      address: string
      amount: number
      decimals: number
      uiAmount: number | null
      uiAmountString: string
    }>
  }>
  getTokenSupply: (
    pubkey: string,
    options?: { commitment?: Commitment },
  ) => Promise<{
    context: { slot: number }
    value: { amount: string; decimals: number; uiAmount: number | null; uiAmountString: string }
  }>
  getTransaction: (
    signature: string,
    options?: { commitment?: Commitment; maxSupportedTransactionVersion?: number; encoding: Encoding },
  ) => Promise<SolanaTransaction | null>
  getTransactionCount: (options?: { commitment?: Commitment; minContextSlot?: number }) => Promise<number>
  getVersion: () => Promise<SolanaVersion>
  getVoteAccounts: (options?: {
    commitment?: Commitment
    votePubkey?: string
    keepUnstakedDelinquents?: boolean
    delinquentSlotDistance?: number
  }) => Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
  isBlockhashValid: (
    blockhash: string,
    options?: { commitment?: Commitment; minContextSlot?: number },
  ) => Promise<{
    context: {
      slot: number
    }
    value: boolean
  }>
  minimumLedgerSlot: () => Promise<number>
  requestAirdrop: (pubkey: string, amount: number, options?: { commitment?: Commitment }) => Promise<string>
  sendTransaction: (
    transaction: string,
    options?: {
      encoding?: Encoding
      skipPreflight?: boolean
      preflightCommitment?: Commitment
      maxRetries?: number
      minContextSlot?: number
    },
  ) => Promise<string>
  simulateTransaction: (
    transaction: string,
    options?: {
      commitment?: Commitment
      sigVerify?: boolean
      replaceRecentBlockhash?: boolean
      minContextSlot?: number
      encoding?: Encoding
      accounts: {
        addresses: Array<string>
        encoding?: Encoding
      }
    },
  ) => Promise<{
    context: { slot: number }
    value: {
      err: any
      accounts: Array<any> | null
      unitsConsumed: number | null
      returnData: {
        programId: string
        data: Array<string>
      }
    }
  }>
}
