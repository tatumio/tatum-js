import { TatumOneSDK } from '@tatumio/one'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'

const oneSDK = TatumOneSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function oneLogRecordExample() {
  const { txId } = await oneSDK.record.storeLog({
    data: 'record',
    fromPrivateKey: 'PRIVATE KEY',
  })

  // @TODO OPENAPI BUG - only ETH
  const { data } = await oneSDK.record.getLog(txId)
}
