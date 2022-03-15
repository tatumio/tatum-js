import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'
import { expectHexString } from '@tatumio/shared-testing-common'

export const xrpLikeWalletTestFactory = {
  generateWallet: (
    sdk: SdkWithXrpLikeWalletFunction,
    testData: { ADDRESS_REGEX: RegExp; SECRET_REGEX: RegExp },
  ) => {
    describe('XRP-like Wallet', () => {
      it('Generate wallet', async () => {
        const wallet = sdk.wallet()
        console.log(wallet)
        expect(wallet.address).toMatch(testData.ADDRESS_REGEX)
        if (wallet['secret']) {
          expect(wallet['secret'] || wallet['privateKey']).toMatch(testData.SECRET_REGEX)
        } else {
          expectHexString(wallet['privateKey'])
        }
      })
    })
  },
}
