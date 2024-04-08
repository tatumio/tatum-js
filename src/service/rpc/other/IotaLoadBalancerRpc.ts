/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
// Need to import like this to keep browser working
import { GetI } from 'src/dto/GetI'
import { PostI } from 'src/dto/PostI'
import { IotaRpcSuite } from '../../../dto/rpc/IotaRpcSuite'
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractIotaRpc } from './AbstractIotaRpc'

@Service({
  factory: (data: { id: string }) => {
    return new IotaLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class IotaLoadBalancerRpc extends AbstractIotaRpc implements IotaRpcSuite {
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

  protected delete<T>(get: GetI): Promise<T> {
    return this.loadBalancer.delete(get)
  }
}
