import { SdkWithCustodialFunctions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData } from '@tatumio/shared-testing-common'

type Chains = 'ETH' | 'ONE' | 'BSC' | 'MATIC'
export const custodialTestFactory = {
  prepare: {
    generateCustodialWalletSignedTransaction: (
      sdk: SdkWithCustodialFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const fromPrivateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER

      it('valid with signatureId', async () => {
        const result = await sdk.prepare.generateCustodialWalletSignedTransaction(
          {
            chain,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            enableFungibleTokens: true,
            enableNonFungibleTokens: true,
            enableSemiFungibleTokens: false,
            enableBatchTransactions: true,
            fee: {
              gasLimit: '326452',
              gasPrice: '20',
            },
          },
          provider,
        )
        expect(result).not.toBeNull()
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.generateCustodialWalletSignedTransaction(
          {
            chain,
            fromPrivateKey,
            enableFungibleTokens: true,
            enableNonFungibleTokens: true,
            enableSemiFungibleTokens: false,
            enableBatchTransactions: true,
            fee: {
              gasLimit: '326452',
              gasPrice: '20',
            },
          },
          provider,
        )
        expect(result).not.toBeNull()
      })
    },
  },
}
