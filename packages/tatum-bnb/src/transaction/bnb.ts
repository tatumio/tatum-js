import { BncClient } from '@binance-chain/javascript-sdk'
import { getAddressFromPrivateKey } from '@binance-chain/javascript-sdk/lib/crypto'
import { TransactionKMS, Currency, ChainTransactionKMS } from '@tatumio/tatum-core'
import { fetAccount } from '../blockchain'

/**
 * Sign Bnb pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Bnb Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.BNB
  const bnbClient = new BncClient(
    provider ? provider : testnet ? 'https://testnet-dex-atlantic.binance.org' : 'https://dex-european.binance.org'
  )
  bnbClient.chooseNetwork(testnet ? 'testnet' : 'mainnet')
  await bnbClient.setPrivateKey(fromPrivateKey, true)
  await bnbClient.initChain()
  const fromAddress = getAddressFromPrivateKey(fromPrivateKey, testnet ? 'tbnb' : 'bnb')
  const account = await getAccount(fromAddress)
  bnbClient.setAccountNumber(account.account_number)
  const { msg, signMsg, memo } = JSON.parse(tx.serializedTransaction)
  msg.inputs = msg.inputs.map((i: any) => {
    i.address = Buffer.from(i.address.data)
    return i
  })
  msg.outputs = msg.outputs.map((i: any) => {
    i.address = Buffer.from(i.address.data)
    return i
  })
  const signedTx = await bnbClient._prepareTransaction(msg, signMsg, fromAddress, account.sequence, memo)
  return signedTx.serialize()
}
