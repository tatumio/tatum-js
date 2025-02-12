import {TransferDogeBlockchain} from '../model'
import {prepareDogecoinSignedTransaction, sendDogecoinTransaction} from './dogecoin'
import {fail} from "assert";

describe('DOGE transactions', () => {
  it('should test DOGE - transaction data', async () => {
    const body = new TransferDogeBlockchain()
    body.fromUTXO = [{
      txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
      address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
      index: 1,
      value: '60.0819',
      privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
    }]
    body.fee = '1'
    body.changeAddress = 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
    body.to = [{
      address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
      value: 58,
    }]
    try {
      const txData = await prepareDogecoinSignedTransaction(body)
      expect(txData).toBe('0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022042162432ec6f09dc0e259dde1a7643b0b2502aa77b92d9fad867801fee987223022010911ffa756f4da3bc52ef454fd9476453ed91e8cca8706dcce4fdc3ef79b0eb012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0200fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac30d97206000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000')
    } catch (e) {
      console.error(e)
      fail()
    }
  })

  it('should test DOGE - do not fail on dust amount', async () => {
    const body = new TransferDogeBlockchain()
    body.fromUTXO = [{
      txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
      address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
      index: 1,
      value: '60.0819',
      privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
    }]
    body.fee = '1'
    body.changeAddress = 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
    body.to = [{
      address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
      value: 0.02,
    }]
    try {
      const txData = await prepareDogecoinSignedTransaction(body)
      expect(txData).toBe('0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006b483045022100c329a4792703a7e8acf9ffa1f5c2d40366859c53ddc36001c54c9acb4696e00902203b0fc72e86e512ccc36559cfd16bf83d279bd2b935ebe5c552c4a85c156cda8d012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0280841e00000000001976a914299480256432f2372df6d66e21ed48b097797c9a88acb04e0960010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000')
    } catch (e) {
      console.error(e)
      fail()
    }
  })

  it('should test DOGE - transaction data to work with optional changeAddress and fee', async () => {
    const fromUTXO = [{
      txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
      address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
      index: 1,
      value: '60.0819',
      privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
    }];

    try {
      const txDataNoChangeAddressSet = await prepareDogecoinSignedTransaction({
        fromUTXO,
        to: [
          {
            address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
            value: 58,
          },
          {
            address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
            value: 1.0819,
          },
        ],
      })

      const txDataChangeAddressSet = await prepareDogecoinSignedTransaction({
        fromUTXO,
        to: [
          {
            address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
            value: 58,
          }
        ],
        fee: '1',
        changeAddress: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
      })

      const expectedTxData = '0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022042162432ec6f09dc0e259dde1a7643b0b2502aa77b92d9fad867801fee987223022010911ffa756f4da3bc52ef454fd9476453ed91e8cca8706dcce4fdc3ef79b0eb012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0200fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac30d97206000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000';
      expect(txDataNoChangeAddressSet).toBe(expectedTxData)
      expect(txDataChangeAddressSet).toBe(expectedTxData)
    } catch (e) {
      console.error(e)
      fail()
    }
  })

  it('should test DOGE - prepare body should have both changeAddress and fee - no changeAddress', async () => {
    try {
      await prepareDogecoinSignedTransaction({
        fromUTXO: [{
          txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
          address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
          index: 1,
          value: '60.0819',
          privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
        }],
        to: [
          {
            address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
            value: 58,
          }
        ],
        fee: '1',
      })
      fail()
    } catch (e) {
      console.log(e)
    }
  })

  it('should test DOGE - prepare body should have both changeAddress and fee - no fee', async () => {
    try {
      await prepareDogecoinSignedTransaction({
        fromUTXO: [{
          txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
          address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
          index: 1,
          value: '60.0819',
          privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
        }],
        to: [
          {
            address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
            value: 58,
          }
        ],
        changeAddress: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
      })
      fail()
    } catch (e) {
      console.log(e)
    }
  })

  it('should test DOGE - send transaction', async () => {
    const body = new TransferDogeBlockchain()
    body.fromUTXO = [{
      txHash: '20c569c3d7722a11d004646e1f00b35e1f51da0dcbe8d2446a544c0daa88097d',
      address: 'nUPfS5zGfHzehxcReVQR2Jb53ef2i8xQb1',
      index: 1,
      value: '100',
      privateKey: 'cifcEG11CVMvauPyEXLJXw6VTy3cpivuiRVekE8afRu1LPF1JZCw',
    }]
    body.fee = '1'
    body.changeAddress = 'nUPfS5zGfHzehxcReVQR2Jb53ef2i8xQb1'
    body.to = [{
      address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
      value: 1,
    }]
    try {
      const txData = await sendDogecoinTransaction(body)
      console.log(txData)
      expect(txData).toHaveProperty('txId')
    } catch (e) {
      console.error(e)
      fail()
    }
  })
})
