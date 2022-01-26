import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const oneSdk = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneOffchainExample() {
  const account = await oneSdk.offchain.depositAddress.checkExists('0xa7673161CbfE0116A4De9E341f8465940c2211d4')
  const address = await oneSdk.offchain.depositAddress.create('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 1);
  const adresses = await oneSdk.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await oneSdk.offchain.depositAddress.assign('5e6be8e9e6aa436299950c41', '0xa7673161CbfE0116A4De9E341f8465940c2211d4');
  const addressByAccount = await oneSdk.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41');
  const withdrawals = await oneSdk.offchain.withdrawal.getAll('Done')
  await oneSdk.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '0xa7673161CbfE0116A4De9E341f8465940c2211d4');
  await oneSdk.offchain.storeTokenAddress('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 'MY_TOKEN');
}
