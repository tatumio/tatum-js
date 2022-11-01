import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSDK = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateWallet
  const { mnemonic, xpub } = await xdcSDK.wallet.generateWallet()

  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddressPrivateKey
  const privateKey = await xdcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)
  // https://apidoc.tatum.io/tag/XinFin#operation/XdcGenerateAddress
  const to = xdcSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for XDC with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await xdcSDK.ledger.account.create({
    currency: 'XDC',
    xpub: xpub,
  })
  console.log(`Virtual account`, virtualAccount)

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await xdcSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address`, depositAddress.address)

  // FUND YOUR ACCOUNT WITH XDC FROM https://faucet.apothem.network/
  console.log(`Fund me ${depositAddress.address} to send offchain transaction!`)

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/XdcTransfer
  const result = await xdcSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    privateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}
