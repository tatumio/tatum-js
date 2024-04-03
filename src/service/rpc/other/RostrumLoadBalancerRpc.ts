/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { Utils } from '../../../util'
// Need to import like this to keep browser working
import { RostrumRpcInterface } from '../../../dto/rpc/RostrumRpcSuite'
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractRostrumRpc } from './AbstractRostrumRpc'

@Service({
  factory: (data: { id: string }) => {
    return new RostrumLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class RostrumLoadBalancerRpc extends AbstractRostrumRpc implements RostrumRpcInterface {
  protected readonly loadBalancer: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.loadBalancer.rawRpcCall(preparedCall)) as T
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  public getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveNormalUrlWithFallback().url
  }
}
