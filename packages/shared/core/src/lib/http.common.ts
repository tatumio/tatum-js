import axios, { AxiosRequestConfig } from 'axios'
import { Blockchain, EvmBasedBlockchain } from './models/Blockchain'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { blockchainHelper } from './blockchain.common'

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
}

const isWebWorker =
  typeof self === 'object' &&
  self.constructor &&
  ['DedicatedWorkerGlobalScope', 'ServiceWorkerGlobalScope'].includes(self.constructor.name)

export const httpHelper = {
  get: axios.get,
  post: axios.post,
  axios: axios.create(),
  CancelToken: axios.CancelToken,
  web3Endpoint: (blockchain: EvmBasedBlockchain, url: string, apiKey: string) => {
    return `${url}/${TATUM_API_CONSTANTS.API_VERSION}/${EndpointsMapping[blockchain]}/web3/${apiKey}`
  },
  rpcEndpoint: (blockchain: Blockchain, url: string, apiKey: string) => {
    const chain = blockchainHelper.getDefaultCurrencyByBlockchain(blockchain)
    return `${url}/${TATUM_API_CONSTANTS.API_VERSION}/blockchain/node/${chain}/${apiKey}`
  },
}
