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
      '0200000001f3895ebe9444637901b0f7bd510564baa73c89bc2c480a5bc594dc626649766300000000644185c688866fcabfb021f9b6d90f203dfc29e483b45853ad6b87ce91a6112d6cf2323af053c60dde98a5e00bf1ad7a8243733a23625fb89bc20b83614173513172412103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff01703f3f02000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000',
    )
  })
})
