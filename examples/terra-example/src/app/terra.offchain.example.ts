import { TatumTerraSDK } from '@tatumio/terra'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const terraSDK = TatumTerraSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function terraOffchainExample() {
  const account = await terraSDK.offchain.depositAddress.checkExists(
    'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn',
  )
  const address = await terraSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await terraSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await terraSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn',
  )
  const addressByAccount = await terraSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await terraSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn', 1)
  const withdrawals = await terraSDK.offchain.withdrawal.getAll('Done')
  await terraSDK.offchain.send(true, {
    fromPrivateKey: '42833dd2c36df40d5e4f0ba525d665a25103fc8e01ef86a9d962941855b9902c',
    address: 'terra14g02c85kvdwqcxtytupsqksnp48txz83q8pzhn',
    amount: '10000',
    senderAccountId: '61b3bffddfb389cde19c73be',
  })
}
