import { Network } from './Network'

export enum Currency {
  ETH = 'ETH',
  SOL = 'SOL',
  XRP = 'XRP',
  MATIC = 'MATIC',
  CELO = 'CELO',
  KLAY = 'KLAY',
  BTC = 'BTC',
  LTC = 'LTC',
  BCH = 'BCH',
  DOGE = 'DOGE',
  TRON = 'TRON',
  BSC = 'BSC',
  TEZOS = 'TEZOS',
  EON = 'EON',
  CHZ = 'CHZ',
  ALGO = 'ALGO',
  ADA = 'ADA',
  VET = 'VET',
  FLOW = 'FLOW',
  XDC = 'XDC',
  XLM = 'XLM',
  ONE = 'ONE',
  EOS = 'EOS',
  AVAX = 'AVAX',
  FTM = 'FTM',
  ARB = 'ARB',
  OP = 'OP',
  NEAR = 'NEAR',
  RSK = 'RSK',
  AURORA = 'AURORA',
  XOS = 'XOS',
  ZCASH = 'ZCASH',
  ZEC = 'ZEC',
  PALM = 'PALM',
  ZIL = 'ZIL',
  ETC = 'ETC',
  FLR = 'FLR',
  SGB = 'SGB',
  ISLM = 'ISLM',
  ZEN = 'ZEN',
  GNO = 'GNO',
  CRO = 'CRO',
  KCS = 'KCS',
  EGLD = 'EGLD',
  DOT = 'DOT',
  BASE = 'BASE',
  KADENA = 'KADENA',
  ATOM = 'ATOM',
  IOTA = 'IOTA',
  CSPR = 'CSPR',
  TON = 'TON',
  ZKS = 'ZKS',
  RON = 'RON',
  S = 'S',
  KAIA = 'KAIA',
  BERA = 'BERA',
  UNI = 'UNI',
}

export function networkToCurrency(network: Network): Currency {
  switch (network) {
    case Network.ETHEREUM:
    case Network.ETHEREUM_SEPOLIA:
      return Currency.ETH
    case Network.BITCOIN:
    case Network.BITCOIN_TESTNET:
    case Network.BITCOIN_TESTNET_4:
      return Currency.BTC
    case Network.DOGECOIN:
    case Network.DOGECOIN_TESTNET:
      return Currency.DOGE
    case Network.LITECOIN:
    case Network.LITECOIN_TESTNET:
      return Currency.LTC
    default:
      throw new Error(`Unsupported network ${network}`)
  }
}
