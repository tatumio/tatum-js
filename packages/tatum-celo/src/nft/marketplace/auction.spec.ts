import {
  DeployNftAuction,
  Currency,
  CreateAuction,
  InvokeAuctionOperation,
  ApproveErc20,
  auction,
  SmartContractReadMethodInvocation,
  CeloMintErc721,
} from '@tatumio/tatum-core'
import { sendSmartContractReadMethodInvocationTransaction } from '../..'
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

  describe('Auction  CELO transactions', () => {
    const tokenId = `${Date.now()}`

    it('should deploy auction', async () => {
      const body = new DeployNftAuction()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.feeRecipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      body.auctionFee = 150
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      const test = await deployAuction(true, body, 'https://alfajores-forno.celo-testnet.org')
      console.log(test)
      expect(test).toBeDefined()
    })

    it('should not deploy auction - wrong validation', async () => {
      const body = new DeployNftAuction()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.feeRecipient = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      body.auctionFee = 150.1
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      await deployAuction(true, body, 'https://alfajores-forno.celo-testnet.org')
    })

    it('should not create auction - wrong validation', async () => {
      const body = new CreateAuction()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.amount = '0.2'
      body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
      body.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
      body.endedAt = 123456789
      body.tokenId = tokenId
      body.id = tokenId
      body.isErc721 = false
      body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org')
    })

    it('should create auction native asset', async () => {
      const mint = new CeloMintErc721()
      mint.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      mint.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      mint.contractAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
      mint.tokenId = tokenId
      mint.url = 'https://google.com'
      mint.feeCurrency = Currency.CUSD
      mint.chain = Currency.CELO
      console.log(await mintNFTWithUri(mint, { testnet: true, provider: 'https://alfajores-forno.celo-testnet.org' }))

      await sleep()
      console.log(
        await sendAuctionApproveNftTransfer(
          true,
          {
            fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
            contractAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
            isErc721: true,
            spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
            tokenId,
          },
          'https://alfajores-forno.celo-testnet.org'
        )
      )

      await sleep()
      const endedAt = (await getCurrentBlock()) + 9
      const body = new CreateAuction()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038'
      body.nftAddress = '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD'
      body.endedAt = endedAt
      body.tokenId = tokenId
      body.id = tokenId
      body.isErc721 = true
      body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      console.log(await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org'))

      await sleep()
      const bid = new InvokeAuctionOperation()
      bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      bid.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038'
      bid.id = tokenId
      bid.bidValue = '0.001015'
      bid.feeCurrency = Currency.CELO
      bid.chain = Currency.CELO
      console.log(await sendAuctionBid(true, bid, 'https://alfajores-forno.celo-testnet.org'))

      await sleep(35000)
      const settle = new InvokeAuctionOperation()
      settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      settle.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038'
      settle.id = tokenId
      settle.feeCurrency = Currency.CUSD
      settle.chain = Currency.CELO
      console.log(await sendAuctionSettle(true, settle, 'https://alfajores-forno.celo-testnet.org'))
    })

    it('should create auction erc20 asset', async () => {
      const mint = new CeloMintErc721()
      mint.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      mint.to = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      mint.contractAddress = '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3'
      mint.tokenId = tokenId
      mint.url = 'https://google.com'
      mint.feeCurrency = Currency.CUSD
      mint.chain = Currency.CELO
      console.log(await mintNFTWithUri(mint, { testnet: true, provider: 'https://alfajores-forno.celo-testnet.org' }))

      await sleep()
      console.log(
        await sendAuctionApproveNftTransfer(
          true,
          {
            fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
            contractAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
            isErc721: true,
            spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
            tokenId,
          },
          'https://alfajores-forno.celo-testnet.org'
        )
      )

      await sleep()
      const endedAt = (await getCurrentBlock()) + 7
      const body = new CreateAuction()
      body.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      body.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038'
      body.nftAddress = '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3'
      body.tokenId = tokenId
      body.id = `${tokenId}1`
      body.endedAt = endedAt
      body.isErc721 = true
      body.seller = '0x48d4bA7B2698A4b89635b9a2E391152350DB740f'
      body.erc20Address = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      body.feeCurrency = Currency.CUSD
      body.chain = Currency.CELO
      console.log(await sendAuctionCreate(true, body, 'https://alfajores-forno.celo-testnet.org'))

      const approve = new ApproveErc20()
      approve.contractAddress = '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1'
      approve.spender = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      approve.chain = Currency.CELO
      approve.feeCurrency = Currency.CELO
      approve.amount = '0.001015'
      approve.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      approve.fee = { gasPrice: '5', gasLimit: '300000' }
      console.log(await sendAuctionApproveErc20Transfer(true, approve, 'https://alfajores-forno.celo-testnet.org'))

      await sleep()
      const bid = new InvokeAuctionOperation()
      bid.fromPrivateKey = '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb'
      bid.contractAddress = '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA'
      bid.id = `${tokenId}1`
      bid.bidValue = '0.001015'
      bid.feeCurrency = Currency.CELO
      bid.chain = Currency.CELO
      bid.fee = { gasPrice: '5', gasLimit: '300000' }
      console.log(await sendAuctionBid(true, bid, 'https://alfajores-forno.celo-testnet.org'))

      await sleep(20000)
      const settle = new InvokeAuctionOperation()
      settle.fromPrivateKey = '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236'
      settle.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038'
      settle.id = tokenId
      settle.feeCurrency = Currency.CUSD
      settle.chain = Currency.CELO
      console.log(await sendAuctionSettle(true, settle, 'https://alfajores-forno.celo-testnet.org'))
    })

    it('should get auction', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038'
      r.methodName = 'get'
      r.methodABI = auction.abi.find((a: any) => a.name === r.methodName)
      r.params = [tokenId]
      console.log(await sendSmartContractReadMethodInvocationTransaction(r, 'https://alfajores-forno.celo-testnet.org'))
    })

    it('should get auction fee', async () => {
      const r = new SmartContractReadMethodInvocation()
      r.contractAddress = '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038'
      r.methodName = 'getAuctionFee'
      r.methodABI = auction.abi.find((a: any) => a.name === r.methodName)
      r.params = []
      console.log(await sendSmartContractReadMethodInvocationTransaction(r, 'https://alfajores-forno.celo-testnet.org'))
    })
  })
})
