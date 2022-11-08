import { TatumCeloSDK } from '@tatumio/celo'
import { Currency } from '@tatumio/api-client'

const celoSdk = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function celoVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateWallet
  const { mnemonic, xpub } = await celoSdk.wallet.generateWallet(undefined, { testnet: true })
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddressPrivateKey
  const fromPrivateKey = await celoSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })

  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddress
  const to = celoSdk.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for celo with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await celoSdk.ledger.account.create({
    currency: Currency.CELO,
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await celoSdk.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // Fund your address here: https://faucet.sepolia.dev/
  console.log(`Fund me ${depositAddress.address} to send offchain transaction!`)

  // I wanna send celo from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/CeloOrErc20Transfer
  const result = await celoSdk.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    feeCurrency: 'CELO',
    amount: '0.001',
    privateKey: fromPrivateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}
