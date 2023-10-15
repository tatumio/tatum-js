import { Network } from '../dto'
import { Constant } from './constant'

export const TatumUtils = {
  getChainId: (network: Network): number | undefined => {
    if (network in Constant.NETWORK.ChainId) {
      return Constant.NETWORK.ChainId[network as keyof typeof Constant.NETWORK.ChainId]
    }
    return undefined
  },
  getNetwork: (chainId: number): keyof typeof Constant.NETWORK.ChainId | undefined => {
    if (Object.keys(chainIdToNetworkCache).length === 0) {
      buildChainIdToNetworkCache()
    }
    return chainIdToNetworkCache[chainId] || undefined
  },
}

const chainIdToNetworkCache: { [key: number]: keyof typeof Constant.NETWORK.ChainId } = {}

const buildChainIdToNetworkCache = () => {
  for (const network of Object.keys(Constant.NETWORK.ChainId)) {
    const netKey = network as keyof typeof Constant.NETWORK.ChainId
    chainIdToNetworkCache[Constant.NETWORK.ChainId[netKey]] = netKey
  }
}
