import { TatumKcsSDK } from '@tatumio/kcs'

const kcsSdk = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function kcsVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateWallet
  const { mnemonic, xpub } = await kcsSdk.wallet.generateWallet()
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddressPrivateKey
  const fromPrivateKey = await kcsSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddress
  const to = kcsSdk.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for KCS with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await kcsSdk.ledger.account.create({
    currency: 'KCS',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await kcsSdk.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // Fund your address here: https://faucet.sepolia.dev/
  console.log(`Fund me ${depositAddress.address} to send offchain transaction!`)

  // I wanna send KCS from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainTransfer
  const result = await kcsSdk.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    fromPrivateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}
