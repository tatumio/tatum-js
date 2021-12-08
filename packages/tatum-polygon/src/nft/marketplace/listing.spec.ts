import {
  ApproveErc20,
  CreateMarketplaceListing,
  Currency,
  DeployMarketplaceListing,
  InvokeMarketplaceListingOperation,
  listing,
  SmartContractReadMethodInvocation,
} from '@tatumio/tatum-core'
import { sendSmartContractMethodInvocationTransaction, sendPolygonSmartContractReadMethodInvocationTransaction } from '../../transaction'
import { transferNFT } from '../nft'
import {
  deployMarketplaceListing,
  sendMarketplaceApproveErc20Spending,
  sendMarketplaceBuyListing,
  sendMarketplaceCreateListing,
} from './listing'

describe('Marketplace Listing tests', () => {
  jest.setTimeout(99999)

  describe('Marketplace Listing MATIC transactions', () => {
    it('should deploy marketplace', async () => {
      const body = new DeployMarketplaceListing()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.marketplaceFee = 150
      body.chain = Currency.MATIC
      const test = await deployMarketplaceListing(body, 'https://rpc-mumbai.matic.today')
      console.log(test)
      expect(test).toBeDefined()
    })

    it('should create listing native asset', async () => {
      const body = new CreateMarketplaceListing()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31'
      body.nftAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a'
      body.tokenId = '121'
      body.listingId = '111'
      body.isErc721 = true
      body.price = '0.001'
      body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.chain = Currency.MATIC
      console.log(await sendMarketplaceCreateListing(body, 'https://rpc-mumbai.matic.today'))

      await new Promise((r) => setTimeout(r, 5000))
      console.log(
        await transferNFT({
          to: '0xc4585ec777ba6dc5d33524ca72c425d512780c31',
          tokenId: '121',
          fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
          contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
        })
      )
    })

    it('should get listing', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31'
      r.methodName = 'getListing'
      r.methodABI = listing.abi.find((a) => a.name === r.methodName)
      r.params = ['8']
      console.log(await sendSmartContractMethodInvocationTransaction(r, 'https://rpc-mumbai.matic.today'))
    })

    it('should get marketplace fee', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31'
      r.methodName = 'getMarketplaceFee'
      r.methodABI = listing.abi.find((a) => a.name === r.methodName)
      r.params = []
      console.log(await sendPolygonSmartContractReadMethodInvocationTransaction(r, 'https://rpc-mumbai.matic.today'))
    })

    it('should buy listing native', async () => {
      const body = new InvokeMarketplaceListingOperation()
      body.fromPrivateKey = '0x3497eb7fa0fadf23da006c31f874a5aaed7da58c1caf3d84fa3387e1208ada39'
      body.contractAddress = '0xc4585ec777ba6dc5d33524ca72c425d512780c31'
      body.listingId = '111'
      body.amount = '0.0015'
      body.chain = Currency.MATIC
      console.log(await sendMarketplaceBuyListing(body, 'https://rpc-mumbai.matic.today'))
    })

    it('should approve erc20', async () => {
      const approve = new ApproveErc20()
      approve.contractAddress = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb'
      approve.spender = '0x4153B909f55B0Ec43c11e980dF09b853477D9F79'
      approve.chain = Currency.MATIC
      approve.amount = '0.002'
      approve.fromPrivateKey = '0xf09110a0aae3dddba3d722c6c629fb08082963d8ed38afaf25cfce084c22e3d2'
      console.log(await sendMarketplaceApproveErc20Spending(true, approve, 'https://rpc-mumbai.matic.today'))
    })
  })
})
