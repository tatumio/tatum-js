import { TatumSDK } from '@tatumcom/js'

export const initTatum = async () => await TatumSDK.init({ rpc: { ignoreLoadBalancing: true }, verbose: true })
