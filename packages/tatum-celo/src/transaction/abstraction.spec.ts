import { Currency } from '@tatumio/tatum-core'
import { sendTransaction } from './abstraction'

describe('Abstraction CELO erc20', () => {
  it('should send erc20 abstraction - no address and currency', async () => {
    const tx = await sendTransaction(true, {
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      fromPrivateKey: '0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
      feeCurrency: Currency.CELO,
    })
    console.log(tx)
    expect(tx).toHaveProperty('txId')
  })

  it('should send erc20 abstraction - currency and contractAddress', async () => {
    await sendTransaction(true, {
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      currency: Currency.BAT,
      contractAddress: '0xd683f13658bBFf28cFda4a432d3533640D138d6E',
      fromPrivateKey: '0xf4e94a6e04e61c9fd03362a2c39175aef88f73bd2054e1853f59dd619f87e38b',
      feeCurrency: Currency.CELO,
    })
  })

  it('should send erc20 abstraction - currency', async () => {
    await sendTransaction(true, {
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      currency: Currency.BAT,
      fromPrivateKey: '0xb430f39045afbc872ee16d40b74067aeb65b847e396c37661d66992de7e959c4',
      feeCurrency: Currency.CELO,
    })
  })

  it('should send erc20 abstraction - contractAddress', async () => {
    const tx = await sendTransaction(true, {
      amount: '10',
      to: '0xc6c02b874bf5efad3a0deeee72a56a50d81b6a61',
      contractAddress: '0x0D5F97aB26CA8acE6bd0e8BfE6e688844f44bB55',
      fromPrivateKey: '0x89f09a62c9601d660dcdbeab15fbecfc07933971465fab3ba9fe1354035d805d',
      feeCurrency: Currency.CELO,
    })
    console.log(tx)
    expect(tx).toHaveProperty('txId')
  })
})
