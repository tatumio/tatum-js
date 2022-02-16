import { SdkWithCustodialFunctions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'

type Chains = 'ETH' | 'ONE' | 'BSC' | 'MATIC'
export const custodialTestFactory = {
  prepare: {
    transferFromCustodialWallet: (
      sdk: SdkWithCustodialFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'ONE' | 'XDC' | 'BSC' | 'KLAY' | 'MATIC',
    ) => {
      const provider = testData.TESTNET?.PROVIDER
      const fromPrivateKey = testData.TESTNET.CUSTODIAL.PRIVATE_KEY
      const signatureId = testData.TESTNET.CUSTODIAL.SIGNATURE_ID
      const contractAddress = testData.TESTNET.CUSTODIAL.CONTRACT_ADDRESS
      const tokenAddress = testData.TESTNET.CUSTODIAL.TOKEN_ADDRESS

      it('valid with signatureId', async () => {
        try {
          const result = await sdk.prepare.transferFromCustodialWallet(
            {
              chain,
              signatureId,
              custodialAddress: contractAddress,
              recipient: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              tokenAddress,
              amount: '1',
              contractType: 0,
            },
            true,
            provider,
          )
          const json = JSON.parse(result)
          expectHexString(json.data)
        } catch (e) {
          console.log(e)
          expect(e).not.toBeDefined()
        }
      })

      it('valid with privateKey', async () => {
        const result = await sdk.prepare.transferFromCustodialWallet(
          {
            chain,
            fromPrivateKey,
            custodialAddress: contractAddress,
            recipient: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            tokenAddress,
            amount: '1',
            contractType: 0,
          },
          true,
          provider,
        )
        expectHexString(result)
      })
    },

    batchTransferFromCustodialWallet: (
      sdk: SdkWithCustodialFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'ONE' | 'XDC' | 'BSC' | 'KLAY' | 'MATIC',
    ) => {
      const provider = testData.TESTNET?.PROVIDER
      const fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'

      it('valid with signatureId', async () => {
        const result = await sdk.prepare.batchTransferFromCustodialWallet(
          {
            chain,
            signatureId: '695a3b3e-649f-4e5b-9524-c388c4f45230',
            custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
            tokenId: ['0', '1', '0'],
            amount: ['1', '1', '0.00001'],
            contractType: [0, 2, 3],
            tokenAddress: [
              '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
              '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
              '0',
            ],
            recipient: [
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            ],
          },
          true,
          provider,
        )
        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.batchTransferFromCustodialWallet(
          {
            chain,
            fromPrivateKey,
            custodialAddress: '0x009bc01b990e2781e8a961fd792f4ebb12a683b4',
            tokenId: ['0', '1', '0'],
            amount: ['1', '1', '0.00001'],
            contractType: [0, 2, 3],
            tokenAddress: [
              '0xec5dcb5dbf4b114c9d0f65bccab49ec54f6a0867',
              '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
              '0',
            ],
            recipient: [
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
              '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            ],
          },
          true,
          provider,
        )
        expectHexString(result)
      })
    },
    approveFromCustodialWallet: (
      sdk: SdkWithCustodialFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'ONE' | 'XDC' | 'BSC' | 'KLAY' | 'MATIC',
    ) => {
      const provider = testData.TESTNET?.PROVIDER
      const fromPrivateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY

      it('valid with signatureId', async () => {
        const result = await sdk.prepare.approveFromCustodialWallet(
          {
            chain,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            contractType: 0,
            custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
            tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
            spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            tokenId: '1',
            amount: '1',
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.approveFromCustodialWallet(
          {
            chain,
            fromPrivateKey,
            contractType: 0,
            custodialAddress: '0x95abdd7406a6aca49797e833bacc3edaa394853a',
            tokenAddress: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
            spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
            tokenId: '1',
            amount: '1',
          },
          provider,
        )

        expectHexString(result)
      })
    },
    custodialWalletBatch: (
      sdk: SdkWithCustodialFunctions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'ONE' | 'BSC' | 'MATIC' | 'XDC',
    ) => {
      const provider = testData.TESTNET?.PROVIDER
      const fromPrivateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY

      it('valid with signatureId', async () => {
        const result = await sdk.prepare.custodialWalletBatch(
          {
            chain,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            owner: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
            batchCount: 1,
          },
          true,
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.custodialWalletBatch(
          {
            chain,
            fromPrivateKey,
            owner: '0x0fd723c4db392f4bc4b999eaacd2b4a8099fefa3',
            batchCount: 1,
          },
          true,
          provider,
        )

        expectHexString(result)
      })
    },
  },
}
