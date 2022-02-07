import BigNumber from 'bignumber.js'

export const amountUtils = {
  /**
   * Can't be in abstract-blockchain. Bug with bitcore
   * https://github.com/bitpay/bitcore-lib/pull/238
   * https://github.com/bitpay/bitcore-lib/issues/180
   */
  toSatoshis: (amount: number | string): number =>
    Number(new BigNumber(amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
}
