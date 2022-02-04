import { TatumBscSDK } from '@tatumio/bsc'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const bscSDK = TatumBscSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function bscLogRecordExample() {
  const { txId } = await bscSDK.record.storeLog({
    data: 'record',
    fromPrivateKey: 'PRIVATE KEY',
  })

  // @TODO OPENAPI BUG - only ETH
  const { data } = await bscSDK.record.getLog(txId)
}
