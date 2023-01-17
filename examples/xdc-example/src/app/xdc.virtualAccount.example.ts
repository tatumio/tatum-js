import { TatumXdcSDK } from '@tatumio/xdc'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcVirtualAccountExample() {
  // Generate a XinFin account.
  // You will use the xpub of this account to generate a virtual account.
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate a private key for the account.
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddressPrivateKey
  const privateKey = await xdcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, { testnet: true })

  // Generate an address for the account.
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddress
  const receiverAddress = xdcSDK.wallet.generateAddressFromXPub(xpub, 0)

  // Generate a virtual account for XDC based on the xpub of the XinFin account that you created earlier.
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xdcSDK.ledger.account.create({
    currency: 'XDC',
    xpub: xpub,
  })
  console.log(`Virtual account`, virtualAccount)

  // Generate a deposit address for the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xdcSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address`, depositAddress.address)

  // Fund the deposit address with XDC using https://faucet.apothem.network/.
  console.log(
    `(Waiting 60 seconds). PLEASE FUND ADDRESS to run this example. Address = ${depositAddress.address}`,
  )
  await sleepSeconds(60)

  const balance = await xdcSDK.ledger.account.getBalance(virtualAccount.id)
  console.log(`Virtual account balance is: ${JSON.stringify(balance)}`)

  // Send some amount of XDC from the virtual account to a blockchain address.
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/XdcTransfer
  const result = await xdcSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '0.01',
    privateKey,
    address: receiverAddress,
  })

  console.log(JSON.stringify(result))
}
