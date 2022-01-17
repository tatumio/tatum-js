import { TatumBtcSDK } from '@tatumio/btc'
import { TatumEthSDK } from '@tatumio/eth'

export type SDKS = {
  btc: ReturnType<typeof TatumBtcSDK>
  eth: ReturnType<typeof TatumEthSDK>
}
