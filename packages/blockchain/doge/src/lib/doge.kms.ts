// @ts-ignore
import { PrivateKey, Transaction } from 'bitcore-lib-doge'
import { Blockchain } from '@tatumio/shared-core'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { Currency, PendingTransaction } from '@tatumio/api-client'
import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const dogeKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, privateKeys: string[]): Promise<string> {
      if (tx.chain !== Currency.DOGE) {
        throw new SdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const builder = new Transaction(JSON.parse(tx.serializedTransaction))
      for (const privateKey of privateKeys) {
        builder.sign(PrivateKey.fromWIF(privateKey))
      }
      return builder.serialize()
    },
  }
}
