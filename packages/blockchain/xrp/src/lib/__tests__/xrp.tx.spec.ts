import '@tatumio/shared-testing-common'
import { xrpTxService } from '../services/xrp.tx'
import { mockHelper, testHelper } from '@tatumio/shared-testing-common'
import * as apiClient from '@tatumio/api-client'
import { TransactionHash, XrpAccount, XrpFee } from '@tatumio/api-client'
import { SdkErrorCode } from '@tatumio/shared-abstract-sdk'

jest.mock('@tatumio/api-client')
const mockedApi = mockHelper.mockApi(apiClient)

describe('XrpSDK - TX', () => {
  const txService = xrpTxService({
    getAccountDetail: mockedApi.blockchain.xrp.xrpGetAccountInfo,
    getFee: mockedApi.blockchain.xrp.xrpGetFee,
  })

  const SECRET = 'shunwft7BwrFHdcXmAA87CazLsRMY'
  const SECRET_WRONG = 'shunwft7BwrFHdcXmAA87CazLssMY'
  const ACCOUNT = 'rKHuaCVSzJCFh43ji9EvFAysmu1KHdMb8N'
  const FEE = '0.01'
  const AMOUNT = '1'
  const VALID_TX_DATA_CUSTOM_FEE =
    '1200002200000000240000007B201B000001F56140000000000F4240684000000000002710732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C74473045022100E022237081306A48499BAD7B837CADC1B98BC198666E2C2D0014316C0A24F73E02206E42C02ED4788F549F35288FA36B2C732247049764EF52569EC2D881B094513C8114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C'
  const VALID_TX_DATA_DEFAULT_FEE =
    '1200002200000000240000007B201B000001F56140000000000F42406840000000000003E8732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C74473045022100F76635FA6F6D73301504E2CE6ABE87003CDA4C586F363D42CB581BE060C3A6F702206695FC16F34814FA785858C1905D17FA9CC03B95ABDF6A4CD23463295101547F8114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C'

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('sendTransaction', () => {
    it('valid', async () => {
      mockGetAccountInfo()
      mockGetFee()
      mockedApi.blockchain.xrp.xrpBroadcast.mockResolvedValue({ txId: '12345' })

      const result = (await txService.sendTransaction({
        fromSecret: SECRET,
        fromAccount: ACCOUNT,
        amount: AMOUNT,
        to: ACCOUNT,
      })) as TransactionHash

      expect(result['txId']).toBe('12345')
      testHelper.expectMockCalled(mockedApi.blockchain.xrp.xrpBroadcast, [
        { txData: VALID_TX_DATA_DEFAULT_FEE },
      ])
    })

    it('valid - custom fee', async () => {
      mockGetAccountInfo()
      mockGetFee()
      mockedApi.blockchain.xrp.xrpBroadcast.mockResolvedValue({ txId: '12345' })

      const result = (await txService.sendTransaction({
        fromSecret: SECRET,
        fromAccount: ACCOUNT,
        fee: FEE,
        amount: AMOUNT,
        to: ACCOUNT,
      })) as TransactionHash

      expect(result['txId']).toBe('12345')
      testHelper.expectMockCalled(mockedApi.blockchain.xrp.xrpBroadcast, [
        { txData: VALID_TX_DATA_CUSTOM_FEE },
      ])
    })
  })

  describe('prepareSignedTransaction', () => {
    it('valid', async () => {
      mockGetAccountInfo()
      mockGetFee()

      const signed = await txService.prepareSignedTransaction({
        fromSecret: SECRET,
        fromAccount: ACCOUNT,
        amount: AMOUNT,
        to: ACCOUNT,
      })

      expect(signed).toBe(VALID_TX_DATA_DEFAULT_FEE)
    })

    it('valid - custom fee', async () => {
      mockGetAccountInfo()
      mockGetFee()

      const signed = await txService.prepareSignedTransaction({
        fromSecret: SECRET,
        fromAccount: ACCOUNT,
        fee: FEE,
        amount: AMOUNT,
        to: ACCOUNT,
      })

      expect(signed).toBe(VALID_TX_DATA_CUSTOM_FEE)
    })

    it('fee = 0', async () => {
      mockGetAccountInfo()
      mockGetFee()

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
      mockGetFee()

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
      account_data: { Sequence: 123, Balance: '1000000000' },
    },
  ) {
    return mockedApi.blockchain.xrp.xrpGetAccountInfo.mockResolvedValue(args)
  }

  function mockGetFee(args: XrpFee = { drops: { base_fee: '1000' } }) {
    return mockedApi.blockchain.xrp.xrpGetFee.mockResolvedValue(args)
  }
})
