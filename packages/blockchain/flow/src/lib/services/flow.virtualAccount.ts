import { ApiServices, TransferFlowKMS, TransferFlowMnemonic, TransferFlowPK } from '@tatumio/api-client'
import {
  abstractBlockchainVirtualAccount,
  PrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'

type TransferVirtualAccountFlow = PrivateKeyOrSignatureId<TransferFlowPK>

export const virtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainVirtualAccount(args),
    /**
     * Send FLOW transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
     * This operation is irreversible.
     * @param body content of the transaction to broadcast
     * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
     */
    send: async (body: TransferVirtualAccountFlow) => {
      return ApiServices.offChain.blockchain.flowTransfer(
        body as TransferFlowMnemonic | TransferFlowPK | TransferFlowKMS,
      )
    },
  }
}
