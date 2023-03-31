import { Network, TatumSDK } from '@tatumcom/js'

export const initTatum = async () => {
  return await TatumSDK.init({
    network: Network.Testnet,
  })
}
