import { TatumKlaytnSDK } from '@tatumio/klaytn'

const klaytnSDK = TatumKlaytnSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function klaytnVirtualAccountExample() {
  // if you don't already have a wallet, address and private key - generate them
  // https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateWallet
  const { mnemonic, xpub } = await klaytnSDK.wallet.generateWallet(undefined, { testnet: true })
  // /https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnGenerateAddressPrivateKey
  const privateKey = await klaytnSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const to = klaytnSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for KLAY with specific blockchain address
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await klaytnSDK.ledger.account.create({
    currency: 'KLAY',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // create deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const depositAddress = await klaytnSDK.virtualAccount.depositAddress.create(virtualAccount.id)

  console.log(`Deposit address is ${depositAddress.address}`)

  // Fund your address here: https://baobab.wallet.klaytn.foundation/faucet
  console.log(`Fund me ${depositAddress.address} to send offchain transaction!`)

  // I wanna send assets from virtualAccount to blockchain address
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/KlayTransfer
  const result = await klaytnSDK.virtualAccount.send({
    senderAccountId: virtualAccount.id,
    amount: '1',
    privateKey,
    address: to,
  })

  console.log(JSON.stringify(result))
}
