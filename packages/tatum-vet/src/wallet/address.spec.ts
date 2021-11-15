import { Currency } from '@tatumio/tatum-core'
import { generateAddressFromXPub, generatePrivateKeyFromMnemonic } from 'src'

describe('Address tests', () => {
  it('should generate address 1 for VET mainnet', () => {
    const address = generateAddressFromXPub(
      'xpub6EzJLu3Hi5hEFAkiZAxCTaXqXoS95seTnG1tdYdF8fBcVZCfR8GQP8UGvfF52szpwZqiiGHJw5694emxSpYBE5qDxAZUgiHLzbVhb5ErRMa',
      1
    )
    expect(address).toBe('0x5b70c58cb71712e2d4d3519e065bbe196546877d')
  })

  it('should generate address 1 for VET testnet', () => {
    const address = generateAddressFromXPub(
      'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25',
      1
    )
    expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
  })

  it('should generate private key 1 for VET mainnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      Currency.VET,
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0xd2a4c2f89f58e50f2e29ed1e68552680417a0534c47bebf18f2f5f3a27817251')
  })

  it('should generate private key 1 for VET testnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      Currency.VET,
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
  })
})
