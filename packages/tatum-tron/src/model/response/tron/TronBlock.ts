import { TronTransaction } from './TronTransaction'

export interface TronBlock {
  hash: string
  blockNumber: number
  timestamp: number
  parentHash: string
  witnessAddress: string
  witnessSignature: string
  transactions: TronTransaction[]
}
