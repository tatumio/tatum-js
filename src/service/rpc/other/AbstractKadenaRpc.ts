/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from 'typedi'
import { QueryParams } from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { PostI } from '../../../dto/PostI'
import {
  ApiParams,
  Base64HashesPage,
  Base64UrlBlockHeader,
  BlockHashesPage,
  ChainwebNodeInfo,
  Cut,
  GetBlockHeaderByHashParams,
  GetBlockParams,
  GetBlockParamsLowerUpper,
  GetBlockPayloadWithOutputsParams,
  GetCurrentCutParams,
  GetCutNetworkPeerInfoParams,
  GetPayloadByHashParams,
  GetPendingTransactionsParams,
  InsertTransactionIntoMempoolParams,
  KadenaRpcInterface,
  MempoolTransactionsParams,
  NetworkParams,
  Payload,
  PayloadRequest,
  PayloadWithOutputs,
  Peer,
  PendingTransactionsResponse,
  SignedTransactionText,
} from '../../../dto/rpc/KadenaRpcSuite'
import { Utils } from '../../../util'

interface RequestI {
  path: string
  body?: any
  notConvertCamelToSnake?: boolean
  queryParams?: QueryParams
  network?: NetworkParams | ApiParams
}

@Service()
export abstract class AbstractKadenaRpc implements KadenaRpcInterface {
  protected abstract post<T>(post: PostI): Promise<T>
  protected abstract put<T>(post: PostI): Promise<T>
  protected abstract get<T>(get: GetI): Promise<T>
  abstract destroy(): void
  abstract getRpcNodeUrl(): string

  private urlWithPrefix({ apiVersion, chain, nodeVersion }: Partial<NetworkParams>): string {
    if (chain) {
      return `chainweb/${apiVersion}/${nodeVersion}/chain/${chain}/`
    }
    return `chainweb/${apiVersion}/${nodeVersion}/`
  }

  private prepareRequest({ path, body, queryParams, network }: RequestI): PostI {
    return {
      path: Utils.addQueryParams({
        basePath: path,
        strategy: Utils.camelToDashCase,
        queryParams: queryParams,
      }),
      prefix: network ? this.urlWithPrefix(network) : undefined,
      body,
    }
  }

  private sendPost<T>(request: RequestI): Promise<T> {
    return this.post(this.prepareRequest(request))
  }

  private sendPut<T>(request: RequestI): Promise<T> {
    return this.put(this.prepareRequest(request))
  }

  private async sendGet<T>({
    path,
    queryParams,
    network,
  }: {
    path: string
    queryParams?: QueryParams
    network?: NetworkParams | ApiParams
  }): Promise<T> {
    return this.get({
      path: Utils.addQueryParams({
        basePath: path,
        strategy: Utils.camelToDashCase,
        queryParams: queryParams,
      }),
      prefix: network ? this.urlWithPrefix(network) : undefined,
    })
  }

  getCurrentCut(params: GetCurrentCutParams): Promise<Cut> {
    const { network, ...rest } = params
    return this.sendGet({ path: `/cut`, queryParams: rest, network })
  }

  publishCut(params: Cut): Promise<void> {
    const { network, ...rest } = params
    return this.sendPut({ path: '/cut', body: rest, network })
  }

  getBlockHashes(params: GetBlockParams): Promise<BlockHashesPage> {
    const { network, query } = params
    return this.sendGet({
      path: `/hash`,
      queryParams: query,
      network,
    })
  }

  getBlockHashBranches(params: GetBlockParamsLowerUpper): Promise<BlockHashesPage> {
    const { network, query, ...rest } = params
    return this.sendPost({
      path: `/hash/branch`,
      queryParams: query,
      body: rest,
      network,
    })
  }

  getBlock(params: GetBlockParams): Promise<BlockHashesPage> {
    const { network, query } = params
    return this.sendGet({
      path: `/block`,
      queryParams: query,
      network,
    })
  }

  getBlockBranches(params: GetBlockParamsLowerUpper): Promise<BlockHashesPage> {
    const { network, query, ...rest } = params
    return this.sendPost({
      path: `/block/branch`,
      queryParams: query,
      body: rest,
    })
  }

  getBlockHeaders(params: GetBlockParams): Promise<Base64HashesPage> {
    const { network, query } = params
    return this.sendGet({
      path: `/header`,
      queryParams: query,
      network,
    })
  }

  getBlockHeaderByHash(params: GetBlockHeaderByHashParams): Promise<Base64UrlBlockHeader> {
    const { network, blockHash } = params
    return this.sendGet({
      path: `/header/${blockHash}`,
      network,
    })
  }

  getBlockHeaderBranches(params: GetBlockParamsLowerUpper): Promise<BlockHashesPage> {
    const { network, query, ...rest } = params
    return this.sendPost({
      path: `/header/branch`,
      queryParams: query,
      body: rest,
      network,
    })
  }

  getPayloadByHash(params: GetPayloadByHashParams): Promise<Payload> {
    const { network, payloadHash, height } = params
    return this.sendGet({
      path: `/payload/${payloadHash}`,
      queryParams: { height },
      network,
    })
  }

  getBatchOfBlockPayload(params: PayloadRequest): Promise<Payload[]> {
    const { network, body } = params
    return this.sendPost({
      path: `/payload/batch`,
      body: body,
      network,
    })
  }

  getBlockPayloadWithOutputs(params: GetBlockPayloadWithOutputsParams): Promise<PayloadWithOutputs> {
    const { network, payloadHash, height } = params
    return this.sendGet({
      path: `/payload/${payloadHash}/outputs`,
      queryParams: { height },
      network,
    })
  }

  getBatchBlockPayloadWithOutputs(params: PayloadRequest): Promise<Array<PayloadWithOutputs>> {
    const { network, body } = params
    return this.sendPost({
      path: `/payload/outputs/batch`,
      body,
      network,
    })
  }

  getPendingTransactions(params: GetPendingTransactionsParams): Promise<PendingTransactionsResponse> {
    const { network, ...rest } = params
    return this.sendGet({
      path: `/mempool/getPending`,
      queryParams: rest,
      network,
    })
  }

  checkPendingTransactionsInMempool(params: MempoolTransactionsParams): Promise<boolean[]> {
    const { network, headers } = params
    return this.sendPost({
      path: `/mempool/member`,
      body: headers,
      network,
    })
  }

  lookupMempoolTransactions(
    params: MempoolTransactionsParams,
  ): Promise<Array<{ tag: 'Missing' | 'Pending'; contents?: SignedTransactionText }>> {
    const { network, headers } = params
    return this.sendPost({
      path: `/mempool/lookup`,
      body: headers,
      network,
    })
  }

  insertTransactionsIntoMempool(params: InsertTransactionIntoMempoolParams): Promise<void> {
    const { network, body } = params
    return this.sendPut({
      path: `/mempool/insert`,
      body,
      network,
    })
  }

  checkNodeHealth(): Promise<string> {
    return this.sendGet({
      path: '/health',
    })
  }

  getNodeInfo(): Promise<ChainwebNodeInfo> {
    return this.sendGet({
      path: '/info',
    })
  }

  getCutNetworkPeerInfo(
    params: GetCutNetworkPeerInfoParams,
  ): Promise<{ items: Peer[]; page: BlockHashesPage }> {
    const { network, next, limit } = params
    return this.sendGet({
      path: '/cut/peer',
      queryParams: {
        limit,
        next,
      },
      network,
    })
  }

  putCutNetworkPeerInfo(peerData: Peer): Promise<void> {
    return this.sendPut({
      path: '/cut/peer',
      body: peerData,
    })
  }
}
