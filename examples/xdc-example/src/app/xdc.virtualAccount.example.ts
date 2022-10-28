import { TatumXdcSDK } from '@tatumio/xdc'

const xdcSdk = TatumXdcSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

export async function xdcVirtualAccountExample() {
  // Check whether a blockchain address is assigned to a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/addressExists
  const account = await xdcSdk.virtualAccount.depositAddress.checkExists(
    'xdcae14761e5db0ef472848cc4e4a4480311cb7caec',
  )
  console.log(`Account information ${JSON.stringify(account)}`)

  // Create a deposit address for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/generateDepositAddress
  const address = await xdcSdk.virtualAccount.depositAddress.create('635b92d6f9aeb823db30c43f', 9)
  console.log(`Address information ${JSON.stringify(address)}`)

  // Create multiple deposit addresses for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addresses = await xdcSdk.virtualAccount.depositAddress.createMultiple({
    addresses: [
      {
        accountId: '635b92d6f9aeb823db30c43f',
        derivationKey: 10,
      },
      {
        accountId: '635b92d6f9aeb823db30c43f',
        derivationKey: 11,
      },
    ],
  })
  console.log(`Information for all addresses ${JSON.stringify(addresses)}`)

  // Get all deposit addresses for a virtual account
  // https://apidoc.tatum.io/tag/Blockchain-addresses#operation/getAllDepositAddresses
  const addressByAccount = await xdcSdk.virtualAccount.depositAddress.getByAccount('635b92d6f9aeb823db30c43f')
  console.log(`Information for all addresses ${JSON.stringify(addressByAccount)}`)

  // Get Withdrawals
  // https://apidoc.tatum.io/tag/Withdrawal#operation/GetWithdrawals
  const withdrawals = await xdcSdk.virtualAccount.withdrawal.getAll('Done')
  console.log(`Get all withdrawals ${JSON.stringify(withdrawals)}`)
}
