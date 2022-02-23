import { egldWallet } from '../services/egld.wallet'

const walletService = egldWallet()

describe('Address tests', () => {
  it('should generate private key 1 for EGLD mainnet', async () => {
    const privateKey = await walletService.generatePrivateKeyFromMnemonic(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1,
      { testnet: false },
    )
    expect(privateKey).toBe('3ae733827921c526de0f497ccad602b58b287e33611a66ebdc7b13104b021282')
  })

  it('should generate an address from a mainnet EGLD private key', async () => {
    const address = walletService.generateAddressFromPrivateKey(
      '3ae733827921c526de0f497ccad602b58b287e33611a66ebdc7b13104b021282',
    )
    expect(address.length).toBe(62)
    expect(address).toBe('erd1v4jp3x4ykjqphfy53w8aw7r30gqc74qv9extcr50am3qqn5y9zqsxef44a')
  })

  it('should generate address for EGLD mainnet index 1', async () => {
    const address = await walletService.generateAddressFromXPub(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1,
      { testnet: false },
    )
    expect(address.length).toBe(62)
    expect(address).toBe('erd1v4jp3x4ykjqphfy53w8aw7r30gqc74qv9extcr50am3qqn5y9zqsxef44a')
  })

  it('should generate address for EGLD mainnet index 0', async () => {
    const address = await walletService.generateAddressFromXPub(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      0,
      { testnet: false },
    )
    expect(address.length).toBe(62)
    expect(address).not.toBe('erd1v4jp3x4ykjqphfy53w8aw7r30gqc74qv9extcr50am3qqn5y9zqsxef44a')
  })

  it('should generate private key for EGLD testnet', async () => {
    const privateKey = await walletService.generatePrivateKeyFromMnemonic(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      0,
      { testnet: true },
    )
    expect(privateKey).toBe('9bfb8dacf1d625acea5805b5306f0ba26d42bc1eb114ce00fec57fc638c2bfb5')
  })

  it('should generate an address from a testnet EGLD private key', () => {
    const address = walletService.generateAddressFromPrivateKey(
      '9bfb8dacf1d625acea5805b5306f0ba26d42bc1eb114ce00fec57fc638c2bfb5',
    )
    expect(address.length).toBe(62)
    expect(address).toBe('erd10j7rvtrpejsquz98ccrcysp7g44r0fpk0w3uey40v9wf3yfdztcqahhvz9')
  })

  it('should generate address for EGLD testnet index 0', async () => {
    const address = await walletService.generateAddressFromXPub(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      0,
      { testnet: true },
    )
    expect(address.length).toBe(62)
    expect(address).toBe('erd10j7rvtrpejsquz98ccrcysp7g44r0fpk0w3uey40v9wf3yfdztcqahhvz9')
  })

  it('should generate address for EGLD testnet index 1', async () => {
    const address = await walletService.generateAddressFromXPub(
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1,
      { testnet: true },
    )
    expect(address.length).toBe(62)
    expect(address).not.toBe('erd10j7rvtrpejsquz98ccrcysp7g44r0fpk0w3uey40v9wf3yfdztcqahhvz9')
  })

  describe('Wallet tests', () => {
    it('should generate wallet for EGLD', async () => {
      const wallet = walletService.generateWallet(
        'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      )
      expect(wallet.mnemonic).toBe(
        'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      )
    })
  })
})
