import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeWalletExample() {
  // Generate new wallet
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateWallet
  const { mnemonic, xpub } = await dogeSDK.wallet.generateWallet()

  // Generate addresses by derivation indexes from xpub
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddress
  const address0 = dogeSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  const address1 = dogeSDK.wallet.generateAddressFromXPub(xpub, 1, { testnet: true })
  const address2 = dogeSDK.wallet.generateAddressFromXPub(xpub, 2, { testnet: true })

  // Generate private keys by derivation indexes from mnemonic
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddressPrivateKey
  const privateKey0Address = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, {
    testnet: true,
  })
  const privateKey1Address = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, {
    testnet: true,
  })
  const privateKey2Address = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 2, {
    testnet: true,
  })
}
