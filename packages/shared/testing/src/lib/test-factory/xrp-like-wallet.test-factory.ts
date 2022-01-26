import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'

export const xrpLikeWalletTestFactory = {
  generateWallet: (
    sdk: SdkWithXrpLikeWalletFunction,
    testData: { ADDRESS_REGEX: RegExp; SECRET_REGEX: RegExp },
  ) => {
    describe('XRP-like Wallet', () => {
      it('Generate wallet', async () => {
        const { address, secret } = await sdk.wallet()
        expect(address).toMatch(testData.ADDRESS_REGEX)
        expect(secret).toMatch(testData.SECRET_REGEX)
      })
    })
  },
}
