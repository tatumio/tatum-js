import { generateAddressFromXPub, generatePrivateKeyFromMnemonic } from './address'

describe('Address tests', () => {
  it('should generate address 1 for BCH mainnet', () => {
    const address = generateAddressFromXPub(
      false,
      'xpub6EafivSZvqR8ysLKS52NDKfn16sB9uhCEfCKdYi7PpGqqK3fJGdd53DzUnWYvFRZKAC7pB8FVnvuJKkJparfjjfVPTQTmC7dfC6aVvw6f98',
      1
    )
    expect(address).toBe('bitcoincash:qr9wgjtyjd4q60323gd2ytsv5w3thl92rclzrklply')
  })

  it('should generate address 1 for BCH testnet', () => {
    const address = generateAddressFromXPub(
      true,
      'tpubDExJFAGFe7NbFfXAtG1TRF19LDxq9JCFnHncz6mFjj2jabiNNVUiDUtpipbLSkNo74j2Rke82tkwzWEvDShudB7nT49mSimsF9gzFwTf4nw',
      1
    )
    expect(address).toBe('bchtest:qr9wgjtyjd4q60323gd2ytsv5w3thl92rcms83akcc')
  })

  it('should generate private key 1 for BCH mainnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('KzqM77kK7zqZGockuB2Tov1FXoH6BTMaT3ixeqTPXLAYp838W3KT')
  })

  it('should generate private key 1 for BCH testnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('cRCLa2kAZ4XpSF62HaqbBEWKA2aVquTGX5sRmFuu2SpZ4s72vi5Y')
  })
})
