import { TatumBchSDK } from '@tatumio/bch'

export async function bchVirtualAccountExample() {
  // Virtual account example
  // We will receive assets on account and withdraw it
  // More info here: https://docs.tatum.io/guides/ledger-and-off-chain

  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // if you don't already have a wallet, address and private key - generate them
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateWallet
  const { mnemonic, xpub } = await bchSDK.wallet.generateWallet(null, { testnet: true })
  console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)

  // Generate PrivateKey from Mnemonic with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddressPrivateKey
  const privateKey = await bchSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log('PrivateKey: ', privateKey)

  // Generate Address from xpub with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddress
  const to = bchSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log('Address:', to)

  // Generate new virtual account for BCH with specific blockchain address
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await bchSDK.ledger.account.create({
    currency: 'BCH',
    xpub: xpub,
  })
  console.log('Virtual Account', JSON.stringify(virtualAccount))

  // Create a deposit address for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await bchSDK.virtualAccount.depositAddress.create(virtualAccount.id)
  console.log('Virtual Account address', address)

  // Fund your address here: https://faucet.fullstack.cash/
  console.log(
    `Fund me here (https://faucet.fullstack.cash/) for address: ${address.address} to send virtual account transaction!`,
  )

  // If you have funds on account - you can transfer it to another bch address
  // Using keyPair - addresses which are used as a source of the transaction are entered manually
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-operations#operation/BchTransfer
  const resultKeyPair = await bchSDK.virtualAccount.send(true, {
    senderAccountId: virtualAccount.id,
    address: 'xxxxxxxxx',
    amount: '0.001',
    keyPair: [
      {
        address: address.address,
        privateKey: privateKey,
      },
    ],
    fee: '0.0005',
    attr: address.address,
  })
  console.log('Transaction using keypair: ', resultKeyPair)

  // If you have funds on account - you can transfer it to another bch address
  // Using mnemonic - all of the addresses, that are generated from the mnemonic are scanned for the incoming deposits which are used as a source of the transaction.
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-operations#operation/BchTransfer
  const result = await bchSDK.virtualAccount.send(true, {
    senderAccountId: virtualAccount.id,
    address: 'xxxxxxx',
    amount: '0.001',
    mnemonic: mnemonic,
    xpub: xpub,
  })
  console.log('Transaction using mnemonic: ', result)

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
  console.log('Addresses: ', addresses)

  // Check whether a blockchain address is assigned to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await bchSDK.virtualAccount.depositAddress.checkExists(address.address)
  console.log('Virtual Account: ', account)

  // Get all deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await bchSDK.virtualAccount.depositAddress.getByAccount(virtualAccount.id)
  console.log('Address: ', addressByAccount)

  // Remove a deposit address from a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await bchSDK.virtualAccount.depositAddress.remove(virtualAccount.id, '7c21ed165e294db78b95f0f181086d6f')
}
