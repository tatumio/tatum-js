import { JsonRpcCall } from '../JsonRpcCall.dto'
import { JsonRpcResponse } from '../JsonRpcResponse.dto'

export interface AbstractRpcInterface {
  rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<unknown>>
  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<unknown>[]>
  destroy(): void
}
