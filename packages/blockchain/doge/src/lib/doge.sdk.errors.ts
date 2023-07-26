import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const DOGE_ERRORS_MAPPING = {
  'dogecore.ErrorTransactionFeeErrorTooSmall': SdkErrorCode.BTC_BASED_FEE_TOO_SMALL,
  'dogecore.ErrorTransactionInvalidOutputAmountSum': SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE,
  'dogecore.ErrorTransactionFeeErrorDifferent': SdkErrorCode.BTC_BASED_FEE_TOO_SMALL,
  'dogecore.ErrorTransactionDustOutputs': SdkErrorCode.BTC_BASED_DUST_AMOUNT,
}

export type DogeSdkErrorCode =
  | SdkErrorCode.BTC_BASED_FEE_TOO_SMALL
  | SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE
  | SdkErrorCode.BTC_BASED_DUST_AMOUNT
  | SdkErrorCode.BTC_BASED_NO_INPUTS
  | SdkErrorCode.BTC_BASED_WRONG_BODY

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
