import { Ethereum, Network, TatumSDK } from '../service'

describe('Tatum faucet', () => {
  const SEPOLIA_VAULT = '0x712e3a792c974b3e3dbe41229ad4290791c75a82'

  describe('invalid request', () => {
    const EXPECTED_RES = 'validation.failed'

    it('should get error due to unsupported chain', async () => {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.MULTIVERSX,
      })
      const res = await tatum.faucet.fund(SEPOLIA_VAULT)

      await tatum.destroy()
      expect(res.error?.code).toBe(EXPECTED_RES)
    })

    it('should get error due to unsupported mainnet', async () => {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM,
      })
      const res = await tatum.faucet.fund(SEPOLIA_VAULT)

      await tatum.destroy()
      expect(res.error?.code).toBe(EXPECTED_RES)
    })
  })

  describe('valid request', () => {
    const EXPECTED_RES = 'faucet.balance'

    it('should only stop at balance being above limit', async () => {
      const tatum = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM_SEPOLIA,
      })
      const res = await tatum.faucet.fund(SEPOLIA_VAULT)

      await tatum.destroy()
      expect(res.error?.code).toBe(EXPECTED_RES)
    })
  })
})
