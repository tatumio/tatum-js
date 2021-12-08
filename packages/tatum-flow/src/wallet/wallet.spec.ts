import { generateBlockchainWallet } from './wallet'

describe('Wallet tests', () => {
  it('should generate wallet for FLOW mainnet', async () => {
    const wallet = await generateBlockchainWallet(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.mnemonic).toBe(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten'
    )
    expect(wallet.xpub).toBe(
      'xpub6EVKqCYcoa9DXpjAACsdyQTUZ5tgx3DUyt5Yy8xx9kmVKMCsn3vtLictDQMjdEtpo5CpwVwipVxThFKwh49xNJ5Fy752ifnM5mwYy28AtVv'
    )
  })
})
