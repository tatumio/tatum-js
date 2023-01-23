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

export const EvmBasedErrorCodesFromNode = {
  GAS_REQUIRED_EXCEEDS_ALLOWANCE: {
    substring: 'gas required exceeds allowance',
    error({ e, address }: { e: Error; address?: string }) {
      const errorMsg = address
        ? `Insufficient funds to send transaction from account ${address}, returned with error ${e}`
        : `Insufficient funds to send transaction, returned with error ${e}`
      new EvmBasedSdkError({
        code: SdkErrorCode.EVM_TRANSACTION_ERROR,
        error: new Error(errorMsg),
      })
    },
  },
}
