import { ApiServices, TransferAdaKeyPair, TransferAdaKMS, TransferAdaMnemonic } from '@tatumio/api-client'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

export const virtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    send: async (body: TransferAdaKeyPair | TransferAdaKMS | TransferAdaMnemonic) => ApiServices.virtualAccount.blockchain.adaTransferOffchain(body),
  }
}