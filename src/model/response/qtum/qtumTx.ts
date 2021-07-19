export class QtumIRawTransactions{
    totalItems: number
    from: number
    to: number
    items: QtumTransactionObj[]
}
export class QtumTransactionObj{
  txid: string
  version: number
  locktime: number
  isqrc20Transfer: boolean
  vin: VInput[]
  vout: VOutput[]
  blockhash: string
  blockheight: number
  confirmations: number
  time: number
  blocktime: number
  valueOut: string
  size: number
  valueIn: string
  fees: string
}
export class VInput{
  txid: string
  vout: number
  sequence: number
  n: number
  addr: string
  valueSat: number
  value: string
  doubleSpentTxID: string
  scriptSig: {
      hex: string
      asm: string
  }
}
export class VOutput{
  value: string
  n: number
  spentTxId: string
  spentIndex: string
  spentHeight: string
  scriptPubKey: {
      hex: string
      asm: string
  }
}
export class QtumIRawTransactionInfo {
  txid: string
  version: number
  locktime: number
  receipt: QtumITransactionReceipt[]
  vin: IInput[]
  vout: IOutput[]
  confirmations: number
  time: number
  valueOut: number
  valueIn: number
  fees: number
  blockhash: string
  blockheight: number
  isqrc20Transfer: boolean
}
export interface QtumITransactionReceipt {
  blockHash: string
  blockNumber: number
  transactionHash: string
  transactionIndex: number
  from: string
  to: string
  cumulativeGasUsed: string
  gasUsed: number
  contractAddress: string
  excepted: string
  log: any[]
}
export interface QtumISendRawTxResult {
  txid: string
}
export interface IOutput {
  value: string
  address?: string
  script?: Buffer
  scriptPubKey: {
    hex: string,
    asm: string,
    addresses: string[],
    type: string
  }
}
export interface IInput {
  value: number
  script?: Buffer
}