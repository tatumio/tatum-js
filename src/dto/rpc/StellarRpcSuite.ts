/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Link {
  href: string
  templated?: boolean
}

export interface Links {
  _links: {
    self: Link
    next?: Link
    prev?: Link
  }
}

export interface Thresholds {
  low_threshold?: number
  med_threshold?: number
  high_threshold?: number
}

export interface Flags {
  auth_required?: boolean
  auth_revocable?: boolean
  auth_immutable?: boolean
  auth_clawback_enabled?: boolean
}

export interface BalanceLineNative {
  balance: string
  liquidity_pool_id?: string
  limit: string
  buying_liabilites: string
  selling_liabilites: string
  sponser?: string
  last_modified_ledger: number
  is_authorized: boolean
  is_authorized_to_maintain_liabilites: boolean
  is_clawback_enabled: boolean
  asset_type: 'native'
}

export interface BalanceLineAsset {
  balance: string
  limit: string
  buying_liabilites: string
  selling_liabilites: string
  sponser: string
  last_modified_ledger: number
  is_authorized: boolean
  is_authorized_to_maintain_liabilites: boolean
  is_clawback_enabled: boolean
  asset_type: 'native' | 'credit_alphanum4' | 'credit_alphanum12'
  asset_code: string
  asset_issuer: string
}

export interface BalanceLineLiquidityPool {
  liquidity_pool_id: string
  asset_type: 'liquidity_pool_shares'
  balance: string
  limit: string
  last_modified_ledger: number
  sponser?: string
  is_authorized: boolean
  is_authorized_to_maintain_liabilites: boolean
  is_clawback_enabled: boolean
}

export interface Signers {
  key: string
  weight: number
  type: 'ed25519_public_key' | 'sha256_hash' | 'preauth_tx'
  sponser?: string
}

export interface Account {
  _embedded: Embedded
}

export interface Embedded {
  records: Record[]
}

export interface Record {
  _links: {
    self: Link
    transactions: Link
    operations: Link
    payments: Link
    effects: Link
    offers: Link
    trades: Link
    data: Link
  }
  id: string
  account_id: string
  sequence: string
  sequence_ledger: string
  sequence_time: string
  subentry_count: number
  inflation_destination: string
  home_domain?: string
  last_modified_ledger: number
  last_modified_time: string
  thresholds: Thresholds
  flags: Flags
  balances: (BalanceLineNative | BalanceLineAsset | BalanceLineLiquidityPool)[]
  signers: Signers[]
  data: Record
  num_sponsoring: number
  num_sponsered: number
  sponser?: string
  paging_token: string
}

export interface TransactionPreconditionsTimebounds {
  min_time?: string
  max_time?: string
}

export interface TransactionPreconditionsLedgerbounds {
  min_ledger: string
  max_ledger: string
}

export interface TransactionPreconditions {
  timebounds?: TransactionPreconditionsTimebounds
  ledgerbounds?: TransactionPreconditionsLedgerbounds
  min_account_sequence?: string
  min_account_sequence_age?: string
  min_account_sequence_ledger_gap?: number
  extra_signers?: string[]
}

export interface FeeBumpTransaction {
  hash: string
  signatures: string[]
}

export interface InnerTransaction {
  hash: string
  signatures: string[]
  max_fee: string
}

export interface Transaction {
  _embedded: EmbeddedTransaction
}

export interface EmbeddedTransaction {
  records: RecordTransaction[]
}

export interface RecordTransaction {
  memo?: string
  _links: {
    self: Link
    account: Link
    ledger: Link
    operations: Link
    effects: Link
    precedes: Link
    succeeds: Link
    transaction: Link
  }
  id: string
  paging_token: string
  successful: boolean
  hash: string
  ledger: number
  created_at: string
  source_account: string
  account_muxed?: string
  account_muxed_id?: string
  source_account_sequence: string
  fee_account: string
  fee_account_muxed?: string
  fee_account_muxed_id?: string
  fee_charged: string
  max_fee: string
  operation_count: number
  envelope_xdr: string
  result_xdr: string
  result_meta_xdr: string
  fee_meta_xdr?: string
  memo_type: string
  signatures: string[]
  valid_after?: string
  valid_before?: string
  preconditions?: TransactionPreconditions
  fee_bump_transaction?: FeeBumpTransaction
  inner_transaction?: InnerTransaction
}

export interface CreateAccount {
  _links: {
    self: Link
    transaction: Link
    effects: Link
    succeeds: Link
    precedes: Link
  }
  id: string
  paging_token: string
  transaction_successful: boolean
  source_account: string
  type: string
  type_i: number
  created_at: string
  transaction_hash: string
  starting_balance: string
  funder: string
  account: string
}

export interface Payment {
  _embedded: EmbeddedPayment
}

export interface EmbeddedPayment {
  records: RecordPayment[]
}

export interface RecordPayment {
  _links: {
    self: Link
    transaction: Link
    effects: Link
    succeeds: Link
    precedes: Link
  }
  id: string
  paging_token: string
  transaction_successful: boolean
  source_account: string
  type: string
  type_i: string
  created_at: string
  transaction_hash: string
  asset_type: string
  asset_code: 'native' | 'credit_alphanum4' | 'credit_alphanum12'
  asset_issuer: string
  from: string
  to: string
  amount: string
}

export interface PathAsset {
  asset_type: 'native' | 'credit_alphanum4' | 'credit_alphanum12'
  asset_code?: string
  asset_issuer?: string
}

export interface PathPaymentStrictReceive {
  _links: {
    self: Link
    transaction: Link
    effects: Link
    succeeds: Link
    precedes: Link
  }
  id: string
  paging_token: string
  transaction_successful: boolean
  source_account: string
  type: string
  type_i: number
  created_at: string
  transaction_hash: string
  asset_type: 'native' | 'credit_alphanum4' | 'credit_alphanum12'
  asset_code?: string
  asset_issuer?: string
  from: string
  to: string
  amount: string
  path: PathAsset[]
  source_amount: string
  destination_min: string
  source_asset_type?: string
  source_asset_code?: string
  source_asset_issuer?: string
}

export interface PathPaymentStrictSend {
  _links: {
    self: Link
    transaction: Link
    effects: Link
    succeeds: Link
    precedes: Link
  }
  id: string
  paging_token: string
  transaction_successful: boolean
  source_account: string
  type: string
  type_i: number
  created_at: string
  transaction_hash: string
  asset_type?: 'native' | 'credit_alphanum4' | 'credit_alphanum12'
  asset_code?: string
  asset_issuer?: string
  from: string
  to: string
  amount: string
  path: PathAsset[]
  source_amount: string
  source_max?: string
  source_asset_type: string
  source_asset_code?: string
  source_asset_issuer?: string
}

export interface AccountMerge {
  _links: {
    self: Link
    transaction: Link
    effects: Link
    succeeds: Link
    precedes: Link
  }
  id: string
  paging_token: string
  transaction_successful: boolean
  source_account: string
  type: string
  type_i: number
  created_at: string
  transaction_hash: string
  account: string
  into: string
}

export interface Price {
  n: number
  d: number
}

export interface RecordOffer {
  _links: {
    self: Link
    offer_maker: Link
  }
  id: string
  paging_token: string
  seller: string
  selling: Path
  buying: Path
  amount: string
  price_r: Price
  price: string
  last_modified_ledger: number
  last_modified_time: string
  sponser?: string
}

export interface EmbeddedOffer {
  records: RecordOffer[]
}

export interface Offer {
  _embedded: EmbeddedOffer
}

export interface RecordTrade {
  _links: {
    self: Link
    base: Link
    counter: Link
    operation: Link
  }
  id: string
  paging_token: string
  ledger_close_time: string
  offer_id: string
  trade_type: string
  liquidity_pool_fee_bp: number
  base_liquidity_pool_id: string
  base_offer_id: string
  base_account: string
  base_amount: string
  base_asset_type: string
  base_asset_code?: string
  base_asset_issuer?: string
  counter_liquidity_pool_id: string
  counter_offer_id: string
  counter_account: string
  counter_amount: string
  counter_asset_type: string
  counter_asset_code?: string
  counter_asset_issuer: string
  base_is_seller: boolean
  price: Price
}

export interface EmbeddedTrade {
  records: RecordTrade[]
}

export interface Trade {
  _embedded: EmbeddedTrade
}

export interface RecordAsset {
  _links: {
    toml: Link
  }
  asset_type: string
  asset_issuer: string
  paging_token: string
  accounts: {
    authorized: number
    authorized_to_maintain_liabilities: number
    unauthorized: number
  }
  num_claimable_balances: number
  num_contracts: number
  num_liquidity_pools: number
  balances: {
    authorized: string
    authorized_to_maintain_liabilities: string
    unauthorized: string
  }
  claimable_balances_amount: string
  contracts_amount: string
  liquidity_pools_amount: string
  amount: string
  num_accounts: number
  flags: {
    auth_required: boolean
    auth_revocable: boolean
    auth_immutable: boolean
  }
}

export interface EmbeddedAsset {
  records: RecordAsset[]
}

export interface Asset {
  _embedded: EmbeddedAsset
}

export interface ClaimableBalance {
  _embedded: {
    records: RecordClaimableBalance[]
  }
}

export interface RecordClaimableBalance {
  _links: {
    self: Link
    operations: Link
    transactions: Link
  }
  id: string
  paging_token: string
  asset: string
  amount: string
  sponsor?: string
  last_modified_ledger: string
  last_modified_time: string
  claimants?: Claimant[]
  flags?: number
}

export interface Claimant {
  destination: string
  predicate: Predicate
}

export interface Predicate {
  and?: PredicateArray[]
}

export interface PredicateArray {
  or?: PredicateOrItem[]
  not?: {
    unconditional?: boolean
    relBefore?: string
    absBefore?: string
    absBeforeEpoch?: string
  }
}

export interface PredicateOrItem {
  relBefore?: string
  absBefore?: string
  absBeforeEpoch?: string
}

export interface PredicateDetails {
  relBefore?: string
  absBefore?: string
  absBeforeEpoch?: string
}

export interface Predicate {
  or?: PredicateDetails[]
  not?: {
    unconditional?: boolean
  } & PredicateDetails
}

export interface Effect {
  records: RecordEffect[]
}

export interface RecordEffect {
  _links: {
    operation: Link
    succeeds: Link
    precedes: Link
  }
  id: string
  paging_token: string
  account: string
  type:
    | 'Account Created'
    | 'Account Removed'
    | 'Account Credited'
    | 'Account Debited'
    | 'Account Thresholds Updated'
    | 'Account Home Domain Updated'
    | 'Account Flags Updated'
    | 'Account Inflation Destination Updated'
    | 'Signer Created'
    | 'Signer Removed'
    | 'Signer Updated'
    | 'Trustline Created'
    | 'Trustline Removed'
    | 'Trustline Updated'
    | 'Trustline Authorized'
    | 'Trustline Deauthorized'
    | 'Offer Created'
    | 'Offer Removed'
    | 'Offer Updated'
    | 'Trade'
    | 'Data Created'
    | 'Data Removed'
    | 'Data Updated'
    | 'Claimable Balance Created'
    | 'Claimable Balance Claimant Created'
    | 'Claimable Balance Claimed'
    | 'Account Sponsorship Created'
    | 'Account Sponsorship Updated'
    | 'Account Sponsorship Removed'
    | 'Trustline Sponsorship Created'
    | 'Trustline Sponsorship Updated'
    | 'Trustline Sponsorship Removed'
    | 'Account Data Sponsorship Created'
    | 'Account Data Sponsorship Updated'
    | 'Account Data Sponsorship Removed'
    | 'Claimable Balance Sponsorship Created'
    | 'Claimable Balance Sponsorship Updated'
    | 'Claimable Balance Sponsorship Removed'
    | 'Account Signer Sponsorship Created'
    | 'Account Signer Sponsorship Updated'
    | 'Account Signer Sponsorship Removed'
    | 'Liquidity Pool Created'
    | 'Liquidity Pool Removed'
    | 'Liquidity Pool Revoked'
    | 'Liquidity Pool Deposited'
    | 'Liquidity Pool Withdraw'
    | 'Liquidity Pool Trade'
    | 'Sequence Bumped'
  type_i: number
  created_at: string
}

export interface FeeDistribution {
  max?: string
  min?: string
  mode?: string
  p10?: string
  p20?: string
  p30?: string
  p40?: string
  p50?: string
  p60?: string
  p70?: string
  p80?: string
  p90?: string
  p95?: string
  p99?: string
}

export interface FeeStats {
  last_ledger: string
  last_ledger_base_fee: string
  ledger_capacity_usage: string
  fee_charged: FeeDistribution
  max_fee: FeeDistribution
}

export interface RecordLedger {
  _links: {
    self: Link
    transactions: Link
    operations: Link
    payments?: Link
    effects: Link
  }
  id: string
  paging_token: string
  hash: string
  pre_hash?: string
  sequence: number
  successful_transaction_count: number
  failed_transaction_count: number
  operation_count: number
  tx_set_operation_count: number
  closed_at: string
  total_coins: string
  fee_pool: string
  base_fee_in_stroops: number
  base_reserve_in_stroops: number
  max_tx_set_size: number
  protocol_version: number
  header_xdr: string
}

export interface Ledger {
  _embedded: {
    records: RecordLedger[]
  }
}

export interface Operation {
  _links: {
    effects: Link
    precedes: Link
    self: Link
    succeds: Link
    transaction: Link
  }
  id: string
  paging_token: string
  type_i: number
  type: string
}

export interface Reserves {
  asset: string
  amount: string
}

export interface RecordLiquidityPool {
  id: string
  paging_token: string
  fee_bp: number
  type: string
  total_trustlines: string
  total_shares: string
  reserves: Reserves
  last_modified_ledger: string
  last_modified_time: string
}

export interface EmbeddedLiquidityPools {
  records: RecordLiquidityPool[]
}

export interface LiquidityPools {
  _embedded: EmbeddedLiquidityPools
}

export interface Order {
  price_r: {
    n: number
    d: number
  }
  price: string
  amount: string
}

export interface SchemasAsset {
  asset_type: string
  asset_code?: string
  asset_issuer?: string
}

export interface RecordPath {
  source_asset_type: string
  source_asset_code: string
  source_asset_issuer: string
  source_amount: string
  destination_asset_type: string
  destination_asset_code: string
  destination_asset_issuer: string
  destination_amount: string
  path: SchemasAsset[]
}

export interface Path {
  _embedded: {
    records: RecordPath[]
  }
}

export interface RecordTradeAggregation {
  timestamp: string
  trade_count: string
  base_volume: string
  counter_volume: string
  avg: string
  high: string
  high_r: Price
  low: string
  low_r: Price
  open: string
  open_r: Price
  close: string
  close_r: Price
}

export interface EmbeddedTradeAggregation {
  records: RecordTradeAggregation[]
}

export interface TradeAggregation {
  _embedded: EmbeddedTradeAggregation
}

export interface SubmitTransaction {
  _embedded: {
    records: RecordSubmitTransaction[]
  }
}

export interface RecordSubmitTransaction {
  memo?: string
  memo_bytes?: string
  _links: {
    self: Link
    account: Link
    ledger: Link
    operations: Link
    effects: Link
    precedes: Link
    succeeds: Link
    transaction: Link
  }
  id: string
  paging_token: string
  successful: boolean
  hash: string
  ledger: number
  created_at: string
  source_account: string
  account_muxed?: string
  account_muxed_id?: string
  source_account_sequence: string
  fee_account: string
  fee_account_muxed?: string
  fee_account_muxed_id?: string
  fee_charged: string
  max_fee: string
  operation_count: number
  envelope_xdr: string
  result_xdr: string
  result_meta_xdr: string
  fee_meta_xdr?: string
  memo_type: string
  signatures: string[]
  valid_after?: string
  valid_before?: string
  preconditions?: TransactionPreconditions
  fee_bump_transaction?: FeeBumpTransaction
  inner_transaction?: InnerTransaction
}

export interface BaseParams {
  cursor?: string
  order?: 'asc' | 'desc'
  limit?: number
}

export interface GetOperationsByAccountIdParams extends BaseParams {
  accountId: string
  includeFailed?: boolean
  join?: string
}

export type OperationResponse =
  | CreateAccount
  | Payment
  | PathPaymentStrictReceive
  | PathPaymentStrictSend
  | AccountMerge

export interface GetOffersByAccountIdParams {
  accountId: string
  cursor?: string
  order?: 'asc' | 'desc'
  limit?: number
}

export interface OfferResponse {
  _links: Links
  offer: Offer
}

export interface GetAccountsParams {
  sponsor?: string
  asset?: string
  signer?: string
  liquidityPool?: string
  cursor?: string
  order?: string
  limit?: number
}

export interface GetAccountParams {
  accountId: string
}

export interface GetAccountTransactionsParams extends BaseParams {
  accountId: string
  includeFailed?: boolean
}

export interface GetAccountPaymentsParams extends BaseParams {
  accountId: string
  includeFailed?: boolean
  join?: string
}

export interface GetAccountEffectsParams extends BaseParams {
  accountId: string
}

export interface GetAccountTradesParams extends BaseParams {
  accountId: string
}

export interface GetAccountDataParams {
  accountId: string
  key: string
}

export interface GetAssetsParams extends BaseParams {
  assetCode?: string
  assetIssuer?: string
}

export interface GetClaimableBalancesParams extends BaseParams {
  sponsor?: string
  asset?: string
  claimant?: string
}

export interface GetClaimableBalanceParams {
  claimableBalanceId: string
}

export interface GetClaimableTransactionsParams extends BaseParams {
  claimableBalanceId: string
  includeFailed?: boolean
}

export interface GetClaimableOperationsParams extends BaseParams {
  claimableBalanceId: string
  includeFailed?: boolean
  join?: string[]
}

export interface GetEffectsParams {
  cursor?: string
  order?: 'asc' | 'desc'
  limit?: number
}

export interface GetLiquidityPoolsParams extends BaseParams {
  reserve?: string
  account?: string
}

export interface GetLiquidityPoolParams {
  liquidityPoolId: string
}

export interface GetLiquidityPoolEffectsParams extends BaseParams {
  liquidityPoolId: string
}

export interface GetLiquidityPoolTradesParams extends BaseParams {
  liquidityPoolId: string
}

export interface GetLiquidityPoolTransactionsParams extends BaseParams {
  liquidityPoolId: string
  includeFailed?: boolean
}

export interface GetLiquidityPoolOperationsParams extends BaseParams {
  liquidityPoolId: string
  includeFailed?: boolean
  join?: string
}

export interface GetLedgerParams {
  sequence: number
}

export interface GetLedgerTransactionsParams extends BaseParams {
  sequence: string
  includeFailed?: boolean
}

export interface GetLedgerPaymentsParams extends BaseParams {
  sequence: string
  includeFailed?: boolean
  join?: string
}

export interface GetLedgerOperationsParams extends BaseParams {
  sequence: string
  includeFailed?: boolean
  join?: string
}

export interface GetLedgerEffectsParams extends BaseParams {
  sequence: string
}

export interface GetOffersParams extends BaseParams {
  sponsor?: string
  seller?: string
  sellingAssetType?: string
  sellingAssetIssuer?: string
  sellingAssetCode?: string
  buyingAssetType?: string
  buyingAssetIssuer?: string
  buyingAssetCode?: string
}

export interface GetOfferParams {
  offerId: string
}

export interface GetOfferTradesParams extends BaseParams {
  offerId: string
}

export interface GetOrderBookParams {
  sellingAssetType: string
  sellingAssetIssuer?: string
  sellingAssetCode?: string
  buyingAssetType?: string
  buyingAssetIssuer?: string
  buyingAssetCode?: string
  limit?: number
}

export interface GetTradeAggregationsParams {
  startTime: string
  endTime: string
  resolution: number
  offset?: number
  baseAssetType: string
  baseAssetIssuer?: string
  baseAssetCode?: string
  counterAssetType: string
  counterAssetIssuer?: string
  counterAssetCode?: string
  order?: 'asc' | 'desc'
  limit?: number
}

export interface GetTradesParams extends BaseParams {
  offerId?: string
  baseAssetType?: string
  baseAssetIssuer?: string
  baseAssetCode?: string
  counterAssetType?: string
  counterAssetIssuer?: string
  counterAssetCode?: string
  tradeType?: string
}

export interface GetTransactionParams {
  transactionHash: string
}

export interface GetTransactionOperationsParams extends BaseParams {
  transactionHash: string
  includeFailed?: boolean
  join?: string
}

export interface GetTransactionEffectsParams {
  transactionHash: string
  cursor?: string
  order?: 'asc' | 'desc'
  limit?: number
}

export interface GetOperationsParams extends BaseParams {
  includeFailed?: boolean
  join?: string
}

export interface GetPaymentsParams extends BaseParams {
  includeFailed?: boolean
  join?: string
}

export interface GetStrictReceivePaymentPathsParams {
  sourceAccount?: string
  sourceAssets?: string[]
  destinationAssetType: string
  destinationAssetIssuer?: string
  destinationAssetCode?: string
  destinationAmount: string
}

export interface GetStrictSendPaymentPathsParams {
  sourceAccount?: string
  sourceAssets?: string[]
  sourceAssetType: string
  sourceAssetIssuer?: string
  sourceAssetCode?: string
  sourceAmount: string
  destinationAccount?: string
  destinationAssets?: string[]
}

export interface SubmitTransactionParams {
  tx: string
}

export interface GetOperationParams {
  id: number
  join?: string
}

export interface GetOperationEffectsParams extends BaseParams {
  id: string
}

export interface GetTransactionsParams extends BaseParams {
  includeFailed?: boolean
}

export interface StellarRpcSuite {
  getAccounts(params?: GetAccountsParams): Promise<Links & Account>
  getAccount(params: GetAccountParams): Promise<Links & Account>
  getAccountTransactions(params: GetAccountTransactionsParams): Promise<Transaction>
  getAccountOperations(params: GetOperationsByAccountIdParams): Promise<OperationResponse>
  getAccountPayments(params: GetAccountPaymentsParams): Promise<Links & Payment>
  getAccountEffects(params: GetAccountEffectsParams): Promise<Effect>
  getAccountOffers(params: GetOffersByAccountIdParams): Promise<OfferResponse>
  getAccountTrades(params: GetAccountTradesParams): Promise<Trade>
  getAccountData(params: GetAccountDataParams): Promise<{ value: string }>
  getAssets(params?: GetAssetsParams): Promise<Links & Asset>
  getClaimableBalances(params?: GetClaimableBalancesParams): Promise<ClaimableBalance>
  getClaimableBalance(params: GetClaimableBalanceParams): Promise<RecordClaimableBalance>
  getClaimableTransactions(params: GetClaimableTransactionsParams): Promise<Transaction>
  getClaimableOperations(params: GetClaimableOperationsParams): Promise<Links & OperationResponse>
  getEffects(params?: GetEffectsParams): Promise<Effect>
  getFeeStats(): Promise<FeeStats>
  getLiquidityPools(params?: GetLiquidityPoolsParams): Promise<LiquidityPools>
  getLiquidityPool(params: GetLiquidityPoolParams): Promise<RecordLiquidityPool>
  getLiquidityPoolEffects(params: GetLiquidityPoolEffectsParams): Promise<Effect>
  getLiquidityPoolTrades(params: GetLiquidityPoolTradesParams): Promise<Trade>
  getLiquidityPoolTransactions(params: GetLiquidityPoolTransactionsParams): Promise<Transaction>
  getLiquidityPoolOperations(params: GetLiquidityPoolOperationsParams): Promise<Operation>
  getLedger(params: GetLedgerParams): Promise<Ledger>
  getLedgerTransactions(params: GetLedgerTransactionsParams): Promise<Transaction>
  getLedgerPayments(params: GetLedgerPaymentsParams): Promise<Links & Payment>
  getLedgerOperations(params: GetLedgerOperationsParams): Promise<Operation>
  getLedgerEffects(params: GetLedgerEffectsParams): Promise<Array<Links & Effect>>
  getLedgers(params?: BaseParams): Promise<Ledger>
  getOffers(params?: GetOffersParams): Promise<Offer>
  getOffer(params: GetOfferParams): Promise<Ledger>
  getOfferTrades(params: GetOfferTradesParams): Promise<Trade>
  getOrderBook(params: GetOrderBookParams): Promise<Order>
  getTradeAggregations(params: GetTradeAggregationsParams): Promise<TradeAggregation>
  getTrades(params?: GetTradesParams): Promise<Links & Trade>
  getTransaction(params: GetTransactionParams): Promise<Transaction>
  getTransactionOperations(params: GetTransactionOperationsParams): Promise<Operation>
  getTransactionEffects(params: GetTransactionEffectsParams): Promise<Links & Effect>
  getTransactions(params?: GetTransactionsParams): Promise<Links & Transaction>
  getOperation(params: GetOperationParams): Promise<Operation>
  getOperationEffects(params: GetOperationEffectsParams): Promise<Links & Effect>
  getOperations(params?: GetOperationsParams): Promise<Operation>
  getPayments(params?: GetPaymentsParams): Promise<Links & OperationResponse>
  getStrictReceivePaymentPaths(params: GetStrictReceivePaymentPathsParams): Promise<Path>
  getStrictSendPaymentPaths(params: GetStrictSendPaymentPathsParams): Promise<Path>
  submitTransaction(params: SubmitTransactionParams): Promise<SubmitTransaction>
}
