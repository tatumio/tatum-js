/* eslint-disable @typescript-eslint/no-explicit-any */

// Core interfaces

export interface Milestone {
  index: number
  timestamp: number
  milestoneId: string
}

export interface Status {
  isHealthy: boolean
  latestMilestone: Milestone
  confirmedMilestone: Milestone
  pruningIndex: number
}

export interface Metrics {
  blocksPerSecond: number
  referencedBlocksPerSecond: number
  referencedRate: number
}

export interface RentStructure {
  vByteCost: number
  vByteFactorData: number
  vByteFactoKey: number
}

export interface Protocol {
  networkName: string
  bech32Hrp: string
  tokenSupply: string
  version: number
  minPowScore: number
  belowMaxDepth: number
  rentStructure: RentStructure
}

export interface PendingProtocolParameter {
  type: number
  targetMilestoneIndex: number
  protocolVersion: number
  params: string
}

export interface BaseToken {
  name: string
  tickerSymbol: string
  unit: string
  decimals: number
  subunit: string
  useMetricPrefix: boolean
}

export interface NodeInfo {
  name: string
  version: string
  status: Status
  metrics: Metrics
  supportedProtocolVersions: number[]
  protocol: Protocol
  pendingProtocolParameters: PendingProtocolParameter[]
  baseToken: BaseToken
  features: string[]
}

export interface Block {
  protocolVersion: number
  parents: string[]
  payload?: TransactionPayload | MilestonePayload | TaggedDataPayload | ReceiptPayload
  nonce: string
}

export interface TransactionPayload {
  type: number // Set to value 6 to denote a Transaction Payload.
  essence: TransactionEssence
  unlocks: Array<SignatureUnlock | ReferenceUnlock | AliasUnlock | NFTUnlock>
}

export interface TransactionEssence {
  type: number
  networkId: string
  inputsCommitment: string
  inputs: UTXOInput[] // Assume UTXOInput is an existing interface
  outputs: (BasicOutput | AliasOutput | FoundryOutput | NFTOutput)[] // Assume these are existing interfaces
  payload?: TaggedDataPayload // Assume TaggedDataPayload is an existing interface
}

export interface UTXOInput {
  type: number
  transactionId: string
  transactionOutputIndex: number
}

export interface BasicOutput {
  type: number // Set to value 3 to denote a Basic Output.
  amount: string // The amount of IOTA tokens to deposit with this BasicOutput output. Plain string encoded number.
  nativeTokens?: NativeToken[] // Native tokens held by the output.
  unlockConditions: (
    | AddressUnlockCondition
    | StorageDepositReturnUnlockCondition
    | TimelockUnlockCondition
    | ExpirationUnlockCondition
  )[] // Unlock conditions that define how the output can be unlocked in a transaction.
  features?: (SenderFeature | MetadataFeature | TagFeature)[] // Features that add utility to the output but do not impose unlocking conditions.
}

export interface AliasOutput {
  type: number
  amount: string
  nativeTokens?: NativeToken[]
  aliasId: string
  stateIndex: number
  stateMetadata?: string
  foundryCounter: number
  unlockConditions: (StateControllerAddressUnlockCondition | GovernorAddressUnlockCondition)[]
  features?: (SenderFeature | MetadataFeature)[]
  immutableFeatures?: (IssuerFeature | MetadataFeature)[]
}

export interface FoundryOutput {
  type: number
  amount: string
  nativeTokens?: NativeToken[]
  serialNumber: number
  tokenScheme: SimpleTokenScheme[]
  unlockConditions: ImmutableAliasAddressUnlockCondition[]
  features?: MetadataFeature[]
  immutableFeatures?: MetadataFeature[]
}

export interface NFTOutput {
  type: number
  amount: string
  nativeTokens?: NativeToken[]
  nftId: string
  unlockConditions: (
    | AddressUnlockCondition
    | StorageDepositReturnUnlockCondition
    | TimelockUnlockCondition
    | ExpirationUnlockCondition
  )[]
  features?: (SenderFeature | IssuerFeature | MetadataFeature | TagFeature)[]
  immutableFeatures?: (IssuerFeature | MetadataFeature)[]
}

export interface NativeToken {
  id: string
  amount: string
}

export interface Ed25519Address {
  type: number
  pubKeyHash: string
}

export interface AliasAddress {
  type: number
  aliasId: string
}

export interface NFTAddress {
  type: number
  nftId: string
}

export interface AddressUnlockCondition {
  type: number
  address: Ed25519Address | AliasAddress | NFTAddress
}

export interface ImmutableAliasAddressUnlockCondition {
  type: number
  address: AliasAddress
}

export interface StorageDepositReturnUnlockCondition {
  type: number
  returnAddress: Ed25519Address | AliasAddress | NFTAddress
  returnAmount: string
}

export interface TimelockUnlockCondition {
  type: number
  unixTime: number
}

export interface ExpirationUnlockCondition {
  type: number
  returnAddress: Ed25519Address | AliasAddress | NFTAddress
  unixTime: number
}

export interface StateControllerAddressUnlockCondition {
  type: number
  address: Ed25519Address | AliasAddress | NFTAddress
}

export interface GovernorAddressUnlockCondition {
  type: number
  address: Ed25519Address | AliasAddress | NFTAddress
}

export interface SenderFeature {
  type: number
  address: Ed25519Address | AliasAddress | NFTAddress
}

export interface IssuerFeature {
  type: number
  address: Ed25519Address | AliasAddress | NFTAddress
}

export interface MetadataFeature {
  type: number
  data: string
}

export interface TagFeature {
  type: number
  tag: string
}

export interface SimpleTokenScheme {
  type: number
  mintedTokens: string
  meltedTokens: string
  maxSupply: string
}

export interface SignatureUnlock {
  type: number
  signature: Ed25519Signature
}

export interface Ed25519Signature {
  type: number // Set to value 0 to denote an Ed25519 Signature.
  publicKey: string // The public key of the Ed25519 keypair which is used to verify the signature. Hex-encoded with 0x prefix.
  signature: string // The signature signing the serialized Transaction Essence. Hex-encoded with 0x prefix.
}

export interface ReferenceUnlock {
  type: number
  reference: number
}

export interface AliasUnlock {
  type: number // Set to value 2 to denote an Alias Unlock.
  reference: number // Represents the index of a previous unlock.
}

export interface NFTUnlock {
  type: number
  reference: number
}

export interface MilestonePayload {
  type: number
  index: number
  timestamp: number
  protocolVersion: number
  previousMilestoneId: string
  parents: string[]
  inclusionMerkleRoot: string
  appliedMerkleRoot: string
  options: (ReceiptPayload | ProtocolParamsMilestoneOpt)[]
  metadata?: string
  signatures: Ed25519Signature[]
}

export interface TaggedDataPayload {
  type: number
  tag?: string
  data?: string
}

export interface TreasuryTransactionPayload {
  type: number
  input: TreasuryInput
  output: TreasuryOutput
}

export interface TreasuryInput {
  type: number
  milestoneId: string
}

export interface TreasuryOutput {
  type: number
  amount: string
}

export interface Peer {
  id: string
  multiAddresses: string[]
  alias?: string
  relation: 'known' | 'unknown' | 'autopeered'
  connected: boolean
  gossip?: Gossip
}

export interface Gossip {
  heartbeat: Heartbeat | null
  metrics: Metrics
}

export interface Heartbeat {
  solidMilestoneIndex: number
  prunedMilestoneIndex: number
  latestMilestoneIndex: number
  connectedNeighbors: number
  syncedNeighbors: number
}

export interface Metrics {
  newBlocks: number
  knownBlocks: number
  receivedBlocks: number
  receivedBlockRequests: number
  receivedMilestoneRequests: number
  receivedHeartbeats: number
  sentBlocks: number
  sentBlockRequests: number
  sentMilestoneRequests: number
  sentHeartbeats: number
  droppedPackets: number
}

export interface ProtocolParamsMilestoneOpt {
  type: number
  targetMilestoneIndex: number
  protocolVersion: number
  params: string
}

export interface ReceiptTuple {
  receipt: ReceiptPayload
  milestoneIndex: number
}

export interface ReceiptPayload {
  type: number
  migratedAt: number
  final: boolean
  funds: MigratedFundsEntry[]
  transaction: TreasuryTransactionPayload
}

export interface MigratedFundsEntry {
  tailTransactionHash: string
  address: Ed25519Address
  deposit: number
}

export interface ErrorFormat {
  error: {
    code: string
    message: string
  }
}

export interface TipsResponse {
  tips: string[]
}

export interface SubmitBlock {
  protocolVersion: number
  parents?: string[]
  payload?:
    | TransactionPayload
    | MilestonePayload
    | TaggedDataPayload
    | TreasuryTransactionPayload
    | ReceiptPayload
  nonce?: string
}

export interface BlockIdentifier {
  blockId: string
}

export interface BlockMetadata {
  blockId: string
  parents: string[]
  isSolid: boolean
  referencedByMilestoneIndex?: number
  milestoneIndex?: number
  ledgerInclusionState?: 'included' | 'conflicting' | 'noTransaction'
  conflictReason?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 255
  whiteFlagIndex?: number
  shouldPromote?: boolean
  shouldReattach?: boolean
}

export interface OutputResponse {
  metadata: OutputMetadata
  output: BasicOutput | AliasOutput | FoundryOutput | NFTOutput
}

export interface OutputMetadata {
  blockId: string
  transactionId: string
  outputIndex: number
  isSpent: boolean
  milestoneIndexSpent?: number
  milestoneTimestampSpent?: number
  transactionIdSpent?: string
  milestoneIndexBooked: number
  milestoneTimestampBooked: number
  ledgerIndex: number
}

export interface ReceiptsResponse {
  receipts: ReceiptTuple[]
}

export interface TreasuryResponse {
  milestoneId: string
  amount: string
}

export interface UTXOChanges {
  index: number
  createdOutputs: string[]
  consumedOutputs: string[]
}

export type PeerResponse = Array<Peer>

export interface AddPeerRequest {
  multiAddress: string
  alias?: string
}

export interface ComputeWhiteFlagRequest {
  index: number
  timestamp: number
  parents: string[]
  previousMilestoneId: string
}

export interface ComputedMerkleRootResult {
  inclusionMerkleRoot: string
  appliedMerkleRoot: string
}

export interface PruneDatabaseRequest {
  index: number
  depth: number
  targetDatabaseSize: string
}

export interface PruneDatabaseResponse {
  index: number
}

export interface CreateSnapshotsRequest {
  index: number
}

export interface CreateSnapshotsResponse {
  index: number
  filePath: string
}

// Indexer interfaces
export interface OutputIdResponse {
  ledgerIndex: number
  cursor?: string | null
  items: string[]
}

export interface OutputSearchParams {
  unlockableByAddress?: string
  hasNativeTokens?: boolean
  minNativeTokenCount?: number
  maxNativeTokenCount?: number
  createdBefore?: number
  createdAfter?: number
  pageSize?: number
  cursor?: string
}

export interface BasicOutputSearchParams extends OutputSearchParams {
  address?: string
  hasStorageDepositReturn?: boolean
  storageDepositReturnAddress?: string
  hasTimelock?: boolean
  timelockedBefore?: number
  timelockedAfter?: number
  hasExpiration?: boolean
  expiresBefore?: number
  expiresAfter?: number
  expirationReturnAddress?: string
  sender?: string
  tag?: string
}

export interface AliasOutputSearchParams extends OutputSearchParams {
  stateController?: string
  governor?: string
  issuer?: string
  sender?: string
}

export interface FoundryOutputsFilterParams extends OutputSearchParams {
  aliasAddress?: string
}

export interface NftOutputSearchParams extends BasicOutputSearchParams {
  issuer?: string
}

// Explorer interfaces

export interface Balance {
  totalBalance: string
  availableBalance: string
  ledgerIndex: number
}

export interface BlockChildrenResponse {
  blockId: string
  maxResults?: number
  count?: number
  children?: string[]
}

export interface LedgerUpdate {
  address: string
  outputId: string
  isSpent: boolean
}

export interface LedgerUpdateList {
  milestoneIndex: number
  items: LedgerUpdate[]
  cursor?: string
}

export interface LedgerUpdates {
  address: string
  items: Array<{
    milestoneIndex: number
    milestoneTimestamp: number
    outputId: string
    isSpent: boolean
  }>
  cursor?: string
}

export interface PagedMilestones {
  items: {
    milestoneId: string
    index: number
  }[]
  cursor?: string
}

export interface PagedBlockIdsByMilestone {
  blocks: {
    blockId: string
    payloadType?: number
  }[]
  cursor?: string
}

export interface RichestAddressesStatistics {
  top: {
    address: Ed25519Address | AliasAddress | NFTAddress
    balance: string
  }[]
}

export interface WealthDistributionStatistics {
  distribution: {
    range: {
      start: number
      end: number
    }
    addressCount: string
    totalBalance: string
  }[]
}

export interface MilestonesParams {
  startTimestamp?: number
  endTimestamp?: number
  sort?: string
  pageSize?: number
  cursor?: string
}

export interface BlocksByMilestoneParams {
  milestoneId: string
  sort?: string
  pageSize?: number
  cursor?: string
}

export interface BlocksByMilestoneIndexParams {
  milestoneIndex: number
  sort?: string
  pageSize?: number
  cursor?: string
}

export interface LedgerUpdatesByAddressParams {
  address: string
  pageSize?: number
  sort?: 'asc' | 'desc'
  startMilestoneIndex?: number
  cursor?: string
}

export interface LedgerUpdatesByMilestoneParams {
  milestoneId: string
  pageSize?: number
  cursor?: string
}

export interface TopRichestAddressesParams {
  ledgerIndex?: number
  top?: number
}

// Wasp methods

export interface AccountFoundriesResponse {
  foundrySerialNumbers: number[]
}

export interface AccountListResponse {
  accounts: string[]
}

export interface AccountNFTsResponse {
  nftIds: string[]
}

export interface AccountNonceResponse {
  nonce: string
}

export interface AddUserRequest {
  password: string
  permissions: string[]
  username: string
}

export interface AssetsJSON {
  baseTokens: string
  nativeTokens: NativeTokenJSON[]
  nfts: string[]
}

export interface AssetsResponse {
  baseTokens: string
  nativeTokens: NativeTokenJSON[]
}

export interface AuthInfoModel {
  authURL: string
  scheme: string
}

export interface Blob {
  hash: string
  size: number
}

export interface BlobInfoResponse {
  fields: {
    [key: string]: number
  }
}

export interface BlobListResponse {
  Blobs: Blob[]
}

export interface BlobValueResponse {
  valueData: string
}

export interface BlockInfoResponse {
  blockIndex: number
  numSuccessfulRequests: number
  gasFeeCharged: string
  previousAliasOutput: string
  gasBurned: string
  totalRequests: number
  numOffLedgerRequests: number
  timestamp: string
}

export interface BurnRecord {
  code: number
  gasBurned: number
}

export interface CallTargetJSON {
  contractHName: string
  functionHName: string
}

export interface ChainInfoResponse {
  chainOwnerId: string
  metadata: PublicChainMetadata
  gasLimits: Limits
  chainID: string
  evmChainId: number
  publicURL: string
  gasFeePolicy: FeePolicy
  isActive: boolean
}

export interface LastMessageGovernanceTx {
  txId: string
}

export interface LastMessageStateTx {
  stateIndex: number
  txId: string
}

export interface LastMessageTxInclusionState {
  txId: string
  state: string
}

export interface LastMessageOnLedgerRequest {
  output: Output
  outputId: string
  raw: string
  id: string
}

export interface LastMessageOutput {
  output: Output
  outputId: string
}

export interface LastMessageAliasOutput {
  outputType: number
  raw: string
}

interface LastMessagePullTxInclusionState {
  txId: string
}

export interface LastMessagePullOutputByID {
  outputId: string
}

export interface ChainMessageMetrics {
  outPublishGovernanceTransaction: OutPublishGovernanceTransaction
  outPublisherStateTransaction: OutPublisherStateTransaction
  inTxInclusionState: InTxInclusionState
  inOnLedgerRequest: InOnLedgerRequest
  inOutput: InOutput
  inAliasOutput: InAliasOutput
  inStateOutput: InStateOutput
  outPullTxInclusionState: OutPullTxInclusionState
  outPullLatestOutput: OutPullLatestOutput
  outPullOutputByID: OutPullOutputByID
}

export interface OutPublishGovernanceTransaction {
  lastMessage: LastMessageGovernanceTx
  messages: number
  timestamp: string
}

export interface OutPublisherStateTransaction {
  lastMessage: LastMessageStateTx
  messages: number
  timestamp: string
}

export interface InTxInclusionState {
  lastMessage: LastMessageTxInclusionState
  messages: number
  timestamp: string
}

export interface InOnLedgerRequest {
  lastMessage: LastMessageOnLedgerRequest
  messages: number
  timestamp: string
}

export interface InOutput {
  lastMessage: LastMessageOutput
  messages: number
  timestamp: string
}

export interface InAliasOutput {
  lastMessage: LastMessageAliasOutput
  messages: number
  timestamp: string
}

export interface InStateOutput {
  lastMessage: LastMessageOutput
  messages: number
  timestamp: string
}

export interface OutPullTxInclusionState {
  lastMessage: LastMessagePullTxInclusionState
  messages: number
  timestamp: string
}

export interface OutPullLatestOutput {
  lastMessage: string
  messages: number
  timestamp: string
}

export interface OutPullOutputByID {
  lastMessage: LastMessagePullOutputByID
  messages: number
  timestamp: string
}

export interface ChainRecord extends ChainIDParam {
  accessNodes: string[]
  isActive: boolean
}

export interface CommitteeNode {
  accessAPI: string
  node: PeeringNodeStatusResponse
}

export interface ConsensusPipeMetrics {
  eventACSMsgPipeSize: number
  eventPeerLogIndexMsgPipeSize: number
  eventStateTransitionMsgPipeSize: number
  eventTimerMsgPipeSize: number
  eventVMResultMsgPipeSize: number
}

export interface ConsensusWorkflowMetrics {
  currentStateIndex: number
  flagBatchProposalSent: boolean
  flagConsensusBatchKnown: boolean
  flagInProgress: boolean
  flagStateReceived: boolean
  flagTransactionFinalized: boolean
  flagTransactionPosted: boolean
  flagTransactionSeen: boolean
  flagVMResultSigned: boolean
  flagVMStarted: boolean
  timeBatchProposalSent: string
  timeCompleted: string
  timeConsensusBatchKnown: string
  timeTransactionFinalized: string
  timeTransactionPosted: string
  timeTransactionSeen: string
  timeVMResultSigned: string
  timeVMStarted: string
}

export interface ContractCallViewRequest {
  arguments: JSONDict
  block: string
  contractHName: string
  contractName: string
  functionHName: string
  functionName: string
}

export interface ContractInfoResponse {
  hName: string
  name: string
  programHash: string
}

export interface ControlAddressesResponse {
  governingAddress: string
  sinceBlockIndex: number
  stateAddress: string
}

export interface DKSharesInfo {
  address: string
  peerIdentities: string[]
  peerIndex: number
  publicKey: string
  publicKeyShares: string[]
  threshold: number
}

export interface DKSharesPostRequest {
  peerIdentities: string[]
  threshold: number
  timeoutMS: number
}

export interface ErrorMessageFormatResponse {
  messageFormat: string
}

export interface EstimateGasRequestOffledger extends ChainIDParam {
  fromAddress: string
  requestBytes: string
}

export interface EstimateGasRequestOnledger extends ChainIDParam {
  outputBytes: string
}

export interface EventJSON {
  contractID: number
  payload: string
  timestamp: number
  topic: string
}

export interface EventsResponse {
  events: EventJSON[]
}

export interface FeePolicy {
  evmGasRatio: Ratio32
  gasPerToken: Ratio32
  validatorFeeShare: number
}

export interface FoundryOutputResponse {
  assets: AssetsResponse
  foundryId: string
}

export interface GovAllowedStateControllerAddressesResponse {
  addresses: string[]
}

export interface GovChainInfoResponse {
  chainOwnerId: string
  metadata: GovPublicChainMetadata
  gasLimits: Limits
  chainID: string
  publicURL: string
  gasFeePolicy: FeePolicy
}

export interface GovChainOwnerResponse {
  chainOwner: string
}

export interface GovPublicChainMetadata {
  description: string
  evmJsonRpcURL: string
  evmWebSocketURL: string
  name: string
  website: string
}

export interface InOutput {
  output: Output
  outputId: string
}

export interface InStateOutput {
  output: Output
  outputId: string
}

export interface InfoResponse {
  peeringURL: string
  l1Params: L1Params
  publicKey: string
  version: string
}

export interface L1Params {
  protocol: Protocol
  maxPayloadSize: number
  baseToken: BaseToken
}

export interface Item {
  key: string
  value: string
}

export interface Item {
  key: string
  value: string
}

export interface JSONDict {
  Items: Item[]
}

export interface JSONDict {
  Items: Item[]
}

export interface L1Params {
  baseToken: BaseToken
  maxPayloadSize: number
  protocol: ProtocolParameters
}

export interface Limits {
  maxGasExternalViewCall: number
  maxGasPerBlock: number
  maxGasPerRequest: number
  minGasPerRequest: number
}

interface LoginRequest {
  password: string
  username: string
}

export interface LoginResponse {
  error: string
  jwt: string
}

export interface NFTJSON {
  id: string
  issuer: string
  metadata: string
  owner: string
}

export interface NativeTokenIDRegistryResponse {
  nativeTokenRegistryIds: string[]
}

export interface NativeTokenJSON {
  amount: string
  id: string
}

export interface NodeMessageMetrics {
  registeredChainIDs: string[]
}

export interface NodeOwnerCertificateResponse {
  certificate: string
}

export interface OffLedgerRequest {
  chainId: string
  request: string
}

export interface Output {
  outputType: number
  raw: string
}

export interface PeeringNodeIdentityResponse {
  isTrusted: boolean
  name: string
  peeringURL: string
  publicKey: string
}

export interface PeeringNodeStatusResponse {
  isAlive: boolean
  isTrusted: boolean
  name: string
  numUsers: number
  peeringURL: string
  publicKey: string
}

export interface PeeringTrustRequest {
  name: string
  peeringURL: string
  publicKey: string
}

export interface ProtocolParameters {
  bech32Hrp: string
  belowMaxDepth: number
  minPowScore: number
  networkName: string
  rentStructure: RentStructure
  tokenSupply: string
  version: number
}

export interface PublicChainMetadata {
  description: string
  evmJsonRpcURL: string
  evmWebSocketURL: string
  name: string
  website: string
}

export interface WaitForRequestParams {
  chainID: string
  requestID: string
  timeoutSeconds?: number
  waitForL1Confirmation?: boolean
}

export interface Ratio32 {
  a: number
  b: number
}

export interface ReceiptResponse {
  blockIndex: number
  errorMessage?: string
  gasBudget: string
  gasBurnLog: BurnRecord[]
  gasBurned: string
  gasFeeCharged: string
  request: RequestJSON
  requestIndex: number
  storageDepositCharged: string
  rawError?: UnresolvedVMErrorJSON
}

export interface RequestIDsResponse {
  requestIds: string[]
}

export interface RequestJSON {
  allowance: AssetsJSON
  callTarget: CallTargetJSON
  fungibleTokens: AssetsJSON
  gasBudget: string
  isEVM: boolean
  isOffLedger: boolean
  nft: NFTJSON
  params: JSONDict
  requestId: string
  senderAccount: string
  targetAddress: string
}

export interface RequestProcessedResponse {
  chainId: string
  isProcessed: boolean
  requestId: string
}

export interface StateResponse {
  state: string
}

export interface UnresolvedVMErrorJSON {
  code: string
  params: string[]
}

export interface UpdateUserPasswordRequest {
  password: string
  username: string
}

export interface UpdateUserPermissionsRequest {
  permissions: string[]
  username: string
}

export interface User {
  permissions: string[]
  username: string
}

export interface VersionResponse {
  version: string
}

export interface ChainIDParam {
  chainID: string
}

export interface ChainIDAndBlockParam extends ChainIDParam {
  block?: string
}

export interface ChainIDAndPeerParam extends ChainIDParam {
  peer: string
}

export interface ChainIDAndRequestIDParam extends ChainIDParam {
  requestID: string
}

export interface ChainIDAndBlockIndexParam extends ChainIDParam {
  blockIndex: number
  block?: string
}

export interface ChainIDAndSerialNumberParam extends ChainIDParam {
  serialNumber: number
  block?: string
}

export interface ChainIDAndBlobHashParam extends ChainIDParam {
  blobHash: string
  fieldKey?: string
  block?: string
}

export interface ChainIDAndContractHnameParam extends ChainIDParam {
  contractHname: string
  block?: string
}

export interface ChainIDAndAgentIDParam extends ChainIDParam {
  agentID: string
  block?: string
}

export interface ChainIDAndNftIDParam extends ChainIDParam {
  nftID: string
  block?: string
}

export interface CallViewParamsChainId extends ChainIDParam, ContractCallViewRequest {}

export interface StateValueParams {
  chainID: string
  stateKey: string
}

export interface ChainIDAndContractHnameErrorParam extends ChainIDAndContractHnameParam {
  errorID: number
}

export interface AuthParam {
  loginRequest: LoginRequest
}

export interface IotaRpcSuite {
  // Core methods
  getNodeHealth(): Promise<boolean | ErrorFormat>
  getAvailableRouteGroups(): Promise<string[] | ErrorFormat>
  getNodeInfo(): Promise<NodeInfo | ErrorFormat>
  getTips(): Promise<TipsResponse | ErrorFormat>
  submitBlock(params: SubmitBlock): Promise<BlockIdentifier | ErrorFormat>
  getBlockDataById(params: BlockIdentifier): Promise<Block | ErrorFormat>
  getBlockMetadata(params: BlockIdentifier): Promise<BlockMetadata | ErrorFormat>
  findOutputById(outputId: string): Promise<OutputResponse | ErrorFormat>
  getOutputMetadata(outputId: string): Promise<OutputMetadata | ErrorFormat>
  getAllReceipts(): Promise<ReceiptsResponse | ErrorFormat>
  getReceiptsByMigrationIndex(migratedAt: number): Promise<ReceiptsResponse | ErrorFormat>
  getTransactionIncludedBlock(transactionId: string): Promise<Block | ErrorFormat>
  findIncludedBlockMetadata(transactionId: string): Promise<BlockMetadata | ErrorFormat>
  getMilestoneById(milestoneId: string): Promise<MilestonePayload | ErrorFormat>
  getMilestoneUtxoChangesByMilestone(milestoneId: string): Promise<UTXOChanges | ErrorFormat>
  lookupMilestoneByIndex(index: number): Promise<MilestonePayload | ErrorFormat>
  getMilestoneUtxoChangesById(index: number): Promise<UTXOChanges | ErrorFormat>
  computeMerkleRouteHashes(params: ComputeWhiteFlagRequest): Promise<ComputedMerkleRootResult | ErrorFormat>
  pruneDatabase(request: PruneDatabaseRequest): Promise<PruneDatabaseResponse | ErrorFormat>
  createSnapshot(requestData: CreateSnapshotsRequest): Promise<CreateSnapshotsResponse | ErrorFormat>
  getTreasuryInformation(): Promise<TreasuryResponse | ErrorFormat>
  getPeerInfo(peerId: string): Promise<PeerResponse | ErrorFormat>
  getPeers(): Promise<PeerResponse | ErrorFormat>
  addPeer(peerData: AddPeerRequest): Promise<Peer | ErrorFormat>

  // Indexer methods
  getOutputs(params: OutputSearchParams): Promise<OutputIdResponse>
  getBasicOutputs(params: BasicOutputSearchParams): Promise<OutputIdResponse>
  getAliasOutputs(params: AliasOutputSearchParams): Promise<OutputIdResponse>
  getCurrentUnspentAliasOutput(aliasId: string): Promise<OutputIdResponse>
  getFoundryOutputs(params: FoundryOutputsFilterParams): Promise<OutputIdResponse>
  getCurrentUnspentFoundryOutput(foundryId: string): Promise<OutputIdResponse>
  getNftOutputs(params: NftOutputSearchParams): Promise<OutputIdResponse>
  getCurrentNftOutput(nftId: string): Promise<OutputIdResponse>

  // Explorer methods
  getBalanceByAddress(address: string): Promise<Balance>
  getBlockChildren(blockId: string): Promise<BlockChildrenResponse>
  getMilestones(params?: MilestonesParams): Promise<Milestone>
  getBlocksByMilestone(params: BlocksByMilestoneParams): Promise<PagedBlockIdsByMilestone>
  getBlocksByMilestoneIndex(params: BlocksByMilestoneIndexParams): Promise<PagedBlockIdsByMilestone>
  getLedgerUpdatesByAddress(params: LedgerUpdatesByAddressParams): Promise<LedgerUpdateList>
  getLedgerUpdatesByMilestone(params: LedgerUpdatesByMilestoneParams): Promise<LedgerUpdateList>
  getTopRichestAddresses(params: TopRichestAddressesParams): Promise<RichestAddressesStatistics>
  getTokenDistribution(ledgerIndex: number): Promise<WealthDistributionStatistics>

  // Wasp methods
  authenticate(params: AuthParam): Promise<LoginResponse>
  authInfo(): Promise<AuthInfoModel>
  getChains(): Promise<ChainInfoResponse[]>
  getChainInfo(params: ChainIDAndBlockParam): Promise<ChainInfoResponse>
  removeAccessNode(params: ChainIDAndPeerParam): Promise<void>
  addAccessNode(params: ChainIDAndPeerParam): Promise<void>
  activateChain(params: ChainIDParam): Promise<void>
  callView(params: CallViewParamsChainId): Promise<JSONDict>
  setChainRecord(params: ChainRecord): Promise<void>
  getCommitteeInfo(params: ChainIDAndBlockParam): Promise<CommitteeNode>
  getContracts(params: ChainIDAndBlockParam): Promise<ContractInfoResponse[]>
  getAccounts(params: ChainIDAndBlockParam): Promise<AccountListResponse>
  accountsGetAccountBalance(params: ChainIDAndAgentIDParam): Promise<AssetsResponse>
  accountsGetAccountFoundries(params: ChainIDAndAgentIDParam): Promise<AccountFoundriesResponse>
  accountsGetAccountNFTIDs(params: ChainIDAndAgentIDParam): Promise<AccountNFTsResponse>
  accountsGetAccountNonce(params: ChainIDAndAgentIDParam): Promise<AccountNonceResponse>
  accountsGetFoundryOutput(params: ChainIDAndSerialNumberParam): Promise<FoundryOutputResponse>
  accountsGetNFTData(params: ChainIDAndNftIDParam): Promise<NFTJSON>
  accountsGetNativeTokenIDRegistry(params: ChainIDAndBlockParam): Promise<NativeTokenIDRegistryResponse>
  accountsGetTotalAssets(params: ChainIDAndBlockParam): Promise<AssetsResponse>
  blobsGetAllBlobs(params: ChainIDAndBlockParam): Promise<BlobListResponse>
  blobsGetBlobInfo(params: ChainIDAndBlobHashParam): Promise<BlobInfoResponse>
  blobsGetBlobValue(params: ChainIDAndBlobHashParam): Promise<BlobValueResponse>
  blocklogGetLatestBlockInfo(params: ChainIDAndBlockParam): Promise<BlockInfoResponse>
  blocklogGetRequestReceiptsOfLatestBlock(params: ChainIDAndBlockParam): Promise<ReceiptResponse[]>
  blocklogGetRequestIDsForLatestBlock(params: ChainIDAndBlockParam): Promise<RequestIDsResponse>
  blocklogGetBlockInfo(params: ChainIDAndBlockIndexParam): Promise<BlockInfoResponse>
  blocklogGetRequestReceiptsOfBlock(params: ChainIDAndBlockIndexParam): Promise<ReceiptResponse[]>
  blocklogGetRequestIDsForBlock(params: ChainIDAndBlockIndexParam): Promise<RequestIDsResponse>
  blocklogGetControlAddresses(params: ChainIDAndBlockParam): Promise<ControlAddressesResponse>
  blocklogGetEventsOfLatestBlock(params: ChainIDAndBlockParam): Promise<EventsResponse>
  blocklogGetEventsOfBlock(params: ChainIDAndBlockIndexParam): Promise<EventsResponse>
  blocklogGetEventsOfContract(params: ChainIDAndContractHnameParam): Promise<EventsResponse>
  blocklogGetEventsOfRequest(params: ChainIDAndRequestIDParam): Promise<EventsResponse>
  blocklogGetRequestReceipt(params: ChainIDAndRequestIDParam): Promise<ReceiptResponse>
  blocklogGetRequestIsProcessed(params: ChainIDAndRequestIDParam): Promise<RequestProcessedResponse>
  errorsGetErrorMessageFormat(params: ChainIDAndContractHnameErrorParam): Promise<ErrorMessageFormatResponse>
  getAllowedStateControllerAddresses(
    params: ChainIDAndBlockParam,
  ): Promise<GovAllowedStateControllerAddressesResponse>
  governanceGetChainInfo(params: ChainIDAndBlockParam): Promise<GovChainInfoResponse>
  governanceGetChainOwner(params: ChainIDAndBlockParam): Promise<GovChainOwnerResponse>
  deactivateChain(params: ChainIDParam): Promise<void>
  estimateGasOffledger(
    params: ChainIDParam,
    requestBody: EstimateGasRequestOffledger,
  ): Promise<ReceiptResponse>
  estimateGasOnledger(params: ChainIDParam, requestBody: EstimateGasRequestOnledger): Promise<ReceiptResponse>
  submitJSONRPCRequest(params: ChainIDParam): Promise<any>
  getMempoolContents(params: ChainIDParam): Promise<number[]>
  getReceipt(params: ChainIDAndRequestIDParam): Promise<ReceiptResponse>
  waitForRequest(params: WaitForRequestParams): Promise<ReceiptResponse>
  getStateValue(params: StateValueParams): Promise<StateResponse>
  getChainMessageMetrics(params: ChainIDParam): Promise<ChainMessageMetrics>
  getChainPipeMetrics(params: ChainIDParam): Promise<ConsensusPipeMetrics>
  getChainWorkflowMetrics(params: ChainIDParam): Promise<ConsensusWorkflowMetrics>
  getNodeMessageMetrics(): Promise<NodeMessageMetrics>
  getConfiguration(): Promise<any>
  generateDKS(params: DKSharesPostRequest): Promise<DKSharesInfo>
  getDKSInfo(sharedAddress: string): Promise<DKSharesInfo>
  getInfo(): Promise<InfoResponse>
  ownerCertificate(): Promise<NodeOwnerCertificateResponse>
  getAllPeers(): Promise<PeeringNodeStatusResponse[]>
  getPeeringIdentity(): Promise<PeeringNodeIdentityResponse>
  getTrustedPeers(): Promise<PeeringNodeIdentityResponse[]>
  trustPeer(requestBody: PeeringTrustRequest): Promise<void>
  distrustPeer(peer: string): Promise<void>
  shutdownNode(): Promise<void>
  getVersion(): Promise<VersionResponse>
  offLedger(requestBody: OffLedgerRequest): Promise<void>
  getUsers(): Promise<User[]>
  addUser(body: AddUserRequest): Promise<void>
  deleteUser(username: string): Promise<void>
  getUser(username: string): Promise<User>
  changeUserPassword(params: UpdateUserPasswordRequest): Promise<void>
  changeUserPermissions(params: UpdateUserPermissionsRequest): Promise<void>
}
