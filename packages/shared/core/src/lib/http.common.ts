import axios from 'axios'
import { Blockchain, EvmBasedBlockchain } from './models/Blockchain'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'

// @TODO why some blockchains doesnt have endpoints?
const EndpointsMapping: Omit<Record<Blockchain, string>, 'FABRIC' | 'HARMONY' | 'LYRA'> = {
  [Blockchain.BTC]: 'bitcoin',
  [Blockchain.DOGE]: 'dogecoin',
  [Blockchain.EGLD]: 'egld',
  [Blockchain.FLOW]: 'flow',
  [Blockchain.LTC]: 'litecoin',
  [Blockchain.NEO]: 'neo',
  [Blockchain.POLYGON]: 'polygon',
  [Blockchain.QTUM]: 'qtum',
  [Blockchain.QUORUM]: 'quorum',
  [Blockchain.SOL]: 'solana',
  [Blockchain.TRON]: 'tron',
  [Blockchain.VET]: 'vet',
  [Blockchain.XRP]: 'xrp',
  [Blockchain.ETH]: 'ethereum',
  [Blockchain.CELO]: 'celo',
  [Blockchain.BSC]: 'bsc',
  [Blockchain.ALGO]: 'algorand',
  [Blockchain.CARDANO]: 'ada',
  [Blockchain.BCH]: 'bcash',
  [Blockchain.XDC]: 'xdc',
  [Blockchain.XLM]: 'xlm',
  [Blockchain.KCS]: 'kcs',
}

export const httpHelper = {
  get: axios.get,
  web3Endpoint: (blockchain: EvmBasedBlockchain, url: string, apiKey: string) => {
    return `${url}/${TATUM_API_CONSTANTS.API_VERSION}/${EndpointsMapping[blockchain]}/web3/${apiKey}`
  },
}
