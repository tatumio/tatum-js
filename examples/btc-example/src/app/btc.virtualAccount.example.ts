import { TatumBtcSDK } from '@tatumio/btc'
import { Currency } from '@tatumio/api-client'

export async function btcVirtualAccountExample() {
  const btcSDK = TatumBtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })
  const options = { testnet: true }

  // Create an extended public key for virtual accounts
  const { mnemonic, xpub } = await btcSDK.wallet.generateWallet(undefined, options)
  console.log(`Mnemonic: ${mnemonic}`)
  console.log(`Xpub: ${xpub}`)

  // Generate a recipient blockchain address
  const { xpub: recipientXpub } = await btcSDK.wallet.generateWallet(undefined, options)
  const recipientAddress = btcSDK.wallet.generateAddressFromXPub(recipientXpub, 1, options)
  console.log(`Recipient Xpub: ${recipientXpub}`)
  console.log(`Recipient address: ${recipientAddress}`)

  // Create an account with xpub
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccount
  const account = await btcSDK.ledger.account.create({
    currency: Currency.BTC,
    xpub,
  })
  console.log(`Created xpub account: ${JSON.stringify(account)}`)

  // Check if an account exists
  const accountId = account.id

  try {
    const existingAccount = await btcSDK.virtualAccount.depositAddress.checkExists(accountId)
    console.log(`Account: ${JSON.stringify(existingAccount)}`)
  } catch (e) {
    console.log(`Account: ${e.message}`)
  }

  // Create a deposit address for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await btcSDK.virtualAccount.depositAddress.create(accountId)
  console.log(`Deposit address: ${JSON.stringify(address)}`)

  // Create multiple deposit addresses for an account and derivation index
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/createAccountBatch
  try {
    const addresses = await btcSDK.virtualAccount.depositAddress.createMultiple({
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
  const addressByAccount = await btcSDK.virtualAccount.depositAddress.getByAccount(accountId)
  console.log(`Account addresses: ${JSON.stringify(addressByAccount)}`)

  // Fund your address here: https://testnet-faucet.com/btc-testnet/
  console.log(`Fund me ${address.address} to send virtual account transaction!`)

  // Get account info
  // You can find more details in https://apidoc.tatum.io/tag/Account#operation/getAccountByAccountId
  const accountById = await btcSDK.ledger.account.get(accountId)
  console.log(`Account info: ${JSON.stringify(accountById)}`)

  // Send assets from virtualAccount to blockchain address
  // This example requires a funded blockchain address, you can top up your testnet balance with https://testnet-faucet.com/btc-testnet/
  // https://apidoc.tatum.io/tag/Blockchain-operations#operation/BtcTransfer
  const transfer = await btcSDK.virtualAccount.send({
    senderAccountId: accountId,
    amount: '0.0001',
    mnemonic: mnemonic,
    xpub: xpub,
    address: recipientAddress,
    fee: '0.00001',
  })

  console.log(JSON.stringify(transfer))
}
