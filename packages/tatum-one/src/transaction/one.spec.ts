import { Currency, erc721Provenance_abi, SmartContractReadMethodInvocation } from '@tatumio/tatum-core'
import {
  OneTransfer,
  OneBurn20,
  OneDeploy20,
  OneTransfer20,
  OneDeploy721,
  OneMint721,
  OneTransfer721,
  OneMintMultiple721,
  OneUpdateCashback721,
  OneBurn721,
  OneDeployMultiToken,
  OneMintMultiToken,
  OneMintMultiTokenBatch,
  OneTransferMultiToken,
  OneTransferMultiTokenBatch,
  OneBurnMultiToken,
  OneBurnMultiTokenBatch,
} from '../model'
import {
  prepareOneBatchTransferMultiTokenSignedTransaction,
  prepareOneBurn20SignedTransaction,
  prepareOneBurn721SignedTransaction,
  prepareOneBurnMultiTokenBatchSignedTransaction,
  prepareOneBurnMultiTokenSignedTransaction,
  prepareOneClient,
  prepareOneDeploy20SignedTransaction,
  prepareOneDeploy721SignedTransaction,
  prepareOneDeployMultiTokenSignedTransaction,
  prepareOneMint721ProvenanceSignedTransaction,
  prepareOneMint721SignedTransaction,
  prepareOneMintCashback721SignedTransaction,
  prepareOneMintMultiple721ProvenanceSignedTransaction,
  prepareOneMintMultipleCashback721SignedTransaction,
  prepareOneMintMultiTokenBatchSignedTransaction,
  prepareOneMintMultiTokenSignedTransaction,
  prepareOneSignedTransaction,
  prepareOneTransfer20SignedTransaction,
  prepareOneTransfer721SignedTransaction,
  prepareOneTransferMultiTokenSignedTransaction,
  prepareOneUpdateCashbackForAuthor721SignedTransaction,
  sendOneSmartContractReadMethodInvocationTransaction,
} from './one'

const PROVIDER = 'https://api.s0.b.hmny.io'

describe('ONE transactions', () => {
  jest.setTimeout(99999)

  async function processTx(txData: string) {
    const client = prepareOneClient(PROVIDER, '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1')
    const signedTxn = await client.eth.sendSignedTransaction(txData)
    console.log(signedTxn.transactionHash)
  }

  describe('Regular TX', () => {
    it('should test valid transaction ONE', async () => {
      const body = new OneTransfer()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.amount = '1'
      body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
      const txData = await prepareOneSignedTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      await processTx(txData)
    })

    it('should test valid transaction ONE KMS', async () => {
      const body = new OneTransfer()
      body.signatureId = 'cf5abf42-1d3b-48c7-b761-4571c46dd45f'
      body.amount = '1'
      body.fromShardID = 0
      body.toShardID = 0
      body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
      const txData = await prepareOneSignedTransaction(body, PROVIDER)
      console.log(txData)
      expect(txData).toContain('0x')
    })
  })

  describe('HRM20 TX', () => {
    it('should test valid Deploy 20', async () => {
      const body = new OneDeploy20()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.name = 'Tatum'
      body.digits = 14
      body.totalCap = '1000'
      body.supply = '100'
      body.symbol = 'TTM'
      body.address = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
      const txData = await prepareOneDeploy20SignedTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      await processTx(txData)
    })

    it('should test valid 20 transaction', async () => {
      const body = new OneTransfer20()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.amount = '1.564'
      body.contractAddress = '0xF60dE853111e0E3A1fB3E703D9Bed83b470c73D5'
      body.digits = 14
      body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
      const txData = await prepareOneTransfer20SignedTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      await processTx(txData)
    })

    it('should test valid 20 burn', async () => {
      const body = new OneBurn20()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.amount = '1.564'
      body.contractAddress = '0xF60dE853111e0E3A1fB3E703D9Bed83b470c73D5'
      const txData = await prepareOneBurn20SignedTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      await processTx(txData)
    })
  })
  describe('HRM 721 Provenance', () => {
    it('should test valid Deploy 721', async () => {
      const body = new OneDeploy721()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.name = 'Tatum'
      body.symbol = 'TTM'
      body.chain = Currency.ONE
      body.provenance = true
      const txData = await prepareOneDeploy721SignedTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      await processTx(txData)
    })
    it('should test valid 721 provenance mint', async () => {
      const body = new OneMint721()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.tokenId = '1001'
      body.contractAddress = '0x27c133a613f11870fa935ecbb03c0cf55f93e5de'
      body.url = '14'
      body.chain = Currency.ONE
      body.to = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
      body.provenance = true
      const txData = await prepareOneMint721ProvenanceSignedTransaction(body, PROVIDER)

      expect(txData).toContain('0x')

      // await processTx(txData)
    })
    it('should test valid 721 provenance mint with cashback', async () => {
      const body = new OneMint721()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.tokenId = '10211'
      body.contractAddress = '0x27c133a613f11870fa935ecbb03c0cf55f93e5de'
      body.url = '14'
      body.chain = Currency.ONE
      body.to = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
      body.authorAddresses = ['one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc']
      body.provenance = true
      body.cashbackValues = ['1']
      body.fixedValues = ['1']
      body.provenance = true
      const txData = await prepareOneMint721ProvenanceSignedTransaction(body, PROVIDER)

      expect(txData).toContain('0x')

      // await processTx(txData)
    })
    it('should test valid 721 transaction', async () => {
      const body = new OneTransfer721()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.tokenId = '1021'
      body.contractAddress = '0x27c133a613f11870fa935ecbb03c0cf55f93e5de'
      body.chain = Currency.ONE
      body.provenance = true
      body.provenanceData = 'test this'
      body.tokenPrice = '10'
      body.value = '10'
      body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
      const txData = await prepareOneTransfer721SignedTransaction(body, PROVIDER)
      expect(txData).toContain('0x')

      // await processTx(txData)
    })
    it('should test valid transfer data 721 transaction', async () => {
      const body = new SmartContractReadMethodInvocation()
      body.contractAddress = '0x27c133a613f11870fa935ecbb03c0cf55f93e5de'
      body.params = ['100']
      body.methodName = 'getTokenData'
      body.methodABI = erc721Provenance_abi.find((a: any) => a.name === 'getTokenData')
      const response = await sendOneSmartContractReadMethodInvocationTransaction(body, PROVIDER)
      // @ts-ignore
      console.log(JSON.stringify(response))
    })
    it('should test valid 721 mint with cashback multiple', async () => {
      const body = new OneMintMultiple721()
      body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
      body.tokenId = ['103212']
      body.contractAddress = '0x27c133a613f11870fa935ecbb03c0cf55f93e5de'
      body.url = ['14']
      body.chain = Currency.ONE
      body.to = ['one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc']
      body.authorAddresses = [['one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc']]
      body.cashbackValues = [['1']]
      body.provenance = true
      body.fixedValues = [['1']]
      const txData = await prepareOneMintMultiple721ProvenanceSignedTransaction(body, PROVIDER)

      expect(txData).toContain('0x')

      await processTx(txData)
    })

    describe('HRM 721', () => {
      it('should test valid Deploy 721', async () => {
        const body = new OneDeploy721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.name = 'Tatum'
        body.symbol = 'TTM'
        body.chain = Currency.ONE
        const txData = await prepareOneDeploy721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 721 mint', async () => {
        const body = new OneMint721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '100'
        body.contractAddress = '0x3a45a4E2441a4A53e5A10bE3A15EC7Dc9eb902B7'
        body.url = '14'
        body.chain = Currency.ONE
        body.to = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
        const txData = await prepareOneMint721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 721 transaction', async () => {
        const body = new OneTransfer721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '10'
        body.contractAddress = '0x3a45a4E2441a4A53e5A10bE3A15EC7Dc9eb902B7'
        body.chain = Currency.ONE
        body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
        const txData = await prepareOneTransfer721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 721 mint with cashback', async () => {
        const body = new OneMint721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '1021'
        body.contractAddress = '0xeDB704d5d5940559C53FfB5CBCC38E6b0AdA3Bc3'
        body.url = '14'
        body.chain = Currency.ONE
        body.to = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
        body.authorAddresses = ['one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc']
        body.cashbackValues = ['1']
        const txData = await prepareOneMintCashback721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 721 mint with cashback multiple', async () => {
        const body = new OneMintMultiple721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = ['1031']
        body.contractAddress = '0x3a45a4E2441a4A53e5A10bE3A15EC7Dc9eb902B7'
        body.url = ['14']
        body.chain = Currency.ONE
        body.to = ['one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc']
        body.authorAddresses = [['one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc']]
        body.cashbackValues = [['1']]
        const txData = await prepareOneMintMultipleCashback721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 721 cashback transaction', async () => {
        const body = new OneTransfer721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '1021'
        body.contractAddress = '0xeDB704d5d5940559C53FfB5CBCC38E6b0AdA3Bc3'
        body.chain = Currency.ONE
        body.value = '1'
        body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
        const txData = await prepareOneTransfer721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 721 cashback update', async () => {
        const body = new OneUpdateCashback721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '1021'
        body.contractAddress = '0xeDB704d5d5940559C53FfB5CBCC38E6b0AdA3Bc3'
        body.chain = Currency.ONE
        body.cashbackValue = '2'
        const txData = await prepareOneUpdateCashbackForAuthor721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 721 burn', async () => {
        const body = new OneBurn721()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '100'
        body.contractAddress = '0x3a45a4E2441a4A53e5A10bE3A15EC7Dc9eb902B7'
        body.chain = Currency.ONE
        const txData = await prepareOneBurn721SignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })
    })

    describe('HRM 1155', () => {
      it('should test valid Deploy 1155', async () => {
        const body = new OneDeployMultiToken()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.uri = 'Tatum'
        body.chain = Currency.ONE
        const txData = await prepareOneDeployMultiTokenSignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 1155 mint', async () => {
        const body = new OneMintMultiToken()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '100'
        body.contractAddress = '0x3b0b77e149aF684a1a4636eb1cffEeF910845D24'
        body.chain = Currency.ONE
        body.amount = '100'
        body.to = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
        const txData = await prepareOneMintMultiTokenSignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 1155 mint batch', async () => {
        const body = new OneMintMultiTokenBatch()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = [['100']]
        body.contractAddress = '0x3b0b77e149aF684a1a4636eb1cffEeF910845D24'
        body.chain = Currency.ONE
        body.amounts = [['100']]
        body.to = ['one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc']
        const txData = await prepareOneMintMultiTokenBatchSignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 1155 transaction', async () => {
        const body = new OneTransferMultiToken()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '100'
        body.amount = '10'
        body.contractAddress = '0x3b0b77e149aF684a1a4636eb1cffEeF910845D24'
        body.chain = Currency.ONE
        body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
        const txData = await prepareOneTransferMultiTokenSignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 1155 batch transaction', async () => {
        const body = new OneTransferMultiTokenBatch()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = ['100']
        body.amounts = ['10']
        body.contractAddress = '0x3b0b77e149aF684a1a4636eb1cffEeF910845D24'
        body.chain = Currency.ONE
        body.to = 'one1yvph79875pj0pmgpxzmve87ks4sxer5u3jyfde'
        const txData = await prepareOneBatchTransferMultiTokenSignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 1155 burn', async () => {
        const body = new OneBurnMultiToken()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = '100'
        body.amount = '10'
        body.account = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
        body.contractAddress = '0x3b0b77e149aF684a1a4636eb1cffEeF910845D24'
        body.chain = Currency.ONE
        const txData = await prepareOneBurnMultiTokenSignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })

      it('should test valid 1155 burn batch', async () => {
        const body = new OneBurnMultiTokenBatch()
        body.fromPrivateKey = '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
        body.tokenId = ['100']
        body.amounts = ['10']
        body.account = 'one13t9ul0yvudlk7e60fwvxr5l0azfg3kyl474xmc'
        body.contractAddress = '0x3b0b77e149aF684a1a4636eb1cffEeF910845D24'
        body.chain = Currency.ONE
        const txData = await prepareOneBurnMultiTokenBatchSignedTransaction(body, PROVIDER)
        expect(txData).toContain('0x')

        await processTx(txData)
      })
    })
  })
})
