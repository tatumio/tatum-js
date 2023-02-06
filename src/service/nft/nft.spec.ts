import { Nft } from './nft'
import { Chain } from '../../utils/enum'
import { TestConst } from '../../utils/test.constant'
import { Container } from 'typedi'
import { API_KEY } from '../../utils/di.tokens'

describe('NftService', () => {
  Container.set(API_KEY, TestConst.API_KEY)

  it('getBalance', async () => {
    const service = new Nft()
    const response = await service.getBalance({
      chain: Chain.ETH,
      address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
    })
    expect(response.data).toHaveLength(1)
  })
})
