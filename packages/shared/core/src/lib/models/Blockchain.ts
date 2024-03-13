export enum Blockchain {
  BNB = 'BNB',
  BTC = 'BTC',
  BCH = 'BCH',
  LTC = 'LTC',
  CELO = 'CELO',
  SOL = 'SOL',
  HARMONY = 'HARMONY',
  ETH = 'ETH',
  XRP = 'XRP',
  XLM = 'XLM',
  DOGE = 'DOGE',
  VET = 'VET',
  NEO = 'NEO',
  BSC = 'BSC',
  POLYGON = 'POLYGON',
  FLOW = 'FLOW',
  TRON = 'TRON',
  EGLD = 'EGLD',
  XDC = 'XDC',
  ADA = 'ADA',
  ALGO = 'ALGO',
  KCS = 'KCS',
  KLAY = 'KLAY',
  TEZOS = 'TEZOS',
  EON = 'EON',
  CHILIZ = 'CHILIZ',
  FLR = 'FLR',
  CRO = 'CRO',
  BASE = 'BASE',
}

export const EvmBasedBlockchains = [
  Blockchain.ETH,
  Blockchain.CELO,
  Blockchain.BSC,
  Blockchain.HARMONY,
  Blockchain.POLYGON,
  Blockchain.KCS,
  Blockchain.EON,
  Blockchain.CHILIZ,
  Blockchain.CRO,
  Blockchain.BASE,
]

// @TODO tmp solution
export const BtcBasedBlockchains = [Blockchain.BTC, Blockchain.LTC, Blockchain.DOGE, Blockchain.BCH] as const
export type BtcBasedBlockchain = typeof BtcBasedBlockchains[number]

export type EvmBasedBlockchain =
  | Blockchain.ETH
  | Blockchain.CELO
  | Blockchain.BSC
  | Blockchain.HARMONY
  | Blockchain.POLYGON
  | Blockchain.KCS
  | Blockchain.KLAY
  | Blockchain.XDC
  | Blockchain.EON
  | Blockchain.CHILIZ
  | Blockchain.FLR
  | Blockchain.CRO
  | Blockchain.BASE
