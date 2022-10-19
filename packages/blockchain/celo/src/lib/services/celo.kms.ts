import { EvmBasedWeb3 } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { celoUtils } from '../utils/celo.utils'
import { Currency, PendingTransaction } from '@tatumio/api-client'

export const celoKmsService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
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
      ;(tx as PendingTransaction).chain = Currency.CELO
      const p = new CeloProvider(
        provider || `${process.env.TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`,
      )
      await p.ready
      const wallet = new CeloWallet(fromPrivateKey, p)
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
