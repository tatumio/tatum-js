import { Blockchain } from '@tatumio/shared-core'
import { ApiServices, Currency, TransferXlm, Withdrawal } from '@tatumio/api-client'
import { abstractBlockchainOffchain } from '@tatumio/shared-blockchain-abstract'
import { Account, Asset, Keypair, Memo, Networks, Operation, TransactionBuilder } from 'stellar-sdk'

export const xlmVirtualAccountService = (args: { blockchain: Blockchain }) => {
  return {
    ...abstractBlockchainOffchain(args),
    sendTransactionFromVirtualAccountToBlockchain,
    prepareTransactionFromVirtualAccountToBlockchain,
  }
}

export type TransferXlmOffchain = Pick<TransferXlm, 'secret'> & Withdrawal

/**
 * Send Stellar transaction from Tatum Ledger account to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain or id of the withdrawal, if it was not cancelled automatically
 */
export const sendTransactionFromVirtualAccountToBlockchain = async (
  testnet: boolean,
  body: TransferXlmOffchain,
) => {
  const { secret, ...withdrawal } = body
  if (!withdrawal.fee) {
    withdrawal.fee = '0.00001'
  }

  let memPhrase
  if (withdrawal.attr) {
    memPhrase = withdrawal.attr?.length > 28 ? Memo.hash(withdrawal.attr) : Memo.text(withdrawal.attr)
  }
  const memo = memPhrase

  const account = await ApiServices.blockchain.xlm.xlmGetAccountInfo(Keypair.fromSecret(secret).publicKey())
  const { id } = await ApiServices.offChain.withdrawal.storeWithdrawal(withdrawal)
  const { amount, address } = withdrawal

  let txData
  try {
    txData = await prepareTransactionFromVirtualAccountToBlockchain(
      testnet,
      account,
      amount,
      address,
      secret,
      memo,
    )
  } catch (e) {
    console.error(e)
    if (typeof id !== 'string') {
      console.log('Missing withdrawal ID')
      throw e
    }
    await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id)
    throw e
  }
  try {
    return {
      ...(await ApiServices.offChain.withdrawal.broadcastBlockchainTransaction({
        txData,
        withdrawalId: id,
        currency: Currency.XLM,
      })),
    }
  } catch (e) {
    console.error(e)
    try {
      if (typeof id !== 'string') {
        console.log('Missing withdrawal ID')
        throw e
      }
      await ApiServices.offChain.withdrawal.cancelInProgressWithdrawal(id)
    } catch (e1) {
      console.log(e)
      return { id }
    }
    throw e
  }
}

/**
 * Sign Stellar transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param account Stellar account with information
 * @param amount amount to send
 * @param address recipient address
 * @param secret secret to sign transaction with
 * @param memo short memo to include in transaction
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransactionFromVirtualAccountToBlockchain = async (
  testnet: boolean,
  account: any,
  amount: string,
  address: string,
  secret: string,
  memo?: Memo,
) => {
  const builder = new TransactionBuilder(new Account(account.account_id, account.sequence), {
    fee: '100',
    networkPassphrase: testnet ? Networks.TESTNET : Networks.PUBLIC,
    memo,
  }).setTimeout(300)

  const tx = builder
    .addOperation(
      Operation.payment({
        destination: address,
        asset: Asset.native(),
        amount,
      }),
    )
    .build()
  tx.sign(Keypair.fromSecret(secret))
  return tx.toEnvelope().toXDR().toString('base64')
}
