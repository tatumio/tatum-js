import {
  OffChainAccountService,
  OffChainBlockchainService,
  OffChainWithdrawalService,
} from '@tatumio/api-client'

export const abstractSdkOffChain = () => {
  return {
    depositAddress: {
      create: OffChainAccountService.generateDepositAddress,
      createMultiple: OffChainAccountService.generateDepositAddressesBatch,
      checkExists: OffChainAccountService.addressExists,
      assign: OffChainAccountService.assignAddress,
      remove: OffChainAccountService.removeAddress,
      getByAccount: OffChainAccountService.getAllDepositAddresses,
    },
    withdrawal: {
      getAll: OffChainWithdrawalService.getWithdrawals,
      broadcast: OffChainWithdrawalService.broadcastBlockchainTransaction,
      create: OffChainWithdrawalService.storeWithdrawal,
      complete: OffChainWithdrawalService.completeWithdrawal,
    },
    storeTokenAddress: OffChainBlockchainService.storeTokenAddress,
  }
}
