import { TransferBtcBasedBlockchain } from '@tatumio/tatum-core/src/model'
import { prepareBitcoinSignedTransaction, sendBitcoinTransaction } from './bitcoin'

describe('BTC transactions', () => {
  it('should test BTC transaction data', async () => {
    process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd'
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [
      {
        txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        index: 0,
        privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
      },
    ]
    body.to = [
      {
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        value: 0.00015,
      },
    ]
    const txData = await prepareBitcoinSignedTransaction(body)
    expect(txData).toBe(
      '02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000'
    )
  })

  it('should test BTC send transaction', async () => {
    process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd'
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [
      {
        txHash: '3eb96bf6a4f4dedf50cce45ec7ad0c15529d745cb4733d0c40d6806e53245a62',
        index: 1,
        privateKey: 'cQKbSL8fL4BrSkK48ojNqGJXeRU6sXjUirqpWzPNrWaFdEcErhjj',
      },
    ]
    body.to = [
      {
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        value: 0.00015,
      },
    ]
    const txData = await sendBitcoinTransaction(body)
    expect(txData).toHaveProperty('txId')
  })

  it('should not test BTC transaction data, fromAddress and fromUTXO present at the same time', async () => {
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
        address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
        privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
      },
    ]
    body.to = [
      {
        address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
        value: 0.02969944,
      },
    ]
    try {
      await prepareBitcoinSignedTransaction(body)
      fail('Validation did not pass.')
    } catch (e) {
      console.error(e)
    }
  })
})
