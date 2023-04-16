import { Ethereum, Network, TatumSDK } from '@tatumcom/js'

export const initTatum = async () => await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM, verbose: true })
