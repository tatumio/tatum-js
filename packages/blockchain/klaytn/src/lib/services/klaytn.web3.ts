import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain, httpHelper } from '@tatumio/shared-core'
import Caver from 'caver-js'

export const klaytnWeb3 = (args: { blockchain: EvmBasedBlockchain; client?: Caver }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)
  const getKlaytnClient = (provider?: string, fromPrivateKey?: string): any => {
    const endpoint = httpHelper.web3Endpoint(
      args.blockchain,
      process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL,
      TATUM_API_CONSTANTS.API_KEY,
    )
    const client = args.client ?? new Caver(provider || endpoint)

    if (fromPrivateKey) {
      client.klay.accounts.wallet.add(fromPrivateKey)
      client.klay.defaultAccount = client.klay.accounts.wallet[0].address
    }

    return { ...client, eth: client.klay }
  }

  return {
    ...evmBasedWeb3Result,
    getClient(provider?: string, fromPrivateKey?: string): any {
      return getKlaytnClient(provider, fromPrivateKey)
    },
    async getGasPriceInWei(provider?: string): Promise<string> {
      const client = await getKlaytnClient(provider)
      return await client.eth.getGasPrice()
    },
  }
}
