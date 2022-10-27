import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSdk = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoOffchainExample() {
  const account = await celoSdk.virtualAccount.depositAddress.checkExists(
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const address = await celoSdk.virtualAccount.depositAddress.create('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 1)
  const adresses = await celoSdk.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await celoSdk.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const addressByAccount = await celoSdk.virtualAccount.depositAddress.getByAccount(
    '5e6be8e9e6aa436299950c41',
  )
  const withdrawals = await celoSdk.virtualAccount.withdrawal.getAll('Done')
  await celoSdk.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  await celoSdk.virtualAccount.storeTokenAddress('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 'MY_TOKEN')
}
