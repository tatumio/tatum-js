import { SdkError, SdkErrorCode } from '@tatumio/abstract-sdk'

export const BCH_ERRORS_MAPPING = {}

export type LtcSdkErrorCode =
  | SdkErrorCode.BTC_FEE_TOO_SMALL
  | SdkErrorCode.BTC_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_NOT_ENOUGH_BALANCE

export class LtcSdkError extends SdkError {
  constructor(error: Error | LtcSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: BCH_ERRORS_MAPPING,
      })
    }
  }
}
