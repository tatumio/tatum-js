import { TatumCeloSDK } from '@tatumio/celo'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const celoSDK = TatumCeloSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function celoLogRecordExample() {
  const { txId } = await celoSDK.record.storeLog({
    data: 'record',
    fromPrivateKey: 'PRIVATE KEY',
  })

  // @TODO OPENAPI BUG - only ETH
  const { data } = await celoSDK.record.getLog(txId)
}
