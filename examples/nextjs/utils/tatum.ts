import { Network, TatumSdk } from '@tatumcom/js'

export const initTatum  = async (config?: { apiKey: string, network: Network }) => {
  if (config) {
    return await TatumSdk.init({
      apiKey: config.apiKey,
      network: config.network,
    })
  }

  return await TatumSdk.init({
    apiKey: '452826a8-5cd4-4c46-b710-e130934b5102',
    network: Network.Testnet,
  })
}
