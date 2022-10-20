import { xlmTxService } from '../services/xlm.tx'
import { mockHelper, testHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { ApiServices, TransactionHash, XlmAccount } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

// @TODO SAM FIX
describe.skip('XlmSDK - tx', () => {
  const txService = xlmTxService({ getAccountInfo: ApiServices.blockchain.xlm.xlmGetAccountInfo })

  const AMOUNT = '1'
  const SECRET = 'SCFCTIS5326CRI3XFFBEWGXFWZK3HTUFI2AOI5IJUZAX2W5KM2PXIFIQ'
  const ADDRESS = 'GB4HCKVMM6SVPVSO7SFYS7DUU2C5KESP3ZOVGOHG32MLC7T4B6G4ZBLO'
  const VALID_DATA = 'AAAAAgAAAAA0EqaLPO0bvBPvzGz4wucBtxmNXs'

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sendTransaction', () => {
    it('valid', async () => {
      mockGetAccountInfo()
      mockedApi.blockchain.xlm.xlmBroadcast.mockResolvedValue({ txId: '12345' })

      const result = await txService.sendTransaction(
        {
          fromAccount: ADDRESS,
          amount: AMOUNT,
          fromSecret: SECRET,
          to: ADDRESS,
        },
        { testnet: true },
      ) as TransactionHash

      expect(result.txId).toBe('12345')
      testHelper.expectMockCalled(mockedApi.blockchain.xlm.xlmBroadcast)
    })
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {
      mockGetAccountInfo()

      const result = await txService.prepareSignedTransaction(
        {
          fromAccount: ADDRESS,
          amount: AMOUNT,
          fromSecret: SECRET,
          to: ADDRESS,
        },
        { testnet: true },
      )

      expect(result).toContain(VALID_DATA)
    })

    it('no sequence', async () => {
      mockGetAccountInfo({})

      await expect(
        txService.prepareSignedTransaction(
          {
            fromAccount: ADDRESS,
            amount: AMOUNT,
            fromSecret: SECRET,
            to: ADDRESS,
          },
          { testnet: true },
        ),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.XLM_NO_SEQUENCE)
    })

    describe('Wrong cases', () => {
      it.each([
        [
          {
            fromAccount: ADDRESS,
            amount: '0',
            fromSecret: SECRET,
            to: ADDRESS,
          },
          SdkErrorCode.VALIDATION_AMOUNT,
        ],
        [
          {
            fromAccount: ADDRESS,
            amount: AMOUNT,
            fromSecret: 'SCFCTIS5326CRI3XFFBEWGXFWZK3HTUFI2AOI5IJUZAX2W5KM2PXIFII',
            to: ADDRESS,
          },
          SdkErrorCode.SECRET_CHECKSUM,
        ],
        [
          {
            fromAccount: ADDRESS,
            amount: AMOUNT,
            fromSecret: SECRET,
            to: 'GB4HCKVMM6SVPVSO7SFYS7DUU2C5KESP3ZOVGOHG32MLC7T4B6G4ZBLL',
          },
          SdkErrorCode.VALIDATION_TO_ADDRESS,
        ],
      ])('%s', async (body, error: SdkErrorCode) => {
        mockGetAccountInfo()

        await expect(
          txService.prepareSignedTransaction(body, { testnet: true }),
        ).rejects.toThrowSdkErrorWithCode(error)
      })
    })
  })

  function mockGetAccountInfo(args: XlmAccount = { sequence: '123' }) {
    mockedApi.blockchain.xlm.xlmGetAccountInfo.mockResolvedValue(args)
  }
})
