/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetI } from 'src/dto/GetI'
import { Container, Service } from 'typedi'
import { PostI } from '../../../dto/PostI'
import { KadenaRpcInterface } from '../../../dto/rpc/KadenaRpcSuite'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractKadenaRpc } from './AbstractKadenaRpc'

@Service({
  factory: (data: { id: string }) => {
    return new KadenaLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class KadenaLoadBalancerRpc extends AbstractKadenaRpc implements KadenaRpcInterface {
  protected readonly loadBalancer: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
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

  protected put<T>(put: PostI): Promise<T> {
    return this.loadBalancer.put(put)
  }
}
