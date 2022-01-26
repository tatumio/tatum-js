import { SdkWithErc20Functions } from '@tatumio/shared-blockchain-abstract';
import { BlockchainTestData } from '../shared-testing';

export const erc20TestFactory = {
  decimals: (
    sdk: SdkWithErc20Functions,
    testData: BlockchainTestData,
  ) => {
    describe('mainnet', () => {
      it('valid', async () => {
        // Returned values aren't valid, did it run Out of Gas? You might also see this error if you are not using the correct ABI for the contract you are retrieving data from, requesting data from a block number that does not exist, or querying a node which is not fully synced.
        const result = await sdk.decimals(testData.MAINNET.CONTRACT_ADDRESS)

        expect(result).toBeDefined()
      })
    })
  },
  prepare: {
    deploySignedTransaction: (
      sdk: SdkWithErc20Functions,
      testData: BlockchainTestData,
    ) => {
      describe('mainnet', () => {
        it('valid', async () => {
          const nonce = 3252345722143

          const result = await sdk.prepare.deploySignedTransaction({
            symbol: 'ERC_SYMBOL',
            name: 'bO6AN',
            address: testData.MAINNET.ERC_20.ADDRESS,
            supply: '10000000',
            fromPrivateKey: testData.MAINNET.PRIVATE_KEY_0, // todo this or signatureID
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
          expect(json.from).toBe(0)
          expect(json.data).toBeDefined()
        })

        it('invalid address', async () => {
          try {
            await sdk.prepare.deploySignedTransaction({
              symbol: 'ERC_SYMBOL',
              name: 'bO6AN',
              address: 'someinvalidaddress',
              supply: '10000000',
              fromPrivateKey: testData.MAINNET.PRIVATE_KEY_0, // todo this or signatureID
              signatureId: '1f7f7c0c-3906-4aa1-9dfe-4b67c43918f6',
              digits: 18,
              totalCap: '10000000',
              nonce: 3252345722143,
              fee: {
                gasLimit: "40000",
                gasPrice: "20"
              }
            })
            fail()
          } catch (e) {
            expect(e.reason).toMatch('invalid address')
          }
        })
      })
    }
  }
}