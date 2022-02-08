import { SdkWithMultiTokenFunctions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'

type Chains = 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'BSC'
export const multiTokenTestFactory = {
  prepare: {
    deployMultiTokenTransaction: (
      sdk: SdkWithMultiTokenFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const privateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER
      it('valid with signatureId', async () => {
        const result = await sdk.prepare.deployMultiTokenTransaction(
          {
            chain,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            uri: 'https://example.com',
            fee: {
              gasLimit: '259348',
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
        const result = await sdk.prepare.deployMultiTokenTransaction(
          {
            chain,
            fromPrivateKey: privateKey,
            uri: 'https://example.com',
            fee: {
              gasLimit: '259348',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })
    },

    transferMultiTokenTransaction: (
      sdk: SdkWithMultiTokenFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const contractAddress = testData.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.transferMultiTokenTransaction(
          {
            chain,
            tokenId: '123456',
            to: '0x31a19a9E4BDd33982188BCb058a7E2a3515a8136',
            contractAddress,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            amount: '1',
            fee: {
              gasLimit: '259348',
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
        const result = await sdk.prepare.transferMultiTokenTransaction(
          {
            chain,
            tokenId: '123456',
            to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
            contractAddress,
            amount: '1',
            fromPrivateKey: privateKey,
            fee: {
              gasLimit: '259348',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.transferMultiTokenTransaction(
            {
              chain,
              tokenId: '123456',
              to: 'invalidaddress',
              amount: '1',
              contractAddress: contractAddress,
              fromPrivateKey: privateKey,
              fee: {
                gasLimit: '259348',
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

    transferMultiTokenBatchTransaction: (
      sdk: SdkWithMultiTokenFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const contractAddress = testData.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.transferMultiTokenBatchTransaction(
          {
            chain,
            tokenId: ['123456', '12345644'],
            to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
            contractAddress,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            amounts: ['5', '5'],
            fee: {
              gasLimit: '259348',
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
        const result = await sdk.prepare.transferMultiTokenBatchTransaction(
          {
            chain,
            tokenId: ['123456', '12345644'],
            to: '0x6c4A48886b77D1197eCFBDaA3D3f35d81d584342',
            contractAddress,
            fromPrivateKey: privateKey,
            amounts: ['5', '5'],
            fee: {
              gasLimit: '259348',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.transferMultiTokenBatchTransaction(
            {
              chain,
              tokenId: ['123456', '12345644'],
              to: 'someinvalid',
              contractAddress,
              fromPrivateKey: privateKey,
              amounts: ['5', '5'],
              fee: {
                gasLimit: '259348',
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

    mintMultiTokenTransaction: (
      sdk: SdkWithMultiTokenFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const contractAddress = testData.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.mintMultiTokenTransaction(
          {
            chain,
            tokenId: '123456',
            to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
            contractAddress: contractAddress,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            amount: '10',
            fee: {
              gasLimit: '259348',
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
        const result = await sdk.prepare.mintMultiTokenTransaction(
          {
            chain,
            tokenId: '123456',
            to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
            contractAddress: contractAddress,
            fromPrivateKey: privateKey,
            amount: '10',
            fee: {
              gasLimit: '259348',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.mintMultiTokenTransaction(
            {
              chain,
              tokenId: '123456',
              to: 'invalidaddress',
              contractAddress: contractAddress,
              fromPrivateKey: privateKey,
              amount: '10',
              fee: {
                gasLimit: '259348',
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

    mintMultiTokenBatchTransaction: (
      sdk: SdkWithMultiTokenFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const contractAddress = testData.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.mintMultiTokenBatchTransaction(
          {
            chain,
            tokenId: [['123456'], ['12345644']],
            to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
            contractAddress: contractAddress,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            amounts: [['10', '10']],
            fee: {
              gasLimit: '259348',
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
        const result = await sdk.prepare.mintMultiTokenBatchTransaction(
          {
            chain,
            tokenId: [['123456'], ['12345644']],
            to: ['0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9', '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9'],
            contractAddress: contractAddress,
            fromPrivateKey: privateKey,
            amounts: [['10'], ['10']],
            fee: {
              gasLimit: '259348',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.mintMultiTokenBatchTransaction(
            {
              chain,
              tokenId: [['123456'], ['12345644']],
              to: ['someinvalid', 'anotherinvalid'],
              contractAddress: contractAddress,
              fromPrivateKey: privateKey,
              amounts: [['10'], ['10']],
              fee: {
                gasLimit: '259348',
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

    burnMultiTokenTransaction: (
      sdk: SdkWithMultiTokenFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const contractAddress = testData.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const account = testData.TESTNET?.MULTITOKEN?.ADDRESS
      const provider = testData.TESTNET?.PROVIDER
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.burnMultiTokenTransaction(
          {
            chain,
            tokenId: new Date().getTime().toString(),
            contractAddress: contractAddress,
            account,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            amount: '2',
            fee: {
              gasLimit: '259348',
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
        const result = await sdk.prepare.burnMultiTokenTransaction(
          {
            chain,
            tokenId: new Date().getTime().toString(),
            account,
            contractAddress: contractAddress,
            fromPrivateKey: privateKey,
            amount: '2',
            fee: {
              gasLimit: '259348',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })
    },

    burnMultiTokenBatchTransaction: (
      sdk: SdkWithMultiTokenFunctions,
      testData: BlockchainTestData,
      chain: Chains,
    ) => {
      const contractAddress = testData.TESTNET?.MULTITOKEN?.CONTRACT_ADDRESS
      const privateKey = testData.TESTNET?.MULTITOKEN?.PRIVATE_KEY
      const provider = testData.TESTNET?.PROVIDER
      const account = testData.TESTNET?.MULTITOKEN.ADDRESS
      const token1 = new Date().getTime() + 1
      const token2 = new Date().getTime() + 2

      it('valid from signatureId', async () => {
        const result = await sdk.prepare.burnMultiTokenBatchTransaction(
          {
            chain,
            tokenId: [token1.toString(), token2.toString()],
            contractAddress,
            signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
            amounts: ['2', '2'],
            account,
            fee: {
              gasLimit: '259348',
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
        const token1 = new Date().getTime() + 3
        const token2 = new Date().getTime() + 4
        const result = await sdk.prepare.burnMultiTokenBatchTransaction(
          {
            chain,
            tokenId: [token1.toString(), token2.toString()],
            contractAddress,
            fromPrivateKey: privateKey,
            amounts: ['2', '2'],
            account,
            fee: {
              gasLimit: '259348',
              gasPrice: '20',
            },
          },
          provider,
        )

        expectHexString(result)
      })
    },
  },
}
