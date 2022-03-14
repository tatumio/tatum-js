export enum Blockchain {
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
  TERRA = 'TERRA',
  QTUM = 'QTUM',
  TRON = 'TRON',
  EGLD = 'EGLD',
  XDC = 'XDC',
  ADA = 'ADA',
  ALGO = 'ALGO',
  KCS = 'KCS',
  KLAY = 'KLAY',
}

export const BtcBasedBlockchains = [Blockchain.BTC, Blockchain.LTC, Blockchain.DOGE, Blockchain.BCH]
export const EvmBasedBlockchains = [
  Blockchain.ETH,
  Blockchain.CELO,
  Blockchain.BSC,
  Blockchain.HARMONY,
  Blockchain.POLYGON,
  Blockchain.KCS,
]

// @TODO tmp solution
export type BtcBasedBlockchain = Blockchain.BTC | Blockchain.LTC | Blockchain.DOGE | Blockchain.BCH

export type EvmBasedBlockchain =
  | Blockchain.ETH
  | Blockchain.CELO
  | Blockchain.BSC
  | Blockchain.HARMONY
  | Blockchain.POLYGON
  | Blockchain.KCS
  | Blockchain.KLAY
