import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeOffchainExample() {
  const account = await dogeSDK.offchain.depositAddress.checkExists('1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv')
  const withdrawals = await dogeSDK.offchain.withdrawal.getAll('Done')
}
