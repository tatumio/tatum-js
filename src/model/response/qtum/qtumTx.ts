export class QtumIRawTransactionInfo {
  public txid: string;
  public version: number;
  public locktime: number;
  public receipt: QtumITransactionReceipt[];
  public vin: IInput[];
  public vout: IOutput[];
  public confirmations: number;
  public time: number;
  public valueOut: number;
  public valueIn: number;
  public fees: number;
  public blockhash: string;
  public blockheight: number;
  public isqrc20Transfer: boolean;
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
