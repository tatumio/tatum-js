import { Network, TatumSdk } from '@tatumcom/js'

export const initTatum  = async (config?: { apiKey: string, network: Network }) => {
  return await TatumSdk.init({
    network: Network.Testnet,
  })
}
