import { Container } from 'typedi'

import { CONFIG } from './di.tokens'
import {
  AddressEventNotificationChain,
  isEvmBasedNetwork,
  isEvmLoadBalancerNetwork,
  isSolanaEnabledNetwork,
  isTronNetwork,
  isUtxoBasedNetwork,
  isUtxoLoadBalancerNetwork,
  isXrpNetwork,
  JsonRpcCall,
  JsonRpcResponse,
  Network,
} from '../dto'
import {
  ArbitrumNova,
  ArbitrumOne,
  Aurora,
  AvalancheC,
  BaseTatumSdk,
  BinanceSmartChain,
  Bitcoin,
  BitcoinCash,
  Celo,
  Cronos,
  Dogecoin,
  Ethereum,
  EthereumClassic,
  EvmBasedLoadBalancerRpc,
  EvmBasedRpc,
  Fantom, Flare,
  GenericRpc,
  Gnosis,
  Haqq,
  HarmonyOne,
  Klaytn,
  Kucoin,
  Litecoin,
  Oasis,
  Optimism,
  Palm,
  Polygon,
  Solana,
  SolanaRpc,
  Tron,
  TronRpc,
  UtxoBasedLoadBalancerRpc,
  UtxoBasedRpc,
  Vechain,
  Xdc,
  Xrp,
  XrpRpc,
} from '../service'
import { BigNumber } from 'bignumber.js'

export const Utils = {
  getRpc: <T>(id: string, network: Network): T => {
    if (isUtxoLoadBalancerNetwork(network)) {
      return Container.of(id).get(UtxoBasedLoadBalancerRpc) as T
    }

    if (isEvmLoadBalancerNetwork(network)) {
      return Container.of(id).get(EvmBasedLoadBalancerRpc) as T
    }

    if (isEvmBasedNetwork(network)) {
      return Container.of(id).get(EvmBasedRpc) as T
    }

    if (isUtxoBasedNetwork(network)) {
      return Container.of(id).get(UtxoBasedRpc) as T
    }
    if (isXrpNetwork(network)) {
      return Container.of(id).get(XrpRpc) as T
    }
    if (isSolanaEnabledNetwork(network)) {
      return Container.of(id).get(SolanaRpc) as T
    }
    if (isTronNetwork(network)) {
      return Container.of(id).get(TronRpc) as T
    }
    console.warn(`RPC Network ${network} is not supported.`)
    return Container.of(id).get(GenericRpc) as T
  },
  getRpcListUrl: (network: Network): string => {
    return `https://rpc.tatum.com/${network}/list.json`
  },
  getStatusPayload: (network: Network) => {
    if (isUtxoBasedNetwork(network)) {
      return {
        jsonrpc: '2.0',
        method: 'getblockcount',
        params: [],
        id: 1,
      }
    }
    if (isEvmBasedNetwork(network)) {
      return {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }
    }
    throw new Error(`Network ${network} is not supported.`)
  },
  parseStatusPayload: (network: Network, response: JsonRpcResponse) => {
    if (isUtxoBasedNetwork(network) || isEvmBasedNetwork(network)) {
      return new BigNumber(response.result as number || -1).toNumber()
    }
    throw new Error(`Network ${network} is not supported.`)
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
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const responseTime = Date.now() - start
    clearTimeout(id)
    return { responseTime, response }
  },
  padWithZero: (data: string, length = 64) => data.replace('0x', '').padStart(length, '0'),
  camelToSnakeCase: (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
  convertObjCamelToSnake: (obj: object) => {
    const snakeObj = {}
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = Utils.camelToSnakeCase(key)
      if (typeof value === 'object' && value !== null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        snakeObj[snakeKey] = convertObjCamelToSnake(value)
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        snakeObj[snakeKey] = value
      }
    }
    return snakeObj
  },
  getClient: <T>(id: string, network: Network): T => {
    switch (network) {
      case Network.BITCOIN:
      case Network.BITCOIN_TESTNET:
        return new Bitcoin(id) as T
      case Network.LITECOIN:
      case Network.LITECOIN_TESTNET:
        return new Litecoin(id) as T
      case Network.DOGECOIN:
      case Network.DOGECOIN_TESTNET:
        return new Dogecoin(id) as T
      case Network.BITCOIN_CASH:
      case Network.BITCOIN_CASH_TESTNET:
        return new BitcoinCash(id) as T
      case Network.ETHEREUM:
      case Network.ETHEREUM_SEPOLIA:
      case Network.ETHEREUM_GOERLI:
        return new Ethereum(id) as T
      case Network.ETHEREUM_CLASSIC:
        return new EthereumClassic(id) as T
      case Network.ARBITRUM_NOVA:
      case Network.ARBITRUM_NOVA_TESTNET:
        return new ArbitrumNova(id) as T
      case Network.ARBITRUM_ONE:
        return new ArbitrumOne(id) as T
      case Network.AURORA:
      case Network.AURORA_TESTNET:
        return new Aurora(id) as T
      case Network.AVALANCHE_C:
      case Network.AVALANCHE_C_TESTNET:
      case Network.AVALANCHE_P:
      case Network.AVALANCHE_P_TESTNET:
      case Network.AVALANCHE_X:
      case Network.AVALANCHE_X_TESTNET:
        return new AvalancheC(id) as T
      case Network.BINANCE_SMART_CHAIN:
      case Network.BINANCE_SMART_CHAIN_TESTNET:
        return new BinanceSmartChain(id) as T
      case Network.CELO:
      case Network.CELO_ALFAJORES:
        return new Celo(id) as T
      case Network.CRONOS:
      case Network.CRONOS_TESTNET:
        return new Cronos(id) as T
      case Network.FANTOM:
      case Network.FANTOM_TESTNET:
        return new Fantom(id) as T
      case Network.GNOSIS:
      case Network.GNOSIS_TESTNET:
        return new Gnosis(id) as T
      case Network.HARMONY_ONE_SHARD_0:
      case Network.HARMONY_ONE_TESTNET_SHARD_0:
        return new HarmonyOne(id) as T
      case Network.HAQQ:
      case Network.HAQQ_TESTNET:
        return new Haqq(id) as T
      case Network.FLARE:
      case Network.FLARE_COSTON:
      case Network.FLARE_COSTON_2:
      case Network.FLARE_SONGBIRD:
        return new Flare(id) as T
      case Network.KLAYTN:
      case Network.KLAYTN_BAOBAB:
        return new Klaytn(id) as T
      case Network.KUCOIN:
      case Network.KUCOIN_TESTNET:
        return new Kucoin(id) as T
      case Network.OASIS:
      case Network.OASIS_TESTNET:
        return new Oasis(id) as T
      case Network.OPTIMISM:
      case Network.OPTIMISM_TESTNET:
        return new Optimism(id) as T
      case Network.PALM:
      case Network.PALM_TESTNET:
        return new Palm(id) as T
      case Network.POLYGON:
      case Network.POLYGON_MUMBAI:
        return new Polygon(id) as T
      case Network.VECHAIN:
      case Network.VECHAIN_TESTNET:
        return new Vechain(id) as T
      case Network.XDC:
      case Network.XDC_TESTNET:
        return new Xdc(id) as T
      case Network.XRP:
      case Network.XRP_TESTNET:
        return new Xrp(id) as T
      case Network.SOLANA:
      case Network.SOLANA_DEVNET:
        return new Solana(id) as T
      case Network.TRON:
      case Network.TRON_SHASTA:
        return new Tron(id) as T
      default:
        return new BaseTatumSdk(id) as T
    }
  },

  log: ({ id, message, data, mode }: { id: string, message?: string, data?: object, mode?: 'table' }) => {
    const config = Container.of(id).get(CONFIG)
    if (config.verbose) {
      if (data) {
        if (mode === 'table') {
          console.table(data)
        } else {
          console.debug(new Date().toISOString(), message, data)
        }
      } else {
        console.debug(new Date().toISOString(), message)
      }
    }
  },
  prepareRpcCall: (method: string, params?: unknown[], id = 1): JsonRpcCall => {
    return {
      jsonrpc: '2.0',
      id,
      method,
      params,
    }
  },
  deepMerge(target: unknown, source: unknown): unknown {
    const isObject = (obj: unknown): obj is Record<string, unknown> =>
      typeof obj === 'object' && obj !== null;

    if (!isObject(target) || !isObject(source)) {
      return source;
    }

    const output: Record<string, unknown> = { ...target };

    Object.keys(source).forEach((key) => {
      const targetValue = output[key];
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        output[key] = [...targetValue, ...sourceValue];
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        output[key] = Utils.deepMerge(targetValue, sourceValue);
      } else {
        output[key] = sourceValue;
      }
    });

    return output;
  }
}
