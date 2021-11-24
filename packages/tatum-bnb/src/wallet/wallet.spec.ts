import { generateWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for BNB mainnet', async () => {
    const wallet = await generateWallet(undefined, { testnet: false })
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })

  it('should generate wallet for BNB testnet', async () => {
    const wallet = await generateWallet(undefined, { testnet: true })
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })
})
