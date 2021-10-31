import { generateOneWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for ONE testnet', async () => {
    const wallet = await generateOneWallet(
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

  it('should generate wallet for ONE mainnet', async () => {
    const wallet = await generateOneWallet(
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.mnemonic).toBe(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.xpub).toBe(
      'xpub6EiLaLx7QvbzXKLr8AmyHCEDss5gM5mW3XuTEFCYVH7HHCVA7dyrbzE7YawQ4yTxRtZyjgX1sTgbjEWaMKxYMrhhk8rjtVvhbhPH3wrw8Ei'
    )
  })
})
