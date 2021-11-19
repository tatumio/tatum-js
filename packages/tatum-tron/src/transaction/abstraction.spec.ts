import { sendTransaction } from './abstraction'

describe('Abstraction TRON erc20', () => {
  it('should send erc20 abstraction - no address and currency', async () => {
    const tx = await sendTransaction({
      fromPrivateKey: 'D2AB51BC2CF28D7569D0BA40920776101E4A8DA8A927AC98814CEB6CF09C9D31',
      to: 'TShwo3ZXzn8SzmkEV8uLfo5gL19idHajkC',
      amount: '0.0001',
    })
    console.log(tx)
    expect(tx).toHaveProperty('txId')
  })
})
