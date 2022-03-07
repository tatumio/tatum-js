import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchOffchainExample() {
  const account = await bchSDK.offchain.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  const address = await bchSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await bchSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await bchSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const addressByAccount = await bchSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await bchSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f')
  await bchSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await bchSDK.offchain.withdrawal.getAll('Done')
}
