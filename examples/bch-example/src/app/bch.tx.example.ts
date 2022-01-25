import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchTransactionsExample() {
  const txData = await bchSDK.transaction.prepareSignedTransaction(true, {
    fromUTXO: [
      {
        txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        index: 0,
        privateKey: 'L3Jf3gvX1YaCJJTejTfghZ4Sst8GSui6UQctERksAimYCskVH7iG',
      },
    ],
    to: [
      {
        address: 'qps4cv6gtxh7473qxzcwe6nk90canlt57cd57gpy08',
        value: 0.00015,
      },
    ],
  })

  const { txId, failed } = await bchSDK.transaction.sendTransaction(true, {
    fromUTXO: [
      {
        txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        index: 0,
        privateKey: 'L3Jf3gvX1YaCJJTejTfghZ4Sst8GSui6UQctERksAimYCskVH7iG',
      },
    ],
    to: [
      {
        address: 'qps4cv6gtxh7473qxzcwe6nk90canlt57cd57gpy08',
        value: 0.00015,
      },
    ],
  })
}
