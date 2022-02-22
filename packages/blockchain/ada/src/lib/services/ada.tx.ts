import {
  hash_transaction,
  Transaction,
  TransactionWitnessSet,
  Vkeywitnesses,
} from '@emurgo/cardano-serialization-lib-nodejs'
import { AdaTransaction, BlockchainAdaService } from '@tatumio/api-client'
import { ChainTransactionKMS } from '@tatumio/shared-core'
import { adaUtils } from './ada.utils'

const transaction = async (transferAda: AdaTransaction) => {
  const txBuilder = await adaUtils.initTransactionBuilder()
  const { to } = transferAda

  const { privateKeysToSign, amount: fromAmount } = await adaUtils.addInputs(txBuilder, transferAda)
  const toAmount = adaUtils.addOutputs(txBuilder, to)
  await adaUtils.processFeeAndRest(txBuilder, fromAmount, toAmount, transferAda)

  return adaUtils.signTransaction(txBuilder, transferAda, privateKeysToSign)
}

export const adaTx = () => {
  return {
    prepare: {
      transaction: async (transferAda: AdaTransaction) => await transaction(transferAda),
    },
    send: {
      transaction: async (transferAda: AdaTransaction) =>
        BlockchainAdaService.adaBroadcast({
          txData: await transaction(transferAda),
        }),
    },

    signKMSTransaction: async (tx: ChainTransactionKMS, privateKeys: string[]) => {
      const transferAda = JSON.parse(tx.serializedTransaction).txData
      const txBuilder = await adaUtils.initTransactionBuilder()
      const { to } = transferAda

      const { amount: fromAmount } = await adaUtils.addInputs(txBuilder, transferAda)
      const toAmount = adaUtils.addOutputs(txBuilder, to)
      await adaUtils.processFeeAndRest(txBuilder, fromAmount, toAmount, transferAda)

      const txBody = txBuilder.build()
      const txHash = hash_transaction(txBody)

      const vKeyWitnesses = Vkeywitnesses.new()
      for (const key of privateKeys) {
        adaUtils.makeWitness(key, txHash, vKeyWitnesses)
      }
      const witnesses = TransactionWitnessSet.new()
      witnesses.set_vkeys(vKeyWitnesses)

      return Buffer.from(Transaction.new(txBody, witnesses).to_bytes()).toString('hex')
    },
  }
}
