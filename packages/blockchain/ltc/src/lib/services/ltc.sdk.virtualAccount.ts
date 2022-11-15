import { ApiServices, TransferLtcKeyPair, TransferLtcKMS, TransferLtcMnemonic } from '@tatumio/api-client'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

export const ltcVirtualAccountService = () => {
  return {
    ...abstractBlockchainVirtualAccount({ blockchain: Blockchain.LTC }),
    send: async (body: TransferLtcMnemonic | TransferLtcKeyPair | TransferLtcKMS) =>
      ApiServices.virtualAccount.blockchain.ltcTransfer(body),
  }
}
