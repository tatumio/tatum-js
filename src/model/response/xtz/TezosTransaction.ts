export interface TezosTransaction {
  amount: number;
  blockHash: string,
  blockLevel: number,
  confirmations: number,
  consumedGas: number,
  counter: number,
  cycle: number,
  destination: string,
  doubleOperationDetails: object,
  fee: number,
  gasLimit: number,
  kind: string,
  operationGroupHash: string,
  operationId: number,
  source: string,
  status: string,
  storageLimit: number,
  timestamp: number
}
