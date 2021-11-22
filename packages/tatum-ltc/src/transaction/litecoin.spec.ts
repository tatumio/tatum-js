import { TransferBtcBasedBlockchain } from '@tatumio/tatum-core'
import { prepareLitecoinSignedTransaction, sendLitecoinTransaction } from './litecoin'

describe('LTC transactions', () => {
  it('should test LTC transaction data', async () => {
    process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd'
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [
      {
        txHash: '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807',
        index: 1,
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ]
    body.to = [
      {
        address: 'mfh8kjy36ppH7bGXTzUwhWbKGgZziq4CbF',
        value: 0.2969944,
      },
    ]
    const txData = await prepareLitecoinSignedTransaction(body)
    expect(txData).toBe(
      '010000000107b82207b41ce255ba227719f93ff426dd49fb53986b843145d496ca07c770660100000000ffffffff01702dc501000000001976a91401ece42befef00eb643febc32cb0764563fb4e6988ac00000000'
    )
  })

  it('should test LTC send transaction', async () => {
    process.env.TATUM_API_KEY = '8a66adad-9e68-4f5b-a9b9-8efd971a14d3'
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [
      {
        txHash: '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807',
        index: 1,
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ]
    body.to = [
      {
        address: 'mfh8kjy36ppH7bGXTzUwhWbKGgZziq4CbF',
        value: 0.2969944,
      },
    ]
    const txData = await sendLitecoinTransaction(body)
    console.log(txData)
    expect(txData).toHaveProperty('txId')
  })

  it('should not test LTC transaction data, fromAddress and fromUTXO present at the same time', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [
      {
        txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
        index: 0,
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ]
    body.fromAddress = [
      {
        address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ]
    body.to = [
      {
        address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
        value: 0.02969944,
      },
    ]
    try {
      await prepareLitecoinSignedTransaction(body)
      fail('Validation did not pass.')
    } catch (e) {
      console.error(e)
    }
  })
})
