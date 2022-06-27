import { SignatureId } from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { SdkMessageArgs } from './errors.abstract.sdk'

export const amountUtils = {
  /**
   * Can't be in abstract-blockchain. Bug with bitcore
   * https://github.com/bitpay/bitcore-lib/pull/238
   * https://github.com/bitpay/bitcore-lib/issues/180
   */
  toSatoshis: (amount: number | string): number =>
    Number(new BigNumber(amount).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
}

export function isWithSignatureId<
  P extends { fromPrivateKey: string },
  K extends SignatureId & { from?: string },
>(input: P | K): input is K {
  return (input as K).signatureId !== undefined
}

export type WithoutChain<T extends { chain: unknown }> = Omit<T, 'chain'>

export const placeArgsToString = (message: string, args?: SdkMessageArgs): string => {
  if (args?.length > 0) {
    let placedMessage = message
    args.forEach((value, index) => {
      placedMessage = placedMessage.replace(`{${index}}`, `${value}`)
    })
    return placedMessage
  }
  return message
}
