/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse, UtxoBasedRpcSuite } from '../../../dto'
import { Utils } from '../../../util'
import { AbstractUtxoRpc } from './AbstractUtxoRpc'
import { GenericRpc } from '../generic'

@Service({
  factory: (data: { id: string }) => {
    return new UtxoRpc(data.id)
  },
  transient: true,
})
export class UtxoRpc extends AbstractUtxoRpc implements UtxoBasedRpcSuite {
  public readonly genericRpc: GenericRpc

  constructor(id: string) {
    super()
    this.genericRpc = Container.of(id).get(GenericRpc)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.genericRpc.rawRpcCall(preparedCall)) as T
  }

  async rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[]> {
    return this.genericRpc.rawBatchRpcCall(body)
  }

  async rawRpcCall<T>(body: JsonRpcCall): Promise<T> {
    return (await this.genericRpc.rawRpcCall(body)) as T
  }

  destroy(): void {
    // do nothing
  }
}
