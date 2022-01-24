import { TatumBtcSDK } from '@tatumio/btc'
import { TatumCeloSDK } from '@tatumio/celo'
import { TatumEthSDK } from '@tatumio/eth'
import { TatumLtcSDK } from '@tatumio/ltc'
import { TatumDogeSDK } from '@tatumio/doge'
import { TatumPolygonSDK } from '@tatumio/polygon'
import { TatumOneSDK } from '@tatumio/one'

export type SDKS = {
  btc: ReturnType<typeof TatumBtcSDK>
  eth: ReturnType<typeof TatumEthSDK>
  doge: ReturnType<typeof TatumDogeSDK>
  celo: ReturnType<typeof TatumCeloSDK>
  ltc: ReturnType<typeof TatumLtcSDK>
  polygon: ReturnType<typeof TatumPolygonSDK>
  one: ReturnType<typeof TatumOneSDK>
}
