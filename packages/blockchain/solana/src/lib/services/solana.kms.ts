import { Blockchain, ChainTransactionKMS } from '@tatumio/shared-core'
import { Message, Transaction } from '@solana/web3.js'
import { SolanaWeb3 } from './solana.web3'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'

export const solanaKmsService = (args: { web3: SolanaWeb3; blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: ChainTransactionKMS, privateKeys: string[], provider?: string): Promise<string> {
      const connection = args.web3.getClient(provider)
      const { txData, mintPK } = JSON.parse(tx.serializedTransaction)
      const transaction = Transaction.populate(Message.from(Buffer.from(txData, 'hex')))
      transaction.recentBlockhash = undefined
      const signers = privateKeys.map(pk => args.web3.generateKeyPair(pk))
      if (mintPK) {
        signers.push(args.web3.generateKeyPair(mintPK))
      }
      const txId = await connection.sendTransaction(transaction, signers)
      await new Promise((r) => setTimeout(r, 10000))
      const confirmedTx = await connection.getConfirmedTransaction(txId, 'confirmed')
      if (confirmedTx && !confirmedTx.meta?.err) {
        return txId
      }
      throw new Error('Transaction not confirmed.')
    },
  }
}
