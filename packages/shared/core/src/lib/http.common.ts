import axios from 'axios'
import { Blockchain, EvmBasedBlockchain } from './models/Blockchain'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'

const EndpointsMapping: Record<Blockchain, string> = {
  HARMONY: 'one',
  BTC: 'bitcoin',
  DOGE: 'dogecoin',
  EGLD: 'egld',
  FLOW: 'flow',
  LTC: 'litecoin',
  NEO: 'neo',
  POLYGON: 'polygon',
  QTUM: 'qtum',
  SOL: 'solana',
  TERRA: 'terra',
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
}

export const httpHelper = {
  get: axios.get,
  post: axios.post,
  web3Endpoint: (blockchain: EvmBasedBlockchain, url: string, apiKey: string) => {
    return `${url}/${TATUM_API_CONSTANTS.API_VERSION}/${EndpointsMapping[blockchain]}/web3/${apiKey}`
  },
}
