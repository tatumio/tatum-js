import { ApiServices, TransferBchKeyPair, TransferBchKMS, TransferBchMnemonic } from '@tatumio/api-client'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

export const virtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    send: async (body: (TransferBchMnemonic | TransferBchKeyPair | TransferBchKMS)) => 
      ApiServices.offChain.blockchain.bchTransfer(body)
  }
}