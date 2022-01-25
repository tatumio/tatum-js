import { REPLACE_ME_WITH_TATUM_API_KEY } from '@tatumio/shared-testing'
import { TatumBtcSDK } from '@tatumio/btc'

const btcSDK = TatumBtcSDK({ apiKey: REPLACE_ME_WITH_TATUM_API_KEY })

export async function btcApiExample() {
  const mempoolTransactionIds = await btcSDK.api.btcGetMempool()
  const block = await btcSDK.api.btcGetBlock(
    '0000000000000000000067de34da54c96ff76e6ba172f82c4ed8a25afb112a9e',
  )
}
