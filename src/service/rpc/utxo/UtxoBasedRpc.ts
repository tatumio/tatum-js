import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse, UtxoBasedRpcSuite } from '../../../dto'
import { Utils } from '../../../util'
import { AbstractUtxoBasedRpc } from './AbstractUtxoBasedRpc'
import { GenericRpc } from '../generic'


@Service({
  factory: (data: { id: string }) => {
    return new UtxoBasedRpc(data.id)
  },
  transient: true,
})
export class UtxoBasedRpc extends AbstractUtxoBasedRpc implements UtxoBasedRpcSuite {
  public readonly genericRpc: GenericRpc

  constructor(id: string) {
    super()
    this.genericRpc = Container.of(id).get(GenericRpc)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.genericRpc.rawRpcCall(preparedCall)) as T
  }

  async rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse[]> {
    return this.genericRpc.rawBatchRpcCall(body)
  }

  async rawRpcCall<T>(body: JsonRpcCall): Promise<T> {
    return (await this.genericRpc.rawRpcCall(body)) as T
  }

  destroy(): void {
    // do nothing
  }
}