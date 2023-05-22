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
  filters?: Array<
    | {
        memcmp: {
          offset: number
          bytes: string
        }
      }
    | { dataSize: number }
  > // Filters to apply to the accounts data.
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
  /**
   * Get info about the account on the Solana blockchain.
   * @param pubkey - Pubkey of account to query, as base-58 encoded string
   * @param options - Options for the query
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/getaccountinfo
   */
  getAccountInfo: (
    pubkey: string,
    options?: GetAccountInfoOptions,
  ) => Promise<SolanaTypeWithContext<SolanaAccountInfo | null>>

  /**
   * Get balance of the account on the Solana blockchain.
   * @param publicKey - Pubkey of account to query, as base-58 encoded string
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/getbalance
   */
  getBalance: (publicKey: string) => Promise<SolanaTypeWithContext<number>>

  /**
   * Get the latest block height.
   * @param options - Options for the query
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getblockheight
   */
  getBlockHeight: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>

  /**
   * Get information about a specific block.
   * @param block - Block number, identified by Slot
   * @param options - Options for the query
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getblock
   */
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

  /**
   * Get block production information.
   * @param options - Options for the query
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getblockproduction
   */
  getBlockProduction: (
    options?: GetBlockProductionOptions,
  ) => Promise<SolanaTypeWithContext<SolanaBlockProduction>>

  /**
   * Get block commitment information.
   * @param block - Block number, identified by Slot
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getblockcommitment
   */
  getBlockCommitment: (block: number) => Promise<{ commitment: Array<number>; totalStake: number }>

  /**
   * Get blocks information.
   * @param endSlot - Block number, identified by Slot
   * @param startSlot - Block number, identified by Slot
   * @param options - Options for the query
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getblocks
   */
  getBlocks: (endSlot: number, startSlot?: number, options?: GetCommitmentOptions) => Promise<Array<number>>

  /**
   * Get block time information.
   * @param block - Block number, identified by Slot
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getblocktime
   */
  getBlockTime: (block: number) => Promise<number | null>

  /**
   * Get cluster nodes information.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getclusternodes
   */
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

  /**
   * Get information about epoch.
   * @param options - Options for the query
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getepochinfo
   */
  getEpochInfo: (options?: GetCommitmentMinContextSlotOptions) => Promise<SolanaEpochInfo>

  /**
   * Get epoch schedule.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getepochschedule
   */
  getEpochSchedule: () => Promise<SolanaEpochSchedule>

  /**
   * Retrieve the minimum fee required to include a message in a block.
   * @param message - The base-64 encoded message to query.
   * @param options - Options for the query.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/getfeeformessage
   */
  getFeeForMessage: (message: any, options?: GetCommitmentMinContextSlotOptions) => Promise<number | null>

  /**
   * Get the first available block on the Solana blockchain.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getfirstavailableblock
   */
  getFirstAvailableBlock: () => Promise<number>

  /**
   * Get the Genesis Hash of the Solana blockchain.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getgenesishash
   */
  getGenesisHash: () => Promise<string>

  /**
   * Get the health status of the Solana cluster.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/gethealth
   */
  getHealth: () => Promise<string>

  /**
   * Get the highest available snapshot slot on the Solana cluster.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/gethighestsnapshotslot
   */
  getHighestSnapshotSlot: () => Promise<{ full: number; incremental: number }>

  /**
   * Get the identity pubkey of the node.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getidentity
   */
  getIdentity: () => Promise<{ identity: string }>

  /**
   * Get the current inflation governor's rates.
   * @param options - Options for the query.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-token-and-stake-information/getinflationgovernor
   */
  getInflationGovernor: (options?: GetCommitmentOptions) => Promise<{
    initial: number
    terminal: number
    taper: number
    foundation: number
    foundationTerm: number
  }>

  /**
   * Get the current inflation rate on the Solana blockchain.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-token-and-stake-information/getinflationrate
   */
  getInflationRate: () => Promise<{ total: number; validator: number; foundation: number; epoch: number }>

  /**
   * Get the inflation reward for specified addresses.
   * @param addresses - An array of addresses to query, as base-58 encoded strings.
   * @param options - Options for the query.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-token-and-stake-information/getinflationreward
   */
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

  /**
   * Get the largest accounts on the Solana blockchain.
   * @param options Options for the query.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/getlargestaccounts
   */
  getLargestAccounts: (
    options?: GetLargestAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaLargestAccount[]>>

  /**
   * Fetches the latest block hash from the Solana blockchain.
   * @param options - Options for the query.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getlatestblockhash
   */
  getLatestBlockhash: (
    options?: GetCommitmentMinContextSlotOptions,
  ) => Promise<SolanaTypeWithContext<SolanaLatestBlockhash>>

  /**
   * Fetches the leader schedule for the Solana blockchain.
   * @param slot - The slot number corresponding to the epoch for which to fetch the leader schedule. If unspecified, the schedule for the current epoch is fetched.
   * @param options - The options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getleaderschedule
   */
  getLeaderSchedule: (
    slot?: number,
    options?: GetLeaderScheduleOptions,
  ) => Promise<SolanaLeaderSchedule | null>

  /**
   * Retrieves the max slot number seen from retransmit stage.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getmaxretransmitslot
   */
  getMaxRetransmitSlot: () => Promise<number>

  /**
   * Retrieves the max slot number seen from after shred insert.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getmaxshredinsertslot
   */
  getMaxShredInsertSlot: () => Promise<number>

  /**
   * Gets the minimum balance required for rent exemption for an account.
   * @param dataSize - The account's data length.
   * @param options - The options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getminimumbalanceforrentexemption
   */
  getMinimumBalanceForRentExemption: (dataSize?: number, options?: GetCommitmentOptions) => Promise<number>

  /**
   * Fetches multiple accounts on the Solana blockchain.
   * @param pubKeys - An array of pubkeys to query, as base-58 encoded strings. (up to a maximum of 100)
   * @param options - The options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/getmultipleaccounts
   */
  getMultipleAccounts: (
    pubKeys: string[],
    options?: GetMultipleAccountsOptions,
  ) => Promise<SolanaTypeWithContext<Array<SolanaAccountInfo | null>>>

  /**
   * Fetches program accounts from the Solana blockchain.
   * @param programId - The Pubkey of the program, as a base-58 encoded string.
   * @param options - The options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/getprogramaccounts
   */
  getProgramAccounts: (
    programId: string,
    options?: GetProgramAccountsOptions,
  ) => Promise<Array<{ account: SolanaAccountInfo; pubkey: string }>>

  /**
   * Gets recent performance samples.
   * @param limit - Number of samples to return (maximum 720).
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getrecentperformancesamples
   */
  getRecentPerformanceSamples: (limit?: number) => Promise<
    Array<{
      slot: number
      numTransactions: number
      numSlots: number
      samplePeriodSecs: number
      numNonVoteTransaction: number
    }>
  >

  /**
   * Gets recent prioritization fees.
   * @param addresses - An array of account addresses (up to a maximum of 128 addresses), as base-58 encoded strings.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getrecentprioritizationfees
   */
  getRecentPrioritizationFees: (
    addresses?: string[],
  ) => Promise<Array<{ slot: number; prioritizationFee: number }>>

  /**
   * Fetches the transaction signatures for a specific account address.
   * @param address - Account address as a base-58 encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/getsignaturesforaddress
   */
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

  /**
   * Fetches the status of a list of transaction signatures.
   * @param signatures - An array of transaction signatures to confirm, as base-58 encoded strings (up to a maximum of 256).
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/getsignaturestatuses
   */
  getSignatureStatuses: (
    signatures?: string[],
    options?: GetSignatureStatusesOptions,
  ) => Promise<SolanaTypeWithContext<SolanaSignatureStatus>>

  /**
   * Fetches the current slot number of the cluster.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getslot
   */
  getSlot: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>

  /**
   * Fetches the current leader of the slot.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getslotleader
   */
  getSlotLeader: (options?: GetCommitmentMinContextSlotOptions) => Promise<string>

  /**
   * Fetches the current leaders of the slot within a certain limit.
   * @param startSlot - Optional parameter for starting slot.
   * @param limit - Limit (between 1 and 5,000)
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/getslotleaders
   */
  getSlotLeaders: (startSlot?: number, limit?: number) => Promise<Array<string>>

  /**
   * Fetches the stake activation details for the specified account.
   * @param pubkey - Pubkey of stake Account to query, as base-58 encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-token-and-stake-information/getstakeactivation
   */
  getStakeActivation: (
    pubkey: string,
    options?: GetStakeActivationOptions,
  ) => Promise<{ state: string; active: number; inactive: number }>

  /**
   * Fetches the minimum stake delegation.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-token-and-stake-information/getstakeminimumdelegation
   */
  getStakeMinimumDelegation: (options?: GetCommitmentOptions) => Promise<SolanaTypeWithContext<number>>

  /**
   * Fetches the current supply of the Solana network.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getsupply
   */
  getSupply: (options?: GetSupplyOptions) => Promise<SolanaTypeWithContext<SolanaSupply>>

  /**
   * Fetches the balance of the specified token account.
   * @param pubkey - Pubkey of Token account to query, as base-58 encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/gettokenaccountbalance
   */
  getTokenAccountBalance: (
    pubkey: string,
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccountBalance>>

  /**
   * Fetches token accounts by delegate.
   * @param pubkey - Pubkey of account delegate to query, as base-58 encoded string.
   * @param config - Configuration options for this request.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/gettokenaccountsbydelegate
   */
  getTokenAccountsByDelegate: (
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccount[]>>

  /**
   * Fetches token accounts by owner.
   * @param pubkey - Pubkey of account owner to query, as base-58 encoded string.
   * @param config - Configuration options for this request.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/gettokenaccountsbyowner
   */
  getTokenAccountsByOwner: (
    pubkey: string,
    config?: SolanaMint | SolanaProgramId,
    options?: GetTokenAccountsOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenAccount[]>>

  /**
   * Fetches largest token accounts for a mint.
   * @param pubkey - Pubkey of the token Mint to query, as base-58 encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-token-and-stake-information/gettokenlargestaccounts
   */
  getTokenLargestAccounts: (
    pubkey: string,
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaAccount[]>>

  /**
   * Fetches token supply details for a mint.
   * @param pubkey - Pubkey of the token Mint to query, as base-58 encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-token-and-stake-information/gettokensupply
   */
  getTokenSupply: (
    pubkey: string,
    options?: GetCommitmentOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTokenSupply>>

  /**
   * Fetches a specific transaction by signature.
   * @param signature - Transaction signature, as base-58 encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/gettransaction
   */
  getTransaction: (signature: string, options?: GetTransactionOptions) => Promise<SolanaTransaction | null>

  /**
   * Fetches the current transaction count.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/gettransactioncount
   */
  getTransactionCount: (options?: GetCommitmentMinContextSlotOptions) => Promise<number>

  /**
   * Fetches the current version of the Solana core software.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/getversion
   */
  getVersion: () => Promise<SolanaVersion>

  /**
   * Fetches vote accounts information.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-querying-account-information/getvoteaccounts
   */
  getVoteAccounts: (
    options?: GetVoteAccountOptions,
  ) => Promise<{ current: Array<SolanaVoteAccount>; delinquent: Array<SolanaVoteAccount> }>

  /**
   * Checks if a blockhash is valid.
   * @param blockhash - The blockhash of the block to evaluate, as base-58 encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/isblockhashvalid
   */
  isBlockhashValid: (
    blockhash: string,
    options?: GetCommitmentMinContextSlotOptions,
  ) => Promise<SolanaTypeWithContext<boolean>>

  /**
   * Fetches the lowest slot that the node has information about in its ledger.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-ledger-and-block-information/minimumledgerslot
   */
  minimumLedgerSlot: () => Promise<number>

  /**
   * Requests an airdrop of lamports to a given pubkey.
   * @param pubkey - Pubkey of account to receive lamports, as a base-58 encoded string.
   * @param amount - Lamports to airdrop.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/miscellaneous-api-calls/requestairdrop
   */
  requestAirdrop: (pubkey: string, amount: number, options?: GetCommitmentOptions) => Promise<string>

  /**
   * Sends a transaction to the Solana blockchain.
   * @param transaction - Fully-signed Transaction, as encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/sendtransaction
   */
  sendTransaction: (transaction: string, options?: SendTransactionOptions) => Promise<string>

  /**
   * Simulates a transaction on the Solana blockchain.
   * @param transaction - Transaction, as an encoded string.
   * @param options - Options for this request.
   * https://docs.tatum.com/docs/rpc-api-reference/solana-rpc-documentation/api-calls-for-transaction-management/simulatetransaction
   */
  simulateTransaction: (
    transaction: string,
    options?: SimulateTransactionOptions,
  ) => Promise<SolanaTypeWithContext<SolanaTransactionSimulation>>
}
