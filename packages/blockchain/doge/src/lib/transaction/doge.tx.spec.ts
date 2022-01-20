import { DogeTransaction } from './doge.tx'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumDogeSDK } from '../doge.sdk'

describe('DOGE transactions', () => {
  it('should test DOGE transaction data', async () => {
    const txData = await TatumDogeSDK({
      apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    }).transaction.prepareSignedTransaction({
      fromUTXO: [
        {
          privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
          txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
          index: 1,
          value: '60.0819',
          address: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
        }],
      to: [
        {
          address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
          value: 0.00015,
        },
      ],
    } as DogeTransaction)
    expect(txData).toBe(
      '0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022042162432ec6f09dc0e259dde1a7643b0b2502aa77b92d9fad867801fee987223022010911ffa756f4da3bc52ef454fd9476453ed91e8cca8706dcce4fdc3ef79b0eb012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0200fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac30d97206000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000',
    )
  })
})
