import { JsonRpcCall } from '../JsonRpcCall.dto'
import { JsonRpcResponse } from '../JsonRpcResponse.dto'

export interface AbstractJsonRpcSuite {
  rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse>
  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse[]>
}
