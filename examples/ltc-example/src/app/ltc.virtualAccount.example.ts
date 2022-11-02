import { TatumLtcSDK } from '@tatumio/ltc'

export async function ltcVirtualAccountExample() {
  const ltcSDK = TatumLtcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Create an extended public key
  const { xpub } = await ltcSDK.wallet.generateWallet(undefined, { testnet: true })
  const { xpub: plainXpub } = await ltcSDK.wallet.generateWallet(undefined, { testnet: true })

  // Generate a blockchain address from xpub (for the plainAccount)
  const plainAccountAddress = ltcSDK.wallet.generateAddressFromXPub(plainXpub, 1, { testnet: true })

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

  // Get withdrawals for a given status (Done)
  // You can find more details in https://apidoc.tatum.io/tag/Withdrawal#operation/GetWithdrawals
  const withdrawals = await ltcSDK.virtualAccount.withdrawal.getAll('Done')
  console.log(`Withdrawals: ${JSON.stringify(withdrawals)}`)
}
