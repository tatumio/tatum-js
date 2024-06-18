/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { Logger } from '../../../service/logger/logger.types'
import { LOGGER, Utils } from '../../../util'
import { AbstractCasperRpc } from './AbstractCasperRpc'
import { LoadBalancer } from '../generic/LoadBalancer'

@Service({
  factory: (data: { id: string }) => {
    return new CasperLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class CasperLoadBalancerRpc extends AbstractCasperRpc {
  protected readonly loadBalancer: LoadBalancer
  protected readonly logger: Logger

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
    this.logger = Container.of(id).get(LOGGER)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.loadBalancer.rawRpcCall(preparedCall)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>> {
    return this.loadBalancer.rawRpcCall(body)
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  public getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveNormalUrlWithFallback().url
  }
}
