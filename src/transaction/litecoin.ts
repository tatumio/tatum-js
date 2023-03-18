import BigNumber from 'bignumber.js'
// @ts-ignore
import { PrivateKey, Script, Transaction } from 'bitcore-lib-ltc'
import { ltcBroadcast, ltcGetTransaction, ltcGetTxForAccount, ltcGetUTXO } from '../blockchain'
import { validateBody } from '../connector/tatum'
import { Currency, LtcTxOutputs, TransactionKMS } from '../model'
import { TransferBtcLtcBlockchain } from '../model/request/TransferBtcLtcBlockchain';

/**
 * Prepare a signed Ltc transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
const prepareSignedTransaction = async (body: TransferBtcLtcBlockchain) => {
  await validateBody(body, TransferBtcLtcBlockchain)
  const { fromUTXO, fromAddress, to } = body
  const tx = new Transaction()

  const privateKeysToSign = []
  if (fromAddress) {
    for (const item of fromAddress) {
      const txs = await ltcGetTxForAccount(item.address)
      for (const t of txs) {
        for (const [i, o] of (t.outputs as LtcTxOutputs[]).entries()) {
          if (o.address !== item.address) {
            continue
          }
          try {
            await ltcGetUTXO(t.hash, i)
            tx.from({
              txId: t.hash,
              outputIndex: i,
              script: Script.fromAddress(item.address).toString(),
              satoshis: Number(new BigNumber(o.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
            })
            privateKeysToSign.push(item.signatureId || item.privateKey)
          } catch (e) {
            console.error(e.toString())
          }
        }
      }
    }
  } else if (fromUTXO) {
    for (const item of fromUTXO) {
      const t = await ltcGetTransaction(item.txHash)
      const address = t.outputs ? t.outputs[item.index].address : t.vout?.[item.index].scriptPubKey.addresses[0]
      const value = t.outputs ? t.outputs[item.index].value : t.vout?.[item.index].value || 0
      tx.from({
        txId: item.txHash,
        outputIndex: item.index,
        script: Script.fromAddress(address).toString(),
        satoshis: Number(new BigNumber(value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)),
      })
      privateKeysToSign.push(item.signatureId || item.privateKey)
    }
  }
  for (const item of to) {
    tx.to(item.address, Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
  }

  if (body.changeAddress && body.fee) {
    tx.change(body.changeAddress)
    tx.fee(Number(new BigNumber(body.fee).multipliedBy(100000000).toFixed(8, BigNumber.ROUND_FLOOR)))
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
 * Sign Litecoin pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param privateKeys private keys to sign transaction with.
 * @param testnet mainnet or testnet version
 * @returns transaction data to be broadcast to blockchain.
 */
export const signLitecoinKMSTransaction = async (tx: TransactionKMS, privateKeys: string[], testnet: boolean) => {
  if (tx.chain !== Currency.LTC) {
    throw Error('Unsupported chain.')
  }
  const builder = new Transaction(JSON.parse(tx.serializedTransaction))
  for (const privateKey of privateKeys) {
    builder.sign(PrivateKey.fromWIF(privateKey))
  }
  return builder.serialize(true)
}

/**
 * Sign Litcoin transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareLitecoinSignedTransaction = async (testnet: boolean, body: TransferBtcLtcBlockchain) => {
  return prepareSignedTransaction(body)
}

/**
 * Send Litecoin transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendLitecoinTransaction = async (testnet: boolean, body: TransferBtcLtcBlockchain) => {
  return ltcBroadcast(await prepareLitecoinSignedTransaction(testnet, body))
}
