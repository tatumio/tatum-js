/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcCall } from '../JsonRpcCall.dto'
import { JsonRpcResponse } from '../JsonRpcResponse.dto'

export interface AbstractRpcInterface {
  rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>>
  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>>
  destroy(): void
  getRpcNodeUrl(): string
}
