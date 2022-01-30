import { SdkError, SdkErrorCode } from '@tatumio/abstract-sdk'

export const BCH_ERRORS_MAPPING = {
  'Transaction has absurd fees': SdkErrorCode.BTC_FEE_IS_TOO_LARGE,
}

export type BchSdkErrorCode =
  | SdkErrorCode.BTC_FEE_TOO_SMALL
  | SdkErrorCode.BTC_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_NOT_ENOUGH_BALANCE

export class BchSdkError extends SdkError {
  constructor(error: Error | BchSdkErrorCode) {
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
