import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const BNB_ERRORS_MAPPING = {
  'chain type is invalid': SdkErrorCode.KMS_CHAIN_MISMATCH,
  'TX preparation failure': SdkErrorCode.TX_PREPARATION_FAILED,
  'insufficient funds on the sender account for performing the transaction': SdkErrorCode.INSUFFICIENT_FUNDS,
}

export type BnbSdkErrorCode =
  | SdkErrorCode.KMS_CHAIN_MISMATCH
  | SdkErrorCode.TX_PREPARATION_FAILED
  | SdkErrorCode.INSUFFICIENT_FUNDS

export class BnbSdkError extends SdkError {
  constructor(error: Error | BnbSdkErrorCode, errorMessage?: string) {
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
        errorSubstringMapping: BNB_ERRORS_MAPPING,
      })
    }
  }
}
