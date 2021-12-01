import { EthTx as EthLikeTx } from '@tatumio/tatum-core'

/**
 *
 * @export
 * @interface ETHTx
 */
export interface ETHTx extends EthLikeTx {
  maxFeePerGas?: string
  maxPriorityFeePerGas?: string
  type?: string
  chainId?: string
  effectiveGasPrice?: string
  logsBloom?: string
}
