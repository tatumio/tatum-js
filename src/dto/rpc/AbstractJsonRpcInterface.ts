import { JsonRpcCall } from '../JsonRpcCall.dto'
import { JsonRpcResponse } from '../JsonRpcResponse.dto'

export interface AbstractRpcInterface {
  rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>>
  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[]>
  destroy(): void
}
