import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse, UtxoBasedRpcSuite } from '../../../dto'
import { Utils } from '../../../util'
import { LoadBalancerRpc } from '../generic/LoadBalancerRpc'
import { AbstractUtxoBasedRpc } from './AbstractUtxoBasedRpc'

@Service({
  factory: (data: { id: string }) => {
    return new UtxoBasedLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class UtxoBasedLoadBalancerRpc extends AbstractUtxoBasedRpc implements UtxoBasedRpcSuite {
  protected readonly loadBalancerRpc: LoadBalancerRpc

  constructor(id: string) {
    super()
    this.loadBalancerRpc = Container.of(id).get(LoadBalancerRpc)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.loadBalancerRpc.rawRpcCall(preparedCall)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<unknown>> {
    return this.loadBalancerRpc.rawRpcCall(body)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<unknown>[]> {
    return this.loadBalancerRpc.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancerRpc.destroy()
  }
}
