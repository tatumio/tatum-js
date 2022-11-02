import { TatumBchSDK } from '@tatumio/bch'

export async function bchVirtualAccountExample() {
  const bchSDK = TatumBchSDK({ apiKey: '75ea3138-d0a1-47df-932e-acb3ee807dab' })

  const account = await bchSDK.virtualAccount.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  console.log(account)

  const address = await bchSDK.virtualAccount.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  console.log(address)

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

  const assignedAddress = await bchSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  console.log(assignedAddress)

  const addressByAccount = await bchSDK.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  console.log(addressByAccount)

  await bchSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )

  await bchSDK.virtualAccount.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')

  const withdrawals = await bchSDK.virtualAccount.withdrawal.getAll('Done')
  console.log(withdrawals)
}
