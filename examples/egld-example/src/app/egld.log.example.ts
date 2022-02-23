import { TatumEgldSDK } from '@tatumio/egld'
import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing-common'

const egldSDK = TatumEgldSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function egldLogRecordExample() {
  // @TODO OPENAPI BUG - only ETH
  const { data } = await egldSDK.record.getLog('0x94Ce79B9F001E25BBEbE7C01998A78F7B27D1326')
}
