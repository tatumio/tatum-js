import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcTransactionsExample() {
  const txData = await ltcSDK.transaction.prepareSignedTransaction({
    fromUTXO: [
      {
        txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        index: 0,
        privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
      },
    ],
    to: [
      {
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        value: 0.00015,
      },
    ],
  })

  // @TODO add change param
  const { txId, failed } = await ltcSDK.transaction.sendTransaction({
    fromAddress: [
      {
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
      },
    ],
    to: [
      {
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        value: 0.00015,
      },
    ],
  })
}
