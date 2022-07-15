import { BigNumber as BN } from '@ethersproject/bignumber'
import { evmBasedUtils } from '../evm-based.utils'

describe('evmBasedUtils', () => {
  describe('gasLimitToHexWithFallback', () => {
    it('return fallback', () => {
      const fallback = 'fallback-value'

      expect(evmBasedUtils.gasLimitToHexWithFallback(undefined, fallback)).toBe(fallback)
    })

    it('valid', () => {
      expect(evmBasedUtils.gasLimitToHexWithFallback('123456')).toBe('0x1e240')
    })
  })

  describe('gasPriceWeiToHexWithFallback', () => {
    it('return fallback', () => {
      const fallback = BN.from(123456)

      expect(evmBasedUtils.gasPriceWeiToHexWithFallback(undefined, fallback)).toBe(fallback)
    })

    it('valid', () => {
      expect(evmBasedUtils.gasPriceWeiToHexWithFallback('123456')).toBe('0x704857068000')
    })
  })
})
