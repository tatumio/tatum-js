import { TatumKcsSDK } from '@tatumio/kcs'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const kcsSdk = TatumKcsSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function kcsOffchainExample() {
  const account = await kcsSdk.virtualAccount.depositAddress.checkExists(
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  const address = await kcsSdk.virtualAccount.depositAddress.create(
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
    1,
  )
  const adresses = await kcsSdk.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await kcsSdk.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  const addressByAccount = await kcsSdk.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  const withdrawals = await kcsSdk.virtualAccount.withdrawal.getAll('Done')
  await kcsSdk.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  await kcsSdk.virtualAccount.storeTokenAddress('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 'MY_TOKEN')
}
