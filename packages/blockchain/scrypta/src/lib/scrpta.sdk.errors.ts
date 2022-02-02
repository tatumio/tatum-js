import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const SCRYPTA_ERRORS_MAPPING = {}

export type ScryptaSdkErrorCode =
  | SdkErrorCode.BTC_FEE_TOO_SMALL
  | SdkErrorCode.BTC_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_NOT_ENOUGH_BALANCE

export class ScryptaSdkError extends SdkError {
  constructor(error: Error | ScryptaSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        originalErrorAsString: error.name,
        errorSubstringMapping: SCRYPTA_ERRORS_MAPPING,
      })
    }
  }
}
