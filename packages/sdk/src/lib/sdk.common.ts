import { TatumBtcSDK } from '@tatumio/btc'
import { TatumCeloSDK } from '@tatumio/celo'
import { TatumEthSDK } from '@tatumio/eth'
import { TatumDogeSDK } from '@tatumio/doge'
import { TatumPolygonSDK } from '@tatumio/polygon'
import { TatumKcsSDK } from '@tatumio/kcs'

export type SDKS = {
  btc: ReturnType<typeof TatumBtcSDK>
  eth: ReturnType<typeof TatumEthSDK>
  doge: ReturnType<typeof TatumDogeSDK>
  celo: ReturnType<typeof TatumCeloSDK>
  polygon: ReturnType<typeof TatumPolygonSDK>
  kcs: ReturnType<typeof TatumKcsSDK>
}
