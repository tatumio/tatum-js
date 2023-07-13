/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedRpcSuite, JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { Utils } from '../../../util'
import { LoadBalancerRpc } from '../generic/LoadBalancerRpc'
import { AbstractEvmRpc } from './AbstractEvmRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EvmLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class EvmLoadBalancerRpc extends AbstractEvmRpc implements EvmBasedRpcSuite {
  protected readonly loadBalancerRpc: LoadBalancerRpc

  constructor(id: string) {
    super()
    this.loadBalancerRpc = Container.of(id).get(LoadBalancerRpc)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.loadBalancerRpc.rawRpcCall(preparedCall)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>> {
    return this.loadBalancerRpc.rawRpcCall(body)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[]> {
    return this.loadBalancerRpc.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancerRpc.destroy()
  }
}
