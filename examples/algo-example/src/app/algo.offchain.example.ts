import { TatumAlgoSDK } from '@tatumio/algo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const algoSdk = TatumAlgoSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function algoOffchainExample() {
  const account = await algoSdk.virtualAccount.depositAddress.checkExists(
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const address = await algoSdk.virtualAccount.depositAddress.create('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 1)
  const adresses = await algoSdk.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await algoSdk.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const addressByAccount = await algoSdk.virtualAccount.depositAddress.getByAccount(
    '5e6be8e9e6aa436299950c41',
  )
  const withdrawals = await algoSdk.virtualAccount.withdrawal.getAll('Done')
  await algoSdk.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  await algoSdk.virtualAccount.storeTokenAddress('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 'MY_TOKEN')
}
