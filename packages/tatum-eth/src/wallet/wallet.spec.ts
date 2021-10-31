import { generateEthWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for ETH mainnet', async () => {
    const wallet = await generateEthWallet(
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.mnemonic).toBe(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.xpub).toBe(
      'xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM'
    )
  })

  it('should generate wallet for ETH testnet', async () => {
    const wallet = await generateEthWallet(
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.mnemonic).toBe(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.xpub).toBe(
      'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25'
    )
  })
})
