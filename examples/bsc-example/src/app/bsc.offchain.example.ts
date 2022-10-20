import { TatumBscSDK } from '@tatumio/bsc'

const bscSdk = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
export async function bscOffchainExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet
  const { mnemonic, xpub } = await bscSdk.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddress
  const to = bscSdk.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for BSC with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await bscSdk.ledger.account.create({
    currency: 'BSC',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await bscSdk.offchain.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // FUND YOUR ACCOUNT WITH BNB FROM https://testnet.binance.org/faucet-smart

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BscOrBepTransfer
  const result = await bscSdk.offchain.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    fromPrivateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}
