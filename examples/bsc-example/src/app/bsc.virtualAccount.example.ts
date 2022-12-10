import { TatumBscSDK } from '@tatumio/bsc'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const bscSdk = TatumBscSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function bscVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateWallet
  const { mnemonic, xpub } = await bscSdk.wallet.generateWallet(undefined, { testnet: true })
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddressPrivateKey
  const fromPrivateKey = await bscSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, { testnet: true })

  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscGenerateAddress
  const receiverAddress = bscSdk.wallet.generateAddressFromXPub(xpub, 0)

  // Generate new virtual account for BSC with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await bscSdk.ledger.account.create({
    currency: 'BSC',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await bscSdk.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // Fund your address here: https://testnet.binance.org/faucet-smart
  console.log(
    `(Waiting 60 seconds). PLEASE FUND ADDRESS to run this example. Address = ${depositAddress.address}`,
  )
  await sleepSeconds(60)

  const balance = await bscSdk.ledger.account.getBalance(virtualAccount.id)
  console.log(`Virtual account balance is: ${JSON.stringify(balance)}`)

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BscOrBepTransfer
  const result = await bscSdk.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '0.01',
    privateKey: fromPrivateKey,
    address: receiverAddress,
  })

  console.log(JSON.stringify(result))
}
