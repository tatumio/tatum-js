import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'
import { TatumAdaSDK } from '../ada.sdk'

const sdk = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

describe('ADA transactions', () => {
  it('should test preparing ADA fromAddress transaction', async () => {
    const body = {
      fromAddress: [
        {
          address:
            'addr_test1qqnp3dfw869cz74jfvkmvrs47fwmhwx7c96n44u80w2mrskkrxsadwhjss06kp6tke68rt0apcl864tlqw40ddy5jumqr7g7xy',
          privateKey:
            'a01136f20a0a1fb0ec7833111cbef4207f2b7fda0f942c6fccba0aa72fed115dc70795a4d49ec6b50e3bb1820e910389aed8ab0d75ec88eac0883b22d49473b17a72599737528714076956f71377dab57b1ceea5c63ac6669d547a22058d1f4402f74c3ba9d7061e0f4ac3c29770a20f91ae2e648059cf1010600e6e0f6b921d',
        },
      ],
      to: [
        {
          address:
            'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
          value: 1,
        },
        {
          address:
            'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
          value: 1,
        },
      ],
    }
    try {
      const txData = await sdk.transaction.prepare.transaction(body)
      expect(txData).toBeDefined()
    } catch (e) {
      expect(e).not.toBeDefined()
    }
  })

  it('should test sending ADA fromAddress transaction private key', async () => {
    const body = {
      fromAddress: [
        {
          address:
            'addr_test1qp33h99feurpn7n8cezqthh75723q5kjwqmthaf073y7edlg9xj6jj5qs9pe3nxq8rx59aa5qlmjrgsm0jt22hh3ll5q7n3j5s',
          privateKey:
            '2090e65cdf985bdada08ee383bfa24cb6c7143916fa948f1883ae1a6c0ff8e546fd2af77272c377a87aca22d75b71a95420c95378d1fd9e7f6a034b8312d47d341c9185113c7d9b2308523844e161f63d038497d7cdee1d989341ee38ef307d34893c218e0aff8561120e95e708fff007a935640f163c186d2865b4067cd959c',
        },
      ],
      to: [
        {
          address:
            'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
          value: 1,
        },
      ],
    }

    try {
      const txData = await sdk.transaction.send.transaction(body)
      expect(txData).toHaveProperty('txId')
    } catch (e) {
      expect(e).not.toBeDefined()
    }
  })

  it('should test sending ADA fromUTXO transaction', async () => {
    const body = {
      fromUTXO: [
        {
          txHash: 'c44db60c36824f1d8901ee1f7d5597d426fe00c1fa8e6872e70bef318e4bc051',
          index: 2,
          signatureId: 'b9e6fd31-fc14-4d2c-a3e2-b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0',
        },
      ],
      to: [
        {
          address:
            'addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3',
          value: 1,
        },
      ],
    }
    try {
      const txData = await sdk.transaction.send.transaction(body)
      expect(txData).toHaveProperty('txId')
    } catch (e) {
      expect(e).not.toBeDefined()
    }
  })

  it('should test KMS transaction sign', async () => {
    const transactionToBroadcast = await sdk.transaction.signKMSTransaction(
      {
        serializedTransaction:
          '{"txData":{"fromAddress":[{"address":"addr_test1qp33h99feurpn7n8cezqthh75723q5kjwqmthaf073y7edlg9xj6jj5qs9pe3nxq8rx59aa5qlmjrgsm0jt22hh3ll5q7n3j5s","signatureId":"b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"}],"to":[{"address":"addr_test1qqr585tvlc7ylnqvz8pyqwauzrdu0mxag3m7q56grgmgu7sxu2hyfhlkwuxupa9d5085eunq2qywy7hvmvej456flknswgndm3","value":1}]},"privateKeysToSign":["b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0"]}',
        hashes: ['b9e6fd31-fc14-4d2c-a3e2-21a23a7c81d0'],
        id: '60f67210baf4120bb057c1ce',
      },
      [
        '2090e65cdf985bdada08ee383bfa24cb6c7143916fa948f1883ae1a6c0ff8e546fd2af77272c377a87aca22d75b71a95420c95378d1fd9e7f6a034b8312d47d341c9185113c7d9b2308523844e161f63d038497d7cdee1d989341ee38ef307d34893c218e0aff8561120e95e708fff007a935640f163c186d2865b4067cd959c',
      ],
    )
    expect(transactionToBroadcast).not.toBeNull()
  })
})
