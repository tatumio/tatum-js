import { TatumEthSDK } from '@tatumio/eth'

const ethSdk = TatumEthSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function ethVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateWallet
  const { mnemonic, xpub } = await ethSdk.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddressPrivateKey
  const fromPrivateKey = await ethSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/Ethereum#operation/EthGenerateAddress
  const to = ethSdk.wallet.generateAddressFromXPub(xpub, 1)

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
  console.log(`Fund me ${depositAddress.address} to send offchain transaction!`)

  // I wanna send ETH from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/EthTransfer
  const result = await ethSdk.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    privateKey: fromPrivateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}
