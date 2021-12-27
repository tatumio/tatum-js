import { DeployNftAuction, Currency, MintErc721, CreateAuction, InvokeAuctionOperation, ApproveErc20 } from '@tatumio/tatum-core'
import { getCurrentBlock } from '../../blockchain'
import { mintNFTWithUri } from '../nft'
import {
  deployAuction,
  sendAuctionApproveErc20Transfer,
  sendAuctionApproveNftTransfer,
  sendAuctionBid,
  sendAuctionCreate,
  sendAuctionSettle,
} from './auction'

const sleep = async (time = 7000) => new Promise((r) => setTimeout(r, time))

describe('Auction  tests', () => {
  jest.setTimeout(99999)

  describe('Auction  GLMR transactions', () => {
    const tokenId = `${Date.now()}`

    it('should deploy auction', async () => {
      const body = new DeployNftAuction()
      body.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
      body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.auctionFee = 150
      body.chain = Currency.GLMR
      const test = await deployAuction(body, 'https://rpc-mumbai.maticvigil.com')
      console.log(test)
      expect(test).toBeDefined()
    })

    it('should create auction native asset', async () => {
      const mint = new MintErc721()
      mint.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      mint.to = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      mint.contractAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a'
      mint.tokenId = tokenId
      mint.url = 'https://google.com'
      mint.chain = Currency.GLMR
      console.log(await mintNFTWithUri(mint, { provider: 'https://rpc-mumbai.maticvigil.com' }))

      await sleep()
      console.log(
        await sendAuctionApproveNftTransfer(
          {
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
            isErc721: true,
            spender: '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073',
            tokenId,
          },
          'https://rpc-mumbai.maticvigil.com'
        )
      )

      await sleep()
      const body = new CreateAuction()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073'
      body.nftAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a'
      body.tokenId = tokenId
      body.endedAt = (await getCurrentBlock()) + 12
      body.id = tokenId
      body.isErc721 = true
      body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.chain = Currency.GLMR
      console.log(await sendAuctionCreate(body, 'https://rpc-mumbai.maticvigil.com'))

      await sleep(2000)
      const bid = new InvokeAuctionOperation()
      bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      bid.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073'
      bid.id = tokenId
      bid.bidValue = '0.001015'
      bid.chain = Currency.GLMR
      console.log(await sendAuctionBid(true, bid, 'https://rpc-mumbai.maticvigil.com'))

      await sleep(20000)
      const settle = new InvokeAuctionOperation()
      settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      settle.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073'
      settle.id = tokenId
      settle.chain = Currency.GLMR
      console.log(await sendAuctionSettle(settle, 'https://rpc-mumbai.maticvigil.com'))
    })

    it('should create auction ERC20 asset', async () => {
      const approve = new ApproveErc20()
      approve.contractAddress = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb'
      approve.spender = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073'
      approve.chain = Currency.GLMR
      approve.amount = '0.001015'
      approve.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      console.log(await sendAuctionApproveErc20Transfer(true, approve, 'https://rpc-mumbai.maticvigil.com'))

      const mint = new MintErc721()
      mint.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      mint.to = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      mint.contractAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a'
      mint.tokenId = tokenId
      mint.url = 'https://google.com'
      mint.chain = Currency.GLMR
      console.log(await mintNFTWithUri(mint, { provider: 'https://rpc-mumbai.maticvigil.com' }))

      await sleep()
      console.log(
        await sendAuctionApproveNftTransfer(
          {
            fromPrivateKey: '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29',
            contractAddress: '0x5d7d868ed584b04b922905a481f274206a42dd8a',
            isErc721: true,
            spender: '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073',
            tokenId,
          },
          'https://rpc-mumbai.maticvigil.com'
        )
      )

      await sleep()
      const body = new CreateAuction()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073'
      body.nftAddress = '0x5d7d868ed584b04b922905a481f274206a42dd8a'
      body.tokenId = tokenId
      body.endedAt = (await getCurrentBlock()) + 10
      body.id = tokenId
      body.isErc721 = true
      body.erc20Address = '0x326c977e6efc84e512bb9c30f76e30c160ed06fb'
      body.seller = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.chain = Currency.GLMR
      console.log(await sendAuctionCreate(body, 'https://rpc-mumbai.maticvigil.com'))

      await sleep(2000)
      const bid = new InvokeAuctionOperation()
      bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      bid.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073'
      bid.id = tokenId
      bid.bidValue = '0.001015'
      bid.chain = Currency.GLMR
      bid.fee = {
        gasLimit: '300000',
        gasPrice: '5',
      }
      console.log(await sendAuctionBid(true, bid, 'https://rpc-mumbai.maticvigil.com'))

      await sleep(20000)
      const settle = new InvokeAuctionOperation()
      settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      settle.contractAddress = '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073'
      settle.id = tokenId
      settle.chain = Currency.GLMR
      console.log(await sendAuctionSettle(settle, 'https://rpc-mumbai.maticvigil.com'))
    })
  })
})
