import { TatumLtcSDK } from '@tatumio/ltc'
import { Currency } from '@tatumio/api-client'

export async function ltcVirtualAccountExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const options = { testnet: true }

  // Create an extended public key for virtual accounts
  const { mnemonic, xpub } = await ltcSDK.wallet.generateWallet(undefined, options)
  console.log(`Mnemonic: ${mnemonic}`)
  console.log(`Xpub: ${xpub}`)

  // Generate a recipient blockchain address
  const { xpub: recipientXpub } = await ltcSDK.wallet.generateWallet(undefined, options)
  const recipientAddress = ltcSDK.wallet.generateAddressFromXPub(recipientXpub, 1, options)
  console.log(`Recipient Xpub: ${recipientXpub}`)
  console.log(`Recipient address: ${recipientAddress}`)

  // Create an account with xpub
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccount
  const account = await ltcSDK.ledger.account.create({
    currency: Currency.LTC,
    xpub,
  })
  console.log(`Created xpub account: ${JSON.stringify(account)}`)

  // Check if an account exists
  const accountId = account.id

  // Create a deposit address for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await ltcSDK.virtualAccount.depositAddress.create(accountId)
  console.log(`Deposit address: ${JSON.stringify(address)}`)

  try {
    const existingAccount = await ltcSDK.virtualAccount.depositAddress.checkExists(address.address)
    console.log(`Account: ${JSON.stringify(existingAccount)}`)
  } catch (e) {
    console.log(`Account: ${e.message}`)
  }

  // Create multiple deposit addresses for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccountBatch
  try {
    const addresses = await ltcSDK.virtualAccount.depositAddress.createMultiple({
      addresses: [
        {
          accountId: accountId,
          derivationKey: 2,
        },
        {
          accountId: accountId,
          derivationKey: 3,
        },
      ],
    })
    console.log(`Deposit addresses: ${JSON.stringify(addresses)}`)
  } catch (e) {
    console.log('Deposit addresses exists', e.message)
  }

  // Get all deposit addresses for an account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await ltcSDK.virtualAccount.depositAddress.getByAccount(accountId)
  console.log(`Account addresses: ${JSON.stringify(addressByAccount)}`)

  // Fund your address here: https://testnet-faucet.com/ltc-testnet/
  console.log(`Fund me ${address.address} to send virtual account transaction!`)

  // Get account info
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/getAccountByAccountId
  const accountById = await ltcSDK.ledger.account.get(accountId)
  console.log(`Account info: ${JSON.stringify(accountById)}`)

  // Send assets from virtualAccount to blockchain address
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/ltc-testnet/
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/LtcTransfer
  const transfer = await ltcSDK.virtualAccount.send({
    senderAccountId: accountId,
    amount: '0.0001',
    mnemonic: mnemonic,
    xpub: xpub,
    address: recipientAddress,
    fee: '0.00001',
  })

  console.log(JSON.stringify(transfer))
}
