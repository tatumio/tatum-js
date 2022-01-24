export enum Blockchain {
  BTC = 'BTC',
  BCH = 'BCH',
  LTC = 'LTC',
  CELO = 'CELO',
  SOL = 'SOL',
  HARMONY = 'HARMONY',
  ETH = 'ETH',
  FABRIC = 'FABRIC',
  QUORUM = 'QUORUM',
  XRP = 'XRP',
  XLM = 'XLM',
  DOGE = 'DOGE',
  VET = 'VET',
  NEO = 'NEO',
  BSC = 'BSC',
  POLYGON = 'POLYGON',
  FLOW = 'FLOW',
  QTUM = 'QTUM',
  TRON = 'TRON',
  EGLD = 'EGLD',
  XDC = 'XDC',
  LYRA = 'LYRA',
  CARDANO = 'CARDANO',
  ALGO = 'ALGO',
  KCS = 'KCS',
}

export const BtcBasedBlockchains = [Blockchain.BTC, Blockchain.LTC, Blockchain.BCH, Blockchain.DOGE]
export const EvmBasedBlockchains = [Blockchain.ETH, Blockchain.CELO, Blockchain.BSC]

export type BtcBasedBlockchain = typeof BtcBasedBlockchains[number]
export type EvmBasedBlockchain = typeof EvmBasedBlockchains[number]
