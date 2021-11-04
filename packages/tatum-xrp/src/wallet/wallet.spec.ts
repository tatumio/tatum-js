import { generateXrpWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for XRP', async () => {
    const wallet = await generateXrpWallet()
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })
})
