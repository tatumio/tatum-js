import { Currency } from '@tatumio/tatum-core'
import { generatePrivateKeyFromMnemonic } from './address'

describe('Address tests', () => {
  it('should generate private key 1 for KCS testnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      Currency.KCS,
      true,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0x4874827a55d87f2309c55b835af509e3427aa4d52321eeb49a2b93b5c0f8edfb')
  })

  it('should generate private key 1 for KCS mainnet', async () => {
    const privateKey = await generatePrivateKeyFromMnemonic(
      Currency.KCS,
      false,
      'quantum tobacco key they maid mean crime youth chief jungle mind design broken tilt bus shoulder leaf good forward erupt split divert bread kitten',
      1
    )
    expect(privateKey).toBe('0x4bc3706c9fa5345f61d8186b817f3ba2c44581ce40fae86bec84dd9b079bc40a')
  })
})
