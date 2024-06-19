import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
import axios from 'axios'
import { blockchainHelper } from './blockchain.common'
import { Blockchain, EvmBasedBlockchain } from './models/Blockchain'

const EndpointsMapping: Record<Blockchain, string> = {
  HARMONY: 'one',
  BTC: 'bitcoin',
  DOGE: 'dogecoin',
  EGLD: 'egld',
  FLOW: 'flow',
  LTC: 'litecoin',
  NEO: 'neo',
  POLYGON: 'polygon',
  SOL: 'solana',
  TRON: 'tron',
  VET: 'vet',
  XRP: 'xrp',
  ETH: 'ethereum',
  CELO: 'celo',
  BSC: 'bsc',
  ALGO: 'algorand',
  ADA: 'ada',
  BCH: 'bcash',
  XDC: 'xdc',
  XLM: 'xlm',
  KCS: 'kcs',
  KLAY: 'klaytn',
  BNB: 'bnb',
  TEZOS: 'tezos',
  EON: 'eon',
  CHILIZ: 'chiliz',
  FLR: 'flare',
  CRO: 'cronos',
  BASE: 'base',
  AVAX: 'avalanche',
  OPTIMISM: 'optimism',
}

const isWebWorker =
  typeof self === 'object' &&
  self.constructor &&
  ['DedicatedWorkerGlobalScope', 'ServiceWorkerGlobalScope'].includes(self.constructor.name)

export const httpCommon = {
  web3Endpoint: (blockchain: EvmBasedBlockchain, url: string, apiKey: string) => {
    return `${url}/${TATUM_API_CONSTANTS.API_VERSION}/${EndpointsMapping[blockchain]}/web3/${apiKey}`
  },
  rpcEndpoint: (blockchain: Blockchain, url: string, apiKey: string) => {
    const chain = blockchainHelper.getDefaultCurrencyByBlockchain(blockchain)
    return `${url}/${TATUM_API_CONSTANTS.API_VERSION}/blockchain/node/${chain}/${apiKey}`
  },
}

export const httpAxios = {
  get: axios.get,
  post: axios.post,
  axios: axios.create(),
  CancelToken: axios.CancelToken,
  ...httpCommon,
}

export const httpFetch = {
  get: async (url: string, config?: any) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: { ...config?.headers, 'Content-Type': 'application/json' },
    })
    return response.json()
  },
  post: async (url: string, body: any, config?: any) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { ...config?.headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    return response.json()
  },
  ...httpCommon,
}

export const httpHelper = isWebWorker ? httpFetch : httpAxios
