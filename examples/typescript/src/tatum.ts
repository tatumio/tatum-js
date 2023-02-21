import { Network, TatumSdk } from '@tatumcom/js'

export const initTatum = async () => await TatumSdk.init({
  apiKey: 'c53da34e-114d-4961-9030-d1a720a0ec38',
  network: Network.Testnet,
})
