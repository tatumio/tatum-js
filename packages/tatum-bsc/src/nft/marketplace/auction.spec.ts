import {
  DeployNftAuction,
  Currency,
  MintErc721,
  CreateAuction,
  InvokeAuctionOperation,
  SmartContractReadMethodInvocation,
  auction,
} from '@tatumio/tatum-core'
import { bscGetCurrentBlock } from '../../blockchain'
import { sendBscSmartContractMethodInvocationTransaction, sendBscSmartContractReadMethodInvocationTransaction } from '../../transaction'
import { deployAuction, mintNFTWithUri, sendAuctionApproveNftTransfer, sendAuctionCreate, sendAuctionBid, sendAuctionSettle } from '../'

const sleep = async (time = 7000) => new Promise((r) => setTimeout(r, time))

describe('Auction  tests', () => {
  jest.setTimeout(99999)

  describe('Auction  BSC transactions', () => {
    const tokenId = `${Date.now()}`

    it('should deploy auction', async () => {
      const body = new DeployNftAuction()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.feeRecipient = '0x811dfbff13adfbc3cf653dcc373c03616d3471c9'
      body.auctionFee = 150
      body.chain = Currency.BSC
      const test = await deployAuction(body, 'https://data-seed-prebsc-2-s1.binance.org:8545')
      console.log(test)
      expect(test).toBeDefined()
    })

    it('should create auction native asset', async () => {
      const mint = new MintErc721()
      mint.fromPrivateKey = '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab'
      mint.to = '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2'
      mint.contractAddress = '0xada3e67deae341f16b44f67687866d2560d79ec8'
      mint.tokenId = tokenId
      mint.url = 'https://google.com'
      mint.chain = Currency.BSC
      console.log(await mintNFTWithUri(mint, { provider: 'https://data-seed-prebsc-2-s1.binance.org:8545' }))

      await sleep()
      console.log(
        await sendAuctionApproveNftTransfer(
          {
            fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
            chain: Currency.BSC,
            contractAddress: '0xada3e67deae341f16b44f67687866d2560d79ec8',
            isErc721: true,
            spender: '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad',
            tokenId,
          },
          'https://data-seed-prebsc-2-s1.binance.org:8545'
        )
      )

      await sleep()
      const body = new CreateAuction()
      body.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      body.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad'
      body.nftAddress = '0xada3e67deae341f16b44f67687866d2560d79ec8'
      body.tokenId = tokenId
      body.endedAt = (await bscGetCurrentBlock()) + 9
      body.id = tokenId
      body.isErc721 = true
      body.seller = '0x80d8bac9a6901698b3749fe336bbd1385c1f98f2'
      body.chain = Currency.BSC
      console.log(await sendAuctionCreate(body, 'https://data-seed-prebsc-2-s1.binance.org:8545'))

      await sleep(10000)
      const bid = new InvokeAuctionOperation()
      bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      bid.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad'
      bid.id = tokenId
      bid.bidValue = '0.001015'
      bid.chain = Currency.BSC
      console.log(await sendAuctionBid(true, bid, 'https://data-seed-prebsc-2-s1.binance.org:8545'))

      await sleep(15000)
      const settle = new InvokeAuctionOperation()
      settle.fromPrivateKey = '0x1a4344e55c562db08700dd32e52e62e7c40b1ef5e27c6ddd969de9891a899b29'
      settle.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad'
      settle.id = tokenId
      settle.chain = Currency.BSC
      console.log(await sendAuctionSettle(settle, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
    })

    it('should get auction', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad'
      r.methodName = 'getAuction'
      r.methodABI = auction.abi.find((a: any) => a.name === r.methodName)
      r.params = ['1630313952428']
      console.log(await sendBscSmartContractMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
    })

    it('should get auction fee', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad'
      r.methodName = 'getAuctionFee'
      r.methodABI = auction.abi.find((a: any) => a.name === r.methodName)
      r.params = []
      console.log(await sendBscSmartContractReadMethodInvocationTransaction(r, 'https://data-seed-prebsc-2-s1.binance.org:8545'))
    })
  })
})
