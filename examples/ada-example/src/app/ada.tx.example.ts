import { TatumAdaSDK } from '@tatumio/ada'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function adaTransactionsExample() {
  const prepareHash = await adaSDK.transaction.prepare.transaction({
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
  })

  const transactionHash = await adaSDK.transaction.send.transaction({
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
  })

  const signHash = await adaSDK.transaction.signKMSTransaction(
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
}
