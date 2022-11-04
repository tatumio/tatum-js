import { TatumDogeSDK } from '@tatumio/doge'

const dogeSDK = TatumDogeSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function dogeVirtualAccountExample() {
  // Virtual account example
  // We will receive assets on account and withdraw it
  // More info here: https://docs.tatum.io/guides/ledger-and-off-chain

  // Generate mnemonic and private key (or use your own)
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateWallet
  const { mnemonic, xpub } = await dogeSDK.wallet.generateWallet()

  // Generate address for 0 and 1 indexes from xpub
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddress
  const addressToFund = dogeSDK.wallet.generateAddressFromXPub(xpub, 0)

  // Generate new virtual account for DOGE with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await dogeSDK.ledger.account.create({
    currency: 'DOGE',
    xpub,
  })
  console.log('Virtual account: ' + JSON.stringify(virtualAccount))

  // Create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await dogeSDK.virtualAccount.depositAddress.create(virtualAccount.id)
  const depositAddressPrivateKey = await dogeSDK.wallet.generatePrivateKeyFromMnemonic(
    mnemonic,
    depositAddress.derivationKey,
  )
  console.log(`Deposit address is ${depositAddress.address}`)

  // Here it is needed to fund deposit address and check if we have balance on it

  // Generate test recipient from another xpub
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateWallet
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddress
  const { mnemonic: mnemonicRecipient, xpub: xpubRecipient } = await dogeSDK.wallet.generateWallet()
  const recipientAddress = dogeSDK.wallet.generateAddressFromXPub(xpubRecipient, 0)

  // If you have funds on account - you can transfer it to another DOGE address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/DogeTransfer
  const result = await dogeSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    keyPair: [
      {
        address: addressToFund,
        privateKey: depositAddressPrivateKey,
      },
    ],
    fee: '0.1',
    attr: addressToFund,
    address: recipientAddress,
  })

  console.log('Transaction result: ' + JSON.stringify(result))
}
