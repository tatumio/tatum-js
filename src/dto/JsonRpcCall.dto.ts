/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JsonRpcCall {
  id: number | string
  jsonrpc: string
  method: string
  params?: any[]
}
