import { ApiServices, TransferXlmBlockchain } from '@tatumio/api-client'
import { Account, Asset, Keypair, Memo, Networks, Operation, TransactionBuilder } from 'stellar-sdk'
import { XlmSdkError } from '../xlm.sdk.errors'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

export const xlmTxService = () => {
  return {
    sendTransaction,
    prepareSignedTransaction,
  }
}

/**
 * Send Stellar transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param options mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
const sendTransaction = async (body: TransferXlmBlockchain, options?: { testnet: boolean }) => {
  return ApiServices.blockchain.xlm.xlmBroadcast({ txData: await prepareSignedTransaction(body, options) })
}

/**
 * Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param options mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
const prepareSignedTransaction = async (body: TransferXlmBlockchain, options?: { testnet: boolean }) => {
  try {
    const { fromSecret, to, amount, message, initialize } = body

    let memPhrase
    if (message) {
      memPhrase = message?.length > 28 ? Memo.hash(message) : Memo.text(message)
    }
    const memo = memPhrase
    const fromAccount = Keypair.fromSecret(fromSecret).publicKey()
    const account = await ApiServices.blockchain.xlm.xlmGetAccountInfo(fromAccount)

    if (!account?.sequence || typeof account.sequence !== 'string') {
      throw new XlmSdkError(SdkErrorCode.XLM_NO_SEQUENCE)
    }

    const builder = new TransactionBuilder(new Account(fromAccount, account.sequence), {
      fee: '100',
      networkPassphrase: options?.testnet ? Networks.TESTNET : Networks.PUBLIC,
      memo,
    }).setTimeout(300)

    const operation = initialize
      ? Operation.createAccount({
          destination: to.trim(),
          startingBalance: amount,
        })
      : Operation.payment({
          destination: to.trim(),
          asset: Asset.native(),
          amount,
        })

    const tx = builder.addOperation(operation).build()

    tx.sign(Keypair.fromSecret(fromSecret))
    return tx.toEnvelope().toXDR().toString('base64')
  } catch (e: any) {
    throw new XlmSdkError(e)
  }
}
