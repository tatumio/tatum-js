import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const bscSdk = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscOffchainExample() {
  const account = await bscSdk.offchain.depositAddress.checkExists('0xa7673161CbfE0116A4De9E341f8465940c2211d4')
  const address = await bscSdk.offchain.depositAddress.create('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 1);
  const adresses = await bscSdk.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await bscSdk.offchain.depositAddress.assign('5e6be8e9e6aa436299950c41', '0xa7673161CbfE0116A4De9E341f8465940c2211d4');
  const addressByAccount = await bscSdk.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41');
  const withdrawals = await bscSdk.offchain.withdrawal.getAll('Done')
  await bscSdk.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '0xa7673161CbfE0116A4De9E341f8465940c2211d4');
  await bscSdk.offchain.storeTokenAddress('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 'MY_TOKEN');
}
