import { NeoTx, NeoTxWitness } from '..'

export interface NeoBlock {
  hash: string
  size: number
  version: number
  previousblockhash: string
  merkleroot: string
  time: number
  index: number
  nonce: string
  nextconsensus: string
  script: NeoTxWitness
  tx: NeoTx[]
  confirmations: number
  nextblockhash: string
}
