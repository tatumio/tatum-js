import { TransferBchBlockchain } from '../model'
import { prepareSignedTransaction } from './bcash'

describe('BCH transactions', () => {
  it('should test BCH transaction data', async () => {
    const body = new TransferBchBlockchain()
    body.fromUTXO = [
      {
        txHash: '6376496662dc94c55b0a482cbc893ca7ba640551bdf7b00179634494be5e89f3',
        index: 0,
        value: '0.37867280',
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ]
    body.to = [
      {
        address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
        value: 0.3769944,
      },
    ]
    try {
      const txData = await prepareSignedTransaction(true, body)
      expect(txData).toBe(
        '0200000001f3895ebe9444637901b0f7bd510564baa73c89bc2c480a5bc594dc626649766300000000644185c688866fcabfb021f9b6d90f203dfc29e483b45853ad6b87ce91a6112d6cf2323af053c60dde98a5e00bf1ad7a8243733a23625fb89bc20b83614173513172412103b17a162956975765aa6951f6349f9ab5bf510584c5df9f6065924bfd94a08513ffffffff01703f3f02000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'
      )
    } catch (e) {
      console.error(e)
      fail()
    }
  })

  it('should not test BCH transaction data, missing to', async () => {
    const body = new TransferBchBlockchain()
    body.fromUTXO = [
      {
        txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
        index: 0,
        value: '0.0001',
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ]
    try {
      await prepareSignedTransaction(true, body)
      fail('Validation did not pass.')
    } catch (e) {
      console.error(e)
    }
  })
})
