import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export type BtcBasedSdkErrorCode =
  | SdkErrorCode.BTC_FEE_TOO_SMALL
  | SdkErrorCode.BTC_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_NOT_ENOUGH_BALANCE

export class BtcBasedSdkError extends SdkError {
  constructor(error: Error | BtcBasedSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        originalErrorAsString: error.name,
      })
    }
  }
}
