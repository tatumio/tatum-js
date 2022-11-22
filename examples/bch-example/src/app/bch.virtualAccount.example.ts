import { TatumBchSDK } from '@tatumio/bch'
import { sleepSeconds } from '@tatumio/shared-abstract-sdk'

export async function bchVirtualAccountExample() {
  // 
  // For information about virtual accounts, refer to https://docs.tatum.io/guides/ledger-and-off-chain.

  // Specify the recipient address and the amount to sent.
  const recipientAddress = 'bchtest:qzwj3wzvh20qjtmwhzmcfu7d85n7epecz5q4hrclrl'
  const valueToSend = '0.01'
  const fee = '0.0005'

  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Generate a Bitcoin Cash wallet.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateWallet
  const { mnemonic, xpub } = await bchSDK.wallet.generateWallet(null, { testnet: true })
  console.log(`Mnemonic: ${mnemonic} - xpub: ${xpub}`)

  // Generate the private key with a specified index from the wallet's mnemonic.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddressPrivateKey
  const privateKey = await bchSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  console.log('PrivateKey: ', privateKey)

  // Generate an address with the specified index from the wallet's xpub.
  // https://apidoc.tatum.io/tag/Bitcoin-Cash#operation/BchGenerateAddress
  const to = bchSDK.wallet.generateAddressFromXPub(xpub, 0, { testnet: true })
  console.log('Address:', to)

  // Generate a virtual account for BCH based on the xpub of the Bitcoin Cash account (wallet) that you created earlier.
  // https://apidoc.tatum.io/tag/Account#operation/createAccount
  const virtualAccount = await bchSDK.ledger.account.create({
    currency: 'BCH',
    xpub: xpub,
  })
  console.log('Virtual Account', JSON.stringify(virtualAccount))

  // Generate a deposit address for the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await bchSDK.virtualAccount.depositAddress.create(virtualAccount.id)
  console.log('Virtual Account address', address)

  // Fund the deposit address with BCH using https://faucet.fullstack.cash/.
  console.log(
    `Fund me here (https://faucet.fullstack.cash/) for address: ${address.address} to send virtual account transaction!`,
  )

  console.log('If it take more than 1min, you will have to replace the account info in the send method')

  await sleepSeconds(60)

  // Send some amount of BTC from the virtual account to recipient address using keyPair: manually enter the addresses that are used as a source of the transaction.
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BchTransfer
  const resultKeyPair = await bchSDK.virtualAccount.send(true, {
    senderAccountId: virtualAccount.id,
    address: recipientAddress,
    amount: valueToSend,
    keyPair: [
      {
        address: address.address,
        privateKey: privateKey,
      },
    ],
    fee,
    attr: address.address,
  })
  console.log('Transaction using keypair: ', resultKeyPair)

  // Send some amount of BTC from the virtual account to the recipient address using the mnemonic: all the addresses that are generated from the mnemonic are scanned for incoming deposits, which are used as a source of the transaction.
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BchTransfer
  const result = await bchSDK.virtualAccount.send(true, {
    senderAccountId: virtualAccount.id,
    address: recipientAddress,
    amount: valueToSend,
    mnemonic: mnemonic,
    xpub: xpub,
  })
  console.log('Transaction using mnemonic: ', result)

  // Generate multiple deposit addresses for the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddressesBatch
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

  // Check whether a blockchain address is assigned to the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await bchSDK.virtualAccount.depositAddress.checkExists(address.address)
  console.log('Virtual Account: ', account)

  // Get all deposit addresses for the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await bchSDK.virtualAccount.depositAddress.getByAccount(virtualAccount.id)
  console.log('Address: ', addressByAccount)

  // Remove a deposit address from the virtual account.
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await bchSDK.virtualAccount.depositAddress.remove(virtualAccount.id, address.address)
}
