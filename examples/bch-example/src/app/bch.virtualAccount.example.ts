import { TatumBchSDK } from '@tatumio/bch'

export async function bchVirtualAccountExample() {
  // Virtual account example
  // We will receive assets on account and withdraw it
  // More info here: https://docs.tatum.io/guides/ledger-and-off-chain

  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // if you don't already have a wallet, address and private key - generate them
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateWallet
  const { mnemonic, xpub } = await bchSDK.wallet.generateWallet()

  // Generate PrivateKey from Mnemonic with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddressPrivateKey
  const fromPrivateKey = await bchSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // Generate Address from xpub with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddress
  const to = bchSDK.wallet.generateAddressFromXPub(xpub, 1)

  // Generate new virtual account for BCH with specific blockchain address
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await bchSDK.ledger.account.create({
    currency: 'BCH',
    xpub: xpub,
  })
  console.log(JSON.stringify(virtualAccount))

  // Create a deposit address for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await bchSDK.virtualAccount.depositAddress.create(virtualAccount.id)
  console.log(address)

  // Fund your address here: https://faucet.fullstack.cash/
  console.log(`Fund me ${address.address} to send virtual account transaction!`)

  // Create multiple deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddressesBatch
  const addresses = await bchSDK.virtualAccount.depositAddress.createMultiple({
    addresses: [
      {
        accountId: virtualAccount.id,
        derivationKey: 0,
      },
      {
        accountId: virtualAccount.id,
        derivationKey: 1,
      },
    ],
  })
  console.log(addresses)

  // Check whether a blockchain address is assigned to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await bchSDK.virtualAccount.depositAddress.checkExists(address.address)
  console.log(account)

  // Assign a blockchain address to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const assignedAddress = await bchSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  console.log(assignedAddress)

  // Get all deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await bchSDK.virtualAccount.depositAddress.getByAccount(virtualAccount.id)
  console.log(addressByAccount)

  // Remove a deposit address from a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await bchSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
}
