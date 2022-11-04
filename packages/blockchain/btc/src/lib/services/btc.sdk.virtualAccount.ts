import { ApiServices, TransferBtcKeyPair, TransferBtcKMS, TransferBtcMnemonic } from '@tatumio/api-client'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

export const btcVirtualAccountService = () => {
  return {
    ...abstractBlockchainVirtualAccount({ blockchain: Blockchain.BTC }),
    send: async (body: TransferBtcMnemonic | TransferBtcKeyPair | TransferBtcKMS) =>
      ApiServices.offChain.blockchain.btcTransfer(body),
  }
}
