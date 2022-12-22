import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const TRON_ERRORS_MAPPING = {}

export type TronSdkErrorCode = SdkErrorCode.TRON_NOT_ENOUGH_BALANCE

export class TronSdkError extends SdkError {
  constructor(error: Error | TronSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: TRON_ERRORS_MAPPING,
      })
    }
  }
}
