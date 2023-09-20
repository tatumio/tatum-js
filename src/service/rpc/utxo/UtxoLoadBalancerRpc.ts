/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse, UtxoBasedRpcSuite } from '../../../dto'
import { Utils } from '../../../util'
import { LoadBalancer } from '../generic'
import { AbstractUtxoRpc } from './AbstractUtxoRpc'

@Service({
  factory: (data: { id: string }) => {
    return new UtxoLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class UtxoLoadBalancerRpc extends AbstractUtxoRpc implements UtxoBasedRpcSuite {
  protected readonly loadBalancerRpc: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancerRpc = Container.of(id).get(LoadBalancer)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.loadBalancerRpc.rawRpcCall(preparedCall)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>> {
    return this.loadBalancerRpc.rawRpcCall(body)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.loadBalancerRpc.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancerRpc.destroy()
  }

  getRpcNodeUrl(): string {
    return this.loadBalancerRpc.getActiveNormalUrlWithFallback().url
  }
}
