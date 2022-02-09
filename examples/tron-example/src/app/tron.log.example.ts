import { TatumTronSDK } from '@tatumio/tron'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const tronSDK = TatumTronSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function tronLogRecordExample() {
  // @TODO OPENAPI BUG - only ETH
  const { data } = await tronSDK.record.getLog(
    '000000000195a8cfe2ea4ca60ce921b30e95980a96c6bb1da4a35aa03da9c5a8',
  )
}
