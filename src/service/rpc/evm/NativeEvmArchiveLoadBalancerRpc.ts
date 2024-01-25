/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse, NATIVE_PREFIX_MAPPING, Network } from '../../../dto'
import { NativeEvmBasedRpcSuite } from '../../../dto/rpc/NativeEvmBasedRpcInterface'
import { Logger } from '../../../service/logger/logger.types'
import { CONFIG, LOGGER, Utils } from '../../../util'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractNativeEvmRpc } from './AbstractNativeEvmRpc'
import { EvmUtils } from './EvmUtils'

@Service({
  factory: (data: { id: string }) => {
    return new NativeEvmArchiveLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class NativeEvmArchiveLoadBalancerRpc extends AbstractNativeEvmRpc implements NativeEvmBasedRpcSuite {
  protected readonly loadBalancer: LoadBalancer
  protected readonly logger: Logger

  private network: Network

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
    this.network = Container.of(id).get(CONFIG).network

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

  protected getNativePrefix(): string {
    return NATIVE_PREFIX_MAPPING[this.network]
  }
}
