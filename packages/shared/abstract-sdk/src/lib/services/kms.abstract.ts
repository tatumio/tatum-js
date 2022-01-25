import { SecurityKeyManagementSystemService } from '@tatumio/api-client'

export const abstractSdkKms = () => {
  return {
    get: SecurityKeyManagementSystemService.getPendingTransactionToSign,
    complete: SecurityKeyManagementSystemService.completePendingSignature,
    delete: SecurityKeyManagementSystemService.deletePendingTransactionToSign,
  }
}
