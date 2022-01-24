import { TatumBchSDK } from '@tatumio/bch'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing'

const bchSDK = TatumBchSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bchOffchainExample() {
  const account = await bchSDK.offchain.depositAddress.checkExists('qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya')
  const withdrawals = await bchSDK.offchain.withdrawal.getAll('Done')
}
