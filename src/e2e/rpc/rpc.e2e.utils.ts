import { Network } from '../../dto'

export const RpcE2eUtils = {
  initConfig: (network: Network) => ({
    network,
    retryCount: 5,
    retryDelay: 2000,
    verbose: true,
    apiKey: {
      v2: process.env.V2_API_KEY
    }
  }),
}
