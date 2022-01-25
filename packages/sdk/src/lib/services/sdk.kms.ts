import { SecurityKeyManagementSystemService } from '@tatumio/api-client'
import { abstractSdkKms } from '@tatumio/abstract-sdk'
import { Blockchain, blockchainHelper, ChainTransactionKMS, Currency } from '@tatumio/shared-core'
import { SDKS } from '../sdk.common'

export const sdkKms = (args: { sdks: SDKS }) => {
  return {
    ...abstractSdkKms(),
    getAllPending: SecurityKeyManagementSystemService.getPendingTransactionsToSign,
    //sign: async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> => {},
  }
}
