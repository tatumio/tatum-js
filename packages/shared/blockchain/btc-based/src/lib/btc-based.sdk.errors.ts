import { SdkError, SdkErrorCode, SdkMessageArgs } from '@tatumio/shared-abstract-sdk'

/**
 * https://github.com/bitpay/bitcore/blob/v8.0.0/packages/bitcore-lib/lib/errors/spec.js
 */
export const BTC_ERRORS_MAPPING = {
  'bitcore.ErrorTransactionFeeErrorTooSmall': SdkErrorCode.BTC_BASED_FEE_TOO_SMALL,
  'bitcore.ErrorTransactionInvalidOutputAmountSum': SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE,
}

export type BtcBasedSdkErrorCode =
  | SdkErrorCode.BTC_BASED_FEE_TOO_SMALL
  | SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE
  | SdkErrorCode.BTC_FEE_IS_TOO_LARGE
  | SdkErrorCode.BTC_BASED_AMOUNT
  | SdkErrorCode.BTC_BASED_WRONG_PRIVATE_KEY

export class BtcBasedSdkError extends SdkError {
  constructor(error: Error | BtcBasedSdkErrorCode, messageArgs?: SdkMessageArgs) {
    if (typeof error === 'string') {
      super({
        code: error,
        messageArgs,
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
