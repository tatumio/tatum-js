import { Blockchain } from '@tatumio/shared-core'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { prepareSignedTransactionAbstraction } from '../egld.utils'
import { PendingTransaction } from '@tatumio/api-client'

export const egldKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, fromPrivateKey: string): Promise<string> {
      const transaction = JSON.parse(tx.serializedTransaction)

      return await prepareSignedTransactionAbstraction(transaction, undefined, fromPrivateKey)
    },
  }
}
