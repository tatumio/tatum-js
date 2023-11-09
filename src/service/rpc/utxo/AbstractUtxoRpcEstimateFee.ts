/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcResponse, UtxoBasedRpcInterfaceEstimateFee } from '../../../dto'
import { AbstractUtxoRpc } from './AbstractUtxoRpc'

export abstract class AbstractUtxoRpcEstimateFee
  extends AbstractUtxoRpc
  implements UtxoBasedRpcInterfaceEstimateFee
{
  estimateFee(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('estimatefee')
  }
}
