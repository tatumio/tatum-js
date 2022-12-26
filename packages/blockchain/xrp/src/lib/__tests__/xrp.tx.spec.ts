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
    '1200002280000000240000007B201B000001F56140000000000F4240684000000000002710732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C7446304402206C823B0B767290B1585A65DEFCBFC086495F4910D742A7AE5A2FEE8401BB55AF022004FE7441F2DA628966F37A1944E5F62445E415AEA5DB6F44975B07A17DAFC4FC8114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C'
  const VALID_TX_DATA_DEFAULT_FEE =
    '1200002280000000240000007B201B000001F56140000000000F42406840000000000003E8732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C7447304502210089F4829E5C61D8A0ECE3A8E96A188148C4629447E6780786F4C7EAF3AD268010022012C6F0DB7F1E27D632F0ABC9BD087152882BAD618EE62A4831CB9F18AC5943988114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C'

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
