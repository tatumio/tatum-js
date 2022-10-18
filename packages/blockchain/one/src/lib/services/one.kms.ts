import { EvmBasedKMSServiceArgs, EvmBasedSdkError } from '@tatumio/shared-blockchain-evm-based'
import { ChainTransactionKMS } from '@tatumio/shared-core'
import { ApiServices, Currency, PendingTransaction } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const oneKmsService = (args: EvmBasedKMSServiceArgs) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> {
      const typedTx = tx as PendingTransaction
      if (typedTx.chain !== Currency.ONE) {
        throw new EvmBasedSdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const client = args.web3.getClient(provider)
      const transactionConfig = JSON.parse(tx.serializedTransaction)
      transactionConfig.gas = await client.eth.estimateGas(transactionConfig)

      if (!transactionConfig.nonce) {
        transactionConfig.nonce = await ApiServices.blockchain.one.oneGetTransactionCount(
          client.eth.defaultAccount as string,
        )
      }

      if (
        !transactionConfig.gasPrice ||
        transactionConfig.gasPrice === '0' ||
        transactionConfig.gasPrice === 0 ||
        transactionConfig.gasPrice === '0x0'
      ) {
        transactionConfig.gasPrice = await args.web3.getGasPriceInWei()
      }

      const signedTransaction = await client.eth.accounts.signTransaction(
        transactionConfig,
        fromPrivateKey as string,
      )

      // TODO: handle undefined case
      return signedTransaction.rawTransaction!
    },
  }
}
