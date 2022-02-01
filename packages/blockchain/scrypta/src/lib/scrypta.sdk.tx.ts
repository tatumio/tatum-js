import { BtcBasedTx } from '@tatumio/shared-blockchain-btc-based'
import { ApiServices, ScryptaTransaction, TransactionHashKMS } from '@tatumio/api-client'
import { ECPair, TransactionBuilder } from 'bitcoinjs-lib'
import { amountUtils } from '@tatumio/shared-abstract-sdk'
import { Blockchain, getNetworkConfig } from '@tatumio/shared-core'

const sendTransaction = async (
  body: ScryptaTransaction,
  options: { testnet: boolean },
): Promise<TransactionHashKMS> => {
  return ApiServices.blockchain.scrypta.broadcastsignedScryptatransaction({
    txData: await prepareSignedTransaction(body, options),
  })
}

const prepareSignedTransaction = async (body: ScryptaTransaction, options: { testnet: boolean }) => {
  const network = getNetworkConfig(Blockchain.SCRYPTA, options)
  const { fromUTXO, fromAddress, to } = body
  const tx = new TransactionBuilder(network)
  const privateKeysToSign = []
  tx.setVersion(1)

  if (fromAddress) {
    await privateKeysFromAddress(fromAddress, tx, privateKeysToSign)
  } else if (fromUTXO) {
    privateKeysFromUTXO(fromUTXO, tx, privateKeysToSign)
  }

  for (const item of to) {
    tx.addOutput(item.address, amountUtils.toSatoshis(item.value))
  }

  for (let i = 0; i < privateKeysToSign.length; i++) {
    const ecPair = ECPair.fromWIF(privateKeysToSign[i], network)
    tx.sign(i, ecPair)
  }
  return tx.build().toHex()
}

async function privateKeysFromAddress(
  fromAddress: Array<{ signatureId?: string; address: string; privateKey?: string }>,
  tx: TransactionBuilder,
  privateKeysToSign: any[],
) {
  for (const item of fromAddress) {
    const txs = await ApiServices.blockchain.scrypta.getScryptaspendableUtxo(50, 0, item.address)
    for (const t of txs) {
      try {
        tx.addInput(t.txid, t.vout)
        if (item.privateKey) {
          privateKeysToSign.push(item.privateKey)
        }
      } catch (e) {
        console.error(e.toString())
      }
    }
  }
}

function privateKeysFromUTXO(
  fromUTXO: Array<{ txHash: string; index: string; privateKey?: string; signatureId?: string }>,
  tx: TransactionBuilder,
  privateKeysToSign: any[],
) {
  for (const item of fromUTXO) {
    tx.addInput(item.txHash, Number(item.index))
    if (item.privateKey) {
      privateKeysToSign.push(item.privateKey)
    }
  }
}

export const scryptaTransactions = (): BtcBasedTx<ScryptaTransaction> => ({
  /**
   * Send Scrypta transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
   * This operation is irreversible.
   * @param body content of the transaction to broadcast
   * @returns transaction id of the transaction in the blockchain
   */
  sendTransaction,
  /**
   * Prepare a signed Scrypta transaction with the private key locally. Nothing is broadcasted to the blockchain.
   * @returns raw transaction data in hex, to be broadcasted to blockchain.
   */
  prepareSignedTransaction,
})
