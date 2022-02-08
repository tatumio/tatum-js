import { ApiError } from '@tatumio/api-client'

export type SdkErrorArgs<T extends SdkErrorCode = SdkErrorCode> = {
  originalError?: Error
  originalErrorAsString?: string
  errorSubstringMapping?: { [key: string]: SdkErrorCode }
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

function isApiError(args: SdkErrorArgs) {
  return args.originalError && 'name' in args.originalError && args.originalError?.name === 'ApiError' // bypassing jest mock
}

export class SdkError extends Error {
  readonly errorCode?: SdkErrorCode
  readonly errorMessage?: string
  readonly originalError?: Error | string

  constructor(args: SdkErrorArgs | { code: SdkErrorCode }) {
    let errorCode
    let originalError
    let errorMessage

    if ('code' in args) {
      errorCode = args.code
      errorMessage = SdkErrorMessage[errorCode]
    } else {
      if (args.originalError instanceof SdkError) {
        errorCode = args.originalError.errorCode
        originalError = args.originalError.originalError
        errorMessage = args.originalError.errorMessage
      } else if (isApiError(args)) {
        errorCode = SdkErrorCode.API_ERROR
        errorMessage = SdkErrorMessage[errorCode]
        originalError = args.originalError
      } else {
        const errorMessageAsString = args.originalErrorAsString
          ? args.originalErrorAsString
          : args.originalError?.toString()

        if (args.errorSubstringMapping) {
          const errorCodeFromMapping = args.errorSubstringMapping
            ? Object.keys(args.errorSubstringMapping).find(
                (k) => errorMessageAsString && errorMessageAsString.indexOf(k) !== -1,
              )
            : undefined
          errorCode = errorCodeFromMapping
            ? args.errorSubstringMapping[errorCodeFromMapping]
            : SdkErrorCode.COMMON_ERROR
        } else {
          errorCode = SdkErrorCode.COMMON_ERROR
        }

        originalError = args?.originalError?.message
        errorMessage = SdkErrorMessage[errorCode]
      }
    }

    super(stringifyError(errorCode, errorMessage, originalError))
    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.originalError = originalError
  }
}

export enum SdkErrorCode {
  API_ERROR = 'api.error',
  COMMON_ERROR = 'sdk.common.error',
  BTC_FEE_TOO_SMALL = 'btc.fee.too-small',
  BTC_UTXO_NOT_FOUND = 'btc.utxo.not-found',
  BTC_NOT_ENOUGH_BALANCE = 'btc.balance.not-enough',
  BTC_FEE_IS_TOO_LARGE = 'btc.fee.too-large',
  XRP_SECRET_DOES_NOT_MATCH = 'xrp.secret.does-not-match',
  FEE_TOO_SMALL = 'fee.too-small',
  TX_NOT_FOUND = 'tx.not.found',
}

// @TODO pass params?
export const SdkErrorMessage: Record<SdkErrorCode, string> = {
  [SdkErrorCode.API_ERROR]: `Error during api request`,
  [SdkErrorCode.COMMON_ERROR]: `Error during execution`,
  [SdkErrorCode.FEE_TOO_SMALL]: `Fee is too small`,
  // BTC
  [SdkErrorCode.BTC_FEE_TOO_SMALL]: `Fee is too small. Please make sure that amount to send < balance`,
  [SdkErrorCode.BTC_UTXO_NOT_FOUND]: `UTXO not found. Please check that outputs are valid`,
  [SdkErrorCode.BTC_NOT_ENOUGH_BALANCE]: `Not enough coins on address to perform this transaction`,
  [SdkErrorCode.BTC_FEE_IS_TOO_LARGE]: `Fee is to big, make sure it's not a mistake`,
  [SdkErrorCode.TX_NOT_FOUND]: `TX not found`,

  // XRP
  [SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH]: `Secret not valid or doesn't match address`,
}
