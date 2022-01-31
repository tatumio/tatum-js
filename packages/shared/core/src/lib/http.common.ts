import axios from 'axios'
import { Blockchain, EvmBasedBlockchain } from './models/Blockchain'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'

const EndpointsMapping: Record<Blockchain, string> = {
  FABRIC: 'fabric',
  HARMONY: 'one',
  SCRYPTA: 'scrypta',
  BTC: 'bitcoin',
  DOGE: 'dogecoin',
  EGLD: 'egld',
  FLOW: 'flow',
  LTC: 'litecoin',
  NEO: 'neo',
  POLYGON: 'polygon',
  QTUM: 'qtum',
  QUORUM: 'quorum',
  SOL: 'solana',
  TRON: 'tron',
  VET: 'vet',
  XRP: 'xrp',
  ETH: 'ethereum',
  CELO: 'celo',
  BSC: 'bsc',
  ALGO: 'algorand',
  CARDANO: 'ada',
  BCH: 'bcash',
  XDC: 'xdc',
  XLM: 'xlm',
  KCS: 'kcs',
}

export const httpHelper = {
  get: axios.get,
  web3Endpoint: (blockchain: EvmBasedBlockchain, url: string, apiKey: string) => {
    return `${url}/${TATUM_API_CONSTANTS.API_VERSION}/${EndpointsMapping[blockchain]}/web3/${apiKey}`
  },
}
