import { KeyManagementSystemService } from '@tatumio/api-client'

export const abstractSdkKms = () => {
  return {
    get: KeyManagementSystemService.getPendingTransactionToSign,
    complete: KeyManagementSystemService.completePendingSignature,
    delete: KeyManagementSystemService.deletePendingTransactionToSign,
  }
}
