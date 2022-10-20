export type Web3Request = {
  id: number
  method: string
  params: any[]
  jsonrpc?: string
}

export type Web3Response = {
  jsonrpc: string
  id: number
  result: unknown
}
