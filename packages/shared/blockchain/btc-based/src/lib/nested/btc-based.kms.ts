import { Blockchain } from '@tatumio/shared-core'
import { PrivateKey, Transaction } from 'bitcore-lib'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { PendingTransaction } from '@tatumio/api-client'

export const btcBasedKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, privateKeys: string[]): Promise<string> {
      const builder = new Transaction(JSON.parse(tx.serializedTransaction))
      for (const privateKey of privateKeys) {
        builder.sign(new PrivateKey(privateKey))
      }
      return builder.serialize()
    },
  }
}
