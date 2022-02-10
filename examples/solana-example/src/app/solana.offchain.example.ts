import { TatumSolanaSDK } from '@tatumio/solana'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const solanaSdk = TatumSolanaSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function solanaOffchainExample() {
  const account = await solanaSdk.offchain.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const address = await solanaSdk.offchain.depositAddress.create('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 1)
  const adresses = await solanaSdk.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await solanaSdk.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const addressByAccount = await solanaSdk.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  const withdrawals = await solanaSdk.offchain.withdrawal.getAll('Done')
  await solanaSdk.offchain.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  await solanaSdk.offchain.storeTokenAddress('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 'MY_TOKEN')
}
