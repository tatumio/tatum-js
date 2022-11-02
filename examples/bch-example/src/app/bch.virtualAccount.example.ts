import { TatumBchSDK } from '@tatumio/bch'

export async function bchVirtualAccountExample() {
  // Virtual account example
  // We will receive assets on account and withdraw it
  // More info here: https://docs.tatum.io/guides/ledger-and-off-chain

  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Check whether a blockchain address is assigned to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await bchSDK.virtualAccount.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  console.log(account)

  // Create a deposit address for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await bchSDK.virtualAccount.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  console.log(address)

  //Create multiple deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddressesBatch
  const addresses = await bchSDK.virtualAccount.depositAddress.createMultiple({
    addresses: [
      {
        accountId: '5e6be8e9e6aa436299950c41',
        derivationKey: 0,
      },
      {
        accountId: '5e6be8e9e6aa436299951n35',
        derivationKey: 1,
      },
    ],
  })
  console.log(addresses)

  // Assign a blockchain address to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const assignedAddress = await bchSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  console.log(assignedAddress)

  // Get all deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await bchSDK.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  console.log(addressByAccount)

  // Remove a deposit address from a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await bchSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )

  // Set the contact address of an ERC-20 or ERC-20-equivalent token
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-operations#operation/storeTokenAddress
  await bchSDK.virtualAccount.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')

  // Get withdrawals
  // You can find more details in https://apidoc.tatum.io/tag/Withdrawal#operation/GetWithdrawals
  const withdrawals = await bchSDK.virtualAccount.withdrawal.getAll('Done')
  console.log(withdrawals)
}
