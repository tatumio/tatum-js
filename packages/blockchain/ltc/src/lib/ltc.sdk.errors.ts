import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const LTC_ERRORS_MAPPING = {}

export type LtcSdkErrorCode =
  | SdkErrorCode.BTC_BASED_FEE_TOO_SMALL
  | SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE
  | SdkErrorCode.TX_NOT_FOUND

export class LtcSdkError extends SdkError {
  constructor(error: Error | LtcSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: LTC_ERRORS_MAPPING,
      })
    }
  }
}
