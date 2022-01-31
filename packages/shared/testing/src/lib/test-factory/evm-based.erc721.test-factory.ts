import { DeployNft, TransferNft } from '@tatumio/api-client'
import { SdkWithErc721Functions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '../shared-testing'

export const erc721TestFactory = {
  prepare: {
    deploySignedTransaction: (
      sdk: SdkWithErc721Functions,
      testData: BlockchainTestData,
      chain: DeployNft.chain,
    ) => {
      it('valid with signatureId', async () => {
        const result = await sdk.prepare.deploySignedTransaction({
          chain: chain,
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
        expect(json.from).toBe(0)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.deploySignedTransaction({
          chain: chain,
          symbol: 'ERC_SYMBOL',
          name: 'bO6AN',
          fromPrivateKey: testData.MAINNET.ERC_20.PRIVATE_KEY,
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
      chain: TransferNft.chain,
    ) => {
      it('valid from signatureId', async () => {
        const result = await sdk.prepare.transferSignedTransaction({
          chain: chain,
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          tokenId: '112345678',
          contractAddress: testData.MAINNET.ERC_20.ADDRESS,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          fee: {
            gasLimit: '50000',
            gasPrice: '20',
          },
        })

        const json = JSON.parse(result)

        expect(json.gasPrice).toBe('20000000000')
        expect(json.from).toBe(0)
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const result = await sdk.prepare.transferSignedTransaction({
          chain: chain,
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          contractAddress: testData.MAINNET.ERC_20.ADDRESS,
          fromPrivateKey: testData.MAINNET.ERC_20.PRIVATE_KEY,
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
            chain: chain,
            to: 'someinvalidaddress',
            contractAddress: testData.MAINNET.ERC_20.ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_20.PRIVATE_KEY,
            nonce: 3252345722143,
            tokenId: '112345678',
            fee: {
              gasLimit: '326452',
              gasPrice: '20',
            },
          })
          fail()
        } catch (e) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },
    mintSignedTransaction: (sdk: SdkWithErc721Functions, testData: BlockchainTestData) => {
      xit('valid from privateKey', async () => {
        const result = await sdk.prepare.mintSignedTransaction({
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          contractAddress: testData.MAINNET.ERC_20.ADDRESS,
          fromPrivateKey: testData.MAINNET.ERC_20.PRIVATE_KEY,
          tokenId: '34839439',
          url: 'https://my_token_data.com',
        })

        expectHexString(result)
      })

      xit('valid from SignatureId', async () => {
        const result = await sdk.prepare.mintSignedTransaction({
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          contractAddress: testData.MAINNET.ERC_20.ADDRESS,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          tokenId: '34839439',
          url: 'https://my_token_data.com',
        })

        const json = JSON.parse(result)

        expect(json.gasPrice).toBe('20000000000')
        expect(json.from).toBe(0)
        expectHexString(json.data)
      })

      xit('invalid address', async () => {
        try {
          await sdk.prepare.mintSignedTransaction({
            to: 'someinvalidaddress',
            tokenId: '34839439',
            url: 'https://my_token_data.com',
            contractAddress: testData.MAINNET.ERC_20.ADDRESS,
            fromPrivateKey: testData.MAINNET.ERC_20.PRIVATE_KEY,
          })
          fail()
        } catch (e) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },
    burnSignedTransaction: (sdk: SdkWithErc721Functions, testData: BlockchainTestData) => {
      xit('valid from privateKey', async () => {
        const result = await sdk.prepare.burnSignedTransaction({
          tokenId: '34839439',
          contractAddress: testData.MAINNET.ERC_20.ADDRESS,
          fromPrivateKey: testData.MAINNET.ERC_20.PRIVATE_KEY,
        })

        expectHexString(result)
      })

      xit('valid from SignatureId', async () => {
        const result = await sdk.prepare.burnSignedTransaction({
          contractAddress: testData.MAINNET.ERC_20.ADDRESS,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          tokenId: '34839439',
        })

        const json = JSON.parse(result)

        expect(json.gasPrice).toBe('20000000000')
        expect(json.from).toBe(0)
        expectHexString(json.data)
      })
    },
  },
}
