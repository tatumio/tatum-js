import {
  ApproveErc20,
  ApproveNftTransfer,
  CreateAuction,
  Currency,
  DeployNftAuction,
  InvokeAuctionOperation,
  UpdateAuctionFee,
  UpdateMarketplaceFeeRecipient,
} from '@tatumio/tatum-core'
import {
  deployAuction,
  getAuction,
  getAuctionFee,
  getAuctionFeeRecipient,
  prepareAuctionApproveErc20Transfer,
  prepareAuctionApproveNftTransfer,
  prepareAuctionBid,
  prepareAuctionCancel,
  prepareAuctionCreate,
  prepareAuctionSettle,
  prepareAuctionUpdateFee,
  prepareAuctionUpdateFeeRecipient,
  prepareDeployAuction,
  sendAuctionApproveErc20Transfer,
  sendAuctionApproveNftTransfer,
  sendAuctionBid,
  sendAuctionCancel,
  sendAuctionCreate,
  sendAuctionSettle,
  sendAuctionUpdateFee,
  sendAuctionUpdateFeeRecipient,
} from 'src/nft/marketplace/index'
import { getCurrentBlock } from '@tatumio/tatum-one'

describe('Auction  tests', () => {
  jest.setTimeout(99999)
  describe('Auction  ONE transactions', () => {
    const tokenId = `${Date.now()}`
    process.env.TATUM_API_KEY = 'd341d8f5-5f6a-43ca-a57c-c67839d1a1cb'

    it('should deploy auction', async () => {
      const body: DeployNftAuction = {
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        feeRecipient: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
        auctionFee: 1,
        chain: Currency.ONE,
        fee: { gasPrice: '40', gasLimit: '300000' },
      }
      try {
        const txId = await deployAuction(true, body)
        console.log(`Create auction txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Deploy auction failed: ${e}`)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare deploy auction', async () => {
      const body: DeployNftAuction = {
        fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
        feeRecipient: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
        auctionFee: 1,
        chain: Currency.ONE,
        fee: { gasPrice: '5', gasLimit: '300000' },
      }
      try {
        const token = await prepareDeployAuction(true, body)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare deploy auction failed: ${e}`)
        expect(e).not.toBeDefined()
      }
    })

    it('should create auction', async () => {
      try {
        const endedAt = (await getCurrentBlock()) + 7
        const body: CreateAuction = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          chain: Currency.ONE,
          id: `${tokenId}1`,
          nftAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
          seller: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
          endedAt,
          tokenId,
          isErc721: false,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionCreate(true, body)
        console.log(`Create auction txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Create auction failed: ${e}`)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare create auction', async () => {
      try {
        const endedAt = (await getCurrentBlock()) + 7
        const body: CreateAuction = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          chain: Currency.ONE,
          id: `${tokenId}1`,
          nftAddress: '0xdf82c2f74aa7b629bda65b1cfd258248c9c2b7d3',
          seller: '0x48d4bA7B2698A4b89635b9a2E391152350DB740f',
          endedAt,
          tokenId,
          isErc721: true,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionCreate(true, body)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare create auction failed: ${e}`)
        expect(e).not.toBeDefined()
      }
    })

    it('should get auction', async () => {
      try {
        const txId = await getAuction(Currency.ONE, '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038', '16420222566821')
        console.log(`Get auction txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Get auction failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should get auction fee', async () => {
      try {
        const auctionFee = await getAuctionFee(Currency.ONE, '0x93e388c8b4be8c3cc0abfda3700bbc8400cd72d2')
        expect(auctionFee).toBeDefined()
      } catch (e) {
        console.log(`Get auction fee failed: ${e}`)
        expect(e).not.toBeDefined()
      }
    })

    it('should get auction fee recipient', async () => {
      try {
        const auctionFeeRecipientAddress = await getAuctionFeeRecipient(Currency.ONE, '0x93e388c8b4be8c3cc0abfda3700bbc8400cd72d2')
        console.log(`Get auction fee recipient address:`, auctionFeeRecipientAddress)
        expect(auctionFeeRecipientAddress).toBeDefined()
      } catch (e) {
        console.log(`Get auction fee recipient failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should update auction fee', async () => {
      try {
        const body: UpdateAuctionFee = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          chain: Currency.ONE,
          auctionFee: 1,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionUpdateFee(true, body)
        console.log(`Update auction fee txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Update auction fee failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare update auction fee', async () => {
      try {
        const body: UpdateAuctionFee = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          chain: Currency.ONE,
          auctionFee: 1,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionUpdateFee(true, body)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare update auction fee failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should update fee recipient', async () => {
      try {
        const body: UpdateMarketplaceFeeRecipient = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          chain: Currency.ONE,
          feeRecipient: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionUpdateFeeRecipient(true, body)
        console.log(`Get auction fee recipient:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Update auction fee recipient failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare update fee recipient', async () => {
      try {
        const body: UpdateMarketplaceFeeRecipient = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          chain: Currency.ONE,
          feeRecipient: '0xffb28c3c7a1b19380b7e9e5A7Bbe2afF1AA7A5Ef',
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionUpdateFeeRecipient(true, body)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare update auction fee recipient failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should approve NFT transfer', async () => {
      try {
        const body: ApproveNftTransfer = {
          fromPrivateKey: '0xa488a82b8b57c3ece4307525741fd8256781906c5fad948b85f1d63000948236',
          contractAddress: '0x1214BEada6b25bc98f7494C7BDBf22C095FDCaBD',
          isErc721: true,
          spender: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          tokenId,
          chain: Currency.ONE,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionApproveNftTransfer(true, body)
        console.log(`Approve NFT transfer txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Approve NFT transfer failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare approve NFT transfer', async () => {
      try {
        const body: ApproveNftTransfer = {
          fromPrivateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
          contractAddress: '0xada3e67deae341f16b44f67687866d2560d79ec8',
          isErc721: true,
          spender: '0x568bf1e6849e250f4705347a9cff717b5dcfc4ad',
          tokenId,
          chain: Currency.ONE,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionApproveNftTransfer(true, body)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare approve NFT transfer failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should approve erc20 transfer', async () => {
      try {
        const body: ApproveErc20 = {
          contractAddress: '0x326c977e6efc84e512bb9c30f76e30c160ed06fb',
          spender: '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073',
          amount: '0.001',
          fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
          chain: Currency.ONE,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionApproveErc20Transfer(true, body)
        console.log(`Approve Erc20 Transfer txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Approve Erc20 transfer failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare approve erc20 transfer', async () => {
      try {
        const body: ApproveErc20 = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
          chain: Currency.ONE,
          spender: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
          amount: '0.001015',
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionApproveErc20Transfer(true, body)
        console.log(`Prepare auction Erc20 transfer token:`, token)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare approve Erc20 transfer failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should send auction bid', async () => {
      try {
        const body: InvokeAuctionOperation = {
          chain: Currency.ONE,
          contractAddress: '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073',
          id: '16420223002091',
          bidValue: '0.001015',
          fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionBid(true, body)
        console.log(`Send auction bid txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Send auction bid failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare auction bid', async () => {
      try {
        const body: InvokeAuctionOperation = {
          chain: Currency.ONE,
          contractAddress: '0x7a2cc5a4788a15d5705b1d31e0ff5cfc4465d073',
          id: '16420223002091',
          bidValue: '0.001015',
          fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionBid(true, body)
        console.log(`Prepare auction bid token:`, token)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare auction bid failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should send auction cancel', async () => {
      try {
        const body: InvokeAuctionOperation = {
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          id: `16420182707561`,
          bidValue: '0.001015',
          chain: Currency.ONE,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionCancel(true, body)
        console.log(`Cancel auction txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Send auction cancel failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare auction cancel', async () => {
      try {
        const body: InvokeAuctionOperation = {
          fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
          contractAddress: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
          id: `${tokenId}1`,
          bidValue: '0.001015',
          chain: Currency.ONE,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionCancel(true, body)
        console.log(`Prepare auction cancel token:`, token)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare auction cancel failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should send auction settle', async () => {
      try {
        const body: InvokeAuctionOperation = {
          chain: Currency.ONE,
          contractAddress: '0x991dfc0db4cbe2480296eec5bcc6b3215a9b7038',
          id: '16420223002091',
          bidValue: '0.001015',
          fromPrivateKey: '0d6c13fe5fed644dfa02512d4bffde9453dcb48873afb0b0a4c0cebce160c279',
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const txId = await sendAuctionSettle(true, body)
        console.log(`Settle auction txId:`, txId)
        expect(txId).toBeDefined()
      } catch (e) {
        console.log(`Send auction settle failed:`, e)
        expect(e).not.toBeDefined()
      }
    })

    it('should prepare auction settle', async () => {
      try {
        const body: InvokeAuctionOperation = {
          fromPrivateKey: '0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb',
          contractAddress: '0x8cb76aEd9C5e336ef961265c6079C14e9cD3D2eA',
          id: `${tokenId}1`,
          bidValue: '0.001015',
          chain: Currency.ONE,
          fee: { gasPrice: '5', gasLimit: '300000' },
        }
        const token = await prepareAuctionSettle(true, body)
        console.log(`Prepare auction settle token:`, token)
        expect(token).toBeDefined()
      } catch (e) {
        console.log(`Prepare auction settle failed:`, e)
        expect(e).not.toBeDefined()
      }
    })
  })
})
