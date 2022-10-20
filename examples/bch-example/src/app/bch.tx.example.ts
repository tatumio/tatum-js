import { TatumBchSDK } from '@tatumio/bch'


export async function bchTransactionsExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Prepare signed transaction
  const txData = await bchSDK.transaction.prepareSignedTransaction(
    {
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
      fee: '0.00001',
      changeAddress: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc3lo6',
    },
    { testnet: true },
  )
  console.log(txData)

  // Send Transaction
  const tx = await bchSDK.transaction.sendTransaction(
    {
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
      fee: '0.00001',
      changeAddress: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc3lo6',
    },
    { testnet: true },
  )
  console.log(tx)
}
