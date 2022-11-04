import { TatumDogeSDK } from '@tatumio/doge'

const dogeSDK = TatumDogeSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function dogeWalletExample() {
  const options = { testnet: true }

  // Generate new wallet
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateWallet
  const { mnemonic, xpub } = await dogeSDK.wallet.generateWallet(undefined, options)

  // Generate addresses by derivation indexes from xpub
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddress
  const address0 = dogeSDK.wallet.generateAddressFromXPub(xpub, 0, options)
  const address1 = dogeSDK.wallet.generateAddressFromXPub(xpub, 1, options)
  const address2 = dogeSDK.wallet.generateAddressFromXPub(xpub, 2, options)
  console.log('Address 0', address0)
  console.log('Address 1', address1)
  console.log('Address 2', address2)

  // Generate private keys by derivation indexes from mnemonic
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddressPrivateKey
  const privateKey0Address = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, options)
  const privateKey1Address = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, options)
  const privateKey2Address = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 2, options)
  console.log('Private key 0', privateKey0Address)
  console.log('Private key 1', privateKey1Address)
  console.log('Private key 2', privateKey2Address)
}
