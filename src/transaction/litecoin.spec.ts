import {TransferBtcBasedBlockchain} from '../model'
import {prepareLitecoinSignedTransaction, sendLitecoinTransaction} from './litecoin'
import {TransferBtcLtcBlockchain} from "../model/request/TransferBtcLtcBlockchain";

describe('LTC transactions', () => {
  describe('Change address and fee support', () => {
    it('Should prepare tx with change address and fee', async () => {
      const body = new TransferBtcLtcBlockchain()
      body.fromAddress = [{
        address: 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo',
        privateKey: 'cQ4WBAs4PvXphpV6ezUHqo5QhBPPsJKtHhaBSJy5TtJoV2qs4koP',
      }]
      body.to = [{
        address: 'mqyiRxb4wMbTFHtgqDyLRwBT6z82tUktDF',
        value: 0.1
      }]
      body.fee = '0.005'
      body.changeAddress = 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo'
      const txData = await prepareLitecoinSignedTransaction(true, body)
      expect(txData).toBe('0200000001d3c8db438a253cb9bdf6ff440848e79cb71c5d197f37185de3df379c3a33504f000000006b483045022100dfa3cf9e826d457f36bd622b51107bc1aa14d55d0ba6f6cc95f597a6be9c068402207ea536d16e1512d8efaa9d89cf9af10a6d068030c9f88a670aa65abcbd9e1c8201210234166c1b874af0faa08b1145ff3dbc31358c0eb35ec6d461000466f5f80b22ecffffffff0280969800000000001976a91472c0ea7cf5ab9299169798c776a14c958444875a88ace08b2901000000001976a914bafecce5010ae353c2c7d7298e14f6e5d8950d2888ac00000000')
    })

    it('fail - only changeAddress', async () => {
      try {
        const body = new TransferBtcLtcBlockchain()
        body.fromAddress = [{
          address: 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo',
          privateKey: 'cQ4WBAs4PvXphpV6ezUHqo5QhBPPsJKtHhaBSJy5TtJoV2qs4koP',
        }]
        body.to = [{
          address: 'mqyiRxb4wMbTFHtgqDyLRwBT6z82tUktDF',
          value: 0.1
        }]
        body.changeAddress = 'n4YQ6pLeKpzWc2nA9Zr8yMq54zetToWzKq'
        await prepareLitecoinSignedTransaction(true, body)
        fail('Validation did not pass.')
      } catch (e) {
        console.log(e)
      }
    })

    it('fail - only fee', async () => {
      try {
        const body = new TransferBtcLtcBlockchain()
        body.fromAddress = [{
          address: 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo',
          privateKey: 'cQ4WBAs4PvXphpV6ezUHqo5QhBPPsJKtHhaBSJy5TtJoV2qs4koP',
        }]
        body.to = [{
          address: 'mqyiRxb4wMbTFHtgqDyLRwBT6z82tUktDF',
          value: 0.1
        }]
        body.fee = '0.005'
        await prepareLitecoinSignedTransaction(true, body)
        fail('Validation did not pass.')
      } catch (e) {
        console.log(e)
      }
    })

    it('Should generate the same output for changeaddress/fee and to clause', async () => {
      const bodyWithChangeAddressFee = new TransferBtcLtcBlockchain()
      bodyWithChangeAddressFee.fromAddress = [{
        address: 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo',
        privateKey: 'cQ4WBAs4PvXphpV6ezUHqo5QhBPPsJKtHhaBSJy5TtJoV2qs4koP',
      }]
      bodyWithChangeAddressFee.to = [{
        address: 'mqyiRxb4wMbTFHtgqDyLRwBT6z82tUktDF',
        value: 0.1
      }]
      bodyWithChangeAddressFee.fee = '0.005'
      bodyWithChangeAddressFee.changeAddress = 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo'
      const txDataChangeAddressFee = await prepareLitecoinSignedTransaction(true, bodyWithChangeAddressFee)

      const bodyWithTo = new TransferBtcBasedBlockchain()
      bodyWithTo.fromAddress = [{
        address: 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo',
        privateKey: 'cQ4WBAs4PvXphpV6ezUHqo5QhBPPsJKtHhaBSJy5TtJoV2qs4koP',
      }]
      bodyWithTo.to = [{
        address: 'mqyiRxb4wMbTFHtgqDyLRwBT6z82tUktDF',
        value: 0.1
      }, {
        address: 'mxZhDaGuFLL3jBKsxGfzd1DnRDLYQagqbo',
        value: 0.195
      }]
      const txDataToClause = await prepareLitecoinSignedTransaction(true, bodyWithTo)

      expect(txDataToClause).toBe(txDataChangeAddressFee)
    })
  })

  it('should test LTC transaction data', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [{
      txHash: '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807',
      index: 1,
      privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
    }]
    body.to = [{
      address: 'mfh8kjy36ppH7bGXTzUwhWbKGgZziq4CbF',
      value: 0.2969944
    }]
    const txData = await prepareLitecoinSignedTransaction(true, body)
    expect(txData).toBe('010000000107b82207b41ce255ba227719f93ff426dd49fb53986b843145d496ca07c770660100000000ffffffff01702dc501000000001976a91401ece42befef00eb643febc32cb0764563fb4e6988ac00000000')
  })

  it('should test LTC send transaction', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [{
      txHash: '6670c707ca96d44531846b9853fb49dd26f43ff9197722ba55e21cb40722b807',
      index: 1,
      privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
    }]
    body.to = [{
      address: 'mfh8kjy36ppH7bGXTzUwhWbKGgZziq4CbF',
      value: 0.2969944
    }]
    const txData = await sendLitecoinTransaction(true, body)
    console.log(txData)
    expect(txData).toHaveProperty('txId')
  })

  it('should not test LTC transaction data, fromAddress and fromUTXO present at the same time', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [{
      txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
      index: 0,
      privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
    }]
    body.fromAddress = [{
      address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
      privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
    }]
    body.to = [{
      address: 'mjJotvHmzEuyXZJGJXXknS6N3PWQnw6jf5',
      value: 0.02969944
    }]
    try {
      await prepareLitecoinSignedTransaction(true, body)
      fail('Validation did not pass.')
    } catch (e) {
      console.error(e)
    }
  })
})
