import { TransferBtcBasedBlockchain } from '@tatumio/tatum-core'
import { prepareAdaTransaction, sendAdaTransaction, signAdaKMSTransaction } from './ada'

describe('ADA transactions', () => {
  it('should test preparing ADA fromAddress transaction', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromAddress = [
      {
        address: 'addr_test1qqnp3dfw869cz74jfvkmvrs47fwmhwx7c96n44u80w2mrskkrxsadwhjss06kp6tke68rt0apcl864tlqw40ddy5jumqr7g7xy',
        privateKey:
          'a01136f20a0a1fb0ec7833111cbef4207f2b7fda0f942c6fccba0aa72fed115dc70795a4d49ec6b50e3bb1820e910389aed8ab0d75ec88eac0883b22d49473b17a72599737528714076956f71377dab57b1ceea5c63ac6669d547a22058d1f4402f74c3ba9d7061e0f4ac3c29770a20f91ae2e648059cf1010600e6e0f6b921d',
      },
    ]
    body.to = [
      {
        address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
        value: 1,
      },
      {
        address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
        value: 1,
      },
    ]
    try {
      const txData = await prepareAdaTransaction(body)
      expect(txData).toBe(
        '83a40081825820ca5cd6764d36000c99576d2ab8d2d58e1ba4eb7f2cc279a3f6442e2929123dfd020183825839000743d16cfe3c4fcc0c11c2403bbc10dbc7ecdd4477e053481a368e7a06e2ae44dff6770dc0f4ada3cf4cf2605008e27aecdb332ad349fda71a000f4240825839000743d16cfe3c4fcc0c11c2403bbc10dbc7ecdd4477e053481a368e7a06e2ae44dff6770dc0f4ada3cf4cf2605008e27aecdb332ad349fda71a000f4240825839002618b52e3e8b817ab24b2db60e15f25dbbb8dec1753ad7877b95b1c2d619a1d6baf2841fab074bb67471adfd0e3e7d557f03aaf6b49497361a3aadc56f021a00029c7d031a01c4b82ba100818258207a72599737528714076956f71377dab57b1ceea5c63ac6669d547a22058d1f4458403c30ab577e96c9a4b4fb9e0e970f831033344d8e5efbfe20cce6b883dfeea4f31044bcb6ef1333e20202b4f7092d46667680478d4417c54a10582516ce55d909f6'
      )
    } catch (e) {
      console.error(e)
      fail(e)
    }
  })

  it('should test sending ADA fromAddress transaction private key', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromAddress = [
      {
        address: 'addr_test1qp33h99feurpn7n8cezqthh75723q5kjwqmthaf073y7edlg9xj6jj5qs9pe3nxq8rx59aa5qlmjrgsm0jt22hh3ll5q7n3j5s',
        privateKey:
          '2090e65cdf985bdada08ee383bfa24cb6c7143916fa948f1883ae1a6c0ff8e546fd2af77272c377a87aca22d75b71a95420c95378d1fd9e7f6a034b8312d47d341c9185113c7d9b2308523844e161f63d038497d7cdee1d989341ee38ef307d34893c218e0aff8561120e95e708fff007a935640f163c186d2865b4067cd959c',
      },
    ]
    body.to = [
      {
        address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
        value: 1,
      },
    ]
    try {
      const txData = await sendAdaTransaction(body)
      console.log(txData)
      expect(txData).toHaveProperty('txId')
    } catch (e) {
      fail(e)
    }
  })

  it('should test sending ADA fromUTXO transaction', async () => {
    const body = new TransferBtcBasedBlockchain()
    body.fromUTXO = [
      {
        txHash: 'c44db60c36824f1d8901ee1f7d5597d426fe00c1fa8e6872e70bef318e4bc051',
        index: 2,
        privateKey:
          'a01136f20a0a1fb0ec7833111cbef4207f2b7fda0f942c6fccba0aa72fed115dc70795a4d49ec6b50e3bb1820e910389aed8ab0d75ec88eac0883b22d49473b17a72599737528714076956f71377dab57b1ceea5c63ac6669d547a22058d1f4402f74c3ba9d7061e0f4ac3c29770a20f91ae2e648059cf1010600e6e0f6b921d',
      },
    ]
    body.to = [
      {
        address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
        value: 1,
      },
      {
        address: 'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
        value: 1,
      },
    ]
    try {
      const txData = await sendAdaTransaction(body)
      expect(txData).toHaveProperty('txId')
    } catch (e) {
      fail(e)
    }
  })

  it('should test KMS transaction sign', async () => {
    const transactionToBroadcast = await signAdaKMSTransaction(
      {
        serializedTransaction:
          '{"txData":{"fromAddress":[{"address":"addr_test1qp33h99feurpn7n8cezqthh75723q5kjwqmthaf073y7edlg9xj6jj5qs9pe3nxq8rx59aa5qlmjrgsm0jt22hh3ll5q7n3j5s","signatureId":"b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"}],"to":[{"address":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3","value":1}]},"privateKeysToSign":["b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"]}',
        hashes: ['b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0'],
        id: '60f67210baf4120bb057c1ce',
      },
      [
        '2090e65cdf985bdada08ee383bfa24cb6c7143916fa948f1883ae1a6c0ff8e546fd2af77272c377a87aca22d75b71a95420c95378d1fd9e7f6a034b8312d47d341c9185113c7d9b2308523844e161f63d038497d7cdee1d989341ee38ef307d34893c218e0aff8561120e95e708fff007a935640f163c186d2865b4067cd959c',
      ]
    )
    expect(transactionToBroadcast).not.toBeNull()
  })
})
