import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

export async function btcVirtualAccountExample() {
  // Virtual account example
  // We will receive assets on account and withdraw it
  // More info here: https://docs.tatum.io/guides/ledger-and-off-chain

  const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

  // Check whether a blockchain address is assigned to a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await btcSDK.virtualAccount.depositAddress.checkExists('1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv')
  console.log(account)

  // Create a deposit address for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await btcSDK.virtualAccount.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  console.log(address)

  //Create multiple deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddressesBatch
  const addresses = await btcSDK.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await btcSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  console.log(assignedAddress)

  // Get all deposit addresses for a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await btcSDK.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  console.log(addressByAccount)

  // Remove a deposit address from a virtual account
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await btcSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )

  // Set the contact address of an ERC-20 or ERC-20-equivalent token
  // You can find more details in https://apidoc.tatum.io/tag/Blockchain-operations#operation/storeTokenAddress
  await btcSDK.virtualAccount.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')

  // Get withdrawals
  // You can find more details in https://apidoc.tatum.io/tag/Withdrawal#operation/GetWithdrawals
  const withdrawals = await btcSDK.virtualAccount.withdrawal.getAll('Done')
  console.log(withdrawals)
}
