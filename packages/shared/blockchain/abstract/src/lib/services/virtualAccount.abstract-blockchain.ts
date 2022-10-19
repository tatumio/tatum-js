import { abstractSdkVirtualAccount } from '@tatumio/shared-abstract-sdk'
import { Blockchain, blockchainHelper } from '@tatumio/shared-core'

export const abstractBlockchainVirtualAccount = (args: { blockchain: Blockchain }) => {
  const superObject = abstractSdkVirtualAccount()

  return {
    ...superObject,
    depositAddress: {
      ...superObject.depositAddress,
      checkExists: async (address: string, index?: number) =>
        superObject.depositAddress.checkExists(
          blockchainHelper.getDefaultCurrencyByBlockchain(args.blockchain),
          address,
          index,
        ),
    },
    withdrawal: {
      ...superObject.withdrawal,
      getAll: async (status?: 'InProgress' | 'Done' | 'Cancelled', pageSize = 50, offset = 0) =>
        superObject.withdrawal.getAll(
          pageSize,
          blockchainHelper.getDefaultCurrencyByBlockchain(args.blockchain),
          status,
          offset,
        ),
    },
  }
}
