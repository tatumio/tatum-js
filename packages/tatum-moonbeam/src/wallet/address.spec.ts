import { generatePrivateKeyFromMnemonic } from './address'

describe('Address tests', () => {
  it('should generate private key 1 for GLMR testnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      true,
      'timber cabbage receive elevator obey blame razor suggest afford fantasy term hammer despair tattoo usual habit later awkward genre enemy urge blue swap shoulder',
      1
    )
    expect(privateKey).toBe('0x6bdcbe90b617c8c9d5f93233e0146d550524b74be90bd9e9cf03a15c4333b134')
  })

  it('should generate private key 1 for GLMR mainnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      false,
      'timber cabbage receive elevator obey blame razor suggest afford fantasy term hammer despair tattoo usual habit later awkward genre enemy urge blue swap shoulder',
      1
    )
    expect(privateKey).toBe('0xab4130f2c4d6331050f60fc3cc3750da304ecd3b94909c18bdd7c8052c56ab0a')
  })
})
