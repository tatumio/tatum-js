import { TatumXrpSDK } from '../xrp.sdk'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'
import { xrpLikeWalletTestFactory } from '@tatumio/shared-testing-xrp-based'
import { xrpWallet } from '../services/xrp.sdk.wallet'

describe('XrpSDK - wallet', () => {
  const sdk = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })
  describe('Generate wallet', () => {
    xrpLikeWalletTestFactory.generateWallet(sdk.wallet, TEST_DATA.XRP)
  })

  describe('isValidAddress', () => {
    it('positive',  () => {
      expect(xrpWallet().isValidAddress('rfoNrrbwp2WGtLpKTZTCEnP93FgT4UrpP2')).toBeTruthy()
    })

    describe('negative', () => {
      it.each([
        [''],
        ['abcd'],
        [0],
        ['12345'],
        [null],
        [undefined],
      ])('%s',  (value: any) => {
        expect(xrpWallet().isValidAddress(value)).toBeFalsy()
      })
    })
  })

  describe('isValidSecret', () => {
    it('positive',  () => {
      expect(xrpWallet().isValidSecret('ssTt8QD5UA9XPgoS8PMg9C2uWdWFp')).toBeTruthy()
      expect(xrpWallet().isValidSecret('sEdS6YvwLbrSs75hiP3SmQ2yHgnYe4G')).toBeTruthy()
    })

    describe('negative', () => {
      it.each([
        [''],
        ['abcd'],
        [0],
        ['12345'],
        [null],
        [undefined],
      ])('%s',  (value: any) => {
        expect(xrpWallet().isValidSecret(value)).toBeFalsy()
      })
    })
  })
})
