/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JsonRpcResponse<T> {
  id: number | string
  jsonrpc: string
  result?: T
  error?: any
}
