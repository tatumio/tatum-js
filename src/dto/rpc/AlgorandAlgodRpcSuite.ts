export interface LedgerSupplyResponse {
  current_round: number
  online_money: number
  total_money: number
}

export interface SyncRoundRequest {
  round: number
}

export interface BlockHashRequest {
  round: number
}

export interface BlockHashResponse {
  blockHash: string
}

export interface NodeStatusResponse {
  catchpoint?: string
  catchpoint_acquired_blocks?: number
  catchpoint_processed_accounts?: number
  catchpoint_processed_kvs?: number
  catchpoint_total_accounts?: number
  catchpoint_total_blocks?: number
  catchpoint_total_kvs?: number
  catchpoint_verified_accounts?: number
  catchpoint_verified_kvs?: number
  catchup_time: number
  last_catchpoint?: string
  last_round: number
  last_version: string
  next_version: string
  next_version_round: number
  next_version_supported: boolean
  stopped_at_unsupported_round: boolean
  time_since_last_round: number
  upgrade_delay?: number
  upgrade_next_protocol_vote_before?: number
  upgrade_no_votes?: number
  upgrade_node_vote?: boolean
  upgrade_vote_rounds?: number
  upgrade_votes?: number
  upgrade_votes_required?: number
  upgrade_yes_votes?: number
}
export interface Account {
  address: string
  amount: number
  amount_without_pending_rewards: number
  apps_local_state?: ApplicationLocalState[]
  apps_total_extra_pages?: number
  apps_total_schema?: ApplicationStateSchema
  assets?: AssetHolding[]
  auth_addr?: string
  created_apps?: Application[]
  created_assets?: Asset[]
  min_balance: number
  participation?: AccountParticipation
  pending_rewards: number
  reward_base?: number
  rewards: number
  round: number
  sig_type?: 'sig' | 'msig' | 'lsig'
  status: 'Offline' | 'Online' | 'NotParticipating'
  total_apps_opted_in: number
  total_assets_opted_in: number
  total_box_bytes?: number
  total_boxes?: number
  total_created_apps: number
  total_created_assets: number
}

export interface ApplicationLocalState {
  id: number
  key_value?: TealKeyValue[]
  schema: ApplicationStateSchema
}

export interface TealKeyValue {
  bytes: string
  type: number
  uint: number
}

export interface ApplicationStateSchema {
  num_byte_slice: number
  num_uint: number
}

export interface AssetHolding {
  amount: number
  asset_id: number
  is_frozen: boolean
}

export interface Application {
  id: number
  params: ApplicationParams
}

export interface ApplicationParams {
  approval_program: string
  clear_state_program: string
  creator: string
  extra_program_pages?: number
  global_state?: TealKeyValue[]
  global_state_schema?: ApplicationStateSchema
  local_state_schema?: ApplicationStateSchema
}

export interface Asset {
  index: number
  params: AssetParams
}

export interface AssetParams {
  clawback?: string
  creator: string
  decimals: number
  default_frozen?: boolean
  freeze?: string
  manager?: string
  metadata_hash?: string
  name?: string
  name_b64?: string
  reserve?: string
  total: number
  unit_name?: string
  unit_name_b64?: string
  url?: string
  url_b64?: string
}

export interface AccountParticipation {
  selection_participation_key: string
  state_proof_key?: string
  vote_first_valid: number
  vote_key_dilution: number
  vote_last_valid: number
  vote_participation_key: string
}

export interface AccountInfoRequest {
  address: string
  round?: number
  format?: 'json' | 'msgpack'
}

export interface AccountApplicationRequest {
  address: string
  applicationId: number
  format?: 'json' | 'msgpack'
}

export interface AccountApplicationResponse {
  'app-local-state'?: ApplicationLocalState
  'created-app'?: ApplicationParams
  round: number
}

export interface AccountAssetRequest {
  address: string
  assetId: number
  format?: 'json' | 'msgpack'
}

export interface AccountAssetResponse {
  'asset-holding'?: AssetHolding
  'created-asset'?: AssetParams
  round: number
}

export interface PendingTransactionsRequest {
  address: string
  format?: 'json' | 'msgpack'
  max?: number
}

export interface PendingTransactionsResponse {
  'top-transactions': object[]
  'total-transactions': number
}

export interface Box {
  name: string
  round: number
  value: string
}

export interface BoxRequestParams {
  applicationId: number
  name: string
}

export interface BoxDescriptor {
  name: string
}

export interface BoxesRequestParams {
  applicationId: number
  max?: number
}

export interface BoxesResponse {
  boxes: BoxDescriptor[]
}

export interface LightBlockHeaderProof {
  index: number
  proof: string
  treedepth: number
}

export interface GetLightBlockHeaderProofParams {
  round: number
}

export interface TransactionProof {
  hashtype: 'sha512_256' | 'sha256'
  idx: number
  proof: string
  stibhash: string
  treedepth: number
}

export interface TransactionProofParams {
  round: number
  txid: string
}

export interface BlockTransactionIDsResponse {
  blockTxids: string[]
}

export interface LedgerStateDelta {
  accounts: Array<AccountDelta>
}

export interface AccountDelta {
  address: string
  delta: Array<DeltaDetail>
}

export interface DeltaDetail {
  action: string
  value: number
}

interface StateProofMessage {
  BlockHeadersCommitment: string
  FirstAttestedRound: number
  LastAttestedRound: number
  LnProvenWeight: number
  VotersCommitment: string
}

export interface StateProof {
  Message: StateProofMessage
  StateProof: string
}

export interface NodeStatus {
  catchpoint?: string
  catchpointAcquiredBlocks?: number
  catchpointProcessedAccounts?: number
  catchpointProcessedKvs?: number
  catchpointTotalAccounts?: number
  catchpointTotalBlocks?: number
  catchpointTotalKvs?: number
  catchpointVerifiedAccounts?: number
  catchpointVerifiedKvs?: number
  catchupTime: number
  lastCatchpoint?: string
  lastRound: number
  lastVersion: string
  nextVersion: string
  nextVersionRound: number
  nextVersionSupported: boolean
  stoppedAtUnsupportedRound: boolean
  timeSinceLastRound: number
  upgradeDelay?: number
  upgradeNextProtocolVoteBefore?: number
  upgradeNoVotes?: number
  upgradeNodeVote?: boolean
  upgradeVoteRounds?: number
  upgradeVotes?: number
  upgradeVotesRequired?: number
  upgradeYesVotes?: number
}

export interface TransactionParams {
  consensusVersion: string
  fee: number
  genesisHash: string
  genesisId: string
  lastRound: number
  minFee: number
}

export interface AccountStateDelta {
  address: string
  delta: StateProof
}

export interface PendingTransactionResponse {
  'application-index'?: number
  'asset-closing-amount'?: number
  'asset-index'?: number
  'close-rewards'?: number
  'closing-amount'?: number
  'confirmed-round'?: number
  'global-state-delta'?: StateProof[]
  'inner-txns'?: object[]
  'local-state-delta'?: AccountStateDelta[]
  logs?: string[]
  'pool-error': string
  'receiver-rewards'?: number
  'sender-rewards'?: number
  txn: object
}

export interface TransactionBroadcastRequest {
  rawtxn: string
}

export interface TransactionBroadcastResponse {
  txId: string
}

export interface SimulationEvalOverrides {
  'allow-empty-signatures'?: boolean
  'allow-unnamed-resources'?: boolean
  'extra-opcode-budget'?: number
  'max-log-calls'?: number
  'max-log-size'?: number
}

export interface SimulateTraceConfig {
  enable?: boolean
  'scratch-change'?: boolean
  'stack-change'?: boolean
  'state-change'?: boolean
}

export interface ApplicationInitialStates {
  'app-boxes'?: ApplicationKVStorage[]
  'app-globals'?: ApplicationKVStorage[]
  'app-locals'?: ApplicationKVStorage[]
  id: number
}

export interface ApplicationKVStorage {
  account?: string
  kvs: AvmKeyValue[]
}

export interface AvmKeyValue {
  key: string
  value: object
}

export interface SimulateTransactionGroupResult {
  'app-budget-added'?: number
  'app-budget-consumed'?: number
  'failed-at'?: number[]
  'failure-message'?: string
  'txn-results': SimulateTransactionResult[]
  'unnamed-resources-accessed'?: SimulateUnnamedResourcesAccessed
}

export interface SimulateTransactionResult {
  'app-budget-consumed'?: number
  'exec-trace'?: SimulationTransactionExecTrace
  'logic-sig-budget-consumed'?: number
  'txn-result': PendingTransactionResponse
  'unnamed-resources-accessed'?: SimulateUnnamedResourcesAccessed
}

export interface SimulationTransactionExecTrace {
  'approval-program-hash'?: string
  'approval-program-trace'?: object[]
  'clear-state-program-hash'?: string
  'clear-state-program-trace'?: object[]
  'inner-trace'?: SimulationTransactionExecTrace[]
  'logic-sig-hash'?: string
  'logic-sig-trace'?: object[]
}

export interface AssetHoldingReference {
  account: string
  asset: number
}

export interface SimulateUnnamedResourcesAccessed {
  accounts?: string[]
  'app-locals'?: ApplicationLocalReference[]
  apps?: number[]
  'asset-holdings'?: AssetHoldingReference[]
  assets?: number[]
  boxes?: Box[]
  'extra-box-refs'?: number
}

export interface ApplicationLocalReference {
  account: string
  app: number
}

export interface SimulateRequest {
  format: 'msgpack' | 'json'
  request: {
    'allow-empty-signatures'?: boolean
    'allow-more-logging'?: boolean
    'allow-unnamed-resources'?: boolean
    'exec-trace-config'?: SimulateTraceConfig
  }
}

export interface SimulateResponse {
  'eval-overrides'?: SimulationEvalOverrides
  'exec-trace-config'?: SimulateTraceConfig
  'initial-states'?: ApplicationInitialStates[]
  'last-round': number
  'txn-groups': SimulateTransactionGroupResult[]
  version: string
}

export interface ErrorResponse {
  message: string
  data?: object
}

export interface AlgorandAlgodRpcSuite {
  getLedgerSupply(): Promise<LedgerSupplyResponse | ErrorResponse>
  syncLedgerRound(request: SyncRoundRequest): Promise<void>
  getNodeStatus(): Promise<NodeStatusResponse | ErrorResponse>
  getBlockHash(params: BlockHashRequest): Promise<BlockHashResponse | ErrorResponse>
  getGenesis(): Promise<string>
  isHealthy(): Promise<void>
  isReady(): Promise<void>
  getAccountInfo(params: AccountInfoRequest): Promise<Account | ErrorResponse>
  getAccountApplicationInfo(
    params: AccountApplicationRequest,
  ): Promise<AccountApplicationResponse | ErrorResponse>
  getAccountAssetInfo(params: AccountAssetRequest): Promise<AccountAssetResponse | ErrorResponse>
  getPendingTransactions(
    params: PendingTransactionsRequest,
  ): Promise<PendingTransactionsResponse | ErrorResponse>
  getApplicationInfo(params: { applicationId: number }): Promise<Application | ErrorResponse>
  getApplicationBox(params: BoxRequestParams): Promise<Box>
  getApplicationBoxes(params: BoxesRequestParams): Promise<BoxesResponse | ErrorResponse>
  getAssetInformation(params: { assetId: number }): Promise<Asset | ErrorResponse>
  getLightBlockHeaderProofParams(
    params: GetLightBlockHeaderProofParams,
  ): Promise<LightBlockHeaderProof | ErrorResponse>
  getTransactionProof(params: TransactionProofParams): Promise<TransactionProof | ErrorResponse>
  getBlockTransactionIDs(params: { round: number }): Promise<BlockTransactionIDsResponse | ErrorResponse>
  getLedgerStateDelta(params: { round: number }): Promise<LedgerStateDelta | ErrorResponse>
  getNodeStatusAfterRound(params: { round: number }): Promise<NodeStatus | ErrorResponse>
  getTransactionParams(): Promise<TransactionParams | ErrorResponse>
  getPendingTransaction(params: { txid: string }): Promise<PendingTransactionResponse | ErrorResponse>
  broadcastTransaction(
    params: TransactionBroadcastRequest,
  ): Promise<TransactionBroadcastResponse | ErrorResponse>
  simulateTransaction(request: SimulateRequest): Promise<SimulateResponse | ErrorResponse>
}
