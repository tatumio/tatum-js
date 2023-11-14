/* eslint-disable @typescript-eslint/no-explicit-any */

export interface NetworkIdentifier {
  blockchain: string
  network: string
  sub_network_identifier?: SubNetworkIdentifier
}

export interface SubNetworkIdentifier {
  network: string
  metadata?: {
    [key: string]: any
  }
}

export interface BlockIdentifier {
  index: number
  hash: string
}

export interface PartialBlockIdentifier {
  index?: number
  hash?: string
}

export interface TransactionIdentifier {
  hash: string
}

export interface OperationIdentifier {
  index: number
  network_index?: number
}

export interface AccountIdentifier {
  address: string
  sub_account?: SubAccountIdentifier
  metadata?: {
    chain_code?: string
  }
}

export interface SubAccountIdentifier {
  address: string
  metadata?: {
    [key: string]: any
  }
}

export interface Block {
  block_identifier: BlockIdentifier
  parent_block_identifier: BlockIdentifier
  timestamp: number
  transactions: Transaction[]
  metadata?: {
    transactionsCount?: number
    createdBy?: string
    size?: number
    epochNo?: number
    slotNo?: number
  }
}

export interface Transaction {
  transaction_identifier: TransactionIdentifier
  operations: Operation[]
  related_transactions?: RelatedTransaction[]
  metadata?: {
    size: number
    scriptSize: number
  }
}

export interface Operation {
  operation_identifier: OperationIdentifier
  related_operations?: OperationIdentifier[]
  type: string
  status?: string
  account?: AccountIdentifier
  amount?: Amount
  coin_change?: CoinChange
  metadata?: OperationMetadata
}

export interface OperationMetadata {
  withdrawalAmount?: Amount
  depositAmount?: Amount
  refundAmount?: Amount
  staking_credential?: PublicKey
  pool_key_hash?: string
  epoch?: number
  tokenBundle?: TokenBundleItem[]
  poolRegistrationCert?: string
  poolRegistrationParams?: PoolRegistrationParams
  voteRegistrationMetadata?: VoteRegistrationMetadata
}

export interface VoteRegistrationMetadata {
  stakeKey: PublicKey
  votingKey: PublicKey
  rewardAddress: string
  votingNonce: number
  votingSignature: string
}

export interface PoolRegistrationParams {
  vrfKeyHash: string
  rewardAddress: string
  pledge: string
  cost: string
  poolOwners: string[]
  relays: Relay[]
  margin: PoolMargin
  margin_percentage: string
  poolMetadata: PoolMetadata
}

export interface Relay {
  type: string
  ipv4: string
  ipv6: string
  dnsName: string
  port: string
}

export interface PoolMargin {
  numerator: string
  denominator: string
}

export interface PoolMetadata {
  url: string
  hash: string
}

export interface TokenBundleItem {
  policyId: string
  tokens: Amount[]
}

export interface Amount {
  value: string
  currency: Currency
  metadata?: any
}

export interface UnspentSetForGivenAccount {
  value: string
  index: number
  transactionHash: string
}

export interface Currency {
  symbol: string
  decimals: number
  metadata?: any
}

export interface SyncStatus {
  current_index: number
  target_index: number
  stage: string
  synced: boolean
}

export interface Peer {
  peer_id: string
  metadata: Record<string, unknown>
}

export interface Version {
  rosetta_version: string
  node_version: string
  middleware_version?: string
  metadata?: {
    [key: string]: any
  }
}

export interface Allow {
  operation_statuses: OperationStatus[]
  operation_types: string[]
  errors: Error[]
  historical_balance_lookup: boolean
  timestamp_start_index?: number
  call_methods: string[]
  balance_exemptions: BalanceExemption[]
  mempool_coins: boolean
}

export interface OperationStatus {
  status: string
  successful: boolean
}

export interface Block {
  description: string
  type: number
  format: string
  minimum: number
  example: number
}

export interface IAddress {
  description: string
  type: string
}

export interface PublicKey {
  hex_bytes: string
  curve_type: CurveType
}

export type CurveType = 'secp256k1' | 'secp256r1' | 'edwards25519' | 'tweedle'

export interface SigningPayload {
  address?: string
  account_identifier?: AccountIdentifier
  hex_bytes: string
  signature_type?: SignatureType
}

export interface Signature {
  signing_payload: SigningPayload
  public_key: PublicKey
  signature_type: SignatureType
  hex_bytes: string
}

export interface SignatureType {
  description: string
  type: string
  enum: string[]
}

export type CoinActions = 'coin_created' | 'coin_spent'

export interface CoinIdentifier {
  identifier: string
}

export interface CoinChange {
  coin_identifier: CoinIdentifier
  coin_action: CoinAction
}

export enum CoinAction {
  CoinCreated = 'coin_created',
  CoinSpent = 'coin_spent',
}

export interface Coin {
  coin_identifier: CoinIdentifier
  amount: Amount
  metadata?: { [key: string]: TokenBundleItem[] }
}

export interface BalanceExemption {
  sub_account_address: string
  currency: Currency
  exemption_type: ExemptionType
}

export interface ExemptionType {
  description: string
  type: string
  enum: 'greater_or_equal' | 'less_or_equal' | 'dynamic'
}

export interface BlockEvent {
  sequence: number
  block_identifier: BlockIdentifier
  type: BlockEventType
}

export interface BlockEventType {
  description: string
  type: string
  enum: 'block_added' | 'block_removed'
}

export interface Operator {
  description?: string
  type: string
  enum: 'or' | 'and'
}

export interface BlockTransaction {
  block_identifier: BlockIdentifier
  transaction: Transaction
}

export interface RelatedTransaction {
  network_identifier?: NetworkIdentifier
  transaction_identifier: TransactionIdentifier
  direction: Direction
}

export enum Direction {
  forward = 'forward',
  backward = 'backward',
}

export enum RelationDirection {
  Forward = 'forward',
  Backward = 'backward',
}

export interface AccountBalanceRequest {
  networkIdentifier: NetworkIdentifier
  accountIdentifier: AccountIdentifier
  blockIdentifier?: PartialBlockIdentifier
  currencies?: Currency[]
}

export interface AccountBalanceResponse {
  block_identifier: BlockIdentifier
  balances: Amount[]
  metadata?: {
    [key: string]: any
  }
}

export interface AccountCoinsRequest {
  networkIdentifier: NetworkIdentifier
  accountIdentifier: AccountIdentifier
  includeMempool?: boolean
  currencies?: Currency[]
}

export interface AccountCoinsResponse {
  block_identifier: BlockIdentifier
  coins: Coin[]
  metadata?: {
    [key: string]: any
  }
}

export interface BlockRequest {
  networkIdentifier: NetworkIdentifier
  blockIdentifier: PartialBlockIdentifier
}

export interface BlockResponse {
  block: Block
  other_transactions?: TransactionIdentifier[]
}

export interface BlockTransactionRequest {
  networkIdentifier: NetworkIdentifier
  blockIdentifier: BlockIdentifier
  transactionIdentifier: TransactionIdentifier
}

export interface BlockTransactionResponse {
  transaction: Transaction
}

export interface MempoolResponse {
  transaction_identifiers: TransactionIdentifier[]
}

export interface MempoolTransactionRequest {
  networkIdentifier: NetworkIdentifier
  transactionIdentifier: TransactionIdentifier
}

export interface MempoolTransactionResponse {
  transaction: Transaction
  metadata?: {
    descendant_fees?: number
    ancestor_count?: number
  }
}

export interface MetadataRequest {
  metadata?: object
}

export interface NetworkListResponse {
  network_identifiers: NetworkIdentifier[]
}

export interface NetworkRequest {
  networkIdentifier: NetworkIdentifier
  metadata?: object
}

export interface NetworkStatusResponse {
  current_block_identifier: BlockIdentifier
  current_block_timestamp: number
  genesis_block_identifier: BlockIdentifier
  oldest_block_identifier?: BlockIdentifier
  sync_status?: SyncStatus
  peers: Peer[]
}

export interface NetworkOptionsResponse {
  version: Version
  allow: Allow
}

export interface ConstructionMetadataRequest {
  networkIdentifier: NetworkIdentifier
  options: {
    relativeTtl: number
    transactionSize: number
  }
  publicKeys?: PublicKey[]
}

export interface ConstructionMetadataResponse {
  metadata: {
    ttl: string
    protocol_parameters: ProtocolParameters
  }
  suggested_fee?: Amount[]
}

export interface ConstructionDeriveRequest {
  networkIdentifier: NetworkIdentifier
  publicKey: PublicKey
  metadata?: {
    stakingCredential?: PublicKey
    addressType?: string
  }
}

export interface ConstructionDeriveResponse {
  address?: string
  account_identifier: AccountIdentifier
  metadata?: Record<string, unknown>
}

export interface ConstructionPreprocessRequest {
  networkIdentifier: NetworkIdentifier
  operations: Operation[]
  metadata?: {
    relativeTtl?: number
    depositParameters?: DepositParameters
  }
  maxFee?: Amount[]
  suggestedFeeMultiplier?: number
}

export interface ConstructionPreprocessResponse {
  options?: {
    relative_ttl: number
    transaction_size: number
  }
  required_public_keys?: AccountIdentifier[]
}

export interface ConstructionPayloadsRequest {
  networkIdentifier: NetworkIdentifier
  operations: Operation[]
  metadata: {
    ttl: string
    protocolParameters: ProtocolParameters
  }
  publicKeys?: PublicKey[]
}

export interface ConstructionTransactionResponse {
  unsigned_transaction: string
  payloads: SigningPayload[]
}

export interface ConstructionCombineRequest {
  networkIdentifier: NetworkIdentifier
  unsignedTransaction: string
  signatures: Signature[]
}

export interface ConstructionCombineResponse {
  signed_transaction: string
}

export interface ConstructionParseRequest {
  networkIdentifier: NetworkIdentifier
  signed: boolean
  transaction: string
}

export interface ConstructionParseResponse {
  operations: Operation[]
  account_identifier_signers: AccountIdentifier[]
  signers?: string[]
  metadata?: {
    [key: string]: any
  }
}

export interface ConstructionHashRequest {
  networkIdentifier: NetworkIdentifier
  signedTransaction: string
}

export interface TransactionSubmissionRequest {
  networkIdentifier: NetworkIdentifier
  signedTransaction: string
}

export interface TransactionIdentifierResponse {
  transaction_identifier: TransactionIdentifier
  metadata: object
}

export interface CallRequest {
  networkIdentifier: NetworkIdentifier
  method: string
  parameters: {
    [key: string]: any
  }
}

export interface CallResponse {
  result: {
    [key: string]: any
  }
  idempotent: boolean
}

export interface EventsBlocksRequest {
  networkIdentifier: NetworkIdentifier
  offset?: number
  limit?: number
}

export interface EventsBlocksResponse {
  max_sequence: number
  events: BlockEvent[]
}

export interface SearchTransactionsRequest {
  networkIdentifier: NetworkIdentifier
  operator?: Operator
  maxBlock?: number
  offset?: number
  limit?: number
  transactionIdentifier?: TransactionIdentifier
  accountIdentifier?: AccountIdentifier
  coinIdentifier?: CoinIdentifier
  currency?: Currency
  status?: string
  type?: string
  address?: string
  success?: boolean
}

export interface SearchTransactionsResponse {
  transactions: BlockTransaction[]
  total_count: number
  next_offset?: number
}

export interface ProtocolParameters {
  coinsPerUtxoSize: string
  maxTxSize: number
  maxValSize: number
  keyDeposit: string // key registration cost in Lovelace
  maxCollateralInputs: number
  minFeeCoefficient: number
  minFeeConstant: number
  minPoolCost: string
  poolDeposit: string // pool registration cost in Lovelace
  protocol: number
}

export interface DepositParameters {
  keyDeposit: string
  poolDeposit: string
}

export interface Details {
  message: string
}

export interface Error {
  code: number
  message: string
  description?: string
  retriable: boolean
  details?: Details
}

export interface CardanoRpcSuite {
  getNetworkList(params?: MetadataRequest): Promise<NetworkListResponse>

  getNetworkStatus(params: NetworkRequest): Promise<NetworkStatusResponse>

  getNetworkOptions(params: NetworkRequest): Promise<NetworkOptionsResponse>

  getBlock(params: BlockRequest): Promise<BlockResponse>

  getBlockTransaction(params: BlockTransactionRequest): Promise<BlockTransactionResponse>

  getMempool(params: NetworkRequest): Promise<MempoolResponse>

  getMempoolTransaction(params: MempoolTransactionRequest): Promise<MempoolTransactionResponse>

  getAccountBalance(requestBody: AccountBalanceRequest): Promise<AccountBalanceResponse>

  getAccountCoins(params: AccountCoinsRequest): Promise<AccountCoinsResponse>

  deriveAccount(params: ConstructionDeriveRequest): Promise<ConstructionDeriveResponse>

  constructionPreprocess(params: ConstructionPreprocessRequest): Promise<ConstructionPreprocessResponse>

  getTransactionConstructionMetadata(
    params: ConstructionMetadataRequest,
  ): Promise<ConstructionMetadataResponse>

  generateUnsignedTransactionAndSigningPayloads(
    params: ConstructionPayloadsRequest,
  ): Promise<ConstructionTransactionResponse>

  createNetworkTransaction(params: ConstructionCombineRequest): Promise<ConstructionCombineResponse>

  parseTransaction(params: ConstructionParseRequest): Promise<ConstructionParseResponse>

  getHashOfTransaction(params: ConstructionHashRequest): Promise<TransactionIdentifierResponse>

  submitTransaction(params: TransactionSubmissionRequest): Promise<TransactionIdentifierResponse>

  call(params: CallRequest): Promise<CallResponse>

  getEventsBlocks(params: EventsBlocksRequest): Promise<EventsBlocksResponse>

  searchTransactions(params: SearchTransactionsRequest): Promise<SearchTransactionsResponse>
}
