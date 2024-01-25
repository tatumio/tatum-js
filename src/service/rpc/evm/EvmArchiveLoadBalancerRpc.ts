/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedRpcSuite, JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { Logger } from '../../../service/logger/logger.types'
import { LOGGER, Utils } from '../../../util'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractEvmRpc } from './AbstractEvmRpc'
import { EvmUtils } from './EvmUtils'

@Service({
  factory: (data: { id: string }) => {
    return new EvmArchiveLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class EvmArchiveLoadBalancerRpc extends AbstractEvmRpc implements EvmBasedRpcSuite {
  protected readonly loadBalancer: LoadBalancer
  protected readonly logger: Logger

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
    this.logger = Container.of(id).get(LOGGER)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    const isArchive = EvmUtils.isArchiveMethod(preparedCall)
    return (await this.loadBalancer.rawRpcCall(preparedCall, isArchive)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>> {
    const isArchive = EvmUtils.isArchiveMethod(body)
    return this.loadBalancer.rawRpcCall(body, isArchive)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.loadBalancer.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  public getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveArchiveUrlWithFallback().url
  }
}
