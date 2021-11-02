import { Currency } from '@tatumio/tatum-core'
import { generateWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for BNB mainnet', async () => {
    const wallet = await generateWallet(Currency.BNB, false)
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })

  it('should generate wallet for BNB testnet', async () => {
    const wallet = await generateWallet(Currency.BNB, true)
    expect(wallet.address).not.toBe('')
    expect(wallet.privateKey).not.toBe('')
  })
})
