import {
  BlockchainAddressesService,
  BlockchainOperationsService,
  WithdrawalService,
} from '@tatumio/api-client'

export const abstractSdkVirtualAccount = () => {
  return {
    depositAddress: {
      create: BlockchainAddressesService.generateDepositAddress,
      createMultiple: BlockchainAddressesService.generateDepositAddressesBatch,
      checkExists: BlockchainAddressesService.addressExists,
      assign: BlockchainAddressesService.assignAddress,
      remove: BlockchainAddressesService.removeAddress,
      getByAccount: BlockchainAddressesService.getAllDepositAddresses,
    },
    withdrawal: {
      getAll: WithdrawalService.getWithdrawals,
      broadcast: WithdrawalService.broadcastBlockchainTransaction,
      create: WithdrawalService.storeWithdrawal,
      complete: WithdrawalService.completeWithdrawal,
    },
    storeTokenAddress: BlockchainOperationsService.storeTokenAddress,
  }
}
