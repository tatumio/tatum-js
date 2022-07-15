import { amountUtils, toHexString } from '../utils'
import { SdkErrorCode } from '../errors.abstract.sdk'
import BigNumber from 'bignumber.js'

describe('Utils', function () {
  describe('Amount utils', function () {
    describe('valid cases', function () {
      const validCases = [
        [1001, 100100000000],
        [1, 100000000],
        [0, 0],
        [0.1, 10000000],
        [0.0001, 10000],
        [0.00000001, 1],
        [12345.67891011, 1234567891011],
      ]

      it.each(validCases)('valid amount %d', (amount, expectedSatoshis) => {
        expect(amountUtils.toSatoshis(amount)).toBe(expectedSatoshis)
        expect(amountUtils.toSatoshis(amount.toString())).toBe(expectedSatoshis)
      })
    })

    describe('invalid cases', function () {
      const invalidCases = [
        [0.000000001],
        [1.000000002],
        [12345.67891011111],
        [-1001.0000000000001],
        [-123123.000000001],
      ]

      it.each(invalidCases)('invalid amount %d', (amount) => {
        expect(() => amountUtils.toSatoshis(amount)).toThrow(SdkErrorCode.BTC_BASED_AMOUNT)
        expect(() => amountUtils.toSatoshis(amount.toString())).toThrow(SdkErrorCode.BTC_BASED_AMOUNT)
      })
    })
  })

  describe('toHexString', () => {
    it('valid', () => {
      const bn = new BigNumber(123456)

      expect(toHexString(bn)).toBe('0x1e240')
    })
  })
})
