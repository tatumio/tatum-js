import { TatumCeloSDK } from '@tatumio/celo'

const celoSDK = TatumCeloSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
export async function celoVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateWallet
  const { mnemonic, xpub } = await celoSDK.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddressPrivateKey
  const fromPrivateKey = await celoSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/Celo#operation/CeloGenerateAddress
  const to = celoSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for CELO with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await celoSDK.ledger.account.create({
    currency: 'CELO',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await celoSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // Fund your address here: https://testnet.binance.org/faucet-smart
  console.log(`Fund me ${depositAddress.address} to send offchain transaction!`)

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/CeloOrErc20Transfer
  const result = await celoSDK.virtualAccount.send(
    {
      senderAccountId: virtualAccount.id,
      amount: '1',
      fromPrivateKey,
      address: to,
      feeCurrency: 'CELO',
    },
    true,
  )

  console.log(JSON.stringify(result))
}
