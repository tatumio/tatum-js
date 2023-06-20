import { Network } from '../../dto'

export const RpcE2eUtils = {
  initConfig: (network: Network) => ({
    network,
    retryCount: 1,
    retryDelay: 2000,
  }),
}
