import { generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic } from './address'

describe('Address tests', () => {
  it('should generate address 1 for ONE mainnet', () => {
    const address = generateAddressFromXPub(
      'xpub6EiLaLx7QvbzXKLr8AmyHCEDss5gM5mW3XuTEFCYVH7HHCVA7dyrbzE7YawQ4yTxRtZyjgX1sTgbjEWaMKxYMrhhk8rjtVvhbhPH3wrw8Ei',
      1
    )
    expect(address).toBe('0x209f1ecead1c7096669e65f2ab21fca280b7de32')
  })

  it('should generate address 1 for ONE testnet', () => {
    const address = generateAddressFromXPub(
      'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25',
      2
    )
    expect(address).toBe('0x10168acf3231ccc7b16ba53f17dd4d8bdecf4e1a')
  })

  it('should generate private key 1 for ONE testnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
  })

  it('should generate private key 1 for ONE mainnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0xe271a071aaa5e8abfcb02ce12758ae90eeb324dd6b9267778ef7990f2266429e')
  })

  it('should generate an address from a mainnet ONE private key', async () => {
    const address = await generateAddressFromPrivatekey(
      '0xac12f9a2d0d1f06c7dc33a3e9c18f60fe1ca65c592d1e9345c994740f9e1971e'
    )
    expect(address).toBe('0xefc395c295a90023d3e9afacb4399da3d332947b')
  })

  it('should generate an address from a testnet ONE private key', async () => {
    const address = await generateAddressFromPrivatekey(
      '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
    )
    expect(address).toBe('0x8acbcfbc8ce37f6f674f4b9861d3efe89288d89f')
  })
})
