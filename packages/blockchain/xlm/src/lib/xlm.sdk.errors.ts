import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const XLM_ERRORS_MAPPING = {
  'amount argument must be of type String': SdkErrorCode.VALIDATION_AMOUNT,
  'invalid checksum': SdkErrorCode.SECRET_CHECKSUM,
  'destination is invalid': SdkErrorCode.VALIDATION_TO_ADDRESS,
}

export type XlmSdkErrorCode =
  | SdkErrorCode.VALIDATION_AMOUNT
  | SdkErrorCode.SECRET_CHECKSUM
  | SdkErrorCode.VALIDATION_TO_ADDRESS
  | SdkErrorCode.XLM_NO_SEQUENCE

export class XlmSdkError extends SdkError {
  constructor(error: Error | XlmSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: XLM_ERRORS_MAPPING,
      })
    }
  }
}
