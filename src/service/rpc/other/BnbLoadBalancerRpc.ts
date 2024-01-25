/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
// Need to import like this to keep browser working
import { JsonRpcResponse } from '../../../dto'
import { PostI } from '../../../dto/PostI'
import { BnbRpcSuite, JsonBnbRpcCall } from '../../../dto/rpc/BnbRpcSuite'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractBnbRpc } from './AbstractBnbRpc'

@Service({
  factory: (data: { id: string }) => {
    return new BnbLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class BnbLoadBalancerRpc extends AbstractBnbRpc implements BnbRpcSuite {
  protected readonly loadBalancer: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveNormalUrlWithFallback().url
  }

  rawRpcCall(body: JsonBnbRpcCall): Promise<JsonRpcResponse<any>> {
    return this.loadBalancer.post({ body, path: '' })
  }

  protected post<T>(post: PostI): Promise<T> {
    return this.loadBalancer.post(post)
  }
}
