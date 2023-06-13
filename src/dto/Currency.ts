import { Network } from './Network'

export enum Currency {
  ETH = 'ETH',
  BTC = 'BTC',
  DOGE = 'DOGE',
  LTC = 'LTC',
}

export function networkToCurrency(network: Network): Currency {
  switch (network) {
    case Network.ETHEREUM:
    case Network.ETHEREUM_SEPOLIA:
      return Currency.ETH
    case Network.BITCOIN:
    case Network.BITCOIN_TESTNET:
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
