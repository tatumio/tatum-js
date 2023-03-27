import { TatumCardanoSDK } from '@tatumio/cardano'

const cardanoSDK = TatumCardanoSDK({ apiKey: '03fea4e2-9c66-453d-b760-e0318182ae74' })

export async function cardanoWalletExample() {
  const options = { testnet: true }

  // Generate new wallet
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGenerateWallet
  const { mnemonic, xpub } = await cardanoSDK.wallet.generateWallet()

  // Generate addresses by derivation indexes from xpub
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGenerateAddress
  const address0 = await cardanoSDK.wallet.generateAddressFromXPub(xpub, 0, options)
  const address1 = await cardanoSDK.wallet.generateAddressFromXPub(xpub, 1, options)
  const address2 = await cardanoSDK.wallet.generateAddressFromXPub(xpub, 2, options)
  console.log('Address 0', address0)
  console.log('Address 1', address1)
  console.log('Address 2', address2)

  // Generate private keys by derivation indexes from mnemonic
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGenerateAddressPrivateKey
  const privateKey0Address = await cardanoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  const privateKey1Address = await cardanoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1)
  const privateKey2Address = await cardanoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 2)
  console.log('Private key 0', privateKey0Address)
  console.log('Private key 1', privateKey1Address)
  console.log('Private key 2', privateKey2Address)
}
