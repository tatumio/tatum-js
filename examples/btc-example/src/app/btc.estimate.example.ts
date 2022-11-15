import { TatumBtcSDK } from '@tatumio/btc'
import { Currency, EstimateFeeFromAddress, FeeBtcBased } from '@tatumio/api-client'

export async function btcEstimateExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Before BTC transaction send you can estimate fee
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-fees#operation/EstimateFeeBlockchain
  const estimatedFee = (await btcSDK.blockchain.estimateFee({
    chain: Currency.BTC,
    type: 'TRANSFER',
    fromAddress: ['tb1q0mx0f6l2k37vvath3frauh73zhvp42rv3s9v6v'],
    to: [
      {
        address: '2NBf6ru67df793MWKj3sxUJiYVsQuycHN5T',
        value: 0.00015,
      },
    ],
  } as EstimateFeeFromAddress)) as FeeBtcBased
  console.log(`Fee: ${JSON.stringify(estimatedFee)}`)
}
