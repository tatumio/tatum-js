import { ApiServices, TransferDogeKeyPair, TransferDogeKMS, TransferDogeMnemonic } from '@tatumio/api-client'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

export const virtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    send: async (body: TransferDogeMnemonic | TransferDogeKeyPair | TransferDogeKMS) =>
      ApiServices.virtualAccount.blockchain.dogeTransfer(body),
  }
}
