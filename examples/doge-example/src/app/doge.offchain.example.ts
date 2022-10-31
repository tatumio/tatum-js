import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeOffchainExample() {
  const address = await dogeSDK.virtualAccount.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await dogeSDK.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await dogeSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const account = await dogeSDK.virtualAccount.depositAddress.checkExists(
    'n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7',
  )
  const addressByAccount = await dogeSDK.virtualAccount.depositAddress.getByAccount(
    '5e6be8e9e6aa436299950c41',
  )
  await dogeSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  await dogeSDK.virtualAccount.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await dogeSDK.virtualAccount.withdrawal.getAll('Done')
}
