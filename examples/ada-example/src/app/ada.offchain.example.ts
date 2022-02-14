import { TatumAdaSDK } from '@tatumio/ada'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'

const adaSDK = TatumAdaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function adaOffchainExample() {
  const account = await adaSDK.offchain.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  const address = await adaSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await adaSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await adaSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const addressByAccount = await adaSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await adaSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f')
  await adaSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await adaSDK.offchain.withdrawal.getAll('Done')
}
