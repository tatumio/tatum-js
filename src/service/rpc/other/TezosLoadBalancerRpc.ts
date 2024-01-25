/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { GetI } from '../../../dto/GetI'
import { PostI } from '../../../dto/PostI'
import { Utils } from '../../../util'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractTezosRpc } from './AbstractTezosRpc'

@Service({
  factory: (data: { id: string }) => {
    return new TezosLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class TezosLoadBalancerRpc extends AbstractTezosRpc {
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

  protected get<T>(get: GetI): Promise<T> {
    return this.loadBalancer.get(get)
  }

  protected post<T>(post: PostI): Promise<T> {
    return this.loadBalancer.post(post)
  }
}
