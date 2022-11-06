import { TatumLtcSDK } from '@tatumio/ltc'
import { Currency, EstimateFeeFromAddress, FeeBtc } from '@tatumio/api-client'

export async function ltcEstimateExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Before LTC transaction send you can estimate fee
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-fees#operation/EstimateFeeBlockchain
  const estimatedFee = (await ltcSDK.blockchain.estimateFee({
    chain: Currency.LTC,
    type: 'TRANSFER',
    fromAddress: ['LYkdm7x4SCLePTi9AQfnvxRqKQfiwWp5pt'],
    to: [
      {
        address: 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
        value: 0.00015,
      },
    ],
  } as EstimateFeeFromAddress)) as FeeBtc
  console.log(`Fee: ${JSON.stringify(estimatedFee)}`)
}
