import { Network } from '../../dto'

export const RpcE2eUtils = {
  initConfig: (network: Network) => ({
    network,
    retryCount: 5,
    retryDelay: 2000,
    verbose: true,
    apiKey: {
      v2: 't-647835e1930be3001cb53f81-647835e2930be3001cb53f87'
    }
  }),
}
