import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { Blockchain } from '@tatumio/shared-core'
import { Currency, PendingTransaction } from '@tatumio/api-client'

import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { XrpSdkError } from '../xrp.sdk.errors'
import { Payment, Wallet } from 'xrpl'

export const xrpKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    /**
     * Sign Xrp pending transaction from Tatum KMS
     * @param tx pending transaction from KMS
     * @param secret secret key to sign transaction with.
     * @returns transaction data to be broadcast to blockchain.
     */
    async sign(tx: PendingTransaction, secret: string) {
      if (tx.chain !== Currency.XRP) {
        throw new XrpSdkError(SdkErrorCode.KMS_CHAIN_MISMATCH)
      }
      const wallet = Wallet.fromSeed(secret)

      const parsedTx: Payment = JSON.parse(tx.serializedTransaction)

      const { tx_blob } = wallet.sign(parsedTx)
      return tx_blob
    },
  }
}
