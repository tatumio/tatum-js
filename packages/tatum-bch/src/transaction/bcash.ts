import { ChainTransactionKMS, Currency, TransactionKMS, validateBody } from '@tatumio/tatum-core'
import BigNumber from 'bignumber.js'
// @ts-ignore
import coininfo from 'coininfo'
import { broadcast, getTransaction } from '../blockchain'
import { toLegacyAddress } from '../wallet'
import { BchTx, TransferBchBlockchain } from '../model'

const {
  ECSignature,
  Transaction,
  ECPair,
  TransactionBuilder,
  // tslint:disable-next-line:no-var-requires
} = require('@tatumio/bitcoincashjs2-lib')

const getAddress = (address: string) => {
  try {
    return toLegacyAddress(address)
  } catch (e) {
    return address
  }
}

/**
 * Send Bitcoin Cash transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransaction = async (testnet: boolean, body: TransferBchBlockchain) => {
  return broadcast(await prepareSignedTransaction(testnet, body))
}

/**
 * Sign Bitcoin Cash pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, privateKeys: string[], testnet: boolean) => {
  ;(tx as TransactionKMS).chain = Currency.BCH
  const [data, amountsToDecode] = tx.serializedTransaction.split(':')
  const transaction = Transaction.fromHex(data)
  const amountsToSign = JSON.parse(amountsToDecode)
  const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
  const builder = TransactionBuilder.fromTransaction(transaction, network)
  for (const [i, privateKey] of privateKeys.entries()) {
    const ecPair = ECPair.fromWIF(privateKey, network)
    builder.sign(i, ecPair, undefined, 0x01, amountsToSign[i], undefined, ECSignature.SCHNORR)
  }
  return builder.build().toHex()
}

/**
 * Sign Bitcoin Cash transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedTransaction = async (testnet: boolean, body: TransferBchBlockchain) => {
  await validateBody(body, TransferBchBlockchain)
  const { fromUTXO, to } = body
  const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
  const transactionBuilder = new TransactionBuilder(network)
  const privateKeysToSign = []
  const amountToSign: number[] = []
  const txs = await getTransactions(fromUTXO.map((u) => u.txHash))
  for (const [i, item] of fromUTXO.entries()) {
    transactionBuilder.addInput(item.txHash, item.index, 0xffffffff, null)
    privateKeysToSign.push(item.privateKey)
    amountToSign.push(Number(new BigNumber(txs[i].vout[item.index].value).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)))
  }
  for (const item of to) {
    transactionBuilder.addOutput(
      getAddress(item.address),
      Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR))
    )
  }

  for (let i = 0; i < privateKeysToSign.length; i++) {
    const ecPair = ECPair.fromWIF(privateKeysToSign[i], network)
    transactionBuilder.sign(i, ecPair, undefined, 0x01, amountToSign[i], undefined, ECSignature.SCHNORR)
  }
  return transactionBuilder.build().toHex()
}

const getTransactions = async (txHash: string[]): Promise<BchTx[]> => {
  const result = []
  for (const tx of txHash) {
    result.push(getTransaction(tx))
  }
  return await Promise.all(result)
}
