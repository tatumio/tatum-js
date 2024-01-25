/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedRpcSuite, JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { Logger } from '../../../service/logger/logger.types'
import { LOGGER, Utils } from '../../../util'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractEvmRpc } from './AbstractEvmRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EvmLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class EvmLoadBalancerRpc extends AbstractEvmRpc implements EvmBasedRpcSuite {
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

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.loadBalancer.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  public getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveNormalUrlWithFallback().url
  }
}
