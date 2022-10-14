import { EvmBasedKMSServiceArgs } from '@tatumio/shared-blockchain-evm-based'
import { ChainTransactionKMS } from '@tatumio/shared-core'
import { PendingTransaction } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import BigNumber from 'bignumber.js'

export const xdcKmsService = (args: EvmBasedKMSServiceArgs) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string): Promise<string> {
      ;(tx as PendingTransaction).chain = 'XDC' as any
      const client = args.web3.getClient(provider)
      const transactionConfig = JSON.parse(tx.serializedTransaction)
      if (!transactionConfig.gas) {
        transactionConfig.gas = await client.eth.estimateGas({
          to: transactionConfig.to,
          data: transactionConfig.data,
        })
      }
      if (!transactionConfig.gasPrice || new BigNumber(transactionConfig.gasPrice).isZero()) {
        transactionConfig.gasPrice = await args.web3.getGasPriceInWei()
      }
      const signedTransaction = await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)
      // @TODO: resolve undefined result
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return signedTransaction.rawTransaction!
    },
  }
}
