import { SdkError, SdkErrorArgs, SdkErrorCode } from '@tatumio/abstract-sdk'

export const BTC_ERRORS_MAPPING = {
  'bitcore.ErrorTransactionFeeErrorTooSmall': SdkErrorCode.BTC_FEE_TOO_SMALL,
  'bitcore.ErrorTransactionInvalidOutputAmountSum': SdkErrorCode.BTC_NOT_ENOUGH_BALANCE,
}

export type BtcSdkErrorCode =
  | SdkErrorCode.BTC_FEE_TOO_SMALL
  | SdkErrorCode.BTC_UTXO_NOT_FOUND
  | SdkErrorCode.BTC_NOT_ENOUGH_BALANCE

export class BtcSdkError extends SdkError {
  constructor(args: SdkErrorArgs<BtcSdkErrorCode>) {
    super(args)
  }

  static from(originalError: any): BtcSdkError {
    return new BtcSdkError({ originalError, code: BTC_ERRORS_MAPPING[originalError.name] })
  }

  static fromCode(code: BtcSdkErrorCode): BtcSdkError {
    return new BtcSdkError({ code })
  }
}
