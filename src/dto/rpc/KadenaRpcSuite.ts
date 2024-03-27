/* eslint-disable @typescript-eslint/no-explicit-any */

export type ChainwebVersion = 'test-singleton' | 'development' | 'mainnet01' | 'testnet04'

export type SignedTransactionText = string

export interface SHA256Hash {
  hash: string
}

export type Base64UrlBlockHeader = string

export interface Payload {
  transactions: string[]
  minerData: string
  transactionsHash: SHA256Hash
  outputsHash: SHA256Hash
  payloadHash: SHA256Hash
}

export interface PayloadWithOutputs {
  transactions: [
    {
      Base64Url: string
      description: string
    },
    {
      Base64Url: string
      description: string
    },
  ][]
  minerData: string
  transactionsHash: SHA256Hash
  outputsHash: SHA256Hash
  payloadHash: SHA256Hash
  coinbase: string
}

export interface Peer {
  id: string | null
  address: {
    hostname: string
    port: number
  }
  network: NetworkParams
}

export interface Cut {
  origin: Peer
  height: number
  weight: string
  hashes: {
    [key: string]: HashWithBlockHeight
  }
  instance?: string
  id?: string
  network: ApiParams
}

export interface HashWithBlockHeight {
  hash: string
  height: number
}

export interface ChainwebNodeInfo {
  nodeNumberOfChains: number
  nodeApiVersion: string
  nodeChains: string[]
  nodeVersion: ChainwebVersion
  nodeLatestBehaviorHeight: number
  nodeGraphHistory: [
    number,
    {
      [chainId: number]: number[]
    },
  ][]
}

export interface BlockHashesPage {
  limit: number
  next: string | null
  items: any[]
}

export interface Base64HashesPage {
  limit: number
  next: string | null
  items: Base64UrlBlockHeader[]
}

export type PayloadHashArray = Array<SHA256Hash>

export interface PayloadBatchQuery {
  heights: number[]
  hashes: SHA256Hash[]
}

export interface PayloadRequest {
  body: PayloadBatchQuery | PayloadHashArray
  network: NetworkParams
}

export interface GetBlockParams {
  query?: {
    limit?: number
    next?: string
    minheight?: number
    maxheight?: number
  }
  network: NetworkParams
}

export interface NetworkParams {
  chain: string
  nodeVersion: ChainwebVersion
  apiVersion: string
}

export interface ApiParams {
  nodeVersion: ChainwebVersion
  apiVersion: string
}

export interface PendingTransactionsResponse {
  hashes: string[]
  highwaterMark: [number, number]
}

export interface GetBlockParamsLowerUpper extends GetBlockParams {
  lower: string[]
  upper: string[]
}

export interface GetCurrentCutParams {
  maxheight?: number
  network: ApiParams
}

export interface GetCutNetworkPeerInfoParams {
  limit?: string
  next?: string
  network: NetworkParams
}

export interface InsertTransactionIntoMempoolParams {
  body: string[]
  network: NetworkParams
}

export interface MempoolTransactionsParams {
  headers: Base64UrlBlockHeader[]
  network: NetworkParams
}

export interface GetBlockHeaderByHashParams {
  blockHash: string
  network: NetworkParams
}

export interface GetPayloadByHashParams {
  payloadHash: string
  height?: number
  network: NetworkParams
}

export interface GetBlockPayloadWithOutputsParams {
  payloadHash: string
  height: number
  network: NetworkParams
}

export interface GetPendingTransactionsParams {
  nonce?: number
  since?: number
  network: NetworkParams
}

export interface KadenaRpcInterface {
  getCurrentCut(params: GetCurrentCutParams): Promise<Cut>
  publishCut(params: Cut): Promise<void>
  getCutNetworkPeerInfo(params: GetCutNetworkPeerInfoParams): Promise<{
    items: Peer[]
    page: BlockHashesPage
  }>
  putCutNetworkPeerInfo(params: Peer & NetworkParams): Promise<void>
  getBlockHashes(params: GetBlockParams): Promise<BlockHashesPage>
  getBlockHashBranches(params: GetBlockParamsLowerUpper): Promise<BlockHashesPage>
  getBlock(params: GetBlockParams): Promise<BlockHashesPage>
  getBlockBranches(params: GetBlockParamsLowerUpper): Promise<BlockHashesPage>
  getBlockHeaders(params: GetBlockParams): Promise<Base64HashesPage>
  getBlockHeaderByHash(params: GetBlockHeaderByHashParams): Promise<Base64UrlBlockHeader>
  getBlockHeaderBranches(params: GetBlockParamsLowerUpper): Promise<BlockHashesPage>
  getPayloadByHash(params: GetPayloadByHashParams): Promise<Payload>
  getBatchOfBlockPayload(params: PayloadRequest): Promise<Payload[]>
  getBlockPayloadWithOutputs(params: GetBlockPayloadWithOutputsParams): Promise<PayloadWithOutputs>
  getBatchBlockPayloadWithOutputs(params: PayloadRequest): Promise<Array<PayloadWithOutputs>>
  getPendingTransactions(params: GetPendingTransactionsParams): Promise<PendingTransactionsResponse>
  checkPendingTransactionsInMempool(params: MempoolTransactionsParams): Promise<boolean[]>
  lookupMempoolTransactions(
    params: MempoolTransactionsParams,
  ): Promise<Array<{ tag: 'Missing' | 'Pending'; contents?: SignedTransactionText }>>
  insertTransactionsIntoMempool(params: InsertTransactionIntoMempoolParams): Promise<void>
  checkNodeHealth(): Promise<string>
  getNodeInfo(): Promise<ChainwebNodeInfo>
}
