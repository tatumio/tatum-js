/* eslint-disable @typescript-eslint/no-explicit-any */

import { Service } from 'typedi'
import { QueryParams } from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { PostI } from '../../../dto/PostI'
import {
  AccountFoundriesResponse,
  AccountListResponse,
  AccountNFTsResponse,
  AccountNonceResponse,
  AddPeerRequest,
  AddUserRequest,
  AliasOutputSearchParams,
  AssetsResponse,
  AuthInfoModel,
  AuthParam,
  Balance,
  BasicOutputSearchParams,
  BlobInfoResponse,
  BlobListResponse,
  BlobValueResponse,
  Block,
  BlockChildrenResponse,
  BlockIdentifier,
  BlockInfoResponse,
  BlockMetadata,
  BlocksByMilestoneIndexParams,
  BlocksByMilestoneParams,
  CallViewParamsChainId,
  ChainIDAndAgentIDParam,
  ChainIDAndBlobHashParam,
  ChainIDAndBlockIndexParam,
  ChainIDAndBlockParam,
  ChainIDAndContractHnameErrorParam,
  ChainIDAndContractHnameParam,
  ChainIDAndNftIDParam,
  ChainIDAndPeerParam,
  ChainIDAndRequestIDParam,
  ChainIDAndSerialNumberParam,
  ChainIDParam,
  ChainInfoResponse,
  ChainMessageMetrics,
  ChainRecord,
  CommitteeNode,
  ComputeWhiteFlagRequest,
  ComputedMerkleRootResult,
  ConsensusPipeMetrics,
  ConsensusWorkflowMetrics,
  ContractInfoResponse,
  ControlAddressesResponse,
  CreateSnapshotsRequest,
  CreateSnapshotsResponse,
  DKSharesInfo,
  DKSharesPostRequest,
  ErrorFormat,
  ErrorMessageFormatResponse,
  EstimateGasRequestOffledger,
  EstimateGasRequestOnledger,
  EventsResponse,
  FoundryOutputResponse,
  FoundryOutputsFilterParams,
  GovAllowedStateControllerAddressesResponse,
  GovChainInfoResponse,
  GovChainOwnerResponse,
  InfoResponse,
  IotaRpcSuite,
  JSONDict,
  LedgerUpdateList,
  LedgerUpdatesByAddressParams,
  LedgerUpdatesByMilestoneParams,
  LoginResponse,
  Milestone,
  MilestonePayload,
  MilestonesParams,
  NFTJSON,
  NativeTokenIDRegistryResponse,
  NftOutputSearchParams,
  NodeInfo,
  NodeMessageMetrics,
  NodeOwnerCertificateResponse,
  OffLedgerRequest,
  OutputIdResponse,
  OutputMetadata,
  OutputResponse,
  OutputSearchParams,
  PagedBlockIdsByMilestone,
  Peer,
  PeerResponse,
  PeeringNodeIdentityResponse,
  PeeringNodeStatusResponse,
  PeeringTrustRequest,
  PruneDatabaseRequest,
  PruneDatabaseResponse,
  ReceiptResponse,
  ReceiptsResponse,
  RequestIDsResponse,
  RequestProcessedResponse,
  RichestAddressesStatistics,
  StateResponse,
  StateValueParams,
  SubmitBlock,
  TipsResponse,
  TopRichestAddressesParams,
  TreasuryResponse,
  UTXOChanges,
  UpdateUserPasswordRequest,
  UpdateUserPermissionsRequest,
  User,
  VersionResponse,
  WaitForRequestParams,
  WealthDistributionStatistics,
} from '../../../dto/rpc/IotaRpcSuite'
import { Utils } from '../../../util'

@Service()
export abstract class AbstractIotaRpc implements IotaRpcSuite {
  protected abstract post<T>(post: PostI): Promise<T>

  protected abstract get<T>(get: GetI): Promise<T>
  protected abstract delete<T>(get: GetI): Promise<T>
  protected abstract put<T>(put: PostI): Promise<T>

  private async sendGet<T>({ path, queryParams }: { path: string; queryParams?: QueryParams }): Promise<T> {
    return this.get({ path: Utils.addQueryParams({ basePath: path, queryParams: queryParams }) })
  }

  getNodeHealth(): Promise<boolean | ErrorFormat> {
    return this.get({ path: '/health' })
  }

  getAvailableRouteGroups(): Promise<string[] | ErrorFormat> {
    return this.get({ path: '/api/routes' })
  }

  getNodeInfo(): Promise<NodeInfo | ErrorFormat> {
    return this.get({ path: '/api/core/v2/info' })
  }

  getTips(): Promise<TipsResponse | ErrorFormat> {
    return this.get({ path: '/api/core/v2/tips' })
  }

  submitBlock(params: SubmitBlock): Promise<BlockIdentifier | ErrorFormat> {
    return this.post({ path: '/api/core/v2/blocks', body: params })
  }

  getBlockDataById(params: BlockIdentifier): Promise<Block | ErrorFormat> {
    return this.get({ path: `/api/core/v2/blocks/${params.blockId}` })
  }

  getBlockMetadata(params: BlockIdentifier): Promise<BlockMetadata | ErrorFormat> {
    return this.get({ path: `/api/core/v2/blocks/${params.blockId}/metadata` })
  }

  findOutputById(outputId: string): Promise<OutputResponse | ErrorFormat> {
    return this.get({ path: `/api/core/v2/outputs/${encodeURIComponent(outputId)}` })
  }

  getOutputMetadata(outputId: string): Promise<OutputMetadata | ErrorFormat> {
    return this.get({ path: `/api/core/v2/outputs/${encodeURIComponent(outputId)}/metadata` })
  }

  getAllReceipts(): Promise<ReceiptsResponse | ErrorFormat> {
    return this.get({ path: `/api/core/v2/receipts` })
  }

  getReceiptsByMigrationIndex(migratedAt: number): Promise<ReceiptsResponse | ErrorFormat> {
    return this.get({ path: `/api/core/v2/receipts/${migratedAt}` })
  }

  getTransactionIncludedBlock(transactionId: string): Promise<Block | ErrorFormat> {
    return this.get({ path: `/api/core/v2/transactions/${transactionId}/included-block` })
  }

  findIncludedBlockMetadata(transactionId: string): Promise<BlockMetadata | ErrorFormat> {
    return this.get({ path: `/api/core/v2/transactions/${transactionId}/included-block/metadata` })
  }

  getMilestoneById(milestoneId: string): Promise<MilestonePayload | ErrorFormat> {
    return this.get({ path: `/api/core/v2/milestones/${milestoneId}` })
  }

  getMilestoneUtxoChangesByMilestone(milestoneId: string): Promise<UTXOChanges | ErrorFormat> {
    return this.get({ path: `/api/core/v2/milestones/${milestoneId}/utxo-changes` })
  }

  lookupMilestoneByIndex(index: number): Promise<MilestonePayload | ErrorFormat> {
    return this.get({ path: `/api/core/v2/milestones/by-index/${index}` })
  }

  getMilestoneUtxoChangesById(index: number): Promise<UTXOChanges | ErrorFormat> {
    return this.get({ path: `/api/core/v2/milestones/by-index/${index}/utxo-changes` })
  }

  computeMerkleRouteHashes(params: ComputeWhiteFlagRequest): Promise<ComputedMerkleRootResult | ErrorFormat> {
    return this.post({ path: '/api/core/v2/whiteflag', body: params })
  }

  pruneDatabase(request: PruneDatabaseRequest): Promise<PruneDatabaseResponse | ErrorFormat> {
    return this.post({ path: '/api/core/v2/control/database/prune', body: request })
  }

  createSnapshot(requestData: CreateSnapshotsRequest): Promise<CreateSnapshotsResponse | ErrorFormat> {
    return this.post({ path: `/api/core/v2/control/snapshot/create`, body: requestData })
  }

  getTreasuryInformation(): Promise<TreasuryResponse | ErrorFormat> {
    return this.get({ path: '/api/core/v2/treasury' })
  }

  getPeerInfo(peerId: string): Promise<PeerResponse | ErrorFormat> {
    return this.get({ path: `api/core/v2/peers/${peerId}` })
  }

  getPeers(): Promise<PeerResponse | ErrorFormat> {
    return this.get({ path: '/api/core/v2/peers' })
  }

  addPeer(peerData: AddPeerRequest): Promise<Peer | ErrorFormat> {
    return this.post({ path: '/api/core/v2/peers', body: peerData })
  }

  getOutputs(params: OutputSearchParams): Promise<OutputIdResponse> {
    return this.sendGet({ path: '/api/indexer/v1/outputs', queryParams: params as QueryParams })
  }

  getBasicOutputs(params: BasicOutputSearchParams): Promise<OutputIdResponse> {
    return this.sendGet({ path: '/api/indexer/v1/outputs/basic', queryParams: params as QueryParams })
  }

  getAliasOutputs(params: AliasOutputSearchParams): Promise<OutputIdResponse> {
    return this.sendGet({ path: '/api/indexer/v1/outputs/alias', queryParams: params as QueryParams })
  }

  getCurrentUnspentAliasOutput(aliasId: string): Promise<OutputIdResponse> {
    return this.sendGet({ path: `/api/indexer/v1/outputs/alias/${aliasId}` })
  }

  getFoundryOutputs(params: FoundryOutputsFilterParams): Promise<OutputIdResponse> {
    return this.sendGet({ path: '/api/indexer/v1/outputs/foundry', queryParams: params as QueryParams })
  }

  getCurrentUnspentFoundryOutput(foundryId: string): Promise<OutputIdResponse> {
    return this.sendGet({ path: `/api/indexer/v1/outputs/foundry/${foundryId}` })
  }

  getNftOutputs(params: NftOutputSearchParams): Promise<OutputIdResponse> {
    return this.sendGet({ path: '/api/indexer/v1/outputs/nft', queryParams: params as QueryParams })
  }

  getCurrentNftOutput(nftId: string): Promise<OutputIdResponse> {
    return this.sendGet({ path: `/api/indexer/v1/outputs/nft/${nftId}` })
  }

  async getBalanceByAddress(address: string): Promise<Balance> {
    return this.sendGet<Balance>({ path: `/api/explorer/v2/balance/${address}` })
  }

  async getBlockChildren(blockId: string): Promise<BlockChildrenResponse> {
    return this.sendGet<BlockChildrenResponse>({ path: `/api/explorer/v2/blocks/${blockId}/children` })
  }

  async getMilestones(params?: MilestonesParams): Promise<Milestone> {
    return this.sendGet<Milestone>({
      path: `/api/explorer/v2/milestones`,
      queryParams: params as QueryParams,
    })
  }

  async getBlocksByMilestone(params: BlocksByMilestoneParams): Promise<PagedBlockIdsByMilestone> {
    const { milestoneId, ...rest } = params
    return this.sendGet<PagedBlockIdsByMilestone>({
      path: `/api/explorer/v2/milestones/${milestoneId}/blocks`,
      queryParams: rest,
    })
  }

  async getBlocksByMilestoneIndex(params: BlocksByMilestoneIndexParams): Promise<PagedBlockIdsByMilestone> {
    const { milestoneIndex, ...rest } = params
    return this.sendGet<PagedBlockIdsByMilestone>({
      path: `/api/explorer/v2/milestones/by-index/${milestoneIndex}/blocks`,
      queryParams: rest,
    })
  }

  async getLedgerUpdatesByAddress(params: LedgerUpdatesByAddressParams): Promise<LedgerUpdateList> {
    const { address, ...rest } = params
    return this.sendGet<LedgerUpdateList>({
      path: `/api/explorer/v2/ledger/updates/by-address/${address}`,
      queryParams: rest,
    })
  }

  async getLedgerUpdatesByMilestone(params: LedgerUpdatesByMilestoneParams): Promise<LedgerUpdateList> {
    const { milestoneId, ...rest } = params
    return this.sendGet<LedgerUpdateList>({
      path: `/api/explorer/v2/ledger/updates/by-milestone/${milestoneId}`,
      queryParams: rest,
    })
  }

  async getTopRichestAddresses(params: TopRichestAddressesParams): Promise<RichestAddressesStatistics> {
    return this.sendGet<RichestAddressesStatistics>({
      path: `/api/explorer/v2/ledger/richest-addresses`,
      queryParams: params as QueryParams,
    })
  }

  async getTokenDistribution(ledgerIndex: number): Promise<WealthDistributionStatistics> {
    return this.sendGet<WealthDistributionStatistics>({
      path: `/api/explorer/v2/ledger/token-distribution`,
      queryParams: { ledgerIndex },
    })
  }

  async authenticate(params: AuthParam): Promise<LoginResponse> {
    return this.post({
      path: '/auth',
      body: params,
    })
  }

  async authInfo(): Promise<AuthInfoModel> {
    return this.sendGet({ path: '/auth/info' })
  }

  async getChains(): Promise<ChainInfoResponse[]> {
    return this.sendGet({ path: '/v1/chains' })
  }

  async getChainInfo(params: ChainIDAndBlockParam): Promise<ChainInfoResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}`, queryParams: rest })
  }

  async removeAccessNode(params: ChainIDAndPeerParam): Promise<void> {
    const { chainID, peer } = params
    return this.delete({ path: `/v1/chains/${chainID}/remove-node/${peer}` })
  }

  async addAccessNode(params: ChainIDAndPeerParam): Promise<void> {
    const { chainID, peer } = params
    return this.put({ path: `/v1/chains/${chainID}/access-node/${peer}` })
  }

  async activateChain(params: ChainIDParam): Promise<void> {
    return this.post({ path: `/v1/chains/${params.chainID}/activate` })
  }

  async callView(params: CallViewParamsChainId): Promise<JSONDict> {
    const { chainID, ...rest } = params
    return this.post({ path: `/v1/chains/${chainID}/callview`, body: rest })
  }

  async setChainRecord(params: ChainRecord): Promise<void> {
    const { chainID, ...rest } = params
    return this.post({ path: `/v1/chains/${params.chainID}/chainrecord`, body: rest })
  }

  async getCommitteeInfo(params: ChainIDAndBlockParam): Promise<CommitteeNode> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/committee`, queryParams: rest })
  }

  async getContracts(params: ChainIDAndBlockParam): Promise<ContractInfoResponse[]> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${params.chainID}/contracts`, queryParams: rest })
  }

  async getAccounts(params: ChainIDAndBlockParam): Promise<AccountListResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/accounts`, queryParams: rest })
  }

  async accountsGetAccountBalance(params: ChainIDAndAgentIDParam): Promise<AssetsResponse> {
    const { chainID, agentID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/accounts/${agentID}/balance`, queryParams: rest })
  }

  async accountsGetAccountFoundries(params: ChainIDAndAgentIDParam): Promise<AccountFoundriesResponse> {
    const { chainID, agentID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/accounts/${agentID}/foundries`,
      queryParams: rest,
    })
  }

  async accountsGetAccountNFTIDs(params: ChainIDAndAgentIDParam): Promise<AccountNFTsResponse> {
    const { chainID, agentID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/accounts/${agentID}/nfts`, queryParams: rest })
  }

  async accountsGetAccountNonce(params: ChainIDAndAgentIDParam): Promise<AccountNonceResponse> {
    const { chainID, agentID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/accounts/${agentID}/nonce`, queryParams: rest })
  }

  async accountsGetFoundryOutput(params: ChainIDAndSerialNumberParam): Promise<FoundryOutputResponse> {
    const { chainID, serialNumber, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/accounts/foundry_output/${serialNumber}`,
      queryParams: rest,
    })
  }

  async accountsGetNFTData(params: ChainIDAndNftIDParam): Promise<NFTJSON> {
    const { chainID, nftID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/accounts/nftdata/${nftID}`, queryParams: rest })
  }

  async accountsGetNativeTokenIDRegistry(
    params: ChainIDAndBlockParam,
  ): Promise<NativeTokenIDRegistryResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/accounts/token_registry`,
      queryParams: rest,
    })
  }

  async accountsGetTotalAssets(params: ChainIDAndBlockParam): Promise<AssetsResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/accounts/total_assets`, queryParams: rest })
  }

  async blobsGetAllBlobs(params: ChainIDAndBlockParam): Promise<BlobListResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/blobs`, queryParams: rest })
  }

  async blobsGetBlobInfo(params: ChainIDAndBlobHashParam): Promise<BlobInfoResponse> {
    const { chainID, blobHash, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/blobs/${blobHash}`, queryParams: rest })
  }

  async blobsGetBlobValue(params: ChainIDAndBlobHashParam): Promise<BlobValueResponse> {
    const { chainID, blobHash, fieldKey, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blobs/${blobHash}/data/${fieldKey}`,
      queryParams: rest,
    })
  }

  async blocklogGetLatestBlockInfo(params: ChainIDAndBlockParam): Promise<BlockInfoResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/blocklog/blocks/latest`, queryParams: rest })
  }

  async blocklogGetRequestReceiptsOfLatestBlock(params: ChainIDAndBlockParam): Promise<ReceiptResponse[]> {
    const { chainID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/blocks/latest/receipts`,
      queryParams: rest,
    })
  }

  async blocklogGetRequestIDsForLatestBlock(params: ChainIDAndBlockParam): Promise<RequestIDsResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/blocks/latest/requestids`,
      queryParams: rest,
    })
  }

  async blocklogGetBlockInfo(params: ChainIDAndBlockIndexParam): Promise<BlockInfoResponse> {
    const { chainID, blockIndex, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/blocks/${blockIndex}`,
      queryParams: rest,
    })
  }

  async blocklogGetRequestReceiptsOfBlock(params: ChainIDAndBlockIndexParam): Promise<ReceiptResponse[]> {
    const { chainID, blockIndex, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/blocks/${blockIndex}/receipts`,
      queryParams: rest,
    })
  }

  async blocklogGetRequestIDsForBlock(params: ChainIDAndBlockIndexParam): Promise<RequestIDsResponse> {
    const { chainID, blockIndex, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/blocks/${blockIndex}/requestids`,
      queryParams: rest,
    })
  }

  async blocklogGetControlAddresses(params: ChainIDAndBlockParam): Promise<ControlAddressesResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/controladdresses`,
      queryParams: rest,
    })
  }

  async blocklogGetEventsOfLatestBlock(params: ChainIDAndBlockParam): Promise<EventsResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/events/latest`,
      queryParams: rest,
    })
  }

  async blocklogGetEventsOfBlock(params: ChainIDAndBlockIndexParam): Promise<EventsResponse> {
    const { chainID, blockIndex, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/events/${blockIndex}`,
      queryParams: rest,
    })
  }

  async blocklogGetEventsOfContract(params: ChainIDAndContractHnameParam): Promise<EventsResponse> {
    const { chainID, contractHname, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/events/contract/${contractHname}`,
      queryParams: rest,
    })
  }

  async blocklogGetEventsOfRequest(params: ChainIDAndRequestIDParam): Promise<EventsResponse> {
    const { chainID, requestID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/events/request/${requestID}`,
      queryParams: rest,
    })
  }

  async blocklogGetRequestReceipt(params: ChainIDAndRequestIDParam): Promise<ReceiptResponse> {
    const { chainID, requestID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/requests/${requestID}`,
      queryParams: rest,
    })
  }

  async blocklogGetRequestIsProcessed(params: ChainIDAndRequestIDParam): Promise<RequestProcessedResponse> {
    const { chainID, requestID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/blocklog/requests/${requestID}/processed`,
      queryParams: rest,
    })
  }

  async errorsGetErrorMessageFormat(
    params: ChainIDAndContractHnameErrorParam,
  ): Promise<ErrorMessageFormatResponse> {
    const { chainID, contractHname, errorID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/errors/${contractHname}/message/${errorID}`,
      queryParams: rest,
    })
  }

  async getAllowedStateControllerAddresses(
    params: ChainIDAndBlockParam,
  ): Promise<GovAllowedStateControllerAddressesResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({
      path: `/v1/chains/${chainID}/core/governance/allowedstatecontrollers`,
      queryParams: rest,
    })
  }

  async governanceGetChainInfo(params: ChainIDAndBlockParam): Promise<GovChainInfoResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/governance/chaininfo`, queryParams: rest })
  }

  async governanceGetChainOwner(params: ChainIDAndBlockParam): Promise<GovChainOwnerResponse> {
    const { chainID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/core/governance/chainowner`, queryParams: rest })
  }

  async deactivateChain(params: ChainIDParam): Promise<void> {
    return this.post({ path: `/v1/chains/${params.chainID}/deactivate` })
  }

  async estimateGasOffledger(
    params: ChainIDParam,
    requestBody: EstimateGasRequestOffledger,
  ): Promise<ReceiptResponse> {
    return this.post({ path: `/v1/chains/${params.chainID}/estimategas-offledger`, body: requestBody })
  }

  async estimateGasOnledger(
    params: ChainIDParam,
    requestBody: EstimateGasRequestOnledger,
  ): Promise<ReceiptResponse> {
    return this.post({ path: `/v1/chains/${params.chainID}/estimategas-onledger`, body: requestBody })
  }

  async submitJSONRPCRequest(params: ChainIDParam): Promise<any> {
    return this.post({ path: `/v1/chains/${params.chainID}/evm`, body: {} })
  }

  async getMempoolContents(params: ChainIDParam): Promise<number[]> {
    return this.sendGet({ path: `/v1/chains/${params.chainID}/mempool` })
  }

  async getReceipt(params: ChainIDAndRequestIDParam): Promise<ReceiptResponse> {
    const { chainID, requestID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/receipts/${requestID}`, queryParams: rest })
  }

  async waitForRequest(params: WaitForRequestParams): Promise<ReceiptResponse> {
    const { chainID, requestID, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/requests/${requestID}/wait`, queryParams: rest })
  }

  async getStateValue(params: StateValueParams): Promise<StateResponse> {
    const { chainID, stateKey, ...rest } = params
    return this.sendGet({ path: `/v1/chains/${chainID}/state/${stateKey}`, queryParams: rest })
  }

  async getChainMessageMetrics(params: ChainIDParam): Promise<ChainMessageMetrics> {
    return this.sendGet({ path: `/v1/metrics/chains/${params.chainID}/messages` })
  }

  async getChainPipeMetrics(params: ChainIDParam): Promise<ConsensusPipeMetrics> {
    return this.sendGet({ path: `/v1/metrics/chains/${params.chainID}/pipes` })
  }

  async getChainWorkflowMetrics(params: ChainIDParam): Promise<ConsensusWorkflowMetrics> {
    return this.sendGet({ path: `/v1/metrics/chains/${params.chainID}/workflows` })
  }

  async getNodeMessageMetrics(): Promise<NodeMessageMetrics> {
    return this.sendGet({ path: `/v1/metrics/node/messages` })
  }

  async getConfiguration(): Promise<any> {
    return this.sendGet({ path: `/v1/node/config` })
  }

  async generateDKS(params: DKSharesPostRequest): Promise<DKSharesInfo> {
    return this.post({ path: `/v1/node/dks`, body: params })
  }

  async getDKSInfo(sharedAddress: string): Promise<DKSharesInfo> {
    return this.sendGet({ path: `/v1/node/dks/${sharedAddress}` })
  }

  async getInfo(): Promise<InfoResponse> {
    return this.sendGet({ path: `/v1/node/info` })
  }

  async ownerCertificate(): Promise<NodeOwnerCertificateResponse> {
    return this.sendGet({ path: `/v1/node/owner/certificate` })
  }

  async getAllPeers(): Promise<PeeringNodeStatusResponse[]> {
    return this.sendGet({ path: `/v1/node/peers` })
  }

  async getPeeringIdentity(): Promise<PeeringNodeIdentityResponse> {
    return this.sendGet({ path: `/v1/node/peers/identity` })
  }

  async getTrustedPeers(): Promise<PeeringNodeIdentityResponse[]> {
    return this.sendGet({ path: `/v1/node/peers/trusted` })
  }

  async trustPeer(requestBody: PeeringTrustRequest): Promise<void> {
    return this.post({ path: `/v1/node/peers/trusted`, body: requestBody })
  }

  async distrustPeer(peer: string): Promise<void> {
    return this.delete({ path: `/v1/node/peers/trusted/${peer}` })
  }

  async shutdownNode(): Promise<void> {
    return this.post({ path: `/v1/node/shutdown` })
  }

  async getVersion(): Promise<VersionResponse> {
    return this.sendGet({ path: `/v1/node/version` })
  }

  async offLedger(requestBody: OffLedgerRequest): Promise<void> {
    return this.post({ path: `/v1/requests/offledger`, body: requestBody })
  }

  async getUsers(): Promise<User[]> {
    return this.sendGet({ path: `/v1/users` })
  }

  async addUser(body: AddUserRequest): Promise<void> {
    return this.post({ path: `/v1/users`, body })
  }

  async deleteUser(username: string): Promise<void> {
    return this.delete({ path: `/v1/users/${username}` })
  }

  async getUser(username: string): Promise<User> {
    return this.sendGet({ path: `/v1/users/${username}` })
  }

  async changeUserPassword(params: UpdateUserPasswordRequest): Promise<void> {
    return this.put({ path: `/v1/users/${params.username}/password`, body: params })
  }

  async changeUserPermissions(params: UpdateUserPermissionsRequest): Promise<void> {
    return this.put({ path: `/v1/users/${params.username}/permissions`, body: params })
  }
}
