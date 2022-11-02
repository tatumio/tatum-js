import { TatumBchSDK } from '@tatumio/bch'

export async function bchVirtualAccountExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  // Check if an account exists
  const account = await bchSDK.offchain.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  console.log(account)

  // Create a deposit address from an account
  const address = await bchSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  console.log(address)

  // Create multiple addresses from an account
  const addresses = await bchSDK.offchain.depositAddress.createMultiple({
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

  // Assign given deposit address to a given account
  const assignedAddress = await bchSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  console.log(assignedAddress)

  // Get all deposit addresses for a virtual account
  const addressByAccount = await bchSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  console.log(addressByAccount)

  // Remove a deposit address from an account
  await bchSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f')

  // Set the contact address of an ERC-20 or ERC-20-equivalent token
  await bchSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')

  // Get withdrawals for a given status
  const withdrawals = await bchSDK.offchain.withdrawal.getAll('Done')
  console.log(withdrawals)
}
