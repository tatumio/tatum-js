import { TatumXlmSDK } from '@tatumio/xlm'

export async function xlmBlockchainExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get current latest ledger number
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetLastClosedLedger
  const currentLedger = await xlmSDK.blockchain.info()
  console.log('Current ledger:', currentLedger)

  // Get current fee applied to transactions
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetFee
  const fee = await xlmSDK.blockchain.getFee()
  console.log('Fee:', fee)

  // Get details of a specific ledger
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetLedger
  const ledger = await xlmSDK.blockchain.getLedger('123456')
  console.log('Ledger details:', ledger)

  // Get list of all transactions in the specific ledger
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetLedgerTx
  const ledgerTxs = await xlmSDK.blockchain.getLedgerTx('123456')
  console.log('Ledger transactions:', ledgerTxs)

  // Get details of a specific transaction
  // https://apidoc.tatum.io/tag/Stellar#operation/XlmGetTransaction
  const transaction = await xlmSDK.blockchain.getTransaction(ledgerTxs[0].hash ?? '')
  console.log('Transaction details:', transaction)
}
