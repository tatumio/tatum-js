import { TatumBtcSDK } from '@tatumio/btc'

export async function btcVirtualAccountExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Create an extended public key
  const { mnemonic, xpub } = await btcSDK.wallet.generateWallet(undefined, { testnet: true })
  const { xpub: plainXpub } = await btcSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate a blockchain address from xpub (for the plainAccount)
  const plainAccountAddress = btcSDK.wallet.generateAddressFromXPub(plainXpub, 1, { testnet: true })

  // Create an account with xpub and without xpub
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccount
  const xpubAccount = await btcSDK.ledger.account.create({
    currency: 'BTC',
    xpub,
  })
  console.log(`Created xpub account: ${JSON.stringify(xpubAccount)}`)
  const plainAccount = await btcSDK.ledger.account.create({
    currency: 'BTC',
  })
  console.log(`Created account: ${JSON.stringify(plainAccount)}`)

  // Check if an account exists
  try {
    const account = await btcSDK.virtualAccount.depositAddress.checkExists(xpubAccount.id)
    console.log(`Account: ${JSON.stringify(account)}`)
  } catch (e) {
    console.log(`Account: ${e.message}`)
  }

  // Create a deposit address for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await btcSDK.virtualAccount.depositAddress.create(xpubAccount.id, 1)
  console.log(`Deposit address: ${JSON.stringify(address)}`)

  // Create multiple deposit addresses for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccountBatch
  const addresses = await btcSDK.virtualAccount.depositAddress.createMultiple({
    addresses: [
      {
        accountId: xpubAccount.id,
        derivationKey: 2,
      },
      {
        accountId: xpubAccount.id,
        derivationKey: 3,
      },
    ],
  })
  console.log(`Deposit addresses: ${JSON.stringify(addresses)}`)

  // Assign a given deposit address to a given account (non-xpub account is mandatory)
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const assignedAddress = await btcSDK.virtualAccount.depositAddress.assign(
    plainAccount.id,
    plainAccountAddress,
    1,
  )
  console.log(`Assign address: ${JSON.stringify(assignedAddress)}`)

  // Get all deposit addresses for an account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await btcSDK.virtualAccount.depositAddress.getByAccount(xpubAccount.id)
  console.log(`Account addresses: ${JSON.stringify(addressByAccount)}`)

  // Remove a deposit address from an account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await btcSDK.virtualAccount.depositAddress.remove(plainAccount.id, plainAccountAddress)

  // Fund your address here: http://testnet.litecointools.com/
  console.log(`Fund me ${address.address} to send virtual account transaction!`)

  // Send assets from virtualAccount to blockchain address
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/BTC-testnet/
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BTCTransfer
  const transfer = await btcSDK.virtualAccount.send({
    senderAccountId: xpubAccount.id,
    amount: '0.0001',
    mnemonic: mnemonic,
    xpub: xpub,
    address: plainAccountAddress,
    fee: '0.00001',
  })

  console.log(JSON.stringify(transfer))
}
