import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const ALGO_ERRORS_MAPPING = {}

export type AlgoSdkErrorCode = SdkErrorCode.ALGO_TOKEN_NAME_TOO_LONG

export class AlgoSdkError extends SdkError {
  constructor(error: Error | AlgoSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: ALGO_ERRORS_MAPPING,
      })
    }
  }
}
