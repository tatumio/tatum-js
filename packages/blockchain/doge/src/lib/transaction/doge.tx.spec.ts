import { DogeTransaction } from './doge.tx'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumDogeSDK } from '../doge.sdk'
import { DogeTransactionUTXO } from '@tatumio/api-client'

describe('DOGE transactions', () => {
  const sdk = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // @TODO
  it.skip('should test DOGE transaction data', async () => {
    const txData = sdk.transaction.prepareSignedTransaction({
      fromUTXO: [
        {
          privateKey: 'cfzTG4jey7B6TgDbzHGEtdfkG2CD3cBksuWS2ACuqgCSyzcFWTik',
          txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
          index: 0,
          value: '0.0015',
          address: 'nggL9pTrmQPQuBXHzq41mMbD5WiV6MN331',
        },
      ],
      to: [
        {
          address: 'ndMWhLdboAYPQxvqwoYtmVTanSDUAHY79K',
          value: 0.02969944,
        },
      ],
      changeAddress: 'nggL9pTrmQPQuBXHzq41mMbD5WiV6MN331',
      fee: '0.0015',
    })
    expect(txData).toBe(
      '0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022042162432ec6f09dc0e259dde1a7643b0b2502aa77b92d9fad867801fee987223022010911ffa756f4da3bc52ef454fd9476453ed91e8cca8706dcce4fdc3ef79b0eb012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0200fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac30d97206000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000',
    )
  })
})
