import { Network } from '../dto'
import { Constant } from './constant'

export const TatumUtils = {
  getChainId: (network: Network): number => {
    if (network in Constant.NETWORK.ChainId) {
      return Constant.NETWORK.ChainId[network as keyof typeof Constant.NETWORK.ChainId]
    }
    throw new Error(`Tatum Network to ChainId for network ${network} does not exist`)
  },
  getNetwork: (chainId: number): Network => {
    if (Object.keys(chainIdToNetworkCache).length === 0) {
      buildChainIdToNetworkCache()
    }
    const network = chainIdToNetworkCache[chainId]
    if (!network) {
      throw new Error(`ChainId to Tatum Network for chainId ${chainId} does not exist`)
    }
    return network
  },
}

const chainIdToNetworkCache: { [key: number]: keyof typeof Constant.NETWORK.ChainId } = {}

const buildChainIdToNetworkCache = () => {
  for (const network of Object.keys(Constant.NETWORK.ChainId)) {
    const netKey = network as keyof typeof Constant.NETWORK.ChainId
    chainIdToNetworkCache[Constant.NETWORK.ChainId[netKey]] = netKey
  }
}
