import { ApiServices, TransferCelo, TransferCeloKMS, TransferCeloMnemonic } from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

type TransferVirtualAccountCelo = PrivateKeyOrSignatureId<TransferCelo>

export const virtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    /**
     * Send CELO transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountCelo) => {
      return ApiServices.offChain.blockchain.celoOrErc20Transfer(
        body as TransferCelo | TransferCeloMnemonic | TransferCeloKMS,
      )
    },
  }
}
