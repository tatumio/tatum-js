import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const XRP_ERRORS_MAPPING = {
  'instance.secret does not conform to the "secret" format': SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH,
  'chain type is invalid': SdkErrorCode.KMS_CHAIN_MISMATCH,
  'insufficient funds on the sender account for performing the transaction': SdkErrorCode.INSUFFICIENT_FUNDS,
}

export type XrpSdkErrorCode =
  | SdkErrorCode.FEE_TOO_SMALL
  | SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH
  | SdkErrorCode.KMS_CHAIN_MISMATCH
  | SdkErrorCode.INSUFFICIENT_FUNDS

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
