import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { prepareSignedTransactionAbstraction } from '../egld.utils'

export const egldKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, fromPrivateKey: string): Promise<string> {
      const transaction = JSON.parse(tx.serializedTransaction)

      return await prepareSignedTransactionAbstraction(transaction, undefined, fromPrivateKey)
    },
  }
}
