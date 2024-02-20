/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcResponse, UtxoBasedRpcInterface } from '../../../dto'
import { AbstractCommonUtxoRpc } from './AbstractCommonUtxoRpc'

export abstract class AbstractUtxoRpc extends AbstractCommonUtxoRpc implements UtxoBasedRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async getBlock(hashOrHeight: string, verbose: 0 | 1 | 2 = 1): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getblock', [hashOrHeight, verbose])
  }
}
