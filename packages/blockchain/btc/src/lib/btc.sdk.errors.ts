import { SdkError, SdkErrorCode } from '@tatumio/abstract-sdk'

/**
 * https://github.com/bitpay/bitcore/blob/v8.0.0/packages/bitcore-lib/lib/errors/spec.js
 */
export const BTC_ERRORS_MAPPING = {
  'bitcore.ErrorTransactionFeeErrorTooSmall': SdkErrorCode.BTC_FEE_TOO_SMALL,
  'bitcore.ErrorTransactionInvalidOutputAmountSum': SdkErrorCode.BTC_NOT_ENOUGH_BALANCE,
}

export type BtcSdkErrorCode =
  | SdkErrorCode.BTC_FEE_TOO_SMALL
  | SdkErrorCode.BTC_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_NOT_ENOUGH_BALANCE

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
