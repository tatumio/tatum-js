/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedRpcSuite, JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { PostI } from '../../../dto/PostI'
import { Logger } from '../../../service/logger/logger.types'
import { LOGGER, Utils } from '../../../util'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractTronRpc } from './AbstractTronRpc'

@Service({
  factory: (data: { id: string }) => {
    return new TronLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class TronLoadBalancerRpc extends AbstractTronRpc implements EvmBasedRpcSuite {
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

  protected post<T>(post: PostI): Promise<T> {
    return this.loadBalancer.post(post)
  }

  getRpcNodeUrl(): string {
    return this.loadBalancer.getActiveNormalUrlWithFallback().url
  }
}
