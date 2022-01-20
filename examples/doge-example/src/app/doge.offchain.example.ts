import { TatumDogeSDK } from '@tatumio/doge'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing'

const dogeSDK = TatumDogeSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function dogeOffchainExample() {
  const account = await dogeSDK.offchain.depositAddress.checkExists('n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7')
  const withdrawals = await dogeSDK.offchain.withdrawal.getAll('Done')
}
