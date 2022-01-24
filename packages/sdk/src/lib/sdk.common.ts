import { TatumBtcSDK } from '@tatumio/btc'
import { TatumCeloSDK } from '@tatumio/celo'
import { TatumEthSDK } from '@tatumio/eth'
import { TatumDogeSDK } from '@tatumio/doge'
import { TatumXrpSDK } from "@tatumio/xrp";

export type SDKS = {
  btc: ReturnType<typeof TatumBtcSDK>
  eth: ReturnType<typeof TatumEthSDK>
  doge: ReturnType<typeof TatumDogeSDK>
  celo: ReturnType<typeof TatumCeloSDK>
  xrp: ReturnType<typeof TatumXrpSDK>
}
