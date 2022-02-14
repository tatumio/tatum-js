import { EvmBasedKMSServiceArgs } from '@tatumio/shared-blockchain-evm-based'
import { ChainTransactionKMS } from '@tatumio/shared-core'
import { PendingTransaction } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

export const klaytnKmsService = (args: EvmBasedKMSServiceArgs) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> {
      // @TODO: probably bug in OpenAPI
      ;(tx as PendingTransaction).chain = 'KLAY' as any
      const client = args.web3.getClient(provider)
      const transactionConfig = JSON.parse(tx.serializedTransaction)

      if (!transactionConfig.gas) {
        transactionConfig.gas = await client.eth.estimateGas({
          to: transactionConfig.to,
          data: transactionConfig.data,
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
