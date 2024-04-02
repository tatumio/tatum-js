import { Blockchain } from '@tatumio/shared-core'
import { Message, Transaction } from '@solana/web3.js'
import { SolanaWeb3 } from './solana.web3'
import { abstractBlockchainKms } from '@tatumio/shared-blockchain-abstract'
import { Currency, PendingTransaction } from '@tatumio/api-client'
import { SdkError, SdkErrorCode } from '@tatumio/shared-abstract-sdk'
import { solanaUtils } from '@tatumio/solana'

export const solanaKmsService = (args: { web3: SolanaWeb3; blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainKms(args),
    async sign(tx: PendingTransaction, privateKeys: string[], provider?: string): Promise<string> {
      if (tx.chain !== Currency.SOL) {
        throw new SdkError({ code: SdkErrorCode.KMS_CHAIN_MISMATCH })
      }
      const connection = args.web3.getClient(provider)
      const { txData, mintPK } = JSON.parse(tx.serializedTransaction)
      const transaction = Transaction.populate(Message.from(Buffer.from(txData, 'hex')))
      transaction.recentBlockhash = undefined
      const signers = privateKeys.map((pk) => args.web3.generateKeyPair(pk))
      if (mintPK) {
        signers.push(args.web3.generateKeyPair(mintPK))
      }
      const { txId } = await solanaUtils.sendTransactionWithConfirm(connection, transaction, signers)
      return txId
    },
  }
}
