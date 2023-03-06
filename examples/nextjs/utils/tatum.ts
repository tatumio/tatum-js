import { Network, TatumSdk } from '@tatumcom/js'

export const initTatum = async () => {
  return await TatumSdk.init({
    network: Network.Testnet,
  })
}
