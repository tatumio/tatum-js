import * as apiClient from '@tatumio/api-client'
import { BtcTransactionFromAddress, BtcTx } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/abstract-sdk'
import { BtcSdkError } from '../btc.sdk.errors'
import { btcTransactions } from '../transaction/btc.tx'
import { testHelper } from '@tatumio/shared-testing'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('BTC transaction from address', () => {
  const VALID_TX_DATA =
    '02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000'

  const transactions = btcTransactions()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sendTransaction', () => {
    it('valid', async () => {
      mockRequestGetTxByAddress()

      mockedApi.blockchain.bitcoin.btcBroadcast.mockReturnValue(Promise.resolve({ txId: '12345' }))

      const result = await transactions.sendTransaction(getRequestBody(0.00015))
      expect(result.txId).toBe('12345')
      testHelper.expectMockCalled(mockedApi.blockchain.bitcoin.btcBroadcast, [{ txData: VALID_TX_DATA }])
    })
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {
      mockRequestGetTxByAddress()
      const txData = await transactions.prepareSignedTransaction(getRequestBody(0.00015))
      expect(txData).toBe(
        '02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000',
      )
    })

    it('not enough money on balance', async () => {
      mockRequestGetTxByAddress({
        hash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        outputs: [
          {
            value: 12000,
            script: '0014299480256432f2372df6d66e21ed48b097797c9a',
            address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          },
        ],
      })

      await expect(transactions.prepareSignedTransaction(getRequestBody(0.00015))).rejects.toThrow(
        BtcSdkError.fromCode(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE),
      )
    })

    it('fee = 0', async () => {
      mockRequestGetTxByAddress({
        hash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
        outputs: [
          {
            value: 15000,
            script: '0014299480256432f2372df6d66e21ed48b097797c9a',
            address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          },
        ],
      })

      await expect(transactions.prepareSignedTransaction(getRequestBody(0.00015))).rejects.toThrow(
        BtcSdkError.fromCode(SdkErrorCode.BTC_FEE_TOO_SMALL),
      )
    })
  })

  function getRequestBody(amount: number): BtcTransactionFromAddress {
    return {
      fromAddress: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          privateKey: 'cQ1YZMep3CiAnMTA9y62ha6BjGaaTFsTvtDuGmucGvpAVmS89khV',
        },
      ],
      to: [
        {
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
          value: amount,
        },
      ],
    }
  }

  function mockRequestGetTxByAddress(
    obj: BtcTx = {
      hash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
      outputs: [
        {
          value: 16000,
          script: '0014299480256432f2372df6d66e21ed48b097797c9a',
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        },
      ],
    },
  ) {
    mockedApi.blockchain.bitcoin.btcGetTxByAddress.mockReturnValue(Promise.resolve([obj]))
  }
})
