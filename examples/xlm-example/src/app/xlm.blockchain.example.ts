import { TatumXlmSDK } from '@tatumio/xlm'

export async function xlmBlockchainExample() {
  const xlmSDK = TatumXlmSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Get current latest ledger number
  const currentLedger = await xlmSDK.blockchain.info()
  console.log(currentLedger)

  // Get current fee applied to transactions
  const fee = await xlmSDK.blockchain.getFee()
  console.log(fee)

  // Get details of a specific ledger
  const ledger = await xlmSDK.blockchain.getLedger('123456')
  console.log(ledger)

  // Get list of all transctions in the specific ledger
  const ledgerTxs = await xlmSDK.blockchain.getLedgerTx('123456')
  console.log(ledgerTxs)

  // Get details of a specific transaction
  const transaction = await xlmSDK.blockchain.getTransaction(
    '749e4f8933221b9942ef38a02856803f379789ec8d971f1f60535db70135673e',
  )
  console.log(transaction)
}
