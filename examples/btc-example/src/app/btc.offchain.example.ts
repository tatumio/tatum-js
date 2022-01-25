import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcOffchainExample() {
  const account = await btcSDK.offchain.depositAddress.checkExists('1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv')
  const withdrawals = await btcSDK.offchain.withdrawal.getAll('Done')
}
