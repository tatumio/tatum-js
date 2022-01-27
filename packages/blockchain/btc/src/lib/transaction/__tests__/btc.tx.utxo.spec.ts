import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumBtcSDK } from '../../btc.sdk'
import * as apiClient from '@tatumio/api-client'
import { BtcTransactionFromUTXO, BtcTx } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/abstract-sdk'
import { BtcSdkError } from '../../btc.sdk.errors'

jest.mock('@tatumio/api-client')
const mockedApi = jest.mocked(apiClient.ApiServices, true)

describe('BTC transaction from UTXO', () => {
  const sdk = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('valid', async () => {
    mockRequestGetRawTx({
      outputs: [
        {
          value: 16000,
          script: '0014299480256432f2372df6d66e21ed48b097797c9a',
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        },
      ],
    })

    const txData = await sdk.transaction.prepareSignedTransaction(getRequestBody(0.00015))
    expect(txData).toBe(
      '02000000000101c7c445859e1bc56643a08702fab3f83c4f72f513d11c92951181bdc8f523dcfc0000000000ffffffff01983a000000000000160014299480256432f2372df6d66e21ed48b097797c9a024830450221008d43043b7e5ddc8eba5148b6540022deaa8628461fe08f6e48e596766a6c4b30022015270982a1a10fdc1454c1cd569f7a3eb9dac72b9598cebe74e3ba1c8af4e7dc012102473ddfe2afe40c68b68ecb81036003df920503668188b744b7c72046a97000bb00000000',
    )
  })

  it('not enough money on balance', async () => {
    mockRequestGetRawTx({
      outputs: [
        {
          value: 12000,
          script: '0014299480256432f2372df6d66e21ed48b097797c9a',
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        },
      ],
    })

    await expect(sdk.transaction.prepareSignedTransaction(getRequestBody(0.00015))).rejects.toThrow(
      BtcSdkError.fromCode(SdkErrorCode.BTC_NOT_ENOUGH_BALANCE),
    )
  })

  it('fee = 0', async () => {
    mockRequestGetRawTx({
      outputs: [
        {
          value: 15000,
          script: '0014299480256432f2372df6d66e21ed48b097797c9a',
          address: 'tb1q9x2gqftyxterwt0k6ehzrm2gkzthjly677ucyr',
        },
      ],
    })

    await expect(sdk.transaction.prepareSignedTransaction(getRequestBody(0.00015))).rejects.toThrow(
      BtcSdkError.fromCode(SdkErrorCode.BTC_FEE_TOO_SMALL),
    )
  })

  it('no outputs', async () => {
    mockRequestGetRawTx({
      outputs: [],
    })

    await expect(sdk.transaction.prepareSignedTransaction(getRequestBody(0.00015))).rejects.toThrow(
      BtcSdkError.fromCode(SdkErrorCode.BTC_UTXO_NOT_FOUND),
    )
  })

  function getRequestBody(amount: number): BtcTransactionFromUTXO {
    return {
      fromUTXO: [
        {
          txHash: 'fcdc23f5c8bd811195921cd113f5724f3cf8b3fa0287a04366c51b9e8545c4c7',
          index: 0,
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

  function mockRequestGetRawTx(obj: BtcTx) {
    mockedApi.blockchain.bitcoin.btcGetRawTransaction.mockReturnValue(Promise.resolve(obj))
  }
})
