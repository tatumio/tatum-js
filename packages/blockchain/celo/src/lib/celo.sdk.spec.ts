import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing-common'
import { Blockchain } from '@tatumio/shared-core'
import { celoWeb3 } from './services/celo.web3'
import { TatumCeloSDK } from './celo.sdk'
import { BlockchainFeesService } from '@tatumio/api-client'

describe('TatumCeloSDK', () => {
  const sdk = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.CELO)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.CELO)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.CELO)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.CELO)
    })
  })

  describe('Web3', () => {
    describe('Get client', () => {
      const provider = TEST_DATA.CELO?.PROVIDER

      it('should return valid web3 clientVersion', async () => {
        const client = await sdk.httpDriver({
          jsonrpc: '2.0',
          method: 'web3_clientVersion',
          params: [],
          id: 2,
        })

        expect(client.result).toBeDefined()
        expect(String(client.result).length).toBeGreaterThan(0)
      })

      it('should return valid web3 client with privateKey', async () => {
        const web3 = celoWeb3({
          blockchain: Blockchain.CELO,
          apiCalls: {
            getFee: BlockchainFeesService.getBlockchainFee,
          },
        })
        const client = web3.getClient(provider, TEST_DATA.CELO.TESTNET.ERC_721!.PRIVATE_KEY)

        expect(client).toBeDefined()
      })
    })

    describe('Get gas price in wei', () => {
      it('should return gas price', async () => {
        const gasPrice = await sdk.getGasPriceInWei()

        expect(gasPrice).toBeDefined()
        expect(parseInt(gasPrice)).toBeGreaterThan(0)
      })
    })
  })
})
