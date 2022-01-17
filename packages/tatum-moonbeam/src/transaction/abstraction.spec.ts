import { sendBlockchainTransaction } from '.'

describe('Abstraction GLMR erc20', () => {
  it('should send erc20 abstraction - currency and contractAddress', async () => {
    await sendBlockchainTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      contractAddress: '0xd683f13658bBFf28cFda4a432d3533640D138d6E',
      fromPrivateKey: '0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b',
    })
  })

  it('should send erc20 abstraction - currency', async () => {
    await sendBlockchainTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      fromPrivateKey: '0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4',
    })
  })

  it('should send erc20 abstraction - contractAddress', async () => {
    const tx = await sendBlockchainTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      contractAddress: '0xFe00cF02cA45CFB5e333c72aD643301Cf8D053EF',
      fromPrivateKey: '0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4',
      digits: 18,
    })
    expect(tx).toHaveProperty('txId')
  })
})
