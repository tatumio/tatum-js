import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const DOGE_ERRORS_MAPPING = {
  'dogecore.ErrorTransactionFeeErrorTooSmall': SdkErrorCode.BTC_FEE_TOO_SMALL,
  'dogecore.ErrorTransactionInvalidOutputAmountSum': SdkErrorCode.BTC_NOT_ENOUGH_BALANCE,
  'dogecore.ErrorTransactionFeeErrorDifferent': SdkErrorCode.BTC_FEE_TOO_SMALL,
}

export type DogeSdkErrorCode =
  | SdkErrorCode.BTC_FEE_TOO_SMALL
  | SdkErrorCode.BTC_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_NOT_ENOUGH_BALANCE

export class DogeSdkError extends SdkError {
  constructor(error: Error | DogeSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: DOGE_ERRORS_MAPPING,
      })
    }
  }
}
