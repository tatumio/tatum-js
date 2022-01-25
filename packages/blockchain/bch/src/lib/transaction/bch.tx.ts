import BigNumber from 'bignumber.js'
import {
  ApiServices,
  BchTransaction,
  BchTransactionKMS,
  BchTx,
  TransactionHashKMS,
} from '@tatumio/api-client'
import {
  ECSignature,
  ECPair,
  TransactionBuilder,
  // @ts-ignore
} from '@tatumio/bitcoincashjs2-lib'
// @ts-ignore
import coininfo from 'coininfo'
import { bcashAddressHelper } from '../utils/address'

type BchTransactionBody = BchTransaction | BchTransactionKMS

const sendTransaction = async (testnet: boolean, body: BchTransactionBody): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.bcash.bchBroadcast({
    txData: await prepareSignedTransaction(testnet, body),
  })
}

const prepareSignedTransaction = async (testnet: boolean, body: BchTransactionBody): Promise<string> => {
  const network = testnet ? coininfo.bitcoincash.test.toBitcoinJS() : coininfo.bitcoincash.main.toBitcoinJS()
  const transactionBuilder = new TransactionBuilder(network)
  const privateKeysToSign = []
  const amountToSign: number[] = []
  const txs = await getTransactions(body.fromUTXO.map((u) => u.txHash))

  for (const [i, item] of body.fromUTXO.entries()) {
    transactionBuilder.addInput(item.txHash, item.index, 0xffffffff, null)
    if ('signatureId' in item) privateKeysToSign.push(item.signatureId)
    else if ('privateKey' in item) privateKeysToSign.push(item.privateKey)
    amountToSign.push(
      Number(
        new BigNumber(txs[i].vout![item.index].value!)
          .multipliedBy(100000000)
          .toFixed(0, BigNumber.ROUND_FLOOR),
      ),
    )

    const fromUTXO = body.fromUTXO
    if (fromUTXO && 'signatureId' in fromUTXO[0] && fromUTXO[0].signatureId) {
      return JSON.stringify({ txData: JSON.stringify(txs[i]), privateKeysToSign })
    }
  }

  body.to.forEach((item) => {
    transactionBuilder.addOutput(
      bcashAddressHelper.getAddress(item.address),
      Number(new BigNumber(item.value).multipliedBy(100000000).toFixed(0, BigNumber.ROUND_FLOOR)),
    )
  })

  for (let i = 0; i < privateKeysToSign.length; i++) {
    const ecPair = ECPair.fromWIF(privateKeysToSign[i], network)
    transactionBuilder.sign(i, ecPair, undefined, 0x01, amountToSign[i], undefined, ECSignature.SCHNORR)
  }
  return transactionBuilder.build().toHex()
}

const getTransactions = async (txHash: string[]): Promise<BchTx[]> => {
  const result = []
  for (const tx of txHash) {
    result.push(ApiServices.blockchain.bcash.bchGetRawTransaction(tx))
  }
  return await Promise.all(result)
}

export const bchTransactions = () => ({
  sendTransaction,
  prepareSignedTransaction,
})
