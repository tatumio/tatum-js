/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedRpcSuite, JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { Utils } from '../../../util'
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
  protected readonly loadBalancerRpc: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancerRpc = Container.of(id).get(LoadBalancer)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    const isArchive = EvmUtils.isArchiveMethod(preparedCall)
    return (await this.loadBalancerRpc.rawRpcCall(preparedCall, isArchive)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>> {
    const isArchive = EvmUtils.isArchiveMethod(body)
    return this.loadBalancerRpc.rawRpcCall(body, isArchive)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.loadBalancerRpc.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancerRpc.destroy()
  }

  public getRpcNodeUrl(): string {
    return this.loadBalancerRpc.getActiveArchiveUrlWithFallback().url
  }
}
