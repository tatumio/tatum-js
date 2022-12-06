import { SdkWithErc20Functions } from '@tatumio/shared-blockchain-abstract'
import { BlockchainTestData, expectHexString } from '@tatumio/shared-testing-common'
import { GanacheAccount } from './ganacheHelper'

export const erc20TestFactory = {
  decimals: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
    it('valid', async () => {
      const result = await sdk.decimals(testData.TESTNET.ERC_20!.CONTRACT_ADDRESS, testData.TESTNET.PROVIDER)
      expect(result).toBeDefined()
    })
  },
  prepare: {
    deploySignedTransaction: (sdk: SdkWithErc20Functions, accounts: GanacheAccount[]) => {
      it('valid with signatureId', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.deploySignedTransaction({
          symbol: 'ERC_SYMBOL',
          name: 'bO6AN',
          address: accounts[0].address,
          supply: '10000000',
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          digits: 18,
          totalCap: '10000000',
          nonce,
          fee: {
            gasLimit: '171864',
            gasPrice: '20',
          },
        })

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
          address: accounts[0].address,
          supply: '10000000',
          fromPrivateKey: accounts[0].privateKey, //testData.TESTNET.ERC_20!.PRIVATE_KEY,
          digits: 18,
          totalCap: '10000000',
          nonce,
          fee: {
            gasLimit: '171864',
            gasPrice: '20',
          },
        })

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.deploySignedTransaction({
            symbol: 'ERC_SYMBOL',
            name: 'bO6AN',
            address: 'someinvalidaddress',
            supply: '10000000',
            fromPrivateKey: '@TODO', //testData.TESTNET.ERC_20!.PRIVATE_KEY,
            digits: 18,
            totalCap: '10000000',
            nonce: 3252345722143,
            fee: {
              gasLimit: '171864',
              gasPrice: '20',
            },
          })
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    transferSignedTransaction: (sdk: SdkWithErc20Functions, accounts: GanacheAccount[]) => {
      it('valid from signatureId', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.transferSignedTransaction({
          to: '0x811DfbFF13ADFBC3Cf653dCc373C03616D3471c9',
          amount: '10',
          contractAddress: accounts[0].address,
          signatureId: 'cac88687-33ed-4ca1-b1fc-b02986a90975',
          digits: 18,
          nonce,
          fee: {
            gasLimit: '53632',
            gasPrice: '20',
          },
        })

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
          contractAddress: accounts[0].address,
          fromPrivateKey: accounts[0].privateKey,
          digits: 18,
          nonce,
          fee: {
            gasLimit: '53632',
            gasPrice: '20',
          },
        })

        expectHexString(result)
      })

      it('invalid address', async () => {
        try {
          await sdk.prepare.transferSignedTransaction({
            to: 'someinvalidaddress',
            contractAddress: accounts[0].address,
            amount: '10',
            fromPrivateKey: accounts[0].privateKey,
            digits: 18,
            nonce: 3252345722143,
            fee: {
              gasLimit: '53632',
              gasPrice: '20',
            },
          })
          fail()
        } catch (e: any) {
          expect(e.reason).toMatch('invalid address')
        }
      })
    },

    mintSignedTransaction: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
      it('valid from privateKey', async () => {
        const result = await sdk.prepare.mintSignedTransaction(
          {
            to: testData.TESTNET.ERC_20!.ADDRESS,
            amount: '10',
            contractAddress: testData.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.TESTNET.ERC_20!.PRIVATE_KEY,
          },
          testData.TESTNET.PROVIDER,
        )

        expectHexString(result)
      })
    },

    approveSignedTransaction: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
      it('valid from privateKey', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.approveSignedTransaction(
          {
            amount: '1',
            contractAddress: testData.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.TESTNET.ERC_20!.PRIVATE_KEY,
            spender: testData.TESTNET.ADDRESS_100,
            nonce,
          },
          testData.TESTNET.PROVIDER,
        )

        expectHexString(result)
      })
    },

    burnSignedTransaction: (sdk: SdkWithErc20Functions, testData: BlockchainTestData) => {
      it('valid from privateKey', async () => {
        const nonce = 3252345722143

        const result = await sdk.prepare.burnSignedTransaction(
          {
            amount: '10',
            contractAddress: testData.TESTNET.ERC_20!.CONTRACT_ADDRESS,
            fromPrivateKey: testData.TESTNET.ERC_20!.PRIVATE_KEY,
            nonce,
          },
          testData.TESTNET.PROVIDER,
        )

        expectHexString(result)
      })
    },
  },
}
