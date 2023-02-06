import { Tatum } from './tatum'
import { TestConst } from './utils/test.constant'
import { Chain } from './utils/enum'

describe('Tatum', () => {
  let tatum: Tatum
  beforeAll(() => {
    tatum = new Tatum(TestConst.API_KEY)
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
})
