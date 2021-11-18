import { generateNeoWallet } from '.'

describe('Wallet tests', () => {
  it('should generate wallet for Neo', async () => {
    const wallet = await generateNeoWallet()
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })
})
