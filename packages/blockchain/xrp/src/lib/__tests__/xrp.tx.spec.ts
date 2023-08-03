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
    '1200002200000000240000007B201B000001F5614000000000000001684000000000002710732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C7446304402203AC92E2B3B7FE1C81DDF477496A31AB0B82344BC0428EDE3AEB7C94955AC2C24022013644C814B8165D553760A80254B44ACC56C4114840FA6FED8092F71097BC65C8114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C'
  const VALID_TX_DATA_DEFAULT_FEE =
    '1200002200000000240000007B201B000001F56140000000000000016840000000000003E8732102A6736884D857E721F19B91226FBA68D638009FA44B14CD46C63CC30253C8715C7446304402204EAE23F3D1F35642B2A55652F22A4D8B02A956B2C08C6F303DC001AE65FA118602207D618965B3BAC5C911E5841ECB687E6AB0E83F5DB7CB6E2E2FBF11EF62883B0F8114C8A4688E754167637D0E2C00F14C7E15AAFDA42C8314C8A4688E754167637D0E2C00F14C7E15AAFDA42C'

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
