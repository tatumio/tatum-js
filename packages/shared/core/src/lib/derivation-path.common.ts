import { Blockchain } from './models/Blockchain'

export const getDerivationPath = (blockchain: Blockchain, options?: { testnet: boolean }): string => {
  return options?.testnet ? TESTNET_DERIVATION_PATH : DERIVATION_PATH[blockchain]
}

export const DERIVATION_PATH = {
  [Blockchain.BTC]: "m/44'/0'/0'/0",
  [Blockchain.LTC]: "m/44'/2'/0'/0",
  [Blockchain.ETH]: "m/44'/60'/0'/0",
  [Blockchain.CELO]: "m/44'/52752'/0'/0",
  [Blockchain.POLYGON]: "m/44'/966'/0'/0",
}

export const TESTNET_DERIVATION_PATH = "m/44'/1'/0'/0"
