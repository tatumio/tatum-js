import { generateXlmWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for XLM', async () => {
    const wallet = await generateXlmWallet()
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })
})
