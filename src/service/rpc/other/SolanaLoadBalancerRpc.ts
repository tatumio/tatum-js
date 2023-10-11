/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { Utils } from '../../../util'
import { LoadBalancer } from '../generic'
import { AbstractSolanaRpc } from './AbstractSolanaRpc'
import { JsonRpcCall, JsonRpcResponse, SolanaRpcSuite } from '../../../dto'

@Service({
  factory: (data: { id: string }) => {
    return new SolanaLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class SolanaLoadBalancerRpc extends AbstractSolanaRpc implements SolanaRpcSuite {
  protected readonly loadBalancer: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.loadBalancer.rawRpcCall(preparedCall)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>> {
    return this.loadBalancer.rawRpcCall(body)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.loadBalancer.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  public getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveNormalUrlWithFallback().url
  }
}
