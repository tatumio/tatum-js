import { Network } from '../../dto'
import { e2eUtil } from '../e2e.util'

export const RpcE2eUtils = {
  initConfig: (network: Network, apiKey?: string) => {
    return {
      network,
      verbose: e2eUtil.isVerbose,
      retryCount: 5,
      retryDelay: 2000,
      apiKey: {
        v4: apiKey ?? process.env.V4_API_KEY_MAINNET,
      },
    }
  },
}
