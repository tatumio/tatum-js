import { EvmBasedKMSServiceArgs, EvmBasedSdkError, evmBasedUtils } from '@tatumio/shared-blockchain-evm-based'
import { ApiServices, Currency, PendingTransaction } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const oneKmsService = (args: EvmBasedKMSServiceArgs) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, fromPrivateKey: string, provider?: string): Promise<string> {
      if (tx.chain !== Currency.ONE) {
        throw new EvmBasedSdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const client = args.web3.getClient(provider)
      const transactionConfig = JSON.parse(tx.serializedTransaction)

      if (!transactionConfig.gas) {
        transactionConfig.gas = await evmBasedUtils.estimateGasLimit({
          client,
          tx: transactionConfig,
          fromPrivateKey,
        })
      }

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
