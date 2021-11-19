import { Currency } from '@tatumio/tatum-core'
import { sendTransaction } from './abstraction'

describe('Abstraction BSC erc20', () => {
  it('should send erc20 abstraction - no address and currency', async () => {
    const tx = await sendTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      fromPrivateKey: '0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
    })
    console.log(tx)
    expect(tx).toHaveProperty('txId')
  })

  it('should send erc20 abstraction - currency and contractAddress', async () => {
    await sendTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      currency: Currency.BAT,
      contractAddress: '0xd683f13658bBFf28cFda4a432d3533640D138d6E',
      fromPrivateKey: '0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b',
    })
  })

  it('should send erc20 abstraction - currency', async () => {
    await sendTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      currency: Currency.BETH,
      fromPrivateKey: '0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4',
    })
  })

  it('should send erc20 abstraction - contractAddress', async () => {
    const tx = await sendTransaction({
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      contractAddress: '0x97F2Ffb3E50957Ad615807455277a680fbB08976',
      fromPrivateKey: '0xd7dd4afa18d8a857930b55e5605553a67a9937efdd37150b51ea1681db050236',
    })
    console.log(tx)
    expect(tx).toHaveProperty('txId')
  })
})
