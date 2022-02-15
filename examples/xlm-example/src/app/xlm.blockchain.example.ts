import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmBlockchainExample() {
  const account = await xlmSDK.blockchain.getAccountInfo(
    'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
  )

  const broadcastTxId = await xlmSDK.blockchain.broadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
  })

  const currentLedger = await xlmSDK.blockchain.info()

  const fee = await xlmSDK.blockchain.getFee()

  const ledger = await xlmSDK.blockchain.getLedger('1')

  const transactions = await xlmSDK.blockchain.getLedgerTx('1')

  const transaction = await xlmSDK.blockchain.getTransaction(
    '749e4f8933221b9942ef38a02856803f379789ec8d971f1f60535db70135673e',
  )

  const accountTransactions = await xlmSDK.blockchain.getAccountTransactions(
    'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
  )
}
