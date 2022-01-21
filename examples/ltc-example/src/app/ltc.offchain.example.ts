import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcOffchainExample() {
  const account = await ltcSDK.offchain.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const withdrawals = await ltcSDK.offchain.withdrawal.getAll('Done')
}
