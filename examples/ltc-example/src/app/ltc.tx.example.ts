import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcTransactionsExample() {
  const txData = await ltcSDK.transaction.prepareSignedTransaction({
    fromUTXO: [
      {
        txHash: '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807',
        index: 1,
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ],
    to: [
      {
        address: 'LYkdm7x4SCLePTi9AQfnvxRqKQfiwWp5pt',
        value: 0.2969944,
      },
    ],
  })

  // @TODO add change param
  const { txId, failed } = await ltcSDK.transaction.sendTransaction({
    fromAddress: [
      {
        address: 'LYkdm7x4SCLePTi9AQfnvxRqKQfiwWp5pt',
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ],
    to: [
      {
        address: 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
        value: 0.00015,
      },
    ],
  })
}
