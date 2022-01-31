import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumXlmSDK } from '@tatumio/xlm'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmApiExample() {
  const wallet = await xlmSDK.api.xlmWallet()

  const info = await xlmSDK.api.xlmGetLastClosedLedger()

  const ledger = await xlmSDK.api.xlmGetLedger('1')

  const ledgerTransactions = await xlmSDK.api.xlmGetLedgerTx('1')

  const fee = await xlmSDK.api.xlmGetFee()

  const transactions = await xlmSDK.api.xlmGetAccountTx(
    'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
  )

  const tx = await xlmSDK.api.xlmGetTransaction(
    '1A32A054B04AC9D6814710DDCA416E72C4CD2D78D6C3DFC06CC9369CC4F6B250',
  )

  const account = await xlmSDK.api.xlmGetAccountInfo(
    'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
  )

  const transferTxId = await xlmSDK.api.xlmTransferBlockchain({
    fromAccount: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
    to: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
    amount: '10000',
    fromSecret: 'SCVVKNLBHOWBNJYHD3CNROOA2P3K35I5GNTYUHLLMUHMHWQYNEI7LVED',
  })

  const trustLineTxId = await xlmSDK.api.xlmTrustLineBlockchain({
    fromAccount: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
    issuerAccount: 'GC5LAVZ5UPLIFDH6SI33PNVL5TKWA4ODXTI3WEF5JM6LRM5MNGVJ56TT',
    limit: '1000',
    token: 'DA39A3EE5E6B4B0D3255BFEF95601890AFD80709',
    fromSecret: 'SCVVKNLBHOWBNJYHD3CNROOA2P3K35I5GNTYUHLLMUHMHWQYNEI7LVED',
  })

  const broadcastTxId = await xlmSDK.api.xlmBroadcast({
    txData: '62BD544D1B9031EFC330A3E855CC3A0D51CA5131455C1AB3BCAC6D243F65460D',
  })
}
