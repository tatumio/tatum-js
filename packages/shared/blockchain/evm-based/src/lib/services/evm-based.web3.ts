import Web3 from 'web3'
import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { EvmBasedBlockchain, httpHelper } from '@tatumio/shared-core'

export interface EvmBasedWeb3 {
  getClient(provider?: string, fromPrivateKey?: string): Web3

  getGasPriceInWei(provider?: string): Promise<string>
}

export const CELO_CONSTANTS = {
  CEUR_ADDRESS_MAINNET: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
  CEUR_ADDRESS_TESTNET: '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f',
  CUSD_ADDRESS_MAINNET: '0x765de816845861e75a25fca122bb6898b8b1282a',
  CUSD_ADDRESS_TESTNET: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
  CELO_ADDRESS_MAINNET: '0x471EcE3750Da237f93B8E339c536989b8978a438',
  CELO_ADDRESS_TESTNET: '0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9',
}

export const evmBasedWeb3 = (args: { blockchain: EvmBasedBlockchain }) => {
  return {
    getClient(provider?: string, fromPrivateKey?: string): Web3 {
      const endpoint = httpHelper.web3Endpoint(
        args.blockchain,
        process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL,
        TATUM_API_CONSTANTS.API_KEY,
      )

      const web3 = new Web3(provider || endpoint)
      if (fromPrivateKey) {
        web3.eth.accounts.wallet.add(fromPrivateKey)
        web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
      }
      return web3
    },
  }
}
