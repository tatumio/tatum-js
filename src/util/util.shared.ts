/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Container } from 'typedi'
import { version } from '../../package.json'
import {
  AddressEventNotificationChain,
  isAlgorandAlgodNetwork,
  isAlgorandIndexerNetwork,
  isBnbLoadBalancerNetwork,
  isCardanoNetwork,
  isEosLoadBalancerNetwork,
  isEosNetwork,
  isEvmArchiveNonArchiveBeaconLoadBalancerNetwork,
  isEvmArchiveNonArchiveLoadBalancerNetwork,
  isEvmBasedNetwork,
  isEvmLoadBalancerNetwork,
  isNativeEvmLoadBalancerNetwork,
  isSameGetBlockNetwork,
  isSolanaNetwork,
  isStellarLoadBalancerNetwork,
  isTezosNetwork,
  isTronLoadBalancerNetwork,
  isTronNetwork,
  isUtxoBasedNetwork,
  isUtxoEstimateFeeNetwork,
  isUtxoLoadBalancerEstimateFeeNetwork,
  isUtxoLoadBalancerNetwork,
  isXrpNetwork,
  JsonRpcCall,
  JsonRpcResponse,
  MAPPED_NETWORK,
  MappedNetwork,
  Network,
  QueryParams,
  QueryValue,
} from '../dto'
import {
  AlgorandAlgod,
  AlgorandIndexer,
  ApiVersion,
  ArbitrumNova,
  ArbitrumOne,
  Aurora,
  AvalancheC,
  BinanceSmartChain,
  Bitcoin,
  BitcoinCash,
  Bnb,
  CardanoRosetta,
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
  FullSdk,
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
  Stellar,
  TatumConfig,
  Tezos,
  Tron,
  UtxoRpc,
  Vechain,
  XinFin,
  Xrp,
  ZCash,
} from '../service'
import { EvmArchiveLoadBalancerRpc } from '../service/rpc/evm/EvmArchiveLoadBalancerRpc'
import { EvmBeaconArchiveLoadBalancerRpc } from '../service/rpc/evm/EvmBeaconArchiveLoadBalancerRpc'
import { NativeEvmArchiveLoadBalancerRpc } from '../service/rpc/evm/NativeEvmArchiveLoadBalancerRpc'
import { TronLoadBalancerRpc } from '../service/rpc/evm/TronLoadBalancerRpc'
import { TronRpc } from '../service/rpc/evm/TronRpc'
import { AlgorandAlgodLoadBalancerRpc } from '../service/rpc/other/AlgorandAlgodLoadBalancerRpc'
import { AlgorandIndexerLoadBalancerRpc } from '../service/rpc/other/AlgorandIndexerLoadBalancerRpc'
import { BnbLoadBalancerRpc } from '../service/rpc/other/BnbLoadBalancerRpc'
import { CardanoLoadBalancerRpc } from '../service/rpc/other/CardanoLoadBalancerRpc'
import { EosLoadBalancerRpc } from '../service/rpc/other/EosLoadBalancerRpc'
import { EosRpc } from '../service/rpc/other/EosRpc'
import { SolanaLoadBalancerRpc } from '../service/rpc/other/SolanaLoadBalancerRpc'
import { StellarLoadBalancerRpc } from '../service/rpc/other/StellarLoadBalancerRpc'
import { TezosLoadBalancerRpc } from '../service/rpc/other/TezosLoadBalancerRpc'
import { XrpLoadBalancerRpc } from '../service/rpc/other/XrpLoadBalancerRpc'
import { UtxoLoadBalancerRpc } from '../service/rpc/utxo/UtxoLoadBalancerRpc'
import { UtxoLoadBalancerRpcEstimateFee } from '../service/rpc/utxo/UtxoLoadBalancerRpcEstimateFee'
import { UtxoRpcEstimateFee } from '../service/rpc/utxo/UtxoRpcEstimateFee'
import { Constant } from './constant'
import { CONFIG } from './di.tokens'

export const Utils = {
  getRpc: <T>(id: string, config: TatumConfig): T => {
    const { network } = config

    if (isStellarLoadBalancerNetwork(network)) {
      return Container.of(id).get(StellarLoadBalancerRpc) as T
    }

    if (isCardanoNetwork(network)) {
      return Container.of(id).get(CardanoLoadBalancerRpc) as T
    }

    if (isAlgorandIndexerNetwork(network)) {
      return Container.of(id).get(AlgorandIndexerLoadBalancerRpc) as T
    }

    if (isAlgorandAlgodNetwork(network)) {
      return Container.of(id).get(AlgorandAlgodLoadBalancerRpc) as T
    }

    if (isTezosNetwork(network)) {
      return Container.of(id).get(TezosLoadBalancerRpc) as T
    }

    if (isBnbLoadBalancerNetwork(network)) {
      return Container.of(id).get(BnbLoadBalancerRpc) as T
    }

    if (isUtxoLoadBalancerEstimateFeeNetwork(network)) {
      return Container.of(id).get(UtxoLoadBalancerRpcEstimateFee) as T
    }

    if (isUtxoEstimateFeeNetwork(network)) {
      return Container.of(id).get(UtxoRpcEstimateFee) as T
    }

    if (isUtxoLoadBalancerNetwork(network)) {
      return Container.of(id).get(UtxoLoadBalancerRpc) as T
    }

    if (isNativeEvmLoadBalancerNetwork(network)) {
      return Container.of(id).get(NativeEvmArchiveLoadBalancerRpc) as T
    }

    if (isEvmArchiveNonArchiveBeaconLoadBalancerNetwork(network)) {
      return Container.of(id).get(EvmBeaconArchiveLoadBalancerRpc) as T
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

    if (isSolanaNetwork(network)) {
      return Container.of(id).get(SolanaLoadBalancerRpc) as T
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

    if (isSolanaNetwork(network)) {
      return {
        jsonrpc: '2.0',
        method: 'getBlockHeight',
        params: [],
        id: 1,
      }
    }

    if (isBnbLoadBalancerNetwork(network)) {
      return {
        jsonrpc: '2.0',
        method: 'block',
        params: {},
        id: 1,
      }
    }

    if (isCardanoNetwork(network)) {
      return {
        network_identifier: {
          blockchain: 'cardano',
          network: Network.CARDANO_ROSETTA === network ? 'mainnet' : 'preprod',
        },
      }
    }

    if (
      isEosNetwork(network) ||
      isTezosNetwork(network) ||
      isAlgorandAlgodNetwork(network) ||
      isAlgorandIndexerNetwork(network) ||
      isStellarLoadBalancerNetwork(network)
    ) {
      return null
    }

    throw new Error(`Network ${network} is not supported.`)
  },
  getStatusUrl(network: Network, url: string): string {
    if (isEosNetwork(network)) {
      return `${url}${Constant.EOS_PREFIX}get_info`
    }

    if (isAlgorandAlgodNetwork(network)) {
      return `${url}v2/status`
    }

    if (isAlgorandIndexerNetwork(network)) {
      return `${url}health`
    }

    if (isCardanoNetwork(network)) {
      return `${url}network/status`
    }

    if (isSameGetBlockNetwork(network)) {
      return url
    }

    if (isBnbLoadBalancerNetwork(network)) {
      return url
    }

    if (isTezosNetwork(network)) {
      return `${url}chains/main/blocks/head/header`
    }

    if (isStellarLoadBalancerNetwork(network)) {
      return `${url}fee_stats`
    }

    throw new Error(`Network ${network} is not supported.`)
  },
  getStatusMethod(network: Network): string {
    if (
      isTezosNetwork(network) ||
      isAlgorandAlgodNetwork(network) ||
      isAlgorandIndexerNetwork(network) ||
      isStellarLoadBalancerNetwork(network)
    ) {
      return 'GET'
    }
    return 'POST'
  },
  parseStatusPayload: (network: Network, response: JsonRpcResponse<any> | any) => {
    if (isSameGetBlockNetwork(network)) {
      return new BigNumber((response.result as number) || -1).toNumber()
    }

    if (isBnbLoadBalancerNetwork(network)) {
      return new BigNumber((response.result.block.header.height as number) || -1).toNumber()
    }

    if (isEosNetwork(network)) {
      return new BigNumber((response.head_block_num as number) || -1).toNumber()
    }

    if (isTezosNetwork(network)) {
      return new BigNumber((response.level as number) || -1).toNumber()
    }

    if (isAlgorandAlgodNetwork(network)) {
      return new BigNumber((response['last-round'] as number) || -1).toNumber()
    }

    if (isAlgorandIndexerNetwork(network)) {
      return new BigNumber((response['round'] as number) || -1).toNumber()
    }

    if (isCardanoNetwork(network)) {
      return new BigNumber((response.current_block_identifier.index as number) || -1).toNumber()
    }

    if (isStellarLoadBalancerNetwork(network)) {
      return new BigNumber((response.last_ledger as number) || -1).toNumber()
    }

    throw new Error(`Network ${network} is not supported.`)
  },
  isResponseOk: (network: Network, response: JsonRpcResponse<any> | any) => {
    if (isEosNetwork(network)) {
      return response.head_block_num !== undefined
    }

    if (isBnbLoadBalancerNetwork(network)) {
      return response.result.block.header.height !== undefined
    }

    if (isSameGetBlockNetwork(network)) {
      return response.result !== undefined
    }

    if (isTezosNetwork(network)) {
      return response.level !== undefined
    }

    if (isAlgorandAlgodNetwork(network)) {
      return response['last-round'] !== undefined
    }

    if (isAlgorandIndexerNetwork(network)) {
      return response['round'] !== undefined
    }

    if (isStellarLoadBalancerNetwork(network)) {
      return response.last_ledger !== undefined
    }

    if (isCardanoNetwork(network)) {
      return response.current_block_identifier.index !== undefined
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
      case AddressEventNotificationChain.CHZ:
        return Network.CHILIZ
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
      case Network.CHILIZ:
        return AddressEventNotificationChain.CHZ
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
  fetchWithTimeoutAndRetry: async (
    url: string,
    containerId: string,
    config: RequestInit,
    timeout = 5000,
    retry = 2,
  ): Promise<{ response: Response; responseTime: number }> => {
    let lastError: unknown = null
    for (let i = 0; i < retry; i++) {
      try {
        const { response, responseTime } = await Utils.fetchWithTimeout(url, containerId, config, timeout)
        return { response, responseTime }
      } catch (e: unknown) {
        lastError = e
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
    const basicHeaders = Utils.getBasicHeaders(id)
    basicHeaders.set('Content-Type', 'application/json')
    return basicHeaders
  },
  getBasicHeaders: (id: string) => {
    const config = Container.of(id).get(CONFIG)
    const headers = new Headers({
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
  camelToDashCase: (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
  convertObjectWithStrategy: (
    obj: object,
    strategy: (key: string) => string,
  ): Record<string, unknown> | Record<string, unknown>[] => {
    if (Array.isArray(obj)) {
      return obj.map(Utils.convertObjCamelToSnake) as Record<string, unknown>[]
    }
    const snakeObj: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      const snakeKey = strategy(key)
      if (value instanceof BigNumber) {
        snakeObj[snakeKey] = value.toNumber()
      } else if (typeof value === 'object' && value !== null) {
        snakeObj[snakeKey] = Utils.convertObjectWithStrategy(value, strategy)
      } else {
        snakeObj[snakeKey] = value
      }
    }
    return snakeObj
  },
  convertObjCamelToSnake: (obj: object) => Utils.convertObjectWithStrategy(obj, Utils.camelToSnakeCase),
  convertObjCamelToDash: (obj: object) => Utils.convertObjectWithStrategy(obj, Utils.camelToDashCase),
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
      case Network.XINFIN:
      case Network.XINFIN_TESTNET:
        return new XinFin(id) as T
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
      case Network.TEZOS_TESTNET:
        return new Tezos(id) as T
      case Network.HORIZEN_EON:
      case Network.HORIZEN_EON_GOBI:
        return new HorizenEon(id) as T
      case Network.EOS:
      case Network.EOS_TESTNET:
        return new Eos(id) as T
      case Network.CHILIZ:
        return new Chiliz(id) as T
      case Network.BNB:
        return new Bnb(id) as T
      case Network.ALGORAND_ALGOD:
      case Network.ALGORAND_ALGOD_TESTNET:
        return new AlgorandAlgod(id) as T
      case Network.ALGORAND_INDEXER:
      case Network.ALGORAND_INDEXER_TESTNET:
        return new AlgorandIndexer(id) as T
      case Network.CARDANO_ROSETTA:
      case Network.CARDANO_ROSETTA_PREPROD:
        return new CardanoRosetta(id) as T
      case Network.STELLAR:
        return new Stellar(id) as T
      default:
        return new FullSdk(id) as T
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
  addQueryParams: (
    basePath: string,
    strategy: (key: string) => string,
    queryParams?: QueryParams,
  ): string => {
    let queryString = ''

    if (queryParams) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const query: Record<string, QueryValue> = Utils.convertObjectWithStrategy(queryParams, strategy)
      const params: string[] = []

      Object.entries(query).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((val) => {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
          })
        } else {
          params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }
      })

      if (params.length > 0) {
        queryString = '?' + params.join('&')
      }
    }

    return basePath + queryString
  },
}
