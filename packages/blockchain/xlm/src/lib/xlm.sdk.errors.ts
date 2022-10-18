import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const XLM_ERRORS_MAPPING = {
  'amount argument must be of type String': SdkErrorCode.VALIDATION_AMOUNT,
  'invalid checksum': SdkErrorCode.SECRET_CHECKSUM,
  'destination is invalid': SdkErrorCode.VALIDATION_TO_ADDRESS,
  'chain type is invalid': SdkErrorCode.KMS_CHAIN_MISMATCH,
  'insufficient funds on the sender account for performing the transaction': SdkErrorCode.INSUFFICIENT_FUNDS,
  'either fromSecret or signatureId must be present.': SdkErrorCode.PARAMETER_MISMATCH,
}

export type XlmSdkErrorCode =
  | SdkErrorCode.VALIDATION_AMOUNT
  | SdkErrorCode.SECRET_CHECKSUM
  | SdkErrorCode.VALIDATION_TO_ADDRESS
  | SdkErrorCode.XLM_NO_SEQUENCE
  | SdkErrorCode.KMS_CHAIN_MISMATCH
  | SdkErrorCode.INSUFFICIENT_FUNDS
  | SdkErrorCode.PARAMETER_MISMATCH

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
