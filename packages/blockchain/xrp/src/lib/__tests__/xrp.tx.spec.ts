import '@tatumio/shared-testing-common'
import { xrpTxService } from '../services/xrp.tx'
import { mockHelper, testHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { ApiServices, XrpAccount } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

// @TODO SAM FIX
describe.skip('XrpSDK - TX', () => {
  const txService = xrpTxService({
    getAccountDetail: ApiServices.blockchain.xrp.xrpGetAccountInfo,
    getFee: ApiServices.blockchain.xrp.xrpGetFee,
  })

  const SECRET = 'shunwft7BwrFHdcXmAA87CazLsRMY'
  const SECRET_WRONG = 'shunwft7BwrFHdcXmAA87CazLssMY'
  const ACCOUNT = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N'
  const FEE = '0.00001'
  const AMOUNT = '1'
  const VALID_TX_DATA =
    '1200002280000000240000007B201B000001F56140000000000F424068400000000000000A732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C74473045022100CE817CB8040A4C1FF53E4BB90C35530821FEEC03830C51424325B28B595F2C1102206DA8E56E799DD6040B8C4A47B58F8D077ECE1F7A26429F97521E8DDA864BEC3E8114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C'

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sendTransaction', () => {
    it('valid', async () => {
      mockGetAccountInfo()
      mockedApi.blockchain.xrp.xrpBroadcast.mockResolvedValue({ txId: '12345' })

      const result = await txService.sendTransaction({
        fromSecret: SECRET,
        fromAccount: ACCOUNT,
        fee: FEE,
        amount: AMOUNT,
        to: ACCOUNT,
      })

      expect(result.txId).toBe('12345')
      testHelper.expectMockCalled(mockedApi.blockchain.xrp.xrpBroadcast, [{ txData: VALID_TX_DATA }])
    })
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {
      mockGetAccountInfo()

      const signed = await txService.prepareSignedTransaction({
        fromSecret: SECRET,
        fromAccount: ACCOUNT,
        fee: FEE,
        amount: AMOUNT,
        to: ACCOUNT,
      })

      expect(signed).toBe(VALID_TX_DATA)
    })

    it('fee = 0', async () => {
      mockGetAccountInfo()

      await expect(
        txService.prepareSignedTransaction({
          fromSecret: SECRET,
          fromAccount: ACCOUNT,
          fee: '0',
          amount: AMOUNT,
          to: ACCOUNT,
        }),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.FEE_TOO_SMALL)
    })

    it('secret does not match', async () => {
      mockGetAccountInfo()

      await expect(
        txService.prepareSignedTransaction({
          fromSecret: SECRET_WRONG,
          fromAccount: ACCOUNT,
          fee: FEE,
          amount: AMOUNT,
          to: ACCOUNT,
        }),
      ).rejects.toThrowSdkErrorWithCode(SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH)
    })
  })

  function mockGetAccountInfo(
    args: XrpAccount = {
      ledger_current_index: 1,
      account_data: { Sequence: 123 },
    },
  ) {
    mockedApi.blockchain.xrp.xrpGetAccountInfo.mockResolvedValue(args)
  }
})
