import { TatumXrpSDK } from '@tatumio/xrp'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpOffchainExample() {
  await xrpSDK.offchain.sendOffchainTransaction({
    account: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
    secret: 'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
    address: 'rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF',
    amount: '10000',
    fee: '1000',
    senderAccountId: '61b3bffddfb389cde19c73be',
  })
}
