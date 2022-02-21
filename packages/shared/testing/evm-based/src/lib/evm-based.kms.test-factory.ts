import { Currency } from '@tatumio/api-client'
import { SdkWithKmsFunctions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'

export const kmsTestFactory = {
  sign: (sdk: SdkWithKmsFunctions, testData: BlockchainTestData, chain: Currency) => {
    it('should sign kms transaction', async () => {
      const tx = {
        withdrawalId: null,
        chain,
        serializedTransaction: testData.TESTNET.SERIALIZED_TX,
        hashes: ['26d3883e-4e17-48b3-a0ee-09a3e484ac83'],
        index: 69458588.50738375,
        withdrawalResponses: null,
        id: '61dc488fbcaf510dca58d38a',
      }

      const signedRawTx = await sdk.sign(tx as any, testData.TESTNET.PRIVATE_KEY_0, testData.PROVIDER)
      expectHexString(signedRawTx)
    })
  },
}
