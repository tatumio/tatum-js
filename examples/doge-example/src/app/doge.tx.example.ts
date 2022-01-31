import { DogeTransactionUTXO } from '@tatumio/api-client'
import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeTransactionsExample() {
  const txData = await dogeSDK.transaction.prepareSignedTransaction(
    {
      fromUTXO: [
        {
          txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
          index: 1,
          privateKey: 'QTEcWfGqd2RbCRuAvoXAz99D8RwENfy8j6X92vPnUKR7yL1kXouk',
          address: 'n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7',
          value: '60',
        },
      ],
      to: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          value: 0.00015,
        },
      ],
    } as DogeTransactionUTXO,
    { testnet: true },
  )

  const { txId, failed } = await dogeSDK.transaction.sendTransaction(
    {
      fromUTXO: [
        {
          txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
          index: 1,
          privateKey: 'QTEcWfGqd2RbCRuAvoXAz99D8RwENfy8j6X92vPnUKR7yL1kXouk',
          address: 'n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7',
          value: '100',
        },
      ],
      to: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          value: 0.00015,
        },
      ],
    } as DogeTransactionUTXO,
    { testnet: true },
  )
}
