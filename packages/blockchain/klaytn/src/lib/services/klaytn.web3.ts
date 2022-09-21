import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import caver from 'caver-js'

export const klaytnWeb3 = (args: { blockchain: EvmBasedBlockchain }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)
  const getKlaytnClient = (provider?: string, fromPrivateKey?: string): any => {
    const client = new caver(provider)

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
