import { TatumCardanoSDK } from '@tatumio/cardano'

const cardanoSDK = TatumCardanoSDK({ apiKey: '03fea4e2-9c66-453d-b760-e0318182ae74' })

export async function cardanoVirtualAccountExample() {
  const options = { testnet: true }
  // Virtual account example
  // We will receive assets on account and withdraw it
  // More info here: https://docs.tatum.io/guides/ledger-and-off-chain

  // Generate mnemonic and private key (or use your own)
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGenerateWallet
  const { mnemonic, xpub } = await cardanoSDK.wallet.generateWallet()

  // Generate address for 0 and 1 indexes from xpub
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGenerateAddress
  const addressToFund = await cardanoSDK.wallet.generateAddressFromXPub(xpub, 0, options)

  // Generate new virtual account for cardano with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await cardanoSDK.ledger.account.create({
    currency: 'cardano',
    xpub,
  })
  console.log('Virtual account: ' + JSON.stringify(virtualAccount))

  // Create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await cardanoSDK.virtualAccount.depositAddress.create(virtualAccount.id)
  const depositAddressPrivateKey = await cardanoSDK.wallet.generatePrivateKeyFromMnemonic(
    mnemonic,
    depositAddress.derivationKey,
  )
  console.log(`Deposit address is ${depositAddress.address}`)

  // Here it is needed to fund deposit address and check if we have balance on it

  // Generate test recipient from another xpub
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGenerateWallet
  // https://apidoc.tatum.io/tag/cardanocoin#operation/cardanoGenerateAddress
  const { mnemonic: mnemonicRecipient, xpub: xpubRecipient } = await cardanoSDK.wallet.generateWallet()
  const recipientAddress = await cardanoSDK.wallet.generateAddressFromXPub(xpubRecipient, 0, options)

  // If you have funds on account - you can transfer it to another cardano address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/cardanoTransfer
  const result = await cardanoSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    mnemonic,
    xpub,
    index: 0,
    fee: '0.1',
    attr: addressToFund,
    address: recipientAddress,
  })

  console.log('Transaction result: ' + JSON.stringify(result))
}
