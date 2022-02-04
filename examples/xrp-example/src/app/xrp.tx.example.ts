import { TatumXrpSDK } from '@tatumio/xrp'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const xrpSDK = TatumXrpSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function xrpTxExample() {
  await xrpSDK.transaction.sendTransaction({
    fromAccount: 'rPRxSZzTFd6Yez3UMxFUPJvnhUhjewpjfV',
    fromSecret: 'snSFTHdvSYQKKkYntvEt8cnmZuPJB',
    amount: '10000',
    to: 'rDA3DJBUBjA1X3PtLLFAEXxX31oA5nL3QF',
  })
}
