import { EvmBasedKMSServiceArgs } from '@tatumio/shared-blockchain-evm-based'
import { ChainTransactionKMS } from '@tatumio/shared-core'
import { PendingTransaction, ApiServices } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

export const ethKmsService = (args: EvmBasedKMSServiceArgs) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> {
      ;(tx as PendingTransaction).chain = PendingTransaction.chain.ETH
      const client = args.web3.getClient(provider)
      const transactionConfig = JSON.parse(tx.serializedTransaction)
      transactionConfig.gas = await client.eth.estimateGas(transactionConfig)
      if (!transactionConfig.nonce) {
        transactionConfig.nonce = await ApiServices.blockchain.eth.ethGetTransactionCount(
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
      return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string))
        .rawTransaction as string
    },
  }
}
