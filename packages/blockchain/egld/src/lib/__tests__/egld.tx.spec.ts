import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { ESDT_SYSTEM_SMART_CONTRACT_ADDRESS } from '../../constants'
import { TatumEgldSDK } from '../egld.sdk'

describe('EgldSDK - virtual account tx', () => {
  const sdk = TatumEgldSDK({
    apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
  })

  describe('ESDT', () => {
    const testData = TEST_DATA.EGLD
    it('should deploy ESDT transaction', async () => {
      const tx = await sdk.transaction.prepare.deploy({
        from: testData.ADDRESS_0,
        fromPrivateKey: testData.PRIVATE_KEY_0,
        to: testData.ADDRESS_100,
        amount: '0.001',
        fee: {
          gasLimit: '50000',
        },
      })

      const parsedTx = JSON.parse(tx)

      expect(parsedTx.data).toBe('eyBzZXJ2aWNlOiBpc3N1ZSB9')
      expect(parsedTx.sender).toBe(testData.ADDRESS_0)
      expect(parsedTx.receiver).toBe(ESDT_SYSTEM_SMART_CONTRACT_ADDRESS)
      expect(parsedTx.signature).toBeDefined()
    }, 10000)

    it('should prepare send ESDT signed transaction', async () => {
      const tx = await sdk.transaction.prepare.signedTransaction({
        from: testData.ADDRESS_0,
        fromPrivateKey: testData.PRIVATE_KEY_0,
        to: testData.ADDRESS_100,
        amount: '0.001',
        fee: {
          gasLimit: '50000',
        },
      })

      const parsedTx = JSON.parse(tx)

      expect(parsedTx.sender).toBe(testData.ADDRESS_0)
      expect(parsedTx.receiver).toBe(testData.ADDRESS_100)
      expect(parsedTx.signature).toBeDefined()
    })

    it('should prepare smart contract invocation transaction', async () => {
      const tx = await sdk.transaction.prepare.smartContractMethodInvocation({
        from: testData.ADDRESS_0,
        fromPrivateKey: testData.PRIVATE_KEY_0,
        to: testData.ADDRESS_100,
        amount: '0.001',
        fee: {
          gasLimit: '50000',
        },
        data: `{"tokenId": "test", "value": "1"}`,
      })

      const parsedTx = JSON.parse(tx)

      expect(parsedTx.sender).toBe(testData.ADDRESS_0)
      expect(parsedTx.receiver).toBe(testData.ADDRESS_100)
      expect(parsedTx.data).toBe('RVNEVFRyYW5zZmVyQDc0NjU3Mzc0QDAx')
      expect(parsedTx.signature).toBeDefined()
    })

    it('should deploy nft transaction', async () => {
      const tx = await sdk.transaction.prepare.deployNft({
        from: testData.ADDRESS_0,
        fromPrivateKey: testData.PRIVATE_KEY_0,
        to: testData.ADDRESS_100,
        amount: '0.001',
        fee: {
          gasLimit: '50000',
        },
        data: `{"tokenId": "testNft", "value": "1", "name": "My Nft", "symbol": "NftSymbol"}`,
      })

      const parsedTx = JSON.parse(tx)

      expect(parsedTx.sender).toBe(testData.ADDRESS_0)
      expect(parsedTx.receiver).toBe(ESDT_SYSTEM_SMART_CONTRACT_ADDRESS)
      expect(parsedTx.data).toBe('aXNzdWVOb25GdW5naWJsZUA0ZDc5MjA0ZTY2NzRANGU2Njc0NTM3OTZkNjI2ZjZj')
      expect(parsedTx.signature).toBeDefined()
    })

    it('should prepare send nft transaction', async () => {
      const tx = await sdk.transaction.prepare.transferNft({
        from: testData.ADDRESS_0,
        to: testData.ADDRESS_100,
        fromPrivateKey: testData.PRIVATE_KEY_0,
        amount: '0.001',
        fee: {
          gasLimit: '50000',
        },
        data: `{"tokenId": "testNft", "value": "1", "name": "My Nft", "symbol": "NftSymbol", "to": "${testData.ADDRESS_100}"}`,
      })

      const parsedTx = JSON.parse(tx)

      expect(parsedTx.sender).toBe(testData.ADDRESS_0)
      expect(parsedTx.data).toBe(
        'RVNEVE5GVFRyYW5zZmVyQDc0NjU3Mzc0NGU2Njc0QEBANjU3MjY0MzE3MjMyMzc2Yzc4MzU2YjcyNzU3MDM0NzQ2NjY2NzY2ZDc4MzkzMzMzNjg2YTcwNzI3YTY2NjY3NzM1Mzk3NDc0Mzg3YTYxNzE3YTMzNzQzMzM2Nzk2YTM5NjY2NDc0NzI2MzczNzY3MzcyNzE2ODc5NzI3MA==',
      )
      expect(parsedTx.signature).toBeDefined()
    })
  })
})
