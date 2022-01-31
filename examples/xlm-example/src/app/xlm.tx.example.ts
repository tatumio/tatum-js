import { TatumXlmSDK } from '@tatumio/xlm'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmTxExample() {
  await xlmSDK.transaction.sendTransaction(true, {
    fromAccount: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
    fromSecret: 'SCVVKNLBHOWBNJYHD3CNROOA2P3K35I5GNTYUHLLMUHMHWQYNEI7LVED',
    amount: '10000',
    to: 'GBRPYHIL2CI3FNQ4BXLFMNDLFJUNPU2HY3ZMFSHONUCEOASW7QC7OX2H',
  })
}
