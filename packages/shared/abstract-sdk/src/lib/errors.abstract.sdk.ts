export type SdkErrorArgs<T extends SdkErrorCode = SdkErrorCode> = {
  originalError?: string
  code?: T
}

export class SdkError extends Error {
  constructor(args: SdkErrorArgs) {
    if (args.code) super(`[${SdkErrorMessage[args.code]}] ${SdkErrorMessage[args.code]}`)
    else super(args.originalError)
  }
}

export enum SdkErrorCode {
  BTC_FEE_TOO_SMALL = 'btc.fee.too-small',
  BTC_UTXO_NOT_FOUND = 'btc.utxo.not-found',
  BTC_NOT_ENOUGH_BALANCE = 'btc.balance.not-enough',
}

// @TODO pass params?
export const SdkErrorMessage: Record<SdkErrorCode, string> = {
  // BTC
  [SdkErrorCode.BTC_FEE_TOO_SMALL]: `Fee is too small. Please make sure that amount to send < balance`,
  [SdkErrorCode.BTC_UTXO_NOT_FOUND]: `UTXO not found. Please check that outputs are valid`,
  [SdkErrorCode.BTC_NOT_ENOUGH_BALANCE]: `Not enough coins on address to perform this transaction`,
}
