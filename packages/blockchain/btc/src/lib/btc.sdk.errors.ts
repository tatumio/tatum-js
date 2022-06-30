import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

/**
 * https://github.com/bitpay/bitcore/blob/v8.0.0/packages/bitcore-lib/lib/errors/spec.js
 */
export const BTC_ERRORS_MAPPING = {
  'bitcore.ErrorTransactionFeeErrorTooSmall': SdkErrorCode.BTC_BASED_FEE_TOO_SMALL,
  'bitcore.ErrorTransactionInvalidOutputAmountSum': SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE,
}

export type BtcSdkErrorCode =
  | SdkErrorCode.BTC_BASED_FEE_TOO_SMALL
  | SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE

export class BtcSdkError extends SdkError {
  constructor(error: Error | BtcSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        originalErrorAsString: error.name,
        errorSubstringMapping: BTC_ERRORS_MAPPING,
      })
    }
  }
}
