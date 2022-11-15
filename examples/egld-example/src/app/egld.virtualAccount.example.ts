import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldVirtualAccountExample() {
  const account = await egldSDK.virtualAccount.depositAddress.checkExists(
    'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
  )

  const address = await egldSDK.virtualAccount.depositAddress.create('5e68c66581f2ee32bc354087', 1)

  const adresses = await egldSDK.virtualAccount.depositAddress.createMultiple({
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

  const assignedAddress = await egldSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
  )

  const addressByAccount = await egldSDK.virtualAccount.depositAddress.getByAccount(
    '5e6be8e9e6aa436299950c41',
  )
  await egldSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
    1,
  )

  const withdrawals = await egldSDK.virtualAccount.withdrawal.getAll('Done')
  await egldSDK.virtualAccount.send({
    address: 'erd1r27lx5krup4tffvmx933hjprzffw59tt8zaqz3t36yj9fdtrcsvsrqhyrp',
    privateKey: '84cfa388802b751bbd7a17d0b9d496acf1d3df1f580175cc0f13810afdaf821e',
    amount: '0.001',
    gasPrice: '200',
    gasLimit: '60000',
    senderAccountId: '624dd1f35472c7eb5c73eb09',
  })
}
