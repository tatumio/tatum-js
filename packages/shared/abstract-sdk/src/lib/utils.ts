import { SignatureId } from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { SdkError, SdkErrorCode, SdkMessageArgs } from './errors.abstract.sdk'
import _ from 'lodash'

export const amountUtils = {
  /**
   * Can't be in abstract-blockchain. Bug with bitcore
   * https://github.com/bitpay/bitcore-lib/pull/238
   * https://github.com/bitpay/bitcore-lib/issues/180
   */
  toSatoshis: (amount: number | string): number => {
    const amountBigNumber = new BigNumber(amount)
    const satoshiValue = amountBigNumber.multipliedBy(10 ** 8)
    const satoshis = satoshiValue.integerValue()
    if (satoshis.toFixed() !== satoshiValue.toFixed() || satoshis.lt(0)) {
      throw new SdkError({ code: SdkErrorCode.BTC_BASED_AMOUNT, messageArgs: [amountBigNumber.toString()] })
    }
    return Number(satoshis)
  },
  fromSatoshis: (amount: number | string): number => new BigNumber(amount).dividedBy(10 ** 8).toNumber(),
  amountToHexString: (amount: string, decimals: number) =>
    toHexString(new BigNumber(amount).multipliedBy(10 ** decimals)),
}

export function isWithSignatureId<P extends { fromPrivateKey: string },
  K extends SignatureId & { from?: string },
  >(input: P | K): input is K {
  return (input as K).signatureId !== undefined
}

export type WithoutChain<T extends { chain: unknown }> = Omit<T, 'chain'>

export const placeArgsToString = (message?: string, args?: SdkMessageArgs): string | undefined => {
  if (!message) {
    return message
  }
  if ((args?.length ?? 0) > 0) {
    let placedMessage = message
    args?.forEach((value, index) => {
      placedMessage = placedMessage.replace(`{${index}}`, `${value}`)
    })
    return placedMessage
  }
  return message
}

export const wrapErrorIfNeeded = (e: Error | string): Error => {
  if (_.isString(e)) {
    return new Error(e)
  }

  return e
}

export const toHexString = (value: BigNumber) => `0x${value.toString(16)}`

export const sleep = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export const sleepSeconds = async (sec: number) => new Promise((resolve) => setTimeout(resolve, sec * 1_000))
