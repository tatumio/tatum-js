import { blockchainBsc } from './blockchain-bsc'

describe('blockchainBsc', () => {
  it('should work', () => {
    expect(blockchainBsc()).toEqual('blockchain-bsc')
  })
})
