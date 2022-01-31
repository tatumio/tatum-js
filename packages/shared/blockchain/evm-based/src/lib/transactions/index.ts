import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { EvmBasedWeb3 } from '../services/evm-based.web3'

export const prepareSignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  signatureId: string | undefined,
  fromPrivateKey: string | undefined,
  web3: EvmBasedWeb3,
  gasLimit?: string,
  gasPrice?: string,
) => {
  const gasPriceDefined = gasPrice ? client.utils.toWei(gasPrice, 'gwei') : await web3.getGasPriceInWei()
  const tx = {
    ...transaction,
    gasPrice: gasPriceDefined,
  }

  tx.gas = gasLimit ?? (await client.eth.estimateGas(tx))

  if (signatureId) {
    return JSON.stringify(tx)
  }

  const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

  return signedTransaction.rawTransaction
}
