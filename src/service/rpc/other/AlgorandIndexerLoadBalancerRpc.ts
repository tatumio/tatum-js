/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { GetI } from '../../../dto/GetI'
import { LoadBalancer } from '../generic'
import { AbstractAlgorandIndexerRpc } from './AbstractAlgorandIndexerRpc'

@Service({
  factory: (data: { id: string }) => {
    return new AlgorandIndexerLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class AlgorandIndexerLoadBalancerRpc extends AbstractAlgorandIndexerRpc {
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
}
