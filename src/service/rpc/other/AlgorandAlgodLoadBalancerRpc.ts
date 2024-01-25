/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { GetI } from '../../../dto/GetI'
import { PostI } from '../../../dto/PostI'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractAlgorandAlgodRpc } from './AbstractAlgorandAlgodRpc'

@Service({
  factory: (data: { id: string }) => {
    return new AlgorandAlgodLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class AlgorandAlgodLoadBalancerRpc extends AbstractAlgorandAlgodRpc {
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
}
