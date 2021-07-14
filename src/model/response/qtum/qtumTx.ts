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
export interface QtumIRawTransactions {
  pagesTotal: number
  txs: QtumIRawTransactionInfo[]
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