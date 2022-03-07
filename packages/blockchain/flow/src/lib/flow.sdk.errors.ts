import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export type FlowSdkErrorCode = SdkErrorCode.FLOW_MISSING_PRIVATE_KEY | SdkErrorCode.FLOW_MISSING_MNEMONIC

export class FlowSdkError extends SdkError {
  constructor(error: Error | FlowSdkErrorCode) {
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
