import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { adaTx } from './ada.tx'

export const adaKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, privateKeys: string[]): Promise<string> {
      return adaTx().signKMSTransaction(tx, privateKeys)
    },
  }
}
