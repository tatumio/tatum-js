import { SdkError, SdkErrorCode, wrapErrorIfNeeded } from '@tatumio/shared-abstract-sdk'

export class SolanaSdkError extends SdkError {
  constructor({ error, code }: { error?: Error | string; code?: SdkErrorCode }) {
    if (error) {
      const wrapped = wrapErrorIfNeeded(error)

      super({
        originalError: wrapped,
        originalErrorAsString: wrapped?.name,
        code,
      })
    } else {
      super({
        code: code ?? SdkErrorCode.COMMON_ERROR,
      })
    }
  }
}
