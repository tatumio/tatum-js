export type SdkErrorArgs<T extends SdkErrorCode = SdkErrorCode> = {
  originalError?: Error
  originalErrorAsString?: string
  errorSubstringMapping: { [key: string]: SdkErrorCode }
}

function stringifyError(errorCode?: SdkErrorCode, errorMessage?: string, originalError?: Error | string) {
  return JSON.stringify(
    {
      errorCode,
      errorMessage,
      originalError,
    },
    null,
    2,
  )
}

export class SdkError extends Error {
  private errorCode?: SdkErrorCode
  private errorMessage?: string
  private originalError?: Error | string

  constructor(args: SdkErrorArgs | { code: SdkErrorCode }) {
    let errorCode
    let originalError
    let errorMessage

    if ('originalError' in args && args.originalError instanceof SdkError) {
      errorCode = args.originalError.errorCode
      originalError = args.originalError.originalError
      errorMessage = args.originalError.errorMessage
    } else {
      if ('code' in args) {
        errorCode = args.code
      } else {
        const errorMessageAsString = args.originalErrorAsString
          ? args.originalErrorAsString
          : args.originalError?.toString()

        const errorCodeFromMapping = Object.keys(args.errorSubstringMapping).find(
          (k) => errorMessageAsString && errorMessageAsString.indexOf(k) !== -1,
        )
        errorCode = errorCodeFromMapping
          ? args.errorSubstringMapping[errorCodeFromMapping]
          : SdkErrorCode.COMMON_ERROR

        originalError = args?.originalError?.message
      }

      errorMessage = SdkErrorMessage[errorCode]
    }

    super(stringifyError(errorCode, errorMessage, originalError))
    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.originalError = originalError
  }
}

export enum SdkErrorCode {
  COMMON_ERROR = 'sdk.common.error',
  BTC_FEE_TOO_SMALL = 'btc.fee.too-small',
  BTC_UTXO_NOT_FOUND = 'btc.utxo.not-found',
  BTC_NOT_ENOUGH_BALANCE = 'btc.balance.not-enough',
  BTC_FEE_IS_TOO_LARGE = 'btc.fee.too-large',
}

// @TODO pass params?
export const SdkErrorMessage: Record<SdkErrorCode, string> = {
  [SdkErrorCode.COMMON_ERROR]: `Error during execution`,
  // BTC
  [SdkErrorCode.BTC_FEE_TOO_SMALL]: `Fee is too small. Please make sure that amount to send < balance`,
  [SdkErrorCode.BTC_UTXO_NOT_FOUND]: `UTXO not found. Please check that outputs are valid`,
  [SdkErrorCode.BTC_NOT_ENOUGH_BALANCE]: `Not enough coins on address to perform this transaction`,
  [SdkErrorCode.BTC_FEE_IS_TOO_LARGE]: `Fee is to big, make sure it's not a mistake`,
}
