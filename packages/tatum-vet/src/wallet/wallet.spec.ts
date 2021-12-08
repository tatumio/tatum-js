import { generateBlockchainWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for VET mainnet', async () => {
    const wallet = await generateBlockchainWallet(
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.mnemonic).toBe(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.xpub).toBe(
      'xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa'
    )
  })

  it('should generate wallet for VET testnet', async () => {
    const wallet = await generateBlockchainWallet(
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
