import { Blockchain, blockchainHelper, ChainTransactionKMS } from '@tatumio/shared-core'
import { PendingTransaction } from '@tatumio/api-client'
import { PrivateKey, Transaction } from 'bitcore-lib'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

export const btcBasedKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, privateKeys: string[]): Promise<string> {
      // @TODO why chain?
      const chain = blockchainHelper.getDefaultCurrencyByBlockchain(args.blockchain)

      const builder = new Transaction(JSON.parse(tx.serializedTransaction))
      for (const privateKey of privateKeys) {
        builder.sign(new PrivateKey(privateKey))
      }
      return builder.serialize()
    },
  }
}
