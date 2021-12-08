import { sendTransaction } from './abstraction'

describe('Abstraction ETH erc20', () => {
  it('should send erc20 abstraction - currency and contractAddress', async () => {
    await sendTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      contractAddress: '0xd683f13658bBFf28cFda4a432d3533640D138d6E',
      fromPrivateKey: '0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b',
    })
  })

  it('should send erc20 abstraction - currency', async () => {
    await sendTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      fromPrivateKey: '0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b',
    })
  })

  it('should send erc20 abstraction - contractAddress', async () => {
    const tx = await sendTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      contractAddress: '0xd683f13658bBFf28cFda4a432d3533640D138d6E',
      fromPrivateKey: '0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b',
      digits: 18,
    })
    expect(tx).toHaveProperty('txId')
  })
})
