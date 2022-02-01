import { SdkWithErc721Functions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '../shared-testing'

export const erc721TestFactory = {
  prepare: {
    deploySignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC' | 'ALGO',
    ) => {
      jest.setTimeout(99999)
      it('valid with signatureId', async () => {
        const result = await sdk.prepare.deploySignedTransaction({
          chain,
          symbol: 'ERC_SYMBOL',
          name: '2123kd',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          fee: {
            gasLimit: '326452',
            gasPrice: '20',
          },
        })

        const json = JSON.parse(result)

        expect(json.gasPrice).toBe('20000000000')
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.deploySignedTransaction({
          chain,
          symbol: 'ERC_SYMBOL',
          name: 'bO6AN',
          fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
          fee: {
            gasLimit: '326452',
            gasPrice: '20',
          },
        })

        expectHexString(result)
      })
    },

    transferSignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC' | 'ALGO',
    ) => {
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.transferSignedTransaction({
          chain,
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          tokenId: '112345678',
          contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          fee: {
            gasLimit: '50000',
            gasPrice: '20',
          },
        })

        const json = JSON.parse(result)

        expect(json.gasPrice).toBe('20000000000')
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.transferSignedTransaction({
          chain,
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
          fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
          tokenId: '112345678',
          fee: {
            gasLimit: '326452',
            gasPrice: '20',
          },
        })

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.transferSignedTransaction({
            chain,
            to: 'someinvalidaddress',
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
            nonce: 3252345722143,
            tokenId: '112345678',
            fee: {
              gasLimit: '326452',
              gasPrice: '20',
            },
          })
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },
    mintSignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC',
    ) => {
      const provider = testData?.PROVIDER
      const address = testData.TESTNET.ERC_721?.ADDRESS
        ? testData.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.mintSignedTransaction(
          {
            to: address,
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain,
          },
          provider,
        )
        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.mintSignedTransaction(
          {
            to: address,
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain,
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
              contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
              chain,
            },
            provider,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    mintMultipleSignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC',
    ) => {
      const provider = testData?.PROVIDER
      const address = testData.TESTNET.ERC_721?.ADDRESS
        ? testData.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.mintMultipleSignedTransaction(
          {
            to: [address, address],
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data.com'],
            chain,
          },
          provider,
        )
        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.mintMultipleSignedTransaction(
          {
            to: [address, address],
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data.com'],
            chain,
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
              contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
              tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data.com'],
              chain,
            },
            provider,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    mintCashbackSignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC',
    ) => {
      const provider = testData?.PROVIDER
      const address = testData.TESTNET.ERC_721?.ADDRESS
        ? testData.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.mintCashbackSignedTransaction(
          {
            to: address,
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain,
            cashbackValues: ['0.5'],
            authorAddresses: [address],
          },
          provider,
        )

        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.mintCashbackSignedTransaction(
          {
            to: address,
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            url: 'https://my_token_data.com',
            chain,
            cashbackValues: ['0.5'],
            authorAddresses: [address],
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.mintCashbackSignedTransaction(
            {
              to: 'someinvalidaddress',
              tokenId: new Date().getTime().toString(),
              url: 'https://my_token_data.com',
              contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
              chain,
              cashbackValues: ['0.5'],
              authorAddresses: [address],
            },
            provider,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    mintMultipleCashbackSignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC',
    ) => {
      const provider = testData?.PROVIDER
      const address = testData.TESTNET.ERC_721?.ADDRESS
        ? testData.TESTNET.ERC_721?.ADDRESS
        : '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.mintMultipleCashbackSignedTransaction(
          {
            to: [address, address],
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data.com'],
            chain,
            cashbackValues: [['0.5'], ['0.5']],
            authorAddresses: [[address], [address]],
          },
          provider,
        )
        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.mintMultipleSignedTransaction(
          {
            to: [address, address],
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
            url: ['https://my_token_data.com', 'https://my_token_data.com'],
            chain,
            cashbackValues: [['0.5'], ['0.5']],
            authorAddresses: [[address], [address]],
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
              contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
              fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
              tokenId: [new Date().getTime().toString(), new Date().getTime().toString()],
              url: ['https://my_token_data.com', 'https://my_token_data.com'],
              chain,
              cashbackValues: [['0.5'], ['0.5']],
            },
            provider,
          )
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    updateCashbackForAuthorSignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC',
    ) => {
      const provider = testData.PROVIDER

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.updateCashbackForAuthorSignedTransaction(
          {
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
            tokenId: new Date().getTime().toString(),
            chain,
            cashbackValue: '0.8',
          },
          provider,
        )
        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.updateCashbackForAuthorSignedTransaction(
          {
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            chain,
            cashbackValue: '0.8',
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })
    },

    burnSignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC' | 'ALGO',
    ) => {
      const provider = testData?.PROVIDER

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.burnSignedTransaction(
          {
            tokenId: new Date().getTime().toString(),
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_721!.PRIVATE_KEY,
            chain,
          },
          provider,
        )

        expectHexString(result)
      })

      it('valid from SignatureId', async () => {
        const result = await sdk.prepare.burnSignedTransaction(
          {
            contractAddress: testData.MAINNET.ERC_721!.CONTRACT_ADDRESS,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            tokenId: new Date().getTime().toString(),
            chain,
          },
          provider,
        )

        const json = JSON.parse(result)
        expectHexString(json.data)
      })
    },
  },
}
