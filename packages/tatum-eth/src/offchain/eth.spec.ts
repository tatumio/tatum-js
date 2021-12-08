import { sendErc20OffchainTransaction, sendOffchainTransaction } from './eth'

describe('ETH offchain', () => {
  it('should test custom gas sendEthErc20OffchainTransaction transaction', async () => {
    const tx = await sendErc20OffchainTransaction(true, {
      senderAccountId: '5fe10047e72e8a31c443b034',
      address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      amount: '0.1',
      gasPrice: '200',
      gasLimit: '60000',
      privateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
    })
    expect(tx).not.toBeNull()
  })

  it('should test sendEthErc20OffchainTransaction transaction', async () => {
    const tx = await sendErc20OffchainTransaction(true, {
      senderAccountId: '5fe10047e72e8a31c443b034',
      address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      amount: '0.1',
      privateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
    })
    expect(tx).not.toBeNull()
  })

  it('should test custom gas sendEthOffchainTransaction transaction', async () => {
    const tx = await sendOffchainTransaction(true, {
      senderAccountId: '600ed0a9fe9490f37acaddc9',
      address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      amount: '0.01',
      gasPrice: '200',
      gasLimit: '60000',
      privateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
    })
    expect(tx).not.toBeNull()
  })

  it('should test sendEthOffchainTransaction transaction', async () => {
    const tx = await sendOffchainTransaction(true, {
      senderAccountId: '600ed0a9fe9490f37acaddc9',
      address: '0x51abC4c9e7BFfaA99bBE4dDC33d75067EBD0384F',
      amount: '0.01',
      privateKey: '0x37b091fc4ce46a56da643f021254612551dbe0944679a6e09cb5724d3085c9ab',
    })
    expect(tx).not.toBeNull()
  })
})
