import { TatumBtcSDK } from '@tatumio/btc'
import { TatumEthSDK } from '@tatumio/eth'
import { TatumDogeSDK } from '@tatumio/doge'

export type SDKS = {
  btc: ReturnType<typeof TatumBtcSDK>
  eth: ReturnType<typeof TatumEthSDK>
  doge: ReturnType<typeof TatumDogeSDK>
}
