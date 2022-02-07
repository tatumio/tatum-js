import { TatumXrpSDK } from '@tatumio/xrp'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpOffchainExample() {
  const account = await xrpSDK.offchain.depositAddress.checkExists(
    'qzla5ev0pap3yrvr0t77k4sjerhr8l3a6sh98gqqya',
  )
  const address = await xrpSDK.offchain.depositAddress.create('5e68c66581f2ee32bc354087', 1)
  const adresses = await xrpSDK.offchain.depositAddress.createMultiple({
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
  const assignedAddress = await xrpSDK.offchain.depositAddress.assign(
    '5e6be8e9e6aa436299950c41',
    '7c21ed165e294db78b95f0f181086d6f',
  )
  const addressByAccount = await xrpSDK.offchain.depositAddress.getByAccount('5e6be8e9e6aa436299950c41')
  await xrpSDK.offchain.depositAddress.remove('5e6be8e9e6aa436299950c41', '7c21ed165e294db78b95f0f181086d6f')
  await xrpSDK.offchain.storeTokenAddress('7c21ed165e294db78b95f0f181086d6f', 'MY_TOKEN')
  const withdrawals = await xrpSDK.offchain.withdrawal.getAll('Done')
  await xrpSDK.offchain.sendOffchainTransaction({
    account: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
    secret: 'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
    address: 'rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF',
    amount: '10000',
    fee: '1000',
    senderAccountId: '61b3bffddfb389cde19c73be',
  })
}
