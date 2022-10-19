import { EvmBasedKMSServiceArgs, EvmBasedSdkError } from '@tatumio/shared-blockchain-evm-based'
import { Currency, PendingTransaction } from '@tatumio/api-client'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { BigNumber } from 'ethers'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const polygonKmsService = (args: EvmBasedKMSServiceArgs) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, fromPrivateKey: string, provider?: string): Promise<string> {
      if (tx.chain !== Currency.MATIC) {
        throw new EvmBasedSdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const client = args.web3.getClient(provider, fromPrivateKey)
      const transactionConfig = JSON.parse(tx.serializedTransaction)

      if (!transactionConfig.gas) {
        transactionConfig.gas = await client.eth.estimateGas({
          to: transactionConfig.to,
          data: transactionConfig.data,
        })
      }

      if (!transactionConfig.gasPrice || BigNumber.from(transactionConfig.gasPrice).isZero()) {
        transactionConfig.gasPrice = await args.web3.getGasPriceInWei()
      }

      const signedTransaction = await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)

      // @TODO: resolve undefined result
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return signedTransaction.rawTransaction!
    },
  }
}
