import { TatumKcsSDK } from '@tatumio/kcs'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

const kcsSdk = TatumKcsSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function kcsVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateWallet
  const { mnemonic, xpub } = await kcsSdk.wallet.generateWallet(undefined, { testnet: true })
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddressPrivateKey
  const fromPrivateKey = await kcsSdk.wallet.generatePrivateKeyFromMnemonic(mnemonic, 1, { testnet: true })

  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsGenerateAddress
  const receiverAddress = kcsSdk.wallet.generateAddressFromXPub(xpub, 0)

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

  // Fund your address here: https://faucet-testnet.kcc.network
  console.log(
    `(Waiting 60 seconds). PLEASE FUND ADDRESS to run this example. Address = ${depositAddress.address}`,
  )
  await sleepSeconds(60)

  const balance = await kcsSdk.ledger.account.getBalance(virtualAccount.id)
  console.log(`Virtual account balance is: ${JSON.stringify(balance)}`)

  // I wanna send KCS from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainTransfer
  const result = await kcsSdk.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '0.001',
    fromPrivateKey,
    address: receiverAddress,
  })

  console.log(JSON.stringify(result))
}
