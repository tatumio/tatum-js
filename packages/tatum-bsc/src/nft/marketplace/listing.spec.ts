import {
  CreateMarketplaceListing,
  Currency,
  DeployMarketplaceListing,
  InvokeMarketplaceListingOperation,
  listing,
  SmartContractReadMethodInvocation,
} from '@tatumio/tatum-core'
import { sendBscSmartContractMethodInvocationTransaction, sendBscSmartContractReadMethodInvocationTransaction } from '../../transaction'
import { transferNFT } from '../nft'
import { deployMarketplaceListing, sendMarketplaceBuyListing, sendMarketplaceCreateListing } from './listing'

describe('Marketplace Listing tests', () => {
  jest.setTimeout(99999)

  describe('Marketplace Listing BSC transactions', () => {
    it('should deploy marketplace', async () => {
      const body = new DeployMarketplaceListing()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.marketplaceFee = 150
      body.chain = Currency.BSC
      const test = await deployMarketplaceListing(body, 'https://data-seed-prebsc-2-s1.binance.org:8545')
      console.log(test)
      expect(test).toBeDefined()
    })

    it('should create listing native asset', async () => {
      const body = new CreateMarketplaceListing()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
      body.nftAddress = '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698'
      body.tokenId = '2'
      body.listingId = '8'
      body.isErc721 = true
      body.price = '1'
      body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.chain = Currency.BSC
      console.log(await sendMarketplaceCreateListing(body, 'https://data-seed-prebsc-2-s1.binance.org:8545'))

      await new Promise((r) => setTimeout(r, 10000))
      console.log(
        await transferNFT(true, {
          to: '0xc4585ec777bA6dc5d33524Ca72c425D512780C31',
          chain: Currency.BSC,
          tokenId: '2',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x9b0eea3aa1e61b8ecb7d1c8260cd426eb2a9a698',
        })
      )
    })

    it('should get listing', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
      r.methodName = 'getListing'
      r.methodABI = listing.abi.find((a) => a.name === r.methodName)
      r.params = ['6']
      console.log(await sendBscSmartContractMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
    })

    it('should get marketplace fee', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
      r.methodName = 'getMarketplaceFee'
      r.methodABI = listing.abi.find((a) => a.name === r.methodName)
      r.params = []
      console.log(await sendBscSmartContractReadMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
    })

    it('should buy listing native', async () => {
      const body = new InvokeMarketplaceListingOperation()
      body.fromPrivateKey = '0x3497eb7fa0fadf23da006c31f874a5aaed7da58c1caf3d84fa3387e1208ada39'
      body.contractAddress = '0xc4585ec777bA6dc5d33524Ca72c425D512780C31'
      body.listingId = '8'
      body.amount = '1.015'
      body.chain = Currency.BSC
      console.log(await sendMarketplaceBuyListing(body, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
    })
  })
})
