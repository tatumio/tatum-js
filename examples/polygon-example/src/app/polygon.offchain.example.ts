import { TatumPolygonSDK } from '@tatumio/polygon'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const polygonSdk = TatumPolygonSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function polygonOffchainExample() {
  const account = await polygonSdk.offchain.depositAddress.checkExists(
    '0xa7673161CbfE0116A4De9E341f8465940c2211d4',
  )
  const address = await polygonSdk.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await polygonSdk.offchain.depositAddress.createMultiple({
    addresses: [
      {
        accountId: '5e68c66581f2ee32bc354087',
        derivationKey: 0,
      },
      {
        accountId: '5e68c66581f2ee32bc354087',
        derivationKey: 1,
      },
    ],
  })
  const assignedAddress = await polygonSdk.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  const addressByAccount = await polygonSdk.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  const withdrawals = await polygonSdk.offchain.withdrawal.getAll('Done')
  await polygonSdk.offchain.depositAddress.remove(
    '5e6be8e9e6aa436299950c41',
    'LepMzqfXSgQommH2qu3fk7Gf5xgoHQsP1b',
  )
  await polygonSdk.offchain.storeTokenAddress('0xa7673161CbfE0116A4De9E341f8465940c2211d4', 'MY_TOKEN')
}
