import { Network, NETWORK_METADATA, NetworkMetadata } from '../dto'

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
}
