import { EthTx as EthLikeTx } from '@tatumio/tatum-core'

/**
 *
 * @export
 * @interface MoonbeamTx
 */
export interface MoonbeamTx extends EthLikeTx {
  effectiveGasPrice?: string
  hash?: string
  logsBloom?: string
  type?: string
}
