import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function ltcWalletExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Generate a LTC wallet
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateWallet
  const { mnemonic, xpub } = await ltcSDK.wallet.generateWallet(undefined, { testnet: true })
  console.log(`Mnemonic: ${mnemonic}`)
  console.log(`Xpub: ${xpub}`)

  // Generate an LTC private key
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateAddressPrivateKey
  const privateKey = await ltcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log(`Private key: ${privateKey}`)

  // Generate LTC deposit address from xpub
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateAddress
  const addressFromXpub = ltcSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log(`Address from xpub: ${addressFromXpub}`)
}
