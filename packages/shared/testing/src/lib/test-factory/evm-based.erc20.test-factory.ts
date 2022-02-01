import { SdkWithErc20Functions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '../shared-testing'

export const erc20TestFactory = {
  decimals: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
    describe('mainnet', () => {
      it('valid', async () => {
        const result = await sdk.decimals(testData.TESTNET.ERC_20.CONTRACT_ADDRESS, testData.TESTNET.PROVIDER)

        expect(result).toBeDefined()
      })
    })
  },
  prepare: {
    deploySignedTransaction: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
      it('valid with signatureId', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.deploySignedTransaction({
          symbol: 'ERC_SYMBOL',
          name: 'bO6AN',
          address: testData.TESTNET.ERC_20.ADDRESS,
          supply: '10000000',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          digits: 18,
          totalCap: '10000000',
          nonce,
          fee: {
            gasLimit: '171864',
            gasPrice: '20',
          },
        }, testData.TESTNET.PROVIDER)

        const json = JSON.parse(result)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.deploySignedTransaction({
          symbol: 'ERC_SYMBOL',
          name: 'bO6AN',
          address: testData.TESTNET.ERC_20.ADDRESS,
          supply: '10000000',
          fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
          digits: 18,
          totalCap: '10000000',
          nonce,
          fee: {
            gasLimit: '171864',
            gasPrice: '20',
          },
        }, testData.TESTNET.PROVIDER)

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.deploySignedTransaction({
            symbol: 'ERC_SYMBOL',
            name: 'bO6AN',
            address: 'someinvalidaddress',
            supply: '10000000',
            fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
            digits: 18,
            totalCap: '10000000',
            nonce: 3252345722143,
            fee: {
              gasLimit: '171864',
              gasPrice: '20',
            },
          }, testData.TESTNET.PROVIDER)
          fail()
        } catch (e) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },
    transferSignedTransaction: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
      it('valid from signatureId', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.transferSignedTransaction({
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          amount: '10',
          contractAddress: testData.TESTNET.ERC_20.ADDRESS,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          digits: 18,
          nonce,
          fee: {
            gasLimit: '53632',
            gasPrice: '20',
          },
        }, testData.TESTNET.PROVIDER)

        const json = JSON.parse(result)

        expect(json.nonce).toBe(nonce)
        expect(json.gasPrice).toBe('20000000000')
        expectHexString(json.data)
      })

      it('valid from privateKey', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.transferSignedTransaction({
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          amount: '10',
          contractAddress: testData.TESTNET.ERC_20.ADDRESS,
          fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
          digits: 18,
          nonce,
          fee: {
            gasLimit: '53632',
            gasPrice: '20',
          },
        }, testData.TESTNET.PROVIDER)

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.transferSignedTransaction({
            to: 'someinvalidaddress',
            contractAddress: testData.TESTNET.ERC_20.ADDRESS,
            amount: '10',
            fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
            digits: 18,
            nonce: 3252345722143,
            fee: {
              gasLimit: '53632',
              gasPrice: '20',
            },
          }, testData.TESTNET.PROVIDER)
          fail()
        } catch (e) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },
    mintSignedTransaction: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
      xit('valid from privateKey', async () => {
        const result = await sdk.prepare.mintSignedTransaction({
          to: testData.TESTNET.ERC_20.ADDRESS,
          amount: '10',
          contractAddress: testData.TESTNET.ERC_20.CONTRACT_ADDRESS,
          fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
        }, testData.TESTNET.PROVIDER)

        expectHexString(result)
      })
    },
    burnSignedTransaction: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
      xit('valid from privateKey', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.burnSignedTransaction({
          amount: '10',
          contractAddress: testData.TESTNET.ERC_20.CONTRACT_ADDRESS,
          fromPrivateKey: testData.TESTNET.ERC_20.PRIVATE_KEY,
          nonce,
        }, testData.TESTNET.PROVIDER)

        expectHexString(result)
      })
    },
  },
}
