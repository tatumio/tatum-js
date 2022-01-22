import { EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { ChainTransactionKMS, EvmBasedBlockchain } from '@tatumio/shared-core'
import { PendingTransaction, ApiServices } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

export const oneKmsService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> {
      // @TODO: probably bug in OpenAPI
      ;(tx as PendingTransaction).chain = 'ONE' as any
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

      const signedTransaction = await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)

      // TODO: handle undefined case
      return signedTransaction.rawTransaction!
    },
  }
}
