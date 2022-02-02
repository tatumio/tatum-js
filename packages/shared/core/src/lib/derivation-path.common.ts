import { Blockchain } from './models/Blockchain'

export const getDerivationPath = (blockchain: Blockchain, options?: { testnet: boolean }): string => {
  return options?.testnet ? TESTNET_DERIVATION_PATH[blockchain] : DERIVATION_PATH[blockchain]
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
  TRON: "m/44'/195'/0'/0",
  // TBD
  ALGO: '@TODO - TBD',
  CARDANO: '@TODO - TBD',
  EGLD: '@TODO - TBD',
  FABRIC: '@TODO - TBD',
  FLOW: '@TODO - TBD',
  SCRYPTA: "m/44'/497'/0'/0",
  NEO: '@TODO - TBD',
  QTUM: '@TODO - TBD',
  QUORUM: '@TODO - TBD',
  SOL: '@TODO - TBD',
  VET: '@TODO - TBD',
  XDC: '@TODO - TBD',
  XLM: '@TODO - TBD',
  XRP: '@TODO - TBD',
}

export const COMMON_TESTNET_DERIVATION_PATH = "m/44'/1'/0'/0"

const TESTNET_DERIVATION_PATH_MAPPING = (Object.values(Blockchain) as Blockchain[])
  .map((v: Blockchain) => {
    return { [v]: COMMON_TESTNET_DERIVATION_PATH }
  })
  .reduce(
    (obj, item) => ({
      ...obj,
      ...item,
    }),
    {},
  ) as Record<Blockchain, string>

const TESTNET_DERIVATION_PATH: Record<Blockchain, string> = {
  ...TESTNET_DERIVATION_PATH_MAPPING,
  /**
   * BCH historically uses mainnet derivation path.
   * It's not right, but changing it will break production users experience
   */
  BCH: DERIVATION_PATH.BCH,
  SCRYPTA: DERIVATION_PATH.SCRYPTA,
}
