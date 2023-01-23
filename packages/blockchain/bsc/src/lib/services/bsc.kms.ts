import { EvmBasedKMSServiceArgs, EvmBasedSdkError, evmBasedUtils } from '@tatumio/shared-blockchain-evm-based'
import { Currency, PendingTransaction } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const bscKmsService = (args: EvmBasedKMSServiceArgs) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, fromPrivateKey: string, provider?: string): Promise<string> {
      if (tx.chain !== Currency.BSC) {
        throw new EvmBasedSdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const client = args.web3.getClient(provider)
      const transactionConfig = JSON.parse(tx.serializedTransaction)

      if (!transactionConfig.gas) {
        transactionConfig.gas = await evmBasedUtils.estimateGasLimit({
          client,
          tx: {
            to: transactionConfig.to,
            data: transactionConfig.data,
          },
          fromPrivateKey,
        })
      }

      if (
        !transactionConfig.gasPrice ||
        transactionConfig.gasPrice === '0' ||
        transactionConfig.gasPrice === 0 ||
        transactionConfig.gasPrice === '0x0'
      ) {
        transactionConfig.gasPrice = await args.web3.getGasPriceInWei()
      }

      const signedTransaction = await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)

      // @TODO: resolve undefined result
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return signedTransaction.rawTransaction!
    },
  }
}
