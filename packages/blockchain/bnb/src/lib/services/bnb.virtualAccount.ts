import {
  abstractBlockchainVirtualAccount,
  FromPrivateKeyOrSignatureId,
} from '@tatumio/shared-blockchain-abstract'
import { ApiServices, Currency, TransferBnb } from '@tatumio/api-client'
import { bnbTxService } from './bnb.tx'
import { BnbApiCallsType } from '@tatumio/bnb'
import { Blockchain } from '@tatumio/shared-core'
import { BnbWeb3 } from './bnb.web3'

type TransferBnbPkOrSignature = FromPrivateKeyOrSignatureId<TransferBnb>

export const bnbVirtualAccountService = (args: { web3: BnbWeb3 }, apiCalls: BnbApiCallsType) => {
  const txService = bnbTxService(args, apiCalls)

  /**
   * Send BNB transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
   * @param body content of the transaction to broadcast
   * @param testnet chain to work with
   * @returns transaction id of the transaction in the blockchain or id of the withdrawal
   */
  const sendTransactionFromVirtualAccountToBlockchain = async (
    testnet: boolean,
    body: TransferBnbPkOrSignature,
  ) => {
    const fee = '0.000075'

    const { id: withdrawalId } = await ApiServices.offChain.withdrawal.storeWithdrawal({ ...body, fee })

    try {
      const prepareTx = () =>
        txService.prepareTransaction(
          body.amount,
          body.address,
          Currency.BNB,
          body.fromPrivateKey as string,
          testnet,
        )

      if (body.signatureId) {
        return { signatureId: await prepareTx() }
      }

      let txData
      try {
        txData = await prepareTx()
      } catch (e) {
        console.log('Unable to prepare transaction, withdrawal cancelled.')
        throw e
      }

      try {
        const response = await ApiServices.offChain.withdrawal.broadcastBlockchainTransaction({
          txData,
          currency: Currency.BNB,
          withdrawalId,
        })
        return { txId: response.txId, id: withdrawalId, completed: !!response.completed }
      } catch (e) {
        console.log('Unable to broadcast transaction, withdrawal cancelled.')
        throw e
      }
    } catch (e) {
      console.log('Unable to perform offchain <> blockchain transaction.')
      throw e
    }
  }

  return {
    ...abstractBlockchainVirtualAccount({ blockchain: Blockchain.BNB }),
    sendTransactionFromVirtualAccountToBlockchain,
  }
}
