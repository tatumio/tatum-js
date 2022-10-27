import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const ethSdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethOffchainExample() {
  const account = await ethSdk.virtualAccount.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const address = await ethSdk.virtualAccount.depositAddress.create('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 1)
  const adresses = await ethSdk.virtualAccount.depositAddress.createMultiple({
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
  const assignedAddress = await ethSdk.virtualAccount.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const addressByAccount = await ethSdk.virtualAccount.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  const withdrawals = await ethSdk.virtualAccount.withdrawal.getAll('Done')
  await ethSdk.virtualAccount.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  await ethSdk.virtualAccount.storeTokenAddress('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 'MY_TOKEN')
}
