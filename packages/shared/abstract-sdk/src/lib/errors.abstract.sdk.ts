import { placeArgsToString } from './utils'

export type SdkErrorArgs = {
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

  constructor(args: SdkErrorArgs | { code: SdkErrorCode; messageArgs?: SdkMessageArgs }) {
    let errorCode
    let originalError
    let errorMessage

    if ('code' in args) {
      errorCode = args.code
      errorMessage = placeArgsToString(SdkErrorMessage[errorCode], args.messageArgs)
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

export type SdkMessageArgs = (string | number)[]

export enum SdkErrorCode {
  API_ERROR = 'api.error',
  COMMON_ERROR = 'sdk.common.error',
  BTC_BASED_FEE_TOO_SMALL = 'btc-based.fee.too-small',
  BTC_BASED_UTXO_NOT_FOUND = 'btc-based.utxo.not-found',
  BTC_BASED_NOT_ENOUGH_BALANCE = 'btc-based.balance.not-enough',
  BTC_FEE_IS_TOO_LARGE = 'btc-based.fee.too-large',
  XRP_SECRET_DOES_NOT_MATCH = 'xrp.secret.does-not-match',
  FEE_TOO_SMALL = 'fee.too-small',
  TX_NOT_FOUND = 'tx.not.found',
  BTC_BASED_AMOUNT = 'btc-based.validation.amount',

  VALIDATION_AMOUNT = 'validation.amount',
  SECRET_CHECKSUM = 'validation.secret.checksum',
  VALIDATION_TO_ADDRESS = 'validation.to-address',
  XLM_NO_SEQUENCE = 'xlm.account.no-sequence',
  FLOW_MISSING_PRIVATE_KEY = 'flow.private-key.missing',
  FLOW_MISSING_MNEMONIC = 'flow.mnemonic.missing',
}

// @TODO pass params?
export const SdkErrorMessage: Record<SdkErrorCode, string> = {
  [SdkErrorCode.API_ERROR]: `Error during api request`,
  [SdkErrorCode.COMMON_ERROR]: `Error during execution`,
  [SdkErrorCode.FEE_TOO_SMALL]: `Fee is too small`,
  [SdkErrorCode.VALIDATION_AMOUNT]: `Amount has to be positive number`,
  // BTC
  [SdkErrorCode.BTC_BASED_FEE_TOO_SMALL]: `Fee is too small. Please make sure that amount to send < balance`,
  [SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND]: `UTXO with hash {0} and index {1} not found. Please check that outputs are valid`,
  [SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE]: `Not enough coins on address to perform this transaction`,
  [SdkErrorCode.BTC_FEE_IS_TOO_LARGE]: `Fee is to big, make sure it's not a mistake`,
  [SdkErrorCode.TX_NOT_FOUND]: `TX not found`,
  [SdkErrorCode.BTC_BASED_AMOUNT]: `Amount {0} is incorrect btc-based amount. Should have 8 decimal numbers max`,

  // XRP
  [SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH]: `Secret not valid or doesn't match address`,

  // XLM
  [SdkErrorCode.SECRET_CHECKSUM]: `Secret is not valid. Please check your secret for typos`,
  [SdkErrorCode.VALIDATION_TO_ADDRESS]: `To address is wrong`,
  [SdkErrorCode.XLM_NO_SEQUENCE]: `Account does not contain sequence. Please check account info`,
  // FLOW
  [SdkErrorCode.FLOW_MISSING_PRIVATE_KEY]: `No private key available`,
  [SdkErrorCode.FLOW_MISSING_MNEMONIC]: `Mnemonic required`,
}
