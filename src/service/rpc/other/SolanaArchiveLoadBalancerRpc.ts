/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcCall, JsonRpcResponse, SolanaRpcSuite } from '../../../dto'
import { Utils } from '../../../util'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractSolanaRpc } from './AbstractSolanaRpc'

@Service({
  factory: (data: { id: string }) => {
    return new SolanaArchiveLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class SolanaArchiveLoadBalancerRpc extends AbstractSolanaRpc implements SolanaRpcSuite {
  protected readonly loadBalancer: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    const isArchive = this.isArchiveMethod(preparedCall)
    return (await this.loadBalancer.rawRpcCall(preparedCall, isArchive)) as T
  }

  private isArchiveMethod(body: JsonRpcCall): boolean {
    const archiveMethods = [
      'getBlock',
      'getBlocks',
      'getBlocksWithLimit',
      'getBlockTime',
      'getInflationReward',
      'getProgramAccounts',
      'getSignaturesForAddress',
      'getConfirmedSignaturesForAddress2',
    ]
    return archiveMethods.some((method) => body.method.includes(method))
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
