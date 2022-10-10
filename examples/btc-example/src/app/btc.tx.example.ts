import { BtcTransactionFromUTXO } from '@tatumio/api-client';
import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcTransactionsExample() {
  const txData = await btcSDK.transaction.prepareSignedTransaction(
    {
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
      fee: '0.00001',
      change: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
    } as BtcTransactionFromUTXO,
    { testnet: true },
  )

  const { txId } = await btcSDK.transaction.sendTransaction(
    {
      fromAddress: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          privateKey: '26d3883e-4e17-48b3-a0ee-09a3e484ac83',
        },
      ],
      to: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          value: 0.00015,
        },
      ],
      fee: '0.00001',
      changeAddress: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
    },
    { testnet: true },
  )
}
