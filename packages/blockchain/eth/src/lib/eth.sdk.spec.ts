import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA, walletTestFactory } from '@tatumio/shared-testing'
import { TatumEthSDK } from './eth.sdk'

describe('TatumEthSDK', () => {
  const sdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  describe('Wallet', () => {
    describe('Generate wallet', () => {
      walletTestFactory.generateBlockchainWallet(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Address from XPUB', () => {
      walletTestFactory.generateAddressFromXpub(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Private key from mnemonic', () => {
      walletTestFactory.generatePrivateKeyFromMnemonic(sdk.wallet, TEST_DATA.ETH)
    })

    describe('Address from private key', () => {
      walletTestFactory.generateAddressFromPrivateKey(sdk.wallet, TEST_DATA.ETH)
    })
  })

  fdescribe('Txs', () => {
    it('simply one', async () => {
      const nonce = 3252345722143

      const result = await sdk.transaction.erc20.prepare.deploySignedTransaction({
        symbol: 'ERC_SYMBOL',
        name: 'bO6AN',
        address: '0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea',
        supply: '10000000',
        fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab', // todo this or signatureID
        signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
        digits: 18,
        totalCap: '10000000',
        nonce,
        fee: {
          gasLimit: "40000",
          gasPrice: "20"
        }
      })

      const json = JSON.parse(result)

      expect(json.nonce).toBe(nonce)
      expect(json.gasPrice).toBe('20000000000')
      expect(json.data).toBeDefined()
    })
  })
})
