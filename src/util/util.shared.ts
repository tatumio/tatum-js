import { Container } from 'typedi'
import {
  AddressEventNotificationChain,
  isEvmBasedNetwork,
  isUtxoBasedNetwork,
  isXrpNetwork,
  Network,
} from '../dto'
import { EvmBasedRpc, GenericRpc, UtxoBasedRpc, XrpRpc } from '../service'

export const Utils = {
  getRpc: <T>(id: string, network: Network): T => {
    if (isEvmBasedNetwork(network)) {
      return Container.of(id).get(EvmBasedRpc) as T
    }
    if (isUtxoBasedNetwork(network)) {
      return Container.of(id).get(UtxoBasedRpc) as T
    }
    if (isXrpNetwork(network)) {
      return Container.of(id).get(XrpRpc) as T
    }
    console.warn(`RPC Network ${network} is not supported.`)
    return Container.of(id).get(GenericRpc) as T
  },
  mapNotificationChainToNetwork: (chain: AddressEventNotificationChain): Network => {
    switch (chain) {
      case AddressEventNotificationChain.BTC:
        return Network.BITCOIN
      case AddressEventNotificationChain.BCH:
        return Network.BITCOIN_CASH
      case AddressEventNotificationChain.LTC:
        return Network.LITECOIN
      case AddressEventNotificationChain.DOGE:
        return Network.DOGECOIN
      case AddressEventNotificationChain.ETH:
        return Network.ETHEREUM
      case AddressEventNotificationChain.MATIC:
        return Network.POLYGON
      case AddressEventNotificationChain.CELO:
        return Network.CELO
      case AddressEventNotificationChain.SOL:
        return Network.SOLANA
      case AddressEventNotificationChain.XRP:
        return Network.XRP
      case AddressEventNotificationChain.BSC:
        return Network.BINANCE_SMART_CHAIN
      case AddressEventNotificationChain.TRON:
        return Network.TRON
      case AddressEventNotificationChain.KLAY:
        return Network.KLAYTN
      default:
        throw new Error(`Chain ${chain} is not supported.`)
    }
  },
  mapNetworkToNotificationChain: (network: Network): AddressEventNotificationChain => {
    switch (network) {
      case Network.BITCOIN:
      case Network.BITCOIN_TESTNET:
        return AddressEventNotificationChain.BTC
      case Network.BITCOIN_CASH:
      case Network.BITCOIN_CASH_TESTNET:
        return AddressEventNotificationChain.BCH
      case Network.LITECOIN:
      case Network.LITECOIN_TESTNET:
        return AddressEventNotificationChain.LTC
      case Network.DOGECOIN:
      case Network.DOGECOIN_TESTNET:
        return AddressEventNotificationChain.DOGE
      case Network.ETHEREUM:
      case Network.ETHEREUM_SEPOLIA:
      case Network.ETHEREUM_GOERLI:
        return AddressEventNotificationChain.ETH
      case Network.POLYGON:
      case Network.POLYGON_MUMBAI:
        return AddressEventNotificationChain.MATIC
      case Network.CELO:
      case Network.CELO_ALFAJORES:
        return AddressEventNotificationChain.CELO
      case Network.SOLANA:
      case Network.SOLANA_DEVNET:
        return AddressEventNotificationChain.SOL
      case Network.XRP:
      case Network.XRP_TESTNET:
        return AddressEventNotificationChain.XRP
      case Network.BINANCE_SMART_CHAIN:
      case Network.BINANCE_SMART_CHAIN_TESTNET:
        return AddressEventNotificationChain.BSC
      case Network.TRON:
      case Network.TRON_SHASTA:
        return AddressEventNotificationChain.TRON
      case Network.KLAYTN:
      case Network.KLAYTN_BAOBAB:
        return AddressEventNotificationChain.KLAY
      default:
        throw new Error(`Network ${network} is not supported.`)
    }
  },
  delay: (t: number) => new Promise((resolve) => setTimeout(resolve, t)),
  fetchWithTimeout: async (
    url: string,
    config: RequestInit,
    timeout = 5000,
  ): Promise<{ response: Response; responseTime: number }> => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    const start = Date.now()
    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    })
    const responseTime = Date.now() - start
    clearTimeout(id)
    return { responseTime, response }
  },
  padWithZero: (data: string, length = 64) => data.replace('0x', '').padStart(length, '0'),
  camelToSnakeCase: (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
}
