import { Network, NETWORK_METADATA, NetworkMetadata } from '../dto'
import { EnvUtils } from './env'

export const NetworkUtils = {
  getNetworkMetadata: (network: Network): NetworkMetadata => {
    return NETWORK_METADATA[network]
  },
  isTestnet(network: Network): boolean {
    return NetworkUtils.getNetworkMetadata(network).testnet
  },
  getChainId: (network: Network): number => {
    const chainId = NETWORK_METADATA[network]?.chainId
    if (!chainId) {
      throw new Error(`Tatum Network to ChainId for network ${network} does not exist`)
    }
    return chainId
  },
  isAlternateTestnet: (network: Network) => {
    const metadata = NetworkUtils.getNetworkMetadata(network)
    return metadata.testnet && !metadata.defaultTestnet
  },
  getV4ApiKeyForNetwork: (network: Network) => {
    if (!EnvUtils.isProcessAvailable()) return undefined
    return NetworkUtils.isTestnet(network) ? process.env?.V4_API_KEY_TESTNET : process.env?.V4_API_KEY_MAINNET
  },
}
