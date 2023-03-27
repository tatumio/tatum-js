import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const CARDANO_ERRORS_MAPPING = {
  'cardano.FEE_CHANGE_ADDRESS': SdkErrorCode.FEE_CHANGE_ADDRESS,
}

export type CardanoSdkErrorCode =
  | SdkErrorCode.FEE_CHANGE_ADDRESS

export class CardanoSdkError extends SdkError {
  constructor(error: Error | CardanoSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: CARDANO_ERRORS_MAPPING,
      })
    }
  }
}
