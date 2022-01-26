import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const celoSdk = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoOffchainExample() {
  const account = await celoSdk.offchain.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const address = await celoSdk.offchain.depositAddress.create('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 1);
  const adresses = await celoSdk.offchain.depositAddress.createMultiple({
    addresses: [
      {
        accountId: "5e6be8e9e6aa436299950c41",
        derivationKey: 0
      },
      {
        accountId: "5e6be8e9e6aa436299951n35",
        derivationKey: 1
      }
    ]
  });
  const assignedAddress = await celoSdk.offchain.depositAddress.assign('5e6be8e9e6aa436299950c41', 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b');
  const addressByAccount = await celoSdk.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41');
  await celoSdk.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b');
  await celoSdk.offchain.storeTokenAddress('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 'MY_TOKEN');
  const withdrawals = await celoSdk.offchain.withdrawal.getAll('Done')
}
