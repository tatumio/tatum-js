import { evmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { BigNumber } from 'bignumber.js'
import caver from 'caver-js'

export const klaytnWeb3 = (args: { blockchain: EvmBasedBlockchain }) => {
  const evmBasedWeb3Result = evmBasedWeb3(args)

  return {
    ...evmBasedWeb3Result,
    getClient(provider?: string, fromPrivateKey?: string): any {
      const client = new caver(provider)

      if (fromPrivateKey) {
        client.klay.accounts.wallet.add(fromPrivateKey)
        client.klay.defaultAccount = client.klay.accounts.wallet[0].address
      }

      return { ...client, eth: client.klay }
    },
    async getGasPriceInWei(): Promise<string> {
      const client = await this.getClient()
      // TODO:
      // const gasPrice = await client.eth.getGasPrice()
      return new BigNumber('25').multipliedBy(10 ^ 9).toString()
    },
  }
}
