import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSdk = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcVirtualAccountExample() {
  // Check whether a blockchain address is assigned to a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await xdcSdk.virtualAccount.depositAddress.checkExists(
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  console.log(`Account information ${JSON.stringify(account)}`)

  // Create a deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await xdcSdk.virtualAccount.depositAddress.create(
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
    1,
  )
  console.log(`Address information ${JSON.stringify(address)}`)

  // Create multiple deposit addresses for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addresses = await xdcSdk.virtualAccount.depositAddress.createMultiple({
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
  console.log(`Information for all addresses ${JSON.stringify(addresses)}`)

  // Assign a blockchain address to a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/assignAddress
  const assignedAddress = await xdcSdk.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  console.log(`Address information ${JSON.stringify(assignedAddress)}`)
  // Get all deposit addresses for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await xdcSdk.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  console.log(`Information for all addresses ${JSON.stringify(addressByAccount)}`)

  // Get Withdrawals
  // https://apidoc.tatum.io/tag/Withdrawal#operation/GetWithdrawals
  const withdrawals = await xdcSdk.virtualAccount.withdrawal.getAll('Done')
  console.log(`Get all withdrawals ${JSON.stringify(withdrawals)}`)

  // Remove a deposit address from a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/removeAddress
  await xdcSdk.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
}
