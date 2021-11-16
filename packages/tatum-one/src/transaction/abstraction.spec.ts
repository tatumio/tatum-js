import { Currency } from '@tatumio/tatum-core'
import { sendTransaction } from '.'

describe('Abstraction ONE erc20', () => {
  it('should send erc20 abstraction - currency and contractAddress', async () => {
    await sendTransaction(true, Currency.ONE, {
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      currency: Currency.BAT,
      contractAddress: '0xd683f13658bBFf28cFda4a432d3533640D138d6E',
      fromPrivateKey: '0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b',
    })
  })

  it('should send erc20 abstraction - currency', async () => {
    await sendTransaction(true, Currency.ONE, {
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      currency: Currency.BAT,
      fromPrivateKey: '0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4',
    })
  })

  it('should send erc20 abstraction - contractAddress', async () => {
    const tx = await sendTransaction(true, Currency.ONE, {
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      contractAddress: '0xf05d27b1f5efa55dc5db09cd42d1684b1fec0576',
      fromPrivateKey: '0xd251c50f6f7474e5eac05c632e5f9551d75ae91eaeb9798b7ab1dc3fe50faefc',
      digits: 18,
    })
    expect(tx).toHaveProperty('txId')
  })
})
