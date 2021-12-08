import { generateBlockchainWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for XLM', async () => {
    const wallet = await generateBlockchainWallet()
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })
})
