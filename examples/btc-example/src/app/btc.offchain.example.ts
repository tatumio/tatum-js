import { TatumBtcSDK } from '@tatumio/btc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcOffchainExample() {
  const address = await btcSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await btcSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await btcSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const account = await btcSDK.offchain.depositAddress.checkExists('1N4U6RidG5XScvBoSNgq5EmHiPxU4MAyEv')
  const addressByAccount = await btcSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await btcSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f')
  await btcSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await btcSDK.offchain.withdrawal.getAll('Done')
}
