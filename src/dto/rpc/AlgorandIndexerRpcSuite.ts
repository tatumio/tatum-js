import { Block } from '../../api/api.dto'
import {
  Account,
  AccountStateDelta,
  Application,
  ApplicationLocalState,
  Asset,
  AssetHolding,
  AssetParams,
  Box,
  BoxDescriptor,
  ErrorResponse,
} from './AlgorandAlgodRpcSuite'

export interface HealthCheck {
  data?: {
    'db-available': boolean
    'is-migrating': boolean
    message: string
    round: number
    version: string
  }
  errors?: string[]
}

export interface AccountRequest {
  applicationId?: number
  assetId?: number
  authAddr?: string
  currencyGreaterThan?: number
  currencyLessThan?: number
  exclude?: ('all' | 'assets' | 'created-assets' | 'apps-local-state' | 'created-apps' | 'none')[]
  includeAll?: boolean
  limit?: number
  next?: string
  round?: number
}

export interface AccountsResponse {
  accounts: Account[]
  'current-round': number
  'next-token'?: string
}

export interface AccountResponse {
  account: Account
  'current-round': number
}

export interface AccountInformationRequest {
  accountId: string
  exclude?: ('all' | 'assets' | 'created-assets' | 'apps-local-state' | 'created-apps' | 'none')[]
  includeAll?: boolean
  round?: number
}

export interface AppsLocalStateRequest {
  accountId: string
  applicationId?: number
  includeAll?: boolean
  limit?: number
  next?: string
}

export interface AppsLocalStateResponse {
  'apps-local-states': ApplicationLocalState[]
  'current-round': number
  'next-token'?: string
}

export interface AssetsRequest {
  accountId: string
  assetId?: number
  includeAll?: boolean
  limit?: number
  next?: string
}

export interface AssetsResponse {
  assets: AssetHolding[]
  'current-round': number
  'next-token'?: string
}

export interface CreatedApplicationsRequest {
  accountId: string
  applicationId?: number
  includeAll?: boolean
  limit?: number
  next?: string
}

export interface CreatedApplicationsResponse {
  applications: Application[]
  'current-round': number
  'next-token'?: string
}

export interface CreatedAssetsRequest {
  accountId: string
  assetId?: number
  includeAll?: boolean
  limit?: number
  next?: string
}

export interface CreatedAssetsResponse {
  assets: Asset[]
  'current-round': number
  'next-token'?: string
}

export interface AccountTransactionsRequest {
  accountId: string
  afterTime?: string
  assetId?: number
  beforeTime?: string
  currencyGreaterThan?: number
  currencyLessThan?: number
  limit?: number
  maxRound?: number
  minRound?: number
  next?: string
  notePrefix?: string
  rekeyTo?: boolean
  round?: number
  sigType?: 'sig' | 'msig' | 'lsig'
  txType?: 'pay' | 'keyreg' | 'acfg' | 'axfer' | 'afrz' | 'appl' | 'stpf'
  txid?: string
}

export interface AccountTransactionsResponse {
  'current-round': number
  'next-token'?: string
  transactions: Transaction[]
}

export interface Transaction {
  'application-transaction'?: TransactionApplication
  'asset-config-transaction'?: TransactionAssetConfig
  'asset-freeze-transaction'?: TransactionAssetFreeze
  'asset-transfer-transaction'?: TransactionAssetTransfer
  'auth-addr'?: string
  'close-rewards'?: number
  'closing-amount'?: number
  'confirmed-round'?: number
  'created-application-index'?: number
  'created-asset-index'?: number
  fee: number
  'first-valid': number
  'genesis-hash'?: string
  'genesis-id'?: string
  'global-state-delta'?: StateDelta
  group?: string
  id?: string
  'inner-txns'?: Transaction[]
  'intra-round-offset'?: number
  'keyreg-transaction'?: TransactionKeyreg
  'last-valid': number
  lease?: string
  'local-state-delta'?: AccountStateDelta[]
  logs?: string[]
  note?: string
  'payment-transaction'?: TransactionPayment
  'receiver-rewards'?: number
  'rekey-to'?: string
  'round-time'?: number
  sender: string
  'sender-rewards'?: number
  signature?: TransactionSignature
  'state-proof-transaction'?: TransactionStateProof
  'tx-type': 'pay' | 'keyreg' | 'acfg' | 'axfer' | 'afrz' | 'appl' | 'stpf'
}

export interface TransactionKeyreg {
  'non-participation'?: boolean
  'selection-participation-key'?: string
  'state-proof-key'?: string
  'vote-first-valid'?: number
  'vote-key-dilution'?: number
  'vote-last-valid'?: number
  'vote-participation-key'?: string
}

export interface TransactionPayment {
  amount: number
  'close-amount'?: number
  'close-remainder-to'?: string
  receiver: string
}

export interface TransactionSignature {
  logicsig?: TransactionSignatureLogicsig
  multisig?: TransactionSignatureMultisig
  sig?: string
}

export interface TransactionAssetConfig {
  'asset-id'?: number
  params?: AssetParams
}

type StateDelta = EvalDeltaKeyValue[]

export interface EvalDeltaKeyValue {
  key: string
  value: EvalDelta
}

export interface EvalDelta {
  action: number
  bytes?: string
  uint?: number
}

export interface StateProofReveal {
  participant?: StateProofParticipant
  position?: number
  'sig-slot'?: StateProofSigSlot
}

export interface StateProofFields {
  'part-proofs'?: MerkleArrayProof
  'positions-to-reveal'?: number[]
  reveals?: StateProofReveal[]
  'salt-version'?: number
  'sig-commit'?: string
  'sig-proofs'?: MerkleArrayProof
  'signed-weight'?: number
}

export interface StateProofParticipant {
  verifier?: StateProofVerifier
  weight?: number
}

export interface StateProofVerifier {
  commitment?: string
  'key-lifetime'?: number
}

export interface StateProofSigSlot {
  'lower-sig-weight'?: number
  signature?: StateProofSignature
}

export interface StateProofSignature {
  'falcon-signature'?: string
  'merkle-array-index'?: number
  proof?: MerkleArrayProof
  'verifying-key'?: string
}

export interface MerkleArrayProof {
  'hash-factory'?: HashFactory
  path?: string[]
  'tree-depth'?: number
}

export interface HashFactory {
  'hash-type'?: number
}

export interface TransactionAssetFreeze {
  address: string
  'asset-id': number
  'new-freeze-status': boolean
}

export interface TransactionAssetTransfer {
  amount: number
  'asset-id': number
  'close-amount'?: number
  'close-to'?: string
  receiver: string
  sender?: string
}

export interface TransactionApplication {
  accounts?: string[]
  'application-args'?: string[]
  'application-id': number
  'approval-program'?: string
  'clear-state-program'?: string
  'extra-program-pages'?: number
  'foreign-apps'?: number[]
  'foreign-assets'?: number[]
  'global-state-schema'?: StateSchema
  'local-state-schema'?: StateSchema
  'on-completion': OnCompletion
}

type OnCompletion = 'noop' | 'optin' | 'closeout' | 'clear' | 'update' | 'delete'

export interface StateSchema {
  'num-byte-slice': number
  'num-uint': number
}

export interface TransactionSignatureLogicsig {
  args?: string[]
  logic: string
  'multisig-signature'?: TransactionSignatureMultisig
  signature?: string
}

export interface TransactionSignatureMultisig {
  subsignature?: TransactionSignatureMultisigSubsignature[]
  threshold?: number
  version?: number
}

export interface TransactionSignatureMultisigSubsignature {
  'public-key'?: string
  signature?: string
}

export interface TransactionStateProof {
  message?: IndexerStateProofMessage
  'state-proof'?: StateProofFields
  'state-proof-type'?: number
}

export interface IndexerStateProofMessage {
  'block-headers-commitment'?: string
  'first-attested-round'?: number
  'latest-attested-round'?: number
  'ln-proven-weight'?: number
  'voters-commitment'?: string
}

export interface ApplicationSearchParams {
  applicationId?: number
  creator?: string
  includeAll?: boolean
  limit?: number
  next?: string
}

export interface ApplicationSearchResponse {
  applications: Application[]
  'current-round': number
  'next-token'?: string
}

export interface AppLookupParams {
  applicationId: number
  includeAll?: boolean
}

export interface AppLookupResponse {
  application?: Application
  'current-round': number
}

export interface ApplicationBoxParams {
  applicationId: number
  name: string
}

export interface ApplicationBoxesParams {
  applicationId: number
  limit?: number
  next?: string
}

export interface ApplicationBoxesResponse {
  'application-id': number
  boxes: BoxDescriptor[]
  'next-token'?: string
}

export interface LogsLookupParams {
  applicationId: number
  limit?: number
  maxRound?: number
  minRound?: number
  next?: string
  senderAddress?: string
  txid?: string
}

export interface LogsLookupResponse {
  'application-id': number
  'current-round': number
  'log-data'?: ApplicationLogData[]
  'next-token'?: string
}

export interface ApplicationLogData {
  logs: string[]
  txid: string
}

export interface AssetSearchParams {
  assetId?: number
  creator?: string
  includeAll?: boolean
  limit?: number
  name?: string
  next?: string
  unit?: string
}

export interface AssetSearchResponse {
  assets: Asset[]
  'current-round': number
  'next-token'?: string
}

export interface AssetLookupParams {
  assetId: number
  includeAll?: boolean
}

export interface AssetLookupResponse {
  asset: Asset
  'current-round': number
}

export interface AssetBalancesParams {
  assetId: number
  currencyGreaterThan?: number
  currencyLessThan?: number
  includeAll?: boolean
  limit?: number
  next?: string
}

export interface AssetBalancesResponse {
  balances: MiniAssetHolding[]
  'current-round': number
  'next-token'?: string
}

export interface MiniAssetHolding {
  address: string
  amount: number
  deleted?: boolean
  'is-frozen': boolean
  'opted-in-at-round'?: number
  'opted-out-at-round'?: number
}

export interface AssetTransactionsParams {
  assetId: number
  address?: string
  addressRole?: 'sender' | 'receiver' | 'freeze-target'
  afterTime?: string
  beforeTime?: string
  currencyGreaterThan?: number
  currencyLessThan?: number
  excludeCloseTo?: boolean
  limit?: number
  maxRound?: number
  minRound?: number
  next?: string
  notePrefix?: string
  rekeyTo?: boolean
  round?: number
  sigType?: 'sig' | 'msig' | 'lsig'
  txType?: 'pay' | 'keyreg' | 'acfg' | 'axfer' | 'afrz' | 'appl' | 'stpf'
  txid?: string
}

export interface AssetTransactionsResponse {
  'current-round': number
  'next-token'?: string
  transactions: Transaction[]
}

export interface BlockLookupParams {
  roundNumber: number
  headerOnly?: boolean
}

export interface TransactionsParams {
  address?: string
  addressRole?: 'sender' | 'receiver' | 'freeze-target'
  afterTime?: string
  applicationId?: number
  assetId?: number
  beforeTime?: string
  currencyGreaterThan?: number
  currencyLessThan?: number
  excludeCloseTo?: boolean
  limit?: number
  maxRound?: number
  minRound?: number
  next?: string
  notePrefix?: string
  rekeyTo?: boolean
  round?: number
  sigType?: 'sig' | 'msig' | 'lsig'
  txType?: 'pay' | 'keyreg' | 'acfg' | 'axfer' | 'afrz' | 'appl' | 'stpf'
  txid?: string
}

export interface TransactionsResponse {
  'current-round': number
  'next-token'?: string
  transactions: Transaction[]
}

export interface TransactionLookupParams {
  txid: string
}

export interface TransactionLookupResponse {
  transaction: Transaction
  'current-round': number
}

export interface AlgorandIndexerRpcSuite {
  getHealth(): Promise<HealthCheck>
  getAccounts(params: AccountRequest): Promise<AccountsResponse | ErrorResponse>
  getAccount(params: AccountInformationRequest): Promise<AccountResponse | ErrorResponse>
  getAccountAppsLocalState(params: AppsLocalStateRequest): Promise<AppsLocalStateResponse | ErrorResponse>
  getAccountAssets(params: AssetsRequest): Promise<AssetsResponse | ErrorResponse>
  getAccountApplications(
    params: CreatedApplicationsRequest,
  ): Promise<CreatedApplicationsResponse | ErrorResponse>
  getAccountCreatedAssets(params: CreatedAssetsRequest): Promise<CreatedAssetsResponse | ErrorResponse>
  getAccountTransactions(
    params: AccountTransactionsRequest,
  ): Promise<AccountTransactionsResponse | ErrorResponse>
  getApplications(params: ApplicationSearchParams): Promise<ApplicationSearchResponse | ErrorResponse>
  getApplication(params: AppLookupParams): Promise<AppLookupResponse | ErrorResponse>
  getApplicationBox(params: ApplicationBoxParams): Promise<Box | ErrorResponse>
  getApplicationBoxes(params: ApplicationBoxesParams): Promise<ApplicationBoxesResponse | ErrorResponse>
  getApplicationLogs(params: LogsLookupParams): Promise<LogsLookupResponse | ErrorResponse>
  getAssets(params: AssetSearchParams): Promise<AssetSearchResponse | ErrorResponse>
  getAsset(params: AssetLookupParams): Promise<AssetLookupResponse | ErrorResponse>
  getAssetBalances(params: AssetBalancesParams): Promise<AssetBalancesResponse | ErrorResponse>
  getAssetTransactions(params: AssetTransactionsParams): Promise<AssetTransactionsResponse | ErrorResponse>
  getBlock(params: BlockLookupParams): Promise<Block | ErrorResponse>
  getTransactions(params: TransactionsParams): Promise<TransactionsResponse | ErrorResponse>
  getTransaction(params: TransactionLookupParams): Promise<TransactionLookupResponse | ErrorResponse>
}
