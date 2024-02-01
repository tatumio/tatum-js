import { SdkWithErc721Functions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'
import { GanacheAccount } from './ganacheHelper'

export const erc721TestFactory = {
  prepare: {
    deploySignedTransaction: (sdk: SdkWithErc721Functions, testData: BlockchainTestData) => {
      jest.setTimeout(99999)
      const provider = testData?.PROVIDER
      it('valid with signatureId', async () => {
        const result = await sdk.prepare.deploySignedTransaction(
          {
            symbol: 'ERC_SYMBOL',
            name: '2123kd',
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            fee: {
              gasLimit: '326580',
              gasPrice: '20',
            },
          },
          provider,
        )

        const json = JSON.parse(result)

        expect(json.gasPrice).toBe('20000000000')
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.deploySignedTransaction(
          {
            symbol: 'ERC_SYMBOL',
            name: 'bO6AN',
            fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
            fee: {
              gasLimit: '326580',
              gasPrice: '1',
            },
          },
          provider,
        )

        expectHexString(result)
      })
    },

    transferSignedTransaction: (sdk: SdkWithErc721Functions, testData: BlockchainTestData) => {
      const provider = testData?.PROVIDER
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.transferSignedTransaction(
          {
            to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
            tokenId: '112345678',
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            fee: {
              gasLimit: '50000',
              gasPrice: '20',
            },
          },
          provider,
        )

        const json = JSON.parse(result)

        expect(json.gasPrice).toBe('20000000000')
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.transferSignedTransaction(
          {
            to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
            tokenId: '112345678',
            fee: {
              gasLimit: '50000',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.transferSignedTransaction(
            {
              to: 'someinvalidaddress',
              contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
              nonce: 3252345722143,
              tokenId: '112345678',
              fee: {
                gasLimit: '50000',
                gasPrice: '20',
              },
            },
            provider,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },
    mintSignedTransaction: (sdk: SdkWithErc721Functions, testData: BlockchainTestData) => {
      const provider = testData?.PROVIDER
      const address = testData.TESTNET.ERC_721?.ADDRESS
        ? testData.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.mintSignedTransaction(
          {
            to: address,
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            fee: {
              gasLimit: '3264521',
              gasPrice: '20',
            },
          },
          provider,
        )
        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.mintSignedTransaction(
          {
            to: address,
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            fee: {
              gasLimit: '3264521',
              gasPrice: '20',
            },
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.mintSignedTransaction(
            {
              to: 'someinvalidaddress',
              tokenId: new Date().getTime().toString(),
              url: 'https://my_token_data.com',
              contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
              fee: {
                gasLimit: '3264521',
                gasPrice: '20',
              },
            },
            provider,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    mintMultipleSignedTransaction: (sdk: SdkWithErc721Functions, testData: BlockchainTestData) => {
      const provider = testData?.PROVIDER
      const address = testData.TESTNET.ERC_721?.ADDRESS
        ? testData.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.mintMultipleSignedTransaction(
          {
            to: [address, address],
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
            tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data.com'],
            fee: {
              gasLimit: '3264521',
              gasPrice: '20',
            },
          },
          provider,
        )
        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.mintMultipleSignedTransaction(
          {
            to: [address, address],
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data.com'],
            fee: {
              gasLimit: '3264521',
              gasPrice: '20',
            },
          },
          provider,
        )
        const json = JSON.parse(result)

        expectHexString(json.data)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.mintMultipleSignedTransaction(
            {
              to: ['invalid', 'invalid'],
              contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
              tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data.com'],
              fee: {
                gasLimit: '3264521',
                gasPrice: '20',
              },
            },
            provider,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    burnSignedTransaction: (sdk: SdkWithErc721Functions, testData: BlockchainTestData) => {
      const provider = testData?.PROVIDER

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.burnSignedTransaction(
          {
            tokenId: new Date().getTime().toString(),
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.TESTNET.ERC_721!.PRIVATE_KEY,
            fee: {
              gasLimit: '3264521',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.burnSignedTransaction(
          {
            contractAddress: testData.TESTNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            fee: {
              gasLimit: '3264521',
              gasPrice: '20',
            },
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })
    },
  },
}
