import { generateBlockchainWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate SOL wallet', async () => {
    const wallet = await generateBlockchainWallet(
      '2B7RyZEuZr9PpfRrn7nYhSXhjeuzte65UYeeKJFQJCvsi3ZQJk5AfmWptwDpD2Xtz22nv1aTg5rmKq13ggB7Fkep'
    )
    const w2 = await generateBlockchainWallet(wallet.privateKey)
    expect(wallet.privateKey).toEqual(w2.privateKey)
    expect(wallet.address).toEqual(w2.address)
    expect(wallet.address).toEqual('FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ')
    console.log(wallet)
  })
})
