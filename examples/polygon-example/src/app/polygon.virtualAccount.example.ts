import { TatumPolygonSDK } from '@tatumio/polygon'
import { Currency } from '@tatumio/api-client'

const polygonSDK = TatumPolygonSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function polygonVirtualAccountExample() {
  // Generate wallet
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateWallet
  const { mnemonic, xpub } = await polygonSDK.wallet.generateWallet()
  // Generate private key
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const privateKey = await polygonSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // Generate destination address
  // https://apidoc.tatum.io/tag/Polygon#operation/PolygonGenerateAddressPrivateKey
  const to = polygonSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for Polygon with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await polygonSDK.ledger.account.create({
    currency: Currency.MATIC,
    xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await polygonSDK.virtualAccount.depositAddress.create(virtualAccount.id)
  console.log(`Deposit address is ${depositAddress.address}`)

  // FUND YOUR ACCOUNT WITH MATIC FROM https://faucet.matic.network/

  const balance = await polygonSDK.ledger.account.getBalance(virtualAccount.id)
  console.log(`Virtual account balance is: ${JSON.stringify(balance)}`)

  // Send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/PolygonTransfer
  const result = await polygonSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    privateKey,
    address: to,
  })
  console.log(JSON.stringify(result))
}
