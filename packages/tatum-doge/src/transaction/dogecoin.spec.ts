import { TransferDogeBlockchain } from '../model'
import { prepareBlockchainSignedTransaction, sendTransaction } from './dogecoin'

describe('DOGE transactions', () => {
  it('should test DOGE transaction data', async () => {
    const body = new TransferDogeBlockchain()
    body.fromUTXO = [
      {
        txHash: 'abb7dfbbbf58407b3774c58f24930cbd6d8cba730200f96cbe8f024d9f8879e5',
        address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
        index: 1,
        value: '60.0819',
        privateKey: 'chAohgNcPWYSjPUhG7spHvHAE8yt86QvFmUAPgboFtKb4RnwB1L1',
      },
    ]
    body.fee = '1'
    body.changeAddress = 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W'
    body.to = [
      {
        address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
        value: 58,
      },
    ]
    try {
      const txData = await prepareBlockchainSignedTransaction(body)
      expect(txData).toBe(
        '0100000001e579889f4d028fbe6cf9000273ba8c6dbd0c93248fc574377b4058bfbbdfb7ab010000006a473044022042162432ec6f09dc0e259dde1a7643b0b2502aa77b92d9fad867801fee987223022010911ffa756f4da3bc52ef454fd9476453ed91e8cca8706dcce4fdc3ef79b0eb012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bbffffffff0200fab459010000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac30d97206000000001976a914299480256432f2372df6d66e21ed48b097797c9a88ac00000000'
      )
    } catch (e) {
      console.error(e)
      fail()
    }
  })
  it('should test DOGE send transaction', async () => {
    process.env.TATUM_API_KEY = '4966d428-9507-45cb-9f90-02cca00674bd'
    const body = new TransferDogeBlockchain()
    body.fromUTXO = [
      {
        txHash: '20c569c3d7722a11d004646e1f00b35e1f51da0dcbe8d2446a544c0daa88097d',
        address: 'nUPfS5zGfHzehxcReVQR2Jb53ef2i8xQb1',
        index: 1,
        value: '100',
        privateKey: 'cifcEG11CVMvauPyEXLJXw6VTy3cpivuiRVekE8afRu1LPF1JZCw',
      },
    ]
    body.fee = '1'
    body.changeAddress = 'nUPfS5zGfHzehxcReVQR2Jb53ef2i8xQb1'
    body.to = [
      {
        address: 'nXz1s8tMQbqjARaSMNCPkgdwJQ2JDW2M7W',
        value: 1,
      },
    ]
    try {
      const txData = await sendTransaction(body)
      console.log(txData)
      expect(txData).toHaveProperty('txId')
    } catch (e) {
      console.error(e)
      fail()
    }
  })
})
