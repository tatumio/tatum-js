import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const BCH_ERRORS_MAPPING = {
  'Transaction has absurd fees': SdkErrorCode.BTC_FEE_IS_TOO_LARGE,
}

export type BchSdkErrorCode =
  | SdkErrorCode.BTC_BASED_FEE_TOO_SMALL
  | SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE
  | SdkErrorCode.BTC_BASED_WRONG_BODY
  | SdkErrorCode.KMS_CHAIN_MISMATCH
  | SdkErrorCode.BTC_BASED_TX_PREPARATION_UTXO
  | SdkErrorCode.BTC_BASED_DESTINATION_LESS_THAN_ZERO
  | SdkErrorCode.BTC_BASED_MNEMONIC_OR_KEYPAIR_EXPECTED
  | SdkErrorCode.BTC_BASED_TX_FAILED
  | SdkErrorCode.BTC_BASED_BLOCKCHAIN_ERROR
  | SdkErrorCode.BTC_BASED_WRONG_PRIVATE_KEY

export class BchSdkError extends SdkError {
  constructor(error: Error | BchSdkErrorCode) {
    if (typeof error === 'string') {
      super({
        code: error,
      })
    } else {
      super({
        originalError: error,
        errorSubstringMapping: BCH_ERRORS_MAPPING,
      })
    }
  }
}
