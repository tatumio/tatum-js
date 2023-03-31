import { TatumSdk } from '@tatumcom/js'

export const initTatum = async () => await TatumSdk.init({ rpc: { ignoreLoadBalancing: true }, verbose: true })
