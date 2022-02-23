import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSdk = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldOffchainExample() {
  const account = await egldSdk.offchain.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const address = await egldSdk.offchain.depositAddress.create('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 1)
  const adresses = await egldSdk.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await egldSdk.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const addressByAccount = await egldSdk.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  const withdrawals = await egldSdk.offchain.withdrawal.getAll('Done')
  await egldSdk.offchain.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  await egldSdk.offchain.storeTokenAddress('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 'MY_TOKEN')
  // TODO finish
  // await egldSdk.offchain.sendOffchainTransaction()
}
