import { SdkWithKmsFunctions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'

export const kmsTestFactory = {
  sign: (sdk: SdkWithKmsFunctions, testData: BlockchainTestData) => {
    it('should sign kms transaction', async () => {
      const signedRawTx = await sdk.sign(
        {
          serializedTransaction:
            '{"txData":{"fromAddress":[{"address":"0xe73f05a8b3b28e1afec4ab759101e79b28542440","signatureId":"b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"}],"to":[{"address":"0xfb99F8aE9b70A0C8Cd96aE665BBaf85A7E01a2ef","value":1}]},"privateKeysToSign":["0x254ac28e10916b3c2def004a37fec216649288ae71c8cac41faf106193263792"]}',
          hashes: ['b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0'],
          id: '60f67210baf4120bb057c1ce',
        },
        testData.TESTNET.PRIVATE_KEY_0,
        testData.PROVIDER,
      )
      expectHexString(signedRawTx)
    })
  },
}
