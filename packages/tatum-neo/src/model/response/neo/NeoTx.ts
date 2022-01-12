export interface NeoTx {
  txid: string
  size: number
  type: string
  version: number
  // eslint-disable-next-line @typescript-eslint/ban-types
  attributes: object[]
  vin: NeoTxInputs[]
  vout: NeoTxOutputs[]
  sys_fee: string
  net_fee: string
  scripts: NeoTxWitness[]
  blockhash: string
  confirmations: number
  blocktime: number
}

export interface NeoTxInputs {
  txid: string
  vout: number
}

export interface NeoTxOutputs {
  n: number
  asset: string
  value: string
  address: string
}

export interface NeoTxWitness {
  invocation: string
  verification: string
}

export interface NeoAccountTx {
  txid: string
  blockHeight: number
  change: {
    NEO: string
    GAS: string
  }
}
