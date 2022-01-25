import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcTransactionsExample() {
  const txData = await btcSDK.transaction.prepareSignedTransaction({
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
  const { txId, failed } = await btcSDK.transaction.sendTransaction({
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
