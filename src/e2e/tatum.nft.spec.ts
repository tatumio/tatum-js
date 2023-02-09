import { TatumSdk } from '../service/tatum/tatum'
import { Chain } from '../service/tatum/tatum.dto'

describe('nft', () => {
  let tatum: TatumSdk
  beforeAll(async () => {
    tatum = await TatumSdk.init({
      apiKey: process.env.TESTNET_API_KEY,
      testnet: true,
    })
  })

  it('getBalance', async () => {
    const balance = await tatum.nft.getBalance({
      chain: Chain.ethereum,
      address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
    })
    expect(balance).toHaveLength(1)
  })

  it('getNftTransactions', async () => {
    const transactions = await tatum.nft.getNftTransactions({
      chain: Chain.ethereum,
      contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
      tokenId: '1',
    })
    expect(transactions).toHaveLength(1)
  })

  it('getNftMetadata', async () => {
    const metadata = await tatum.nft.getNftMetadata({
      chain: Chain.ethereum,
      contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
      tokenId: '1',
    })
    expect(metadata).toBeDefined()
  })

  it('getCollection', async () => {
    const collection = await tatum.nft.getCollection({
      chain: Chain.ethereum,
      contractAddress: '0x0e4b1a84b504660e0fa473da1f491e5baeb43897',
    })
    expect(collection).toHaveLength(1)
  })
})
