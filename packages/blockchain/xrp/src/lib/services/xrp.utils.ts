import { BigNumber } from 'bignumber.js'

export const xrpUtils = {
  DROPS_PRECISION: 1000000,

  toAmount: (valueInDrops?: string): BigNumber => {
    const valueInDropsBn = new BigNumber(valueInDrops ?? '0')
    if (valueInDropsBn.isZero()) {
      return valueInDropsBn
    }
    return valueInDropsBn.dividedBy(xrpUtils.DROPS_PRECISION)
  },
  toDrops: (value?: string): BigNumber => {
    const valueBn = new BigNumber(value ?? '0')
    return valueBn.multipliedBy(xrpUtils.DROPS_PRECISION)
  },
}
