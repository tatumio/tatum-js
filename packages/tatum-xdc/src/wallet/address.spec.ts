import { Currency } from '@tatumio/tatum-core'
import { generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic } from './address'
// tslint:disable-next-line:no-var-requires
describe('Address tests', () => {
  it('should generate address 1 for XDC testnet', () => {
    const address = generateAddressFromXPub(
      Currency.XDC,
      true,
      'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25',
      1
    )
    expect(address).toBe('xdc8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
  })

  it('should generate private key 1 for XDC testnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      Currency.XDC,
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
  })

  it('should generate an address from a testnet XDC private key', async () => {
    const address = await generateAddressFromPrivatekey(
      Currency.XDC,
      true,
      '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
    )
    expect(address).toBe('xdc8acbcfbc8ce37f6f674f4b9861d3efe89288d89f')
  })
})
