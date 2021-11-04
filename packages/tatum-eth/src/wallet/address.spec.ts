import { generateAddressFromPrivatekey, generateAddressFromXPub, generatePrivateKeyFromMnemonic } from './address'

describe('Address tests', () => {
  it('should generate address 1 for ETH mainnet', () => {
    const address = generateAddressFromXPub(
      'xpub6DtR524VQx3ENj2E9pNZnjqkVp47YN5sRCP5y4Gs6KZTwDhH9HTVX8shJPt74WaPZRftRXFfnsyPbMPh6DMEmrQ2WBxDJzGxriStAB36bQM',
      1
    )
    expect(address).toBe('0xaac8c73348f1f92b2f9647e1e4f3cf14e2a8b3cb')
  })

  it('should generate address 1 for ETH testnet', () => {
    const address = generateAddressFromXPub(
      'xpub6FMiQpA54nciqs52guGVdWQ5TonZt5XtGsFpurgtttL7H3mSfaJDXv5aBdThjX6tW9HYaJSQ8wZVnLm1ixaQUu1MRQCwvwZ6U2cX6mwWT25',
      1
    )
    expect(address).toBe('0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea')
  })

  it('should generate private key 1 for ETH mainnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0xbc93ab7d2dbad88e64879569a9e3ceaa12d119c70d6dda4d1fc6e73765794a8d')
  })

  it('should generate private key 1 for ETH testnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
  })

  it('should generate an address from a mainnet ETH private key', async () => {
    const address = await generateAddressFromPrivatekey(
      '0xac12f9a2d0d1f06c7dc33a3e9c18f60fe1ca65c592d1e9345c994740f9e1971e'
    )
    expect(address).toBe('0xefc395c295a90023d3e9afacb4399da3d332947b')
  })

  it('should generate an address from a testnet ETH private key', async () => {
    const address = await generateAddressFromPrivatekey(
      '0x4cda6d2c33b0f9a041e46474a638ac59aee0734cf208aa9aa2f05ef887bd09e1'
    )
    expect(address).toBe('0x8acbcfbc8ce37f6f674f4b9861d3efe89288d89f')
  })
})
