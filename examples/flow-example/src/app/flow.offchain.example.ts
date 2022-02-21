import { TatumFlowSDK } from '@tatumio/flow'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const flowSDK = TatumFlowSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function flowOffchainExample() {
  const account = await flowSDK.offchain.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  const address = await flowSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await flowSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await flowSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const addressByAccount = await flowSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await flowSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f')
  await flowSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await flowSDK.offchain.withdrawal.getAll('Done')
  const tokenAddress = await flowSDK.offchain.storeTokenAddress(
    '7c21ed165e294db78b95f0f181086d6f',
    'MY_TOKEN',
  )
}
