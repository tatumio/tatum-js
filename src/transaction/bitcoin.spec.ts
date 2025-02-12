import { TransferBtcBasedBlockchain } from '../model'
import { prepareBitcoinSignedTransaction, sendBitcoinTransaction } from './bitcoin'
import {TransferBtcLtcBlockchain} from "../model/request/TransferBtcLtcBlockchain";

describe('BTC transactions', () => {
  describe('Change address and fee support', () => {
    it('Should prepare tx with change address and fee', async () => {
      const body = new TransferBtcLtcBlockchain()
      body.fromAddress = [{
        address: 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq',
        privateKey: 'cNuevgLtdHpChaGmqyG3HkqEAVEX2faL9HNw1e6hs1Jh6Q3Tv38i',
      }]
      body.to = [{
        address: 'tb1q0wlck27y5zvl0yxd9ene4kaktqxe923xyylt07',
        value: 0.001
      }]
      body.fee = '0.004'
      body.changeAddress = 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq'
      const txData = await prepareBitcoinSignedTransaction(true, body)
      expect(txData).toBe('02000000000102b8b1f896e62b9d932382857e7b4d31c0b5873f11dd42de7345456e1581dc87730000000000ffffffff1363f6ac0c648c4eb28c41556335f3de7a9627573c1b6b076d7ff4fcfe516c870000000000ffffffff02a0860100000000001600147bbf8b2bc4a099f790cd2e679adbb6580d92aa26422300000000000016001489c78efa5ca1fcf1be05ba30d9f73ad7e07bc1c80247304402203bc050bfdbac4ccbd1c181ce3d3bb30f6cac71cef9a67337808e9d6673036f560220763e37a248bbc910d32c7b5ab2d116fca13d07eafdbc22e00ceb44543c8b2553012103ca94c2a396faa0c6940bd156516857b74f7378677518880d80c6ca9998d3e21b0247304402201af7ae35aada207eb75c2638d8e4d40db47c5fed69884b94698aecfb8c15094b022027166a491461f427987f062933a40178708855b9abd19245e43e989ba774e3e1012103ca94c2a396faa0c6940bd156516857b74f7378677518880d80c6ca9998d3e21b00000000')
    })

    it('fail - only changeAddress', async () => {
      try {
        const body = new TransferBtcLtcBlockchain()
        body.fromAddress = [{
          address: 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq',
          privateKey: 'cNuevgLtdHpChaGmqyG3HkqEAVEX2faL9HNw1e6hs1Jh6Q3Tv38i',
        }]
        body.to = [{
          address: 'tb1q0wlck27y5zvl0yxd9ene4kaktqxe923xyylt07',
          value: 0.001
        }]
        body.changeAddress = 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq'
        await prepareBitcoinSignedTransaction(true, body)
        fail('Validation did not pass.')
      } catch (e) {
        console.log(e)
      }
    })

    it('fail - only fee', async () => {
      try {
        const body = new TransferBtcLtcBlockchain()
        body.fromAddress = [{
          address: 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq',
          privateKey: 'cNuevgLtdHpChaGmqyG3HkqEAVEX2faL9HNw1e6hs1Jh6Q3Tv38i',
        }]
        body.to = [{
          address: 'tb1q0wlck27y5zvl0yxd9ene4kaktqxe923xyylt07',
          value: 0.001
        }]
        body.fee = '0.004'
        await prepareBitcoinSignedTransaction(true, body)
        fail('Validation did not pass.')
      } catch (e) {
        console.log(e)
      }
    })

    it('Should generate the same output for changeaddress/fee and to clause', async () => {
      const bodyWithChangeAddressFee = new TransferBtcLtcBlockchain()
      bodyWithChangeAddressFee.fromAddress = [{
        address: 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq',
        privateKey: 'cNuevgLtdHpChaGmqyG3HkqEAVEX2faL9HNw1e6hs1Jh6Q3Tv38i',
      }]
      bodyWithChangeAddressFee.to = [{
        address: 'tb1q0wlck27y5zvl0yxd9ene4kaktqxe923xyylt07',
        value: 0.001
      }]
      bodyWithChangeAddressFee.fee = '0.004'
      bodyWithChangeAddressFee.changeAddress = 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq'
      const txDataChangeAddressFee = await prepareBitcoinSignedTransaction(true, bodyWithChangeAddressFee)

      const bodyWithTo = new TransferBtcBasedBlockchain()
      bodyWithTo.fromAddress = [{
        address: 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq',
        privateKey: 'cNuevgLtdHpChaGmqyG3HkqEAVEX2faL9HNw1e6hs1Jh6Q3Tv38i',
      }]
      bodyWithTo.to = [{
        address: 'tb1q0wlck27y5zvl0yxd9ene4kaktqxe923xyylt07',
        value: 0.001
      }, {
        address: 'tb1q38rca7ju5870r0s9hgcdnae66ls8hswg4t47fq',
        value: 0.00009026
      }]
      const txDataToClause = await prepareBitcoinSignedTransaction(true, bodyWithTo)

      expect(txDataToClause).toBe(txDataChangeAddressFee)
    })
  })
  
  it('should test BTC transaction data', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [{
      txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
      index: 0,
      privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
    }]
    body.to = [{
      address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
      value: 0.00015,
    }]
    const txData = await prepareBitcoinSignedTransaction(true, body)
    expect(txData).toBe('02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000')
  })

  it('should test BTC send transaction', async () => {
      const body = new TransferBtcBasedBlockchain()
      body.fromUTXO = [{
        txHash: '3eb96bf6a4f4dedf50cce45ec7ad0c15529d745cb4733d0c40d6806e53245a62',
        index: 1,
        privateKey: 'cQKbSL8fL4BrSkK48ojNqGJXeRU6sXjUirqpWzPNrWaFdEcErhjj',
      }]
      body.to = [{
        address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        value: 0.00015,
      }]
      const txData = await sendBitcoinTransaction(true, body)
      expect(txData).toHaveProperty('txId')
  })

  it('should not test BTC transaction data, fromAddress and fromUTXO present at the same time', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [{
      txHash: '53faa103e8217e1520f5149a4e8c84aeb58e55bdab11164a95e69a8ca50f8fcc',
      index: 0,
      privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
    }]
    body.fromAddress = [{
      address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
      privateKey: 'cVX7YtgL5muLTPncHFhP95oitV1mqUUA5VeSn8HeCRJbPqipzobf',
    }]
    body.to = [{
      address: '2MzNGwuKvMEvKMQogtgzSqJcH2UW3Tc5oc7',
      value: 0.02969944,
    }]
    try {
      await prepareBitcoinSignedTransaction(true, body)
      fail('Validation did not pass.')
    } catch (e) {
      console.error(e)
    }
  })
})
