import { TatumEthSDK } from '@tatumio/eth'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const ethSdk = TatumEthSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ethOffchainExample() {
  const account = await ethSdk.offchain.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const address = await ethSdk.offchain.depositAddress.create('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 1);
  const adresses = await ethSdk.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await ethSdk.offchain.depositAddress.assign('5e6be8e9e6aa436299950c41', 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b');
  const addressByAccount = await ethSdk.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41');
  const withdrawals = await ethSdk.offchain.withdrawal.getAll('Done')
  await ethSdk.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', 'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b');
  await ethSdk.offchain.storeTokenAddress('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b', 'MY_TOKEN');
}
