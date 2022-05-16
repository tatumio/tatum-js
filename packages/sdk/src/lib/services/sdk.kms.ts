import { KeyManagementSystemService } from '@tatumio/api-client'
import { abstractSdkKms } from '@tatumio/shared-abstract-sdk'
import { SDKS } from '../sdk.common'

export const sdkKms = (args: { sdks: SDKS }) => {
  return {
    ...abstractSdkKms(),
    getAllPending: KeyManagementSystemService.getPendingTransactionsToSign,
    //sign: async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> => {},
  }
}
