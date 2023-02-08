import { TatumSdk } from './tatum'
import { TestConst } from '../../util/test.constant'
import { Chain } from '../../util/enum'

describe('Tatum', () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: TestConst.API_KEY,
      testnet: true,
    })
  })

  describe('nft', () => {
    it('getBalance', async () => {
      const balance = await tatum.nft.getBalance({
        chain: Chain.ETH,
        address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      })
      console.log(balance)
      expect(balance).toHaveLength(1)
    })

    it('getNftTransactions', async () => {
      const transactions = await tatum.nft.getNftTransactions({
        chain: Chain.ETH,
        contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
        tokenId: '1',
      })
      console.log(transactions)
      expect(transactions).toHaveLength(1)
    })

    it('getNftMetadata', async () => {
      const metadata = await tatum.nft.getNftMetadata({
        chain: Chain.ETH,
        contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
        tokenId: '1',
      })
      expect(metadata.data).toBeDefined()
    })

    it('getCollection', async () => {
      const collection = await tatum.nft.getCollection({
        chain: Chain.ETH,
        contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
      })
      console.log(collection)
      expect(collection).toHaveLength(1)
    })
  })

  describe('notification', () => {
    it('createSubscription', async () => {
      const response = await tatum.notification.subscribe.addressTransaction({
        url: 'https://tatum.io',
        chain: Chain.ETH,
        address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      })
      expect(response.id).toBeDefined()
    })

    it('deleteSubscription', async () => {
      const subscriptions = await tatum.notification.getSubscriptions()
      const subscription = subscriptions[0]
      await tatum.notification.deleteSubscription(subscription.id)
    })

    it('getSubscriptions', async () => {
      const subscriptions = await tatum.notification.getSubscriptions()
      expect(subscriptions.length).toBeGreaterThan(0)
    })
  })

  describe('estimate', () => {
    it('getCurrentFee', async () => {
      const fee = await tatum.fee.getCurrentFee(Chain.ETH)
      console.log(fee)
      expect(fee).toBeDefined()
    })

    it('estimateGas', async () => {
      const estimation = await tatum.fee.estimateGas({
        chain: Chain.ETH,
        from: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
        to: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
        amount: '0.1',
      })
      console.log(estimation)
      expect(estimation).toBeDefined()
    })
  })
})
