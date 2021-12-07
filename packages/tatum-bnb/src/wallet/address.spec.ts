import { generateBlockchainWallet, generateAddressFromPrivatekey } from '../'

describe('Address tests', () => {
  it('should generate address from private key for BNB testnet', async () => {
    const { address, privateKey } = await generateBlockchainWallet(true)
    expect(address).toBe(await generateAddressFromPrivatekey(true, privateKey))
  })
})
