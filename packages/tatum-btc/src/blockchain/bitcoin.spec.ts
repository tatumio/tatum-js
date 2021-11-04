import { btcGetCurrentBlock } from './bitcoin'

describe('BTC connector', () => {
  it('should test BTC info', async () => {
    const currentBlock = await btcGetCurrentBlock()
    console.log(currentBlock)
    expect(currentBlock).not.toBeNull()
    expect(currentBlock).toHaveProperty('chain')
  })
})