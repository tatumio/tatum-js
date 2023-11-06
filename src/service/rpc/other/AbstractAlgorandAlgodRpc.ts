/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryParams } from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { PostI } from '../../../dto/PostI'
import {
  Account,
  AccountApplicationRequest,
  AccountApplicationResponse,
  AccountAssetRequest,
  AccountAssetResponse,
  AccountInfoRequest,
  AlgorandAlgodRpcSuite,
  Application,
  Asset,
  BlockHashRequest,
  BlockHashResponse,
  BlockTransactionIDsResponse,
  Box,
  BoxesRequestParams,
  BoxesResponse,
  BoxRequestParams,
  GetLightBlockHeaderProofParams,
  LedgerStateDelta,
  LedgerSupplyResponse,
  LightBlockHeaderProof,
  NodeStatus,
  NodeStatusResponse,
  PendingTransactionResponse,
  PendingTransactionsRequest,
  PendingTransactionsResponse,
  SimulateRequest,
  SimulateResponse,
  SyncRoundRequest,
  TransactionBroadcastRequest,
  TransactionBroadcastResponse,
  TransactionParams,
  TransactionProof,
  TransactionProofParams,
} from '../../../dto/rpc/AlgorandAlgodRpcSuite'
import { Utils } from '../../../util'

export abstract class AbstractAlgorandAlgodRpc implements AlgorandAlgodRpcSuite {
  protected abstract post<T>(post: PostI): Promise<T>
  protected abstract get<T>(get: GetI): Promise<T>

  private sendPost<T>({
    path,
    body,
    queryParams,
  }: {
    path: string
    body?: any
    queryParams?: QueryParams
  }): Promise<T> {
    const post: PostI = {
      path: Utils.addQueryParams(path, Utils.camelToDashCase, queryParams),
    }

    if (body) {
      post.body = Utils.convertObjCamelToSnake(body)
    }

    return this.post(post)
  }

  private async sendGet<T>({ path, queryParams }: { path: string; queryParams?: QueryParams }): Promise<T> {
    return this.get({ path: Utils.addQueryParams(path, Utils.camelToDashCase, queryParams) })
  }

  broadcastTransaction(params: TransactionBroadcastRequest): Promise<TransactionBroadcastResponse> {
    return this.sendPost({ path: '/v2/transactions', body: params })
  }

  getAccountApplicationInfo(params: AccountApplicationRequest): Promise<AccountApplicationResponse> {
    const { applicationId, address, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${address}/applications/${applicationId}`, queryParams: rest })
  }

  getAccountAssetInfo(params: AccountAssetRequest): Promise<AccountAssetResponse> {
    const { assetId, address, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${address}/assets/${assetId}`, queryParams: rest })
  }

  getAccountInfo(params: AccountInfoRequest): Promise<Account> {
    const { address, ...rest } = params
    return this.sendGet({ path: `/v2/accounts/${address}`, queryParams: rest })
  }

  getApplicationBox(params: BoxRequestParams): Promise<Box> {
    const { applicationId, ...rest } = params
    return this.sendGet({ path: `/v2/applications/${applicationId}/box`, queryParams: rest })
  }

  getApplicationBoxes(params: BoxesRequestParams): Promise<BoxesResponse> {
    const { applicationId, ...rest } = params
    return this.sendGet({ path: `/v2/applications/${applicationId}/boxes`, queryParams: rest })
  }

  getApplicationInfo(params: { applicationId: number }): Promise<Application> {
    const { applicationId } = params
    return this.sendGet({ path: `/v2/applications/${applicationId}` })
  }

  getAssetInformation(params: { assetId: number }): Promise<Asset> {
    const { assetId } = params
    return this.sendGet({ path: `/v2/assets/${assetId}` })
  }

  getBlockHash(params: BlockHashRequest): Promise<BlockHashResponse> {
    const { round } = params
    return this.sendGet({ path: `/v2/blocks/${round}` })
  }

  getBlockTransactionIDs(params: { round: number }): Promise<BlockTransactionIDsResponse> {
    const { round } = params
    return this.sendGet({ path: `/v2/blocks/${round}/txids` })
  }

  getGenesis(): Promise<string> {
    return this.sendGet({ path: '/genesis' })
  }

  getLedgerStateDelta(params: { round: number }): Promise<LedgerStateDelta> {
    const { round } = params
    return this.sendGet({ path: `/v2/deltas/${round}` })
  }

  getLedgerSupply(): Promise<LedgerSupplyResponse> {
    return this.sendGet({ path: '/v2/ledger/supply' })
  }

  getLightBlockHeaderProofParams(params: GetLightBlockHeaderProofParams): Promise<LightBlockHeaderProof> {
    const { round } = params
    return this.sendGet({ path: `/v2/blocks/${round}/lightheader/proof` })
  }

  getNodeStatus(): Promise<NodeStatusResponse> {
    return this.sendGet({ path: '/v2/status' })
  }

  getNodeStatusAfterRound(params: { round: number }): Promise<NodeStatus> {
    const { round } = params
    return this.sendGet({ path: `/v2/status/wait-for-block-after/${round}` })
  }

  getPendingTransaction(params: { txid: string }): Promise<PendingTransactionResponse> {
    const { txid } = params
    return this.sendGet({ path: `/v2/transactions/pending/${txid}` })
  }

  getPendingTransactions(params: PendingTransactionsRequest): Promise<PendingTransactionsResponse> {
    return this.sendGet({ path: '/v2/transactions/pending', queryParams: { ...params } })
  }

  getTransactionParams(): Promise<TransactionParams> {
    return this.sendGet({ path: '/v2/transactions/params' })
  }

  getTransactionProof(params: TransactionProofParams): Promise<TransactionProof> {
    const { txid, round } = params
    return this.sendGet({ path: `/v2/blocks/${round}/transactions/${txid}/proof` })
  }

  isHealthy(): Promise<void> {
    return this.sendGet({ path: '/health' })
  }

  isReady(): Promise<void> {
    return this.sendGet({ path: '/ready' })
  }

  simulateTransaction(params: SimulateRequest): Promise<SimulateResponse> {
    const { request, ...rest } = params
    return this.sendPost({ path: '/v2/transactions/simulate', body: { request }, queryParams: rest })
  }

  syncLedgerRound(request: SyncRoundRequest): Promise<void> {
    const { round } = request
    return this.sendPost({ path: `/v2/ledger/sync/${round}` })
  }
}
