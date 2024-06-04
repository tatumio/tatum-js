/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { PostI } from '../../../dto/PostI'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractCosmosRpc } from './AbstractCosmosRpc'
import { CosmosRpcSuite } from '../../../dto/rpc/CosmosRpcSuite'
import { GetI } from '../../../dto/GetI'

@Service({
  factory: (data: { id: string }) => {
    return new CosmosLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class CosmosLoadBalancerRpc extends AbstractCosmosRpc implements CosmosRpcSuite {
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

  protected post<T>(post: PostI): Promise<T> {
    return this.loadBalancer.post(post)
  }

  protected get<T>(get: GetI): Promise<T> {
    return this.loadBalancer.get(get)
  }
}
