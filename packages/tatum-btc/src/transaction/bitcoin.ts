import BigNumber from 'bignumber.js'
// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib'
import { broadcast, getTransaction, getTxForAccount, getUTXO } from '../blockchain'
import { validateBody, Currency, TransactionKMS, ChainTransactionKMS } from '@tatumio/tatum-core'
import { BtcTxOutputs } from '../model'
import { TransferBtcBasedBlockchain } from '@tatumio/tatum-core'

/**
 * Prepare a signed Btc transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
const prepareBlockchainSignedTransaction = async (body: TransferBtcBasedBlockchain) => {
  await validateBody(body, TransferBtcBasedBlockchain)
  const { fromUTXO, fromAddress, to } = body
  const tx = new Transaction()
  const privateKeysToSign = []
  if (fromAddress) {
    for (const item of fromAddress) {
      const txs = await getTxForAccount(item.address)
      for (const t of txs) {
        for (const [i, o] of (t.outputs as BtcTxOutputs[]).entries()) {
          if (o.address !== item.address) {
            continue
          }
          try {
            await getUTXO(t.hash, i)
            tx.from({
              txId: t.hash,
              outputIndex: i,
              script: Script.fromAddress(item.address).toString(),
              satoshis: o.value,
            })
            privateKeysToSign.push(item.signatureId || item.privateKey)
          } catch (e: any) {
            console.error(e.toString())
          }
        }
      }
    }
  } else if (fromUTXO) {
    for (const item of fromUTXO) {
      const t = await getTransaction(item.txHash)
      const address = t.outputs ? t.outputs[item.index].address : t.vout?.[item.index].scriptPubKey.addresses[0]
      const value = t.outputs
        ? t.outputs[item.index].value
        : Number(new BigNumber(t.vout?.[item.index].value || 0).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR))
      tx.from({
        txId: item.txHash,
        outputIndex: item.index,
        script: Script.fromAddress(address).toString(),
        satoshis: value,
      })
      privateKeysToSign.push(item.signatureId || item.privateKey)
    }
  }
  for (const item of to) {
    tx.to(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
  }

  if ((fromAddress && fromAddress[0].signatureId) || (fromUTXO && fromUTXO[0].signatureId)) {
    return JSON.stringify({ txData: JSON.stringify(tx), privateKeysToSign })
  }

  for (const item of privateKeysToSign) {
    tx.sign(PrivateKey.fromWIF(item))
  }
  return tx.serialize(true)
}

/**
 * Sign Bitcoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, privateKeys: string[]) => {
  ;(tx as TransactionKMS).chain = Currency.BTC
  const builder = new Transaction(JSON.parse(tx.serializedTransaction))
  for (const privateKey of privateKeys) {
    builder.sign(PrivateKey.fromWIF(privateKey))
  }
  return builder.serialize(true)
}

/**
 * Sign Bitcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedTransaction = async (body: TransferBtcBasedBlockchain) => {
  return prepareBlockchainSignedTransaction(body)
}

/**
 * Send Bitcoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransaction = async (body: TransferBtcBasedBlockchain) => {
  return broadcast(await prepareSignedTransaction(body))
}
