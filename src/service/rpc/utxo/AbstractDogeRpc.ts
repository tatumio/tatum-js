/* eslint-disable @typescript-eslint/no-explicit-any */
import { DogeRpcInterface, JsonRpcResponse } from '../../../dto'
import { AbstractCommonUtxoRpc } from './AbstractCommonUtxoRpc'

export abstract class AbstractDogeRpc extends AbstractCommonUtxoRpc implements DogeRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async getBlock(hashOrHeight: string, verbose = true): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getblock', [hashOrHeight, verbose])
  }
}
