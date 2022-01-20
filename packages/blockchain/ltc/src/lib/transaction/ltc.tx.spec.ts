import { ltcTransactions } from './ltc.tx'
import { TatumApi } from '@tatumio/api-client'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumLtcSDK } from '../ltc.sdk'

describe('LTC transactions', () => {
  it('should test LTC transaction data', async () => {
    const txData = await TatumLtcSDK({
      apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    }).transaction.prepareSignedTransaction({
      fromUTXO: [
        {
          txHash: '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807',
          index: 1,
          privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        },
      ],
      to: [
        {
          address: 'mfh8kjy36ppH7bGXTzUwhWbKGgZziq4CbF',
          value: 0.2969944,
        },
      ],
    })
    expect(txData).toBe(
      '010000000107b82207b41ce255ba227719f93ff426dd49fb53986b843145d496ca07c770660100000000ffffffff01702dc501000000001976a91401ece42befef00eb643febc32cb0764563fb4e6988ac00000000',
    )
  })

  it('should test LTC send transaction', async () => {
    const txData = await TatumLtcSDK({
      apiKey: REPLACE_ME_WITH_TATUM_API_KEY,
    }).transaction.sendTransaction({
      fromUTXO: [
        {
          txHash: '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807',
          index: 1,
          privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
        },
      ],
      to: [
        {
          address: 'mfh8kjy36ppH7bGXTzUwhWbKGgZziq4CbF',
          value: 0.2969944,
        },
      ],
    })
    expect(txData).toHaveProperty('txId')
  })
})
