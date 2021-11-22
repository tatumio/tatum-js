/**
 *
 * @export
 * @interface EgldTransaction
 */

export interface EgldReceipt {
  value: number
  sender: string
  data: string
  txHash: string
}

export interface EgldSmartContractResult {
  hash: string
  nonce: number
  value: number
  receiver: string
  sender: string
  data: string
  prevTxHash: string
  originalTxHash: string
  gasLimit: number
  gasPrice: number
  callType: number
}

export interface EgldTransaction {
  type: string
  nonce: number
  round: number
  epoch: number
  value: string
  receiver: string
  sender: string
  gasPrice: number
  gasLimit: number
  data: string
  signature: string
  sourceShard: number
  destinationShard: number
  blockNonce: number
  blockHash: string
  miniblockHash: string
  timestamp: number
  status: string
  hyperblockNonce: number
  hyperblockHash: string
  receipt: EgldReceipt
  smartContractResults: EgldSmartContractResult[]
}
