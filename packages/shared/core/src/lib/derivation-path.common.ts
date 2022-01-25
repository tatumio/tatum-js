import { Blockchain } from './models/Blockchain'

export const getDerivationPath = (blockchain: Blockchain, options?: { testnet: boolean }): string => {
  return options?.testnet ? TESTNET_DERIVATION_PATH : DERIVATION_PATH[blockchain]
}

export const DERIVATION_PATH: Record<Blockchain, string> = {
  BTC: "m/44'/0'/0'/0",
  LTC: "m/44'/2'/0'/0",
  ETH: "m/44'/60'/0'/0",
  DOGE: "m/44'/3'/0'/0",
  CELO: "m/44'/52752'/0'/0",
  POLYGON: "m/44'/966'/0'/0",
  KCS: "m/44'/60'/0'/0",
  HARMONY: "m/44'/1023'/0'/0",
  BSC: "m/44'/60'/0'/0",
  BCH: "m/44'/145'/0'/0",
  // TBD
  ALGO: '@TODO - TBD',
  CARDANO: '@TODO - TBD',
  EGLD: '@TODO - TBD',
  FABRIC: '@TODO - TBD',
  FLOW: '@TODO - TBD',
  LYRA: '@TODO - TBD',
  NEO: '@TODO - TBD',
  QTUM: '@TODO - TBD',
  QUORUM: '@TODO - TBD',
  SOL: '@TODO - TBD',
  TRON: '@TODO - TBD',
  VET: '@TODO - TBD',
  XDC: '@TODO - TBD',
  XLM: '@TODO - TBD',
  XRP: '@TODO - TBD',
}

export const TESTNET_DERIVATION_PATH = "m/44'/1'/0'/0"
