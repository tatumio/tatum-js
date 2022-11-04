import { TatumLtcSDK } from '@tatumio/ltc'

export async function ltcVirtualAccountExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Create an extended public key
  const { mnemonic, xpub } = await ltcSDK.wallet.generateWallet(undefined, { testnet: true })
  const { xpub: plainXpub } = await ltcSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate a blockchain address from xpub (for the plainAccount)
  const plainAccountAddress = ltcSDK.wallet.generateAddressFromXPub(plainXpub, 1, { testnet: true })

  // Generate PrivateKey from Mnemonic with a given index
  // You can find more details in https://apidoc.tatum.io/tag/Litecoin#operation/LtcGenerateAddressPrivateKey
  const privateKey = await ltcSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0)

  // Create an account with xpub and without xpub
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccount
  const xpubAccount = await ltcSDK.ledger.account.create({
    currency: 'LTC',
    xpub,
  })
  console.log(`Created xpub account: ${JSON.stringify(xpubAccount)}`)
  const plainAccount = await ltcSDK.ledger.account.create({
    currency: 'LTC',
  })
  console.log(`Created account: ${JSON.stringify(plainAccount)}`)

  // Check if an account exists
  try {
    const account = await ltcSDK.virtualAccount.depositAddress.checkExists(xpubAccount.id)
    console.log(`Account: ${JSON.stringify(account)}`)
  } catch (e) {
    console.log(`Account: ${e.message}`)
  }

  // Create a deposit address for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await ltcSDK.virtualAccount.depositAddress.create(xpubAccount.id, 1)
  console.log(`Deposit address: ${JSON.stringify(address)}`)

  // Fund your address here: http://testnet.litecointools.com/
  console.log(`Fund me ${address.address} to send virtual account transaction!`)

  // If you have funds on account - you can transfer it to another bch address
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-operations#operation/LtcTransfer
  const result = await ltcSDK.virtualAccount.send({
    senderAccountId: xpubAccount.id,
    address: 'xxxxxxxxx',
    amount: '1',
    keyPair: [
      {
        address: address.address,
        privateKey: privateKey,
      },
    ],
    fee: '0.1',
    attr: address.address,
  })
  console.log(result)

  // Create multiple deposit addresses for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccountBatch
  const addresses = await ltcSDK.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await ltcSDK.virtualAccount.depositAddress.assign(
    plainAccount.id,
    plainAccountAddress,
    1,
  )
  console.log(`Assign address: ${JSON.stringify(assignedAddress)}`)

  // Get all deposit addresses for an account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await ltcSDK.virtualAccount.depositAddress.getByAccount(xpubAccount.id)
  console.log(`Account addresses: ${JSON.stringify(addressByAccount)}`)

  // Remove a deposit address from an account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await ltcSDK.virtualAccount.depositAddress.remove(plainAccount.id, plainAccountAddress)

  // Send assets from virtualAccount to blockchain address
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/ltc-testnet/
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/LtcTransfer
  const transfer = await ltcSDK.virtualAccount.send({
    senderAccountId: xpubAccount.id,
    amount: '0.0001',
    mnemonic: mnemonic,
    xpub: xpub,
    address: plainAccountAddress,
  })

  console.log(JSON.stringify(transfer))
}
