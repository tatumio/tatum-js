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

export type SolanaTypeWithContext<T> = {
  context: { slot: number }
  value: T
}

export type SolanaBlockProduction = {
  byIdentity: {
    [key: string]: Array<number>
  }
  range: { firstSlot: number; lastSlot: number }
}

export type SolanaSignatureStatus = {
  slot: number
  confirmations: number | null
  err: any | null
  confirmationStatus: string | null
}

export type SolanaLargestAccount = {
  address: string
  lamports: number
}

export type SolanaLatestBlockhash = {
  blockhash: string
  lastValidBlockHeight: number
}

export type SolanaSupply = {
  circulating: number
  nonCirculating: number
  nonCirculatingAccounts: Array<string>
  total: number
}

export type SolanaTokenAccountBalance = {
  amount: number
  decimals: number
  uiAmount: number | null
  uiAmountString: string
}

export type SolanaAccount = {
  address: string
  amount: number
  decimals: number
  uiAmount: number | null
  uiAmountString: string
}

export type SolanaTokenAccount = { account: SolanaAccountInfo; pubkey: string }

export type SolanaTokenSupply = {
  amount: string
  decimals: number
  uiAmount: number | null
  uiAmountString: string
}

export type SolanaTransactionSimulation = {
  err: any
  accounts: Array<any> | null
  unitsConsumed: number | null
  returnData: {
    programId: string
    data: Array<string>
  }
}

export type GetAccountInfoOptions = {
  commitment?: Commitment
  encoding?: Encoding
}

export type GetBlockOptions = {
  commitment?: Commitment
  encoding?: Encoding
  transactionDetails?: TransactionDetails
  maxSupportedTransactionVersion?: number
  rewards?: boolean
}

export type GetBlockProductionOptions = {
  commitment?: Commitment
  identity?: string
  range?: {
    firstSlot: number
    lastSlot: number
  }
}
export type GetMultipleAccountsOptions = {
  commitment?: Commitment
  minContextSlot?: number
  dataSlice?: { offset: number; length: number }
  encoding?: Encoding
}

export type GetProgramAccountsOptions = {
  commitment?: Commitment
  minContextSlot?: number
  withContext?: boolean
  encoding?: Encoding
  dataSlice?: { offset: number; length: number }
  filters?: Array<{ memcmp: { offset: number; bytes: string } | { dataSize: number } }>
}

export type GetSignaturesForAddressOptions = {
  commitment?: Commitment
  minContextSlot?: number
  limit?: number
  before?: string
  until?: string
}

export type GetSignatureStatusesOptions = {
  searchTransactionHistory?: boolean
}

export type GetTokenAccountsOptions = {
  commitment?: Commitment
  minContextSlot?: number
  dataSlice?: { offset: number; length: number }
  encoding?: Encoding
}

export type SimulateTransactionOptions = {
  commitment?: Commitment
  sigVerify?: boolean
  replaceRecentBlockhash?: boolean
  minContextSlot?: number
  encoding?: Encoding
  accounts: {
    addresses: Array<string>
    encoding?: Encoding
  }
}

export type GetCommitmentOptions = {
  commitment?: Commitment
}

export type GetCommitmentMinContextSlotOptions = {
  commitment?: Commitment
  minContextSlot?: number
}

export type GetInflationRewardOptions = {
  commitment?: Commitment
  epoch?: number
  minContextSlot?: number
}

export type GetLargestAccountsOptions = {
  commitment?: Commitment
  filter?: 'circulating' | 'nonCirculating'
}

export type GetLeaderScheduleOptions = {
  commitment?: Commitment
  identity?: string
}

export type GetStakeActivationOptions = {
  commitment?: Commitment
  minContextSlot?: number
  epoch?: number
}

export type GetSupplyOptions = {
  commitment?: Commitment
  excludeNonCirculatingAccountsList?: boolean
}

export type GetVoteAccountOptions = {
  commitment?: Commitment
  votePubkey?: string
  keepUnstakedDelinquents?: boolean
  delinquentSlotDistance?: number
}

export type GetTransactionOptions = {
  commitment?: Commitment
  maxSupportedTransactionVersion?: number
  encoding: Encoding
}

export type SendTransactionOptions = {
  encoding?: Encoding
  skipPreflight?: boolean
  preflightCommitment?: Commitment
  maxRetries?: number
  minContextSlot?: number
}

export interface SolanaRpcSuite extends AbstractJsonRpcSuite {
  getAccountInfo: (
    pubkey: string,
    options?: GetAccountInfoOptions,
  ) => Promise<SolanaTypeWithContext<SolanaAccountInfo | null>>
  getBalance: (publicKey: string) => Promise<SolanaTypeWithContext<number>>
  getBlockHeight: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>
  getBlock: (
    block: number,
    options?: GetBlockOptions,
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
  getBlockProduction: (
    options?: GetBlockProductionOptions,
  ) => Promise<SolanaTypeWithContext<SolanaBlockProduction>>
  getBlockCommitment: (block: number) => Promise<{ commitment: Array<number>; totalStake: number }>
  getBlocks: (endSlot: number, startSlot?: number, options?: GetCommitmentOptions) => Promise<Array<number>>
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
  getEpochInfo: (options?: GetCommitmentMinContextSlotOptions) => Promise<SolanaEpochInfo>
  getEpochSchedule: () => Promise<SolanaEpochSchedule>
  getFeeForMessage: (message: any, options?: GetCommitmentMinContextSlotOptions) => Promise<number | null>
  getFirstAvailableBlock: () => Promise<number>
  getGenesisHash: () => Promise<string>
  getHealth: () => Promise<string>
  getHighestSnapshotSlot: () => Promise<{ full: number; incremental: number }>
  getIdentity: () => Promise<{ identity: string }>
  getInflationGovernor: (options?: GetCommitmentOptions) => Promise<{
    initial: number
    terminal: number
    taper: number
    foundation: number
    foundationTerm: number
  }>
  getInflationRate: () => Promise<{ total: number; validator: number; foundation: number; epoch: number }>
  getInflationReward: (
    addresses?: string[],
    options?: GetInflationRewardOptions,
  ) => Promise<
    Array<{
      epoch: number
      effectiveSlot: number
      amount: number
      postBalance: number
      commission: number
    }>
  >
  getLargestAccounts: (
    options?: GetLargestAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaLargestAccount[]>>
  getLatestBlockhash: (
    options?: GetCommitmentMinContextSlotOptions,
  ) => Promise<SolanaTypeWithContext<SolanaLatestBlockhash>>
  getLeaderSchedule: (
    slot?: number,
    options?: GetLeaderScheduleOptions,
  ) => Promise<SolanaLeaderSchedule | null>
  getMaxRetransmitSlot: () => Promise<number>
  getMaxShredInsertSlot: () => Promise<number>
  getMinimumBalanceForRentExemption: (dataSize?: number, options?: GetCommitmentOptions) => Promise<number>
  getMultipleAccounts: (
    pubKeys: string[],
    options?: GetMultipleAccountsOptions,
  ) => Promise<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>
  getProgramAccounts: (
    programId: string,
    options?: GetProgramAccountsOptions,
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
    options?: GetSignaturesForAddressOptions,
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
    options?: GetSignatureStatusesOptions,
  ) => Promise<SolanaTypeWithContext<SolanaSignatureStatus>>
  getSlot: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>
  getSlotLeader: (options?: GetCommitmentMinContextSlotOptions) => Promise<string>
  getSlotLeaders: (startSlot?: number, limit?: number) => Promise<Array<string>>
  getStakeActivation: (
    pubkey: string,
    options?: GetStakeActivationOptions,
  ) => Promise<{ state: string; active: number; inactive: number }>
  getStakeMinimumDelegation: (options?: GetCommitmentOptions) => Promise<SolanaTypeWithContext<number>>
  getSupply: (options?: GetSupplyOptions) => Promise<SolanaTypeWithContext<SolanaSupply>>
  getTokenAccountBalance: (
    pubkey: string,
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccountBalance>>
  getTokenAccountsByDelegate: (
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccount[]>>
  getTokenAccountsByOwner: (
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccount[]>>
  getTokenLargestAccounts: (
    pubkey: string,
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaAccount[]>>
  getTokenSupply: (
    pubkey: string,
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenSupply>>
  getTransaction: (signature: string, options?: GetTransactionOptions) => Promise<SolanaTransaction | null>
  getTransactionCount: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>
  getVersion: () => Promise<SolanaVersion>
  getVoteAccounts: (
    options?: GetVoteAccountOptions,
  ) => Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
  isBlockhashValid: (
    blockhash: string,
    options?: GetCommitmentMinContextSlotOptions,
  ) => Promise<SolanaTypeWithContext<boolean>>
  minimumLedgerSlot: () => Promise<number>
  requestAirdrop: (pubkey: string, amount: number, options?: GetCommitmentOptions) => Promise<string>
  sendTransaction: (transaction: string, options?: SendTransactionOptions) => Promise<string>
  simulateTransaction: (
    transaction: string,
    options?: SimulateTransactionOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTransactionSimulation>>
}
