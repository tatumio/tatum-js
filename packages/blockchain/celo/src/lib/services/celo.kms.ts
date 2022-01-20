import { EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { ChainTransactionKMS, EvmBasedBlockchain } from '@tatumio/shared-core'
import { PendingTransaction, ApiServices } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

export const celoKmsService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    ...abstractBlockchainKms(args),
    // async sign(tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> {
    //   // @TODO: probably bug in OpenAPI
    //   ;(tx as PendingTransaction).chain = 'CELO' as any

    //   const client = args.web3.getClient(provider, fromPrivateKey)
    //   const transactionConfig = JSON.parse(tx.serializedTransaction)
    //   transactionConfig.gas = await client.eth.estimateGas(transactionConfig)

    //   if (!transactionConfig.nonce) {
    //     transactionConfig.nonce = await ApiServices.blockchain.eth.ethGetTransactionCount(
    //       client.eth.defaultAccount as string,
    //     )
    //   }
    //   if (
    //     !transactionConfig.gasPrice ||
    //     transactionConfig.gasPrice === '0' ||
    //     transactionConfig.gasPrice === 0 ||
    //     transactionConfig.gasPrice === '0x0'
    //   ) {
    //     transactionConfig.gasPrice = await args.web3.getGasPriceInWei()
    //   }
    //   return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string))
    //     .rawTransaction as string
    // export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
    //   ;(tx as TransactionKMS).chain = Currency.CELO
    //   const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
    //   await p.ready
    //   const wallet = new CeloWallet(fromPrivateKey as string, p)
    //   const transaction = JSON.parse(tx.serializedTransaction)
    //   const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, transaction.feeCurrency)
    //   transaction.nonce = transaction.nonce || txCount
    //   transaction.gasPrice = transaction.gasPrice || gasPrice
    //   transaction.from = from
    //   transaction.gasLimit =
    //     transaction.gasLimit === '0' || !transaction.gasLimit
    //       ? (await wallet.estimateGas(transaction)).add(100000).toHexString()
    //       : transaction.gasLimit
    //   return wallet.signTransaction(transaction)
    // }
    // },
  }
}

