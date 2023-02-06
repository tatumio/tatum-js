import { Tatum } from './tatum'
import { TestConst } from './utils/test.constant'
import { Chain } from './utils/enum'

describe('Tatum', () => {
  describe('nft', () => {
    it('getBalance', async () => {
        const tatum = new Tatum(TestConst.API_KEY)
        const balance = await tatum.nft.getBalance({ chain: Chain.ETH, address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F' })
        console.log(balance.data)
        expect(balance.data).toHaveLength(1)
    })
  })
})
