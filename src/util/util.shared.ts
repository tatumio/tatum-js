/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Container } from 'typedi'
import { version } from '../../package.json'
import {
  AddressEventNotificationChain,
  isEosLoadBalancerNetwork,
  isEosNetwork,
  isEvmArchiveNonArchiveLoadBalancerNetwork,
  isEvmBasedNetwork,
  isEvmLoadBalancerNetwork,
  isNativeEvmLoadBalancerNetwork,
  isSolanaEnabledNetwork,
  isTronLoadBalancerNetwork,
  isTronNetwork,
  isUtxoBasedNetwork,
  isUtxoLoadBalancerNetwork,
  isXrpNetwork,
  JsonRpcCall,
  JsonRpcResponse,
  MAPPED_NETWORK,
  MappedNetwork,
  Network,
} from '../dto'
import {
  ApiVersion,
  ArbitrumNova,
  ArbitrumOne,
  Aurora,
  AvalancheC,
  BaseTatumSdk,
  BinanceSmartChain,
  Bitcoin,
  BitcoinCash,
  Celo,
  Chiliz,
  Cronos,
  Dogecoin,
  Eos,
  Ethereum,
  EthereumClassic,
  EvmLoadBalancerRpc,
  EvmRpc,
  Fantom,
  Flare,
  GenericRpc,
  Gnosis,
  Haqq,
  HarmonyOne,
  HorizenEon,
  Klaytn,
  Kucoin,
  Litecoin,
  Oasis,
  Optimism,
  Palm,
  Polygon,
  Solana,
  SolanaRpc,
  TatumConfig,
  Tezos,
  Tron,
  UtxoLoadBalancerRpc,
  UtxoRpc,
  Vechain,
  Xdc,
  Xrp,
  ZCash,
} from '../service'
import { EvmArchiveLoadBalancerRpc } from '../service/rpc/evm/EvmArchiveLoadBalancerRpc'
import { NativeEvmArchiveLoadBalancerRpc } from '../service/rpc/evm/NativeEvmArchiveLoadBalancerRpc'
import { TronLoadBalancerRpc } from '../service/rpc/evm/TronLoadBalancerRpc'
import { TronRpc } from '../service/rpc/evm/TronRpc'
import { EosLoadBalancerRpc } from '../service/rpc/other/EosLoadBalancerRpc'
import { EosRpc } from '../service/rpc/other/EosRpc'
import { XrpLoadBalancerRpc } from '../service/rpc/other/XrpLoadBalancerRpc'
import { Constant } from './constant'
import { CONFIG } from './di.tokens'

export const Utils = {
  getRpc: <T>(id: string, config: TatumConfig): T => {
    const { network } = config
    if (isUtxoLoadBalancerNetwork(network)) {
      return Container.of(id).get(UtxoLoadBalancerRpc) as T
    }

    if (isNativeEvmLoadBalancerNetwork(network)) {
      return Container.of(id).get(NativeEvmArchiveLoadBalancerRpc) as T
    }

    if (isEvmArchiveNonArchiveLoadBalancerNetwork(network)) {
      return Container.of(id).get(EvmArchiveLoadBalancerRpc) as T
    }

    if (isEvmLoadBalancerNetwork(network)) {
      return Container.of(id).get(EvmLoadBalancerRpc) as T
    }

    if (isEvmBasedNetwork(network)) {
      return Container.of(id).get(EvmRpc) as T
    }

    if (isUtxoBasedNetwork(network)) {
      return Container.of(id).get(UtxoRpc) as T
    }

    if (isXrpNetwork(network)) {
      return Container.of(id).get(XrpLoadBalancerRpc) as T
    }

    if (isSolanaEnabledNetwork(network)) {
      return Container.of(id).get(SolanaRpc) as T
    }

    if (isTronLoadBalancerNetwork(network)) {
      return Container.of(id).get(TronLoadBalancerRpc) as T
    }

    if (isTronNetwork(network)) {
      return Container.of(id).get(TronRpc) as T
    }

    if (isEosLoadBalancerNetwork(network)) {
      return Container.of(id).get(EosLoadBalancerRpc) as T
    }

    if (isEosNetwork(network)) {
      return Container.of(id).get(EosRpc) as T
    }

    console.warn(`RPC Network ${network} is not supported.`)
    return Container.of(id).get(GenericRpc) as T
  },
  getRpcListUrl: (network: Network): string[] => {
    const mappedNetwork = Utils.mapRpcListUrl(network)
    return [
      `https://rpc.tatum.io/${mappedNetwork}/list.json`,
      `https://rpc.tatum.io/${mappedNetwork}-archive/list.json`,
    ]
  },
  mapRpcListUrl: (network: Network): string => {
    const mappedNetwork = (MAPPED_NETWORK as Record<string, MappedNetwork>)[network]
    return mappedNetwork ?? network
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
    if (isEvmBasedNetwork(network) || isTronNetwork(network)) {
      return {
        jsonrpc: '2.0',
        method: 'eth_blockNumber',
        params: [],
        id: 1,
      }
    }

    if (isEosNetwork(network)) {
      return null
    }

    throw new Error(`Network ${network} is not supported.`)
  },
  getStatusUrl(network: Network, url: string): string {
    if (isEosNetwork(network)) {
      return `${url}${Constant.EOS_PREFIX}get_info`
    }

    if (isUtxoBasedNetwork(network) || isEvmBasedNetwork(network) || isTronNetwork(network)) {
      return url
    }

    throw new Error(`Network ${network} is not supported.`)
  },
  parseStatusPayload: (network: Network, response: JsonRpcResponse<any> | any) => {
    if (isUtxoBasedNetwork(network) || isEvmBasedNetwork(network) || isTronNetwork(network)) {
      return new BigNumber((response.result as number) || -1).toNumber()
    }

    if (isEosNetwork(network)) {
      return new BigNumber((response.head_block_num as number) || -1).toNumber()
    }

    throw new Error(`Network ${network} is not supported.`)
  },
  isResponseOk: (network: Network, response: JsonRpcResponse<any> | any) => {
    if (isEosNetwork(network)) {
      return response.head_block_num !== undefined
    }

    if (isUtxoBasedNetwork(network) || isEvmBasedNetwork(network) || isTronNetwork(network)) {
      return response.result !== undefined
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
      case AddressEventNotificationChain.EON:
        return Network.HORIZEN_EON
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
      case Network.TEZOS:
        return AddressEventNotificationChain.TEZOS
      case Network.HORIZEN_EON:
        return AddressEventNotificationChain.EON
      default:
        throw new Error(`Network ${network} is not supported.`)
    }
  },
  delay: (t: number) => new Promise((resolve) => setTimeout(resolve, t)),
  retryWithTimeout: async <T>(action: () => Promise<T>, timeoutInMs = 10000, delayInMs = 500): Promise<T> => {
    const startTime = Date.now()
    let lastError: unknown = null
    while (timeoutInMs + startTime > Date.now()) {
      try {
        const result: T = await action()
        if (result === null || result === undefined) {
          throw new Error('Null result')
        }
        return result
      } catch (e: unknown) {
        lastError = e
        await Utils.delay(delayInMs)
      }
    }
    throw lastError ?? new Error('Retry timeout failed')
  },
  fetchWithTimeout: async (
    url: string,
    containerId: string,
    config: RequestInit,
    timeout = 5000,
  ): Promise<{ response: Response; responseTime: number }> => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)
    const start = Date.now()

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
      headers: Utils.getHeaders(containerId),
    })

    const responseTime = Date.now() - start
    clearTimeout(id)
    return { responseTime, response }
  },
  headersToJson(headers: any) {
    const headersObj: Record<string, string> = {}

    headers.forEach((value: string, key: string) => {
      headersObj[key] = value
    })

    return JSON.stringify(headersObj)
  },
  getHeaders: (id: string) => {
    const config = Container.of(id).get(CONFIG)
    const headers = new Headers({
      'Content-Type': 'application/json',
      'x-ttm-sdk-version': version,
      'x-ttm-sdk-product': 'JS',
      'x-ttm-sdk-debug': `${config.verbose}`,
    })

    if (config.apiKey) {
      if (config.version === ApiVersion.V3 && config.apiKey.v3) {
        headers.append('x-api-key', config.apiKey.v3)
      } else if (config.version === ApiVersion.V4 && config.apiKey.v4) {
        headers.append('x-api-key', config.apiKey.v4)
      }
    }
    return headers
  },
  padWithZero: (data: string, length = 64) => data.replace('0x', '').padStart(length, '0'),
  camelToSnakeCase: (str: string) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`),
  convertObjCamelToSnake: (obj: object) => {
    const snakeObj: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = Utils.camelToSnakeCase(key)
      if (value instanceof BigNumber) {
        snakeObj[snakeKey] = value.toNumber()
      } else if (typeof value === 'object' && value !== null) {
        snakeObj[snakeKey] = Utils.convertObjCamelToSnake(value)
      } else {
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
      case Network.ZCASH:
      case Network.ZCASH_TESTNET:
        return new ZCash(id) as T
      case Network.ETHEREUM:
      case Network.ETHEREUM_SEPOLIA:
      case Network.ETHEREUM_GOERLI:
      case Network.ETHEREUM_HOLESKY:
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
      case Network.TEZOS:
        return new Tezos(id) as T
      case Network.HORIZEN_EON:
      case Network.HORIZEN_EON_GOBI:
        return new HorizenEon(id) as T
      case Network.EOS:
      case Network.EOS_TESTNET:
        return new Eos(id) as T
      case Network.CHILIZ:
        return new Chiliz(id) as T
      default:
        return new BaseTatumSdk(id) as T
    }
  },

  log: ({ id, message, data, mode }: { id: string; message?: string; data?: object; mode?: 'table' }) => {
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
    const isObject = (obj: unknown): obj is Record<string, unknown> => typeof obj === 'object' && obj !== null

    if (!isObject(target) || !isObject(source)) {
      return source
    }

    const output: Record<string, unknown> = { ...target }

    Object.keys(source).forEach((key) => {
      const targetValue = output[key]
      const sourceValue = source[key]

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        output[key] = [...targetValue, ...sourceValue]
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        output[key] = Utils.deepMerge(targetValue, sourceValue)
      } else {
        output[key] = sourceValue
      }
    })

    return output
  },
  getV3RpcUrl: (config: TatumConfig, path?: string): string => {
    const { apiKey, rpc, network } = config
    if (apiKey) {
      const url =
        rpc?.nodes?.[0].url ||
        `${Constant.TATUM_API_URL.V3}blockchain/node/${network}/${apiKey.v3 ? apiKey.v3 : apiKey.v4}`
      return url.concat(path || '')
    }
    return rpc?.nodes?.[0].url || `${Constant.TATUM_API_URL.V3}blockchain/node/${network}`.concat(path || '')
  },
}
