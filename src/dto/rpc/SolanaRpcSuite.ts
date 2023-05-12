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
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  encoding?: Encoding // The encoding for the account data.
}

export type GetBlockOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  encoding?: Encoding // The encoding format for block data.
  transactionDetails?: TransactionDetails // The level of detail to fetch for transactions.
  maxSupportedTransactionVersion?: number // The maximum transaction version supported.
  rewards?: boolean // Whether to fetch the rewards.
}

export type GetBlockProductionOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  identity?: string // The public key of the validator to fetch data for.
  range?: {
    firstSlot: number // The first slot in the range to fetch data for.
    lastSlot: number // The last slot in the range to fetch data for.
  }
}

export type GetMultipleAccountsOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  minContextSlot?: number // The minimum slot to include in the response.
  dataSlice?: { offset: number; length: number } // The range of data to include in the response.
  encoding?: Encoding // The encoding for the account data.
}

export type GetProgramAccountsOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  minContextSlot?: number // The minimum slot to include in the response.
  withContext?: boolean // Whether to include context in the response.
  encoding?: Encoding // The encoding for the account data.
  dataSlice?: { offset: number; length: number } // The range of data to include in the response.
  filters?: Array<{ memcmp: { offset: number; bytes: string } | { dataSize: number } }> // Filters to apply to the accounts data.
}

export type GetSignaturesForAddressOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  minContextSlot?: number // The minimum slot to include in the response.
  limit?: number // The maximum number of signatures to return.
  before?: string // Return signatures before the specified signature.
  until?: string // Return signatures until the specified signature.
}

export type GetSignatureStatusesOptions = {
  searchTransactionHistory?: boolean // Whether to search the transaction history.
}

export type GetTokenAccountsOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  minContextSlot?: number // The minimum slot to include in the response.
  dataSlice?: { offset: number; length: number } // The range of data to include in the response.
  encoding?: Encoding // The encoding for the account data.
}

export type SimulateTransactionOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  sigVerify?: boolean // Whether to verify the signatures in the transaction.
  replaceRecentBlockhash?: boolean // Whether to replace the recent blockhash in the transaction.
  minContextSlot?: number // The minimum slot to include in the response.
  encoding?: Encoding // The encoding for the account data.
  accounts: {
    addresses: Array<string> // The addresses of the accounts involved in the transaction.
    encoding?: Encoding // The encoding for the account data.
  }
}

export type GetCommitmentOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
}

export type GetCommitmentMinContextSlotOptions = {
  commitment?: Commitment // Specifies the confirmation level of data to be fetched.
  minContextSlot?: number // The minimum slot to include in the response.
}

export type GetInflationRewardOptions = {
  commitment?: Commitment // Specifies the level of commitment to apply when fetching data.
  epoch?: number // Specifies the epoch for which to fetch the inflation reward.
  minContextSlot?: number // Specifies the minimum slot to include in the response.
}

export type GetLargestAccountsOptions = {
  commitment?: Commitment // Specifies the level of commitment to apply when fetching data.
  filter?: 'circulating' | 'nonCirculating' // Specifies the type of accounts to fetch: either 'circulating' or 'nonCirculating'.
}

export type GetLeaderScheduleOptions = {
  commitment?: Commitment // Specifies the level of commitment to apply when fetching data.
  identity?: string // Specifies the identity of the leader for which to fetch the schedule.
}

export type GetStakeActivationOptions = {
  commitment?: Commitment // Specifies the level of commitment to apply when fetching data.
  minContextSlot?: number // Specifies the minimum slot to include in the response.
  epoch?: number // Specifies the epoch for which to fetch the stake activation.
}

export type GetSupplyOptions = {
  commitment?: Commitment // Specifies the level of commitment to apply when fetching data.
  excludeNonCirculatingAccountsList?: boolean // If true, non-circulating accounts are excluded from the response.
}

export type GetVoteAccountOptions = {
  commitment?: Commitment // Specifies the level of commitment to apply when fetching data.
  votePubkey?: string // Specifies the public key of the vote account to fetch.
  keepUnstakedDelinquents?: boolean // If true, unstaked delinquents are kept in the response.
  delinquentSlotDistance?: number // Specifies the number of slots to consider as delinquent for unstaked accounts.
}

export type GetTransactionOptions = {
  commitment?: Commitment // Specifies the level of commitment to apply when fetching data.
  maxSupportedTransactionVersion?: number // Specifies the maximum supported transaction version to fetch.
  encoding: Encoding // Specifies the encoding to use when fetching the transaction.
}

export type SendTransactionOptions = {
  encoding?: Encoding // Specifies the encoding to use when sending the transaction.
  skipPreflight?: boolean // If true, skips the preflight check when sending the transaction.
  preflightCommitment?: Commitment // Specifies the level of commitment to apply for the preflight check.
  maxRetries?: number // Specifies the maximum number of retries for sending the transaction.
  minContextSlot?: number // Specifies the minimum slot to include in the response.
}

export interface SolanaRpcSuite extends AbstractJsonRpcSuite {
  getAccountInfo: (
    pubkey: string, // Pubkey of account to query, as base-58 encoded string
    options?: GetAccountInfoOptions,
  ) => Promise<SolanaTypeWithContext<SolanaAccountInfo | null>>
  getBalance: (publicKey: string) => Promise<SolanaTypeWithContext<number>>
  getBlockHeight: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>
  getBlock: (
    block: number, // Slot number
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
  getBlockCommitment: (
    block: number, // Block number, identified by Slot
  ) => Promise<{ commitment: Array<number>; totalStake: number }>
  getBlocks: (
    endSlot: number, // Block number, identified by Slot
    startSlot?: number, // Block number, identified by Slot
    options?: GetCommitmentOptions,
  ) => Promise<Array<number>>
  getBlockTime: (
    block: number, // Block number, identified by Slot
  ) => Promise<number | null>
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
  getFeeForMessage: (
    message: any, // Base-64 encoded Message
    options?: GetCommitmentMinContextSlotOptions,
  ) => Promise<number | null>
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
    addresses?: string[], // An array of addresses to query, as base-58 encoded strings
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
    slot?: number, // Fetch the leader schedule for the epoch that corresponds to the provided slot. If unspecified, the leader schedule for the current epoch is fetched
    options?: GetLeaderScheduleOptions,
  ) => Promise<SolanaLeaderSchedule | null>
  getMaxRetransmitSlot: () => Promise<number>
  getMaxShredInsertSlot: () => Promise<number>
  getMinimumBalanceForRentExemption: (
    dataSize?: number, // The Account's data length
    options?: GetCommitmentOptions,
  ) => Promise<number>
  getMultipleAccounts: (
    pubKeys: string[], // An array of Pubkeys to query, as base-58 encoded strings (up to a maximum of 100)
    options?: GetMultipleAccountsOptions,
  ) => Promise<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>
  getProgramAccounts: (
    programId: string, // Pubkey of program, as base-58 encoded string
    options?: GetProgramAccountsOptions,
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: string }>>
  getRecentPerformanceSamples: (
    limit?: number, // number of samples to return (maximum 720)
  ) => Promise<
    Array<{
      slot: number
      numTransactions: number
      numSlots: number
      samplePeriodSecs: number
      numNonVoteTransaction: number
    }>
  >
  getRecentPrioritizationFees: (
    addresses?: string[], // An array of Account addresses (up to a maximum of 128 addresses), as base-58 encoded strings
  ) => Promise<Array<{ slot: number; prioritizationFee: number }>>
  getSignaturesForAddress: (
    address: string, // Account address as base-58 encoded string
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
    signatures?: string[], // An array of transaction signatures to confirm, as base-58 encoded strings (up to a maximum of 256)
    options?: GetSignatureStatusesOptions,
  ) => Promise<SolanaTypeWithContext<SolanaSignatureStatus>>
  getSlot: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>
  getSlotLeader: (options?: GetCommitmentMinContextSlotOptions) => Promise<string>
  getSlotLeaders: (
    startSlot?: number,
    limit?: number, // Limit (between 1 and 5,000)
  ) => Promise<Array<string>>
  getStakeActivation: (
    pubkey: string, // Pubkey of stake Account to query, as base-58 encoded string
    options?: GetStakeActivationOptions,
  ) => Promise<{ state: string; active: number; inactive: number }>
  getStakeMinimumDelegation: (options?: GetCommitmentOptions) => Promise<SolanaTypeWithContext<number>>
  getSupply: (options?: GetSupplyOptions) => Promise<SolanaTypeWithContext<SolanaSupply>>
  getTokenAccountBalance: (
    pubkey: string, // Pubkey of Token account to query, as base-58 encoded string
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccountBalance>>
  getTokenAccountsByDelegate: (
    pubkey: string, // Pubkey of account delegate to query, as base-58 encoded string
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccount[]>>
  getTokenAccountsByOwner: (
    pubkey: string, // Pubkey of account delegate to query, as base-58 encoded string
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccount[]>>
  getTokenLargestAccounts: (
    pubkey: string, // Pubkey of the token Mint to query, as base-58 encoded string
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaAccount[]>>
  getTokenSupply: (
    pubkey: string, // Pubkey of the token Mint to query, as base-58 encoded string
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenSupply>>
  getTransaction: (
    signature: string, // Transaction signature, as base-58 encoded string
    options?: GetTransactionOptions,
  ) => Promise<SolanaTransaction | null>
  getTransactionCount: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>
  getVersion: () => Promise<SolanaVersion>
  getVoteAccounts: (
    options?: GetVoteAccountOptions,
  ) => Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>
  isBlockhashValid: (
    blockhash: string, // The blockhash of the block to evauluate, as base-58 encoded string
    options?: GetCommitmentMinContextSlotOptions,
  ) => Promise<SolanaTypeWithContext<boolean>>
  minimumLedgerSlot: () => Promise<number>
  requestAirdrop: (
    pubkey: string, // Pubkey of account to receive lamports, as a base-58 encoded string
    amount: number, // Lamports to airdrop
    options?: GetCommitmentOptions,
  ) => Promise<string>
  sendTransaction: (
    transaction: string, // Fully-signed Transaction, as encoded string.
    options?: SendTransactionOptions,
  ) => Promise<string>
  simulateTransaction: (
    transaction: string, // Transaction, as an encoded string.
    options?: SimulateTransactionOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTransactionSimulation>>
}
