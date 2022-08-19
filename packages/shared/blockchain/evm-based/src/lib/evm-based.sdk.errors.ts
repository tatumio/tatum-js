import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export class EvmBasedSdkError extends SdkError {
  constructor({ error, code }: { error?: Error; code?: SdkErrorCode }) {
    super({
      originalError: error,
      originalErrorAsString: error?.name,
      code,
    })
  }
}
