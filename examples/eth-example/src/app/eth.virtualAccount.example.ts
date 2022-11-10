import { TatumEthSDK } from '@tatumio/eth'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const ethSdk = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateWallet
  const { mnemonic, xpub } = await ethSdk.wallet.generateWallet(undefined, { testnet: true })
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddressPrivateKey
  const fromPrivateKey = await ethSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, { testnet: true })

  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddress
  const receiverAddress = ethSdk.wallet.generateAddressFromXPub(xpub, 0)

  // Generate new virtual account for ETH with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await ethSdk.ledger.account.create({
    currency: 'ETH',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await ethSdk.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // Fund your address here: https://faucet.sepolia.dev/
  console.log(
    `(Waiting 60 seconds). PLEASE FUND ADDRESS to run this example. Address = ${depositAddress.address}`,
  )
  await sleepSeconds(60)

  const balance = await ethSdk.ledger.account.getBalance(virtualAccount.id)
  console.log(`Virtual account balance is: ${JSON.stringify(balance)}`)

  // I wanna send ETH from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/EthTransfer
  const result = await ethSdk.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '0.01',
    privateKey: fromPrivateKey,
    address: receiverAddress,
  })

  console.log(JSON.stringify(result))
}
