import { ApiServices, TransferLtcKeyPair, TransferLtcKMS, TransferLtcMnemonic } from '@tatumio/api-client'
import { abstractBlockchainVirtualAccount } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

export const virtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    send: async (body: TransferLtcMnemonic | TransferLtcKeyPair | TransferLtcKMS) =>
      ApiServices.offChain.blockchain.ltcTransfer(body),
  }
}
