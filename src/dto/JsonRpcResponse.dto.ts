/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JsonRpcResponse {
  id: number | string
  jsonrpc: string
  result?: any
  error?: any
}
