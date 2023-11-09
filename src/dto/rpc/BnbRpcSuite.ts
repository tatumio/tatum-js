/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcResponse } from '../JsonRpcResponse.dto'

export interface Height {
  height: string
}

export interface AbciQuery {
  path: string
  data: string
  height?: string
  prove?: boolean
}

export interface Validators {
  height?: string
  page?: string
  perPage?: string
}

export interface Tx {
  hash: string
  prove?: boolean
}

export interface TxSearch {
  query: string
  prove?: boolean
  page?: string
}

export interface Broadcast {
  tx: string
}

export interface Blockchain {
  minHeight?: string
  maxHeight?: string
}

export interface UnconfirmedTxs {
  limit?: string
}

export interface BnbRpcInterface {
  status(): Promise<JsonRpcResponse<any>>
  abciInfo(): Promise<JsonRpcResponse<any>>
  abciQuery(params: AbciQuery): Promise<JsonRpcResponse<any>>
  block(params?: Height): Promise<JsonRpcResponse<any>>
  blockResult(params?: Height): Promise<JsonRpcResponse<any>>
  blockchain(params?: Blockchain): Promise<JsonRpcResponse<any>>
  commit(params?: Height): Promise<JsonRpcResponse<any>>
  tx(params: Tx): Promise<JsonRpcResponse<any>>
  broadcastTxAsync(params: Broadcast): Promise<JsonRpcResponse<any>>
  broadcastTxCommit(params: Broadcast): Promise<JsonRpcResponse<any>>
  broadcastTxSync(params: Broadcast): Promise<JsonRpcResponse<any>>
  txSearch(params: TxSearch): Promise<JsonRpcResponse<any>>
  validators(params?: Validators): Promise<JsonRpcResponse<any>>
  unconfirmedTxs(params: UnconfirmedTxs): Promise<JsonRpcResponse<any>>
  genesis(): Promise<JsonRpcResponse<any>>
  health(): Promise<JsonRpcResponse<any>>
  netInfo(): Promise<JsonRpcResponse<any>>
  numUnconfirmedTxs(): Promise<JsonRpcResponse<any>>
}

export interface JsonBnbRpcCall {
  id: number | string
  jsonrpc: string
  method: string
  params?: Params
}

export interface Params {
  [key: string]: unknown
}

export interface AbstractBnbRpcInterface {
  rawRpcCall(body: JsonBnbRpcCall): Promise<JsonRpcResponse<any>>
  destroy(): void
  getRpcNodeUrl(): string
}

export interface BnbRpcSuite extends BnbRpcInterface, AbstractBnbRpcInterface {}
