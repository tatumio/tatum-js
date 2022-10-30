import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeOffchainExample() {
  //------------------------------------
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

  // Generate test recepient address for 100 index from xpub
  // https://apidoc.tatum.io/tag/Dogecoin#operation/DogeGenerateAddress
  const recipientAddress = dogeSDK.wallet.generateAddressFromXPub(xpub, 100)

  // Please fund your deposit address
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
