import { CustodialManagedWalletsService } from '@tatumio/api-client'

export const abstractSdkCustodialManagedWallets = () => {
  return {
    transfer: CustodialManagedWalletsService.custodialTransferManagedAddress,
    getAll: CustodialManagedWalletsService.custodialGetWallets,
    create: CustodialManagedWalletsService.custodialCreateWallet,
    delete: CustodialManagedWalletsService.custodialDeleteWallet,
    get: CustodialManagedWalletsService.custodialGetWallet,
  }
}
