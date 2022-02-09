import { TatumBtcSDK } from '@tatumio/btc'
import { TatumCeloSDK } from '@tatumio/celo'
import { TatumEthSDK } from '@tatumio/eth'
import { TatumLtcSDK } from '@tatumio/ltc'
import { TatumDogeSDK } from '@tatumio/doge'
import { TatumPolygonSDK } from '@tatumio/polygon'
import { TatumKcsSDK } from '@tatumio/kcs'
import { TatumOneSDK } from '@tatumio/one'
import { TatumBscSDK } from '@tatumio/bsc'
import { TatumXrpSDK } from '@tatumio/xrp'
import { TatumTronSDK } from '@tatumio/tron'

export type SDKS = {
  btc: ReturnType<typeof TatumBtcSDK>
  eth: ReturnType<typeof TatumEthSDK>
  doge: ReturnType<typeof TatumDogeSDK>
  celo: ReturnType<typeof TatumCeloSDK>
  ltc: ReturnType<typeof TatumLtcSDK>
  polygon: ReturnType<typeof TatumPolygonSDK>
  kcs: ReturnType<typeof TatumKcsSDK>
  one: ReturnType<typeof TatumOneSDK>
  bsc: ReturnType<typeof TatumBscSDK>
  xrp: ReturnType<typeof TatumXrpSDK>
  tron: ReturnType<typeof TatumTronSDK>
}
