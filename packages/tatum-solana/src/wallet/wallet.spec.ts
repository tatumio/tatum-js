import { generateBlockchainWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate SOL wallet', async () => {
    const wallet = await generateBlockchainWallet()
    const w2 = await generateBlockchainWallet(wallet.privateKey)
    expect(wallet.privateKey).toEqual(w2.privateKey)
    expect(wallet.address).toEqual(w2.address)
    console.log(wallet)
  })
})
