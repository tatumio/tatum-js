import { EthTx as EthLikeTx } from '@tatumio/tatum-core'

/**
 *
 * @export
 * @interface MaticTx
 */
export interface MaticTx extends EthLikeTx {
  effectiveGasPrice?: string
  hash?: string
  logsBloom?: string
  type?: string
}
