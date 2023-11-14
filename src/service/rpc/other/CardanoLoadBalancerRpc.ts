/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { PostI } from '../../../dto/PostI'
import { CardanoRpcSuite } from '../../../dto/rpc/CardanoRpcSuite'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractCardanoRpc } from './AbstractCardanoRpc'

@Service({
  factory: (data: { id: string }) => {
    return new CardanoLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class CardanoLoadBalancerRpc extends AbstractCardanoRpc implements CardanoRpcSuite {
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
}
