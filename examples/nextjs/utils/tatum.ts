import { Ethereum, Network, TatumSDK } from '@tatumcom/js'

export const initTatum = async () => {
  return await TatumSDK.init<Ethereum>({
    network: Network.ETHEREUM_SEPOLIA
  })
}
