import { TatumLtcSDK } from '@tatumio/ltc'
import { REPLACE_ME_WITH_TATUM_API_KEY, TEST_DATA } from '@tatumio/shared-testing'

const ltcSDK = TatumLtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function ltcOffchainExample() {
  const account = await ltcSDK.offchain.depositAddress.checkExists('LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b')
  const address = await ltcSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1);
  const adresses = await ltcSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await ltcSDK.offchain.depositAddress.assign('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f');
  const addressByAccount = await ltcSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41');
  await ltcSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f');
  await ltcSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN');
  const withdrawals = await ltcSDK.offchain.withdrawal.getAll('Done')
}
