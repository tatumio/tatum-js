import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing-common'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcOffchainExample() {
  const account = await ltcSDK.virtualAccount.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const address = await ltcSDK.virtualAccount.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await ltcSDK.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await ltcSDK.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const addressByAccount = await ltcSDK.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await ltcSDK.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  await ltcSDK.virtualAccount.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await ltcSDK.virtualAccount.withdrawal.getAll('Done')
}
