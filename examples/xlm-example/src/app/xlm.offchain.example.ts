import { TatumXlmSDK } from '@tatumio/xlm'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const xlmSDK = TatumXlmSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xlmOffchainExample() {
  const account = await xlmSDK.offchain.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  const address = await xlmSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await xlmSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await xlmSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const addressByAccount = await xlmSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await xlmSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f')
  await xlmSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await xlmSDK.offchain.withdrawal.getAll('Done')
  await xlmSDK.offchain.sendOffchainTransaction(true, {
    secret: 'SCVVKNLBHOWBNJYHD3CNROOA2P3K35I5GNTYUHLLMUHMHWQYNEI7LVED',
    address: 'GDKYMXOAJ5MK4EVIHHNWRGAAOUZMNZYAETMHFCD6JCVBPZ77TUAZFPKT',
    amount: '10000',
    fee: '1000',
    senderAccountId: '61b3bffddfb389cde19c73be',
  })
}
