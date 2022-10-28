import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const ALGO_ERRORS_MAPPING = {
  'amount argument must be of type String': SdkErrorCode.VALIDATION_AMOUNT,
  'destination is invalid': SdkErrorCode.VALIDATION_TO_ADDRESS,
  'chain type is invalid': SdkErrorCode.KMS_CHAIN_MISMATCH,
  'insufficient funds on the sender account for performing the transaction': SdkErrorCode.INSUFFICIENT_FUNDS,
  'either fromSecret or signatureId must be present.': SdkErrorCode.PARAMETER_MISMATCH,
}

export type AlgoSdkErrorCode =
  | SdkErrorCode.VALIDATION_AMOUNT
  | SdkErrorCode.VALIDATION_TO_ADDRESS
  | SdkErrorCode.KMS_CHAIN_MISMATCH
  | SdkErrorCode.INSUFFICIENT_FUNDS
  | SdkErrorCode.PARAMETER_MISMATCH

export class AlgoSdkError extends SdkError {
  constructor(error: Error | AlgoSdkErrorCode, errorMessage?: string) {
    if (typeof error === 'string') {
      super({
        code: error,
        originalError: {
          name: error,
          message: errorMessage || '',
        },
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: ALGO_ERRORS_MAPPING,
      })
    }
  }
}
