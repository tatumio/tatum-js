import { Currency, PendingTransaction } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { tronWeb } from './tron.web'
import { EvmBasedSdkError } from '@tatumio/shared-blockchain-evm-based'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { Blockchain } from '@tatumio/shared-core'

export const tronKmsService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    /**
     * Sign pending transaction from Tatum KMS
     * @param tx pending transaction from KMS
     * @param fromPrivateKey private key to sign transaction with.
     * @param provider url of the blockchain server to connect to. If not set, default public server will be used.
     * @returns transaction data to be broadcast to blockchain.
     */
    async sign(tx: PendingTransaction, fromPrivateKey: string, provider?: string): Promise<string> {
      if (tx.chain !== Currency.TRON) {
        throw new EvmBasedSdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const client = tronWeb().getClient(provider)
      const transactionConfig = JSON.parse(tx.serializedTransaction)
      transactionConfig.nonce = await client.wallet().nonce
      return JSON.stringify(await client.trx.sign(transactionConfig, fromPrivateKey))
    },
  }
}
