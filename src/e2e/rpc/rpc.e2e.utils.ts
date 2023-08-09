import { Network } from '../../dto'

export const RpcE2eUtils = {
  initConfig: (network: Network) => ({
    network,
    retryCount: 5,
    retryDelay: 2000,
    apiKey: {
      v2: process.env.V2_API_KEY,
    },
  }),
}
