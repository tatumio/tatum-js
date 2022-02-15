import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const XRP_ERRORS_MAPPING = {
  'instance.secret does not conform to the "secret" format': SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH,
}

export type XrpSdkErrorCode = SdkErrorCode.FEE_TOO_SMALL | SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH

export class XrpSdkError extends SdkError {
  constructor(error: Error | XrpSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: XRP_ERRORS_MAPPING,
      })
    }
  }
}
