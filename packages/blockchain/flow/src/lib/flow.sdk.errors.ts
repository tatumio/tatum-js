import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { flowUtils } from './utils/flow.utils'

export class FlowSdkError extends SdkError {
  constructor({ error, code }: { error?: Error | string; code?: SdkErrorCode }) {
    if (error) {
      const wrapped = flowUtils.wrapFlowErrorIfNeeded(error)

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
