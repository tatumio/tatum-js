import { Currency } from '@tatumio/tatum-core'
import { generatePrivateKeyFromMnemonic } from './address'
import { generateCeloWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for Celo mainnet', async () => {
    const wallet = await generateCeloWallet(
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.mnemonic).toBe(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.xpub).toBe(
      'xpub6F2PSwHVww3pw4NE7hbrNLNBYL87eYTEqXTF6Aw5FACuQTBHPtCUbqG39LqXv81NLXhjb4ECFA19h8jGhKtdQNVvxm4Md1xtiiKCnxp9Jq1'
    )
  })

  it('should generate wallet for Celo testnet', async () => {
    const wallet = await generateCeloWallet(
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

  it('should generate private key for Celo mainnet', async () => {
    const wallet = await generatePrivateKeyFromMnemonic(
      Currency.CELO,
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(wallet).toBe('0x5bdb801c0f22512b46189740c18b7b30204e99a8ee4d91d8da7caad6268bd024')
  })

  it('should generate private key for Celo testnet', async () => {
    const wallet = await generatePrivateKeyFromMnemonic(
      Currency.CELO,
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(wallet).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
  })
})
