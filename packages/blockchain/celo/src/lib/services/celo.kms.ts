import { EvmBasedKMSServiceArgs, EvmBasedSdkError } from '@tatumio/shared-blockchain-evm-based'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { celoUtils } from '../utils/celo.utils'
import { Currency, PendingTransaction } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const celoKmsService = (args: EvmBasedKMSServiceArgs) => {
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
      if (tx.chain !== Currency.CELO) {
        throw new EvmBasedSdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const client = args.web3.getClient(provider)
      const wallet = new CeloWallet(fromPrivateKey, client.givenProvider())
      const transaction = JSON.parse(tx.serializedTransaction)
      const { txCount, gasPrice, from } = await celoUtils.obtainWalletInformation(
        wallet,
        transaction.feeCurrency,
      )
      transaction.nonce = transaction.nonce || txCount
      transaction.gasPrice = transaction.gasPrice || gasPrice
      transaction.from = from
      transaction.gasLimit =
        transaction.gasLimit === '0' || !transaction.gasLimit
          ? (await wallet.estimateGas(transaction)).add(100000).toHexString()
          : transaction.gasLimit
      return wallet.signTransaction(transaction)
    },
  }
}
