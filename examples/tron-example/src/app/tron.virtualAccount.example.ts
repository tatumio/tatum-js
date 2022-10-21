import { TatumTronSDK } from '@tatumio/tron'

const tronSDK = TatumTronSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
export async function tronVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Tron#operation/GenerateTronwallet
  const { mnemonic, xpub } = await tronSDK.wallet.generateWallet()
  //https://apidoc.tatum.io/tag/Tron#operation/TronGenerateAddressPrivateKey
  const fromPrivateKey = await tronSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1)
  // https://apidoc.tatum.io/tag/Tron#operation/TronGenerateAddress
  const to = tronSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for TRON with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await tronSDK.ledger.account.create({
    currency: 'TRON',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await tronSDK.offchain.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // FUND YOUR ACCOUNT WITH TRX FROM https://twitter.com/TronTest2

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/TronTransferOffchain
  const result = await tronSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    fromPrivateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}
