import { bchTransactions } from './bch.tx'
import { TatumApi } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumBchSDK } from '../bch.sdk'

describe('BCH transactions', () => {
  it('should test BCH transaction data', async () => {
    const txData = await TatumBchSDK({
      apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    }).transaction.prepareSignedTransaction(true, {
      fromUTXO: [
        {
          txHash: '6376496662dc94c55b0a482cbc893ca7ba640551bdf7b00179634494be5e89f3',
          index: 0,
          privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
        },
      ],
      to: [
        {
          address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
          value: 0.3769944,
        },
      ],
    })
    expect(txData).toBe(
      '0200000001f3895ebe9444637901b0f7bd510564baa73c89bc2c480a5bc594dc626649766300000000644176d39956988e1e32d053867bed048c892f98247f0926d487108fd3fcab2d70559dbdfe0187bccc541c9f9361e5b7b1ca70009cf7d4ce5627f44cebbbad004e9b412102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff01703f3f02000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000',
    )
  })
})
