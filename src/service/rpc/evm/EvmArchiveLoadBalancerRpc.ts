/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedRpcSuite, JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { LoadBalancerRpc } from '../generic/LoadBalancerRpc'
import { Utils } from '../../../util'
import { AbstractEvmRpc } from './AbstractEvmRpc'

const ARCHIVE_METHODS = [
  // Archival information
  'debug_getBadBlocks',
  'debug_storageRangeAt',
  'debug_traceCall',
  'debug_traceTransaction',
  'debug_traceBlock',
  'debug_traceBlockByHash',
  'debug_traceBlockByNumber',
  'trace_block',
  'trace_call',
  'trace_callMany',
  'trace_rawTransaction',
  'trace_replayBlockTransactions',
  // Network state
  'eth_getBlockByHash',
  'eth_getTransactionByHash',
  'eth_getTransactionReceipt',
  'eth_getUncleCountByBlockHash',
  'eth_getUncleCountByBlockNumber',
  'eth_getBlockByNumber',
  'eth_getBlockTransactionCountByHash',
  'eth_getBlockTransactionCountByNumber',
  'eth_getBlockReceipts',
  'eth_getTransactionByBlockHashAndIndex',
  'eth_getTransactionByBlockNumberAndIndex',
  'eth_getTransactionCount',
  'eth_getProof',
]

const POSSIBLE_ARCHIVE_METHODS = [
  // Network state
  { method: 'eth_getStorageAt', index: 2 }, // second param block
  { method: 'eth_call', index: 1 }, // second param block
  { method: 'eth_getBalance', index: 1 }, // second param block
  { method: 'eth_getCode', index: 1 }, // second param block
]

@Service({
  factory: (data: { id: string }) => {
    return new EvmArchiveLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class EvmArchiveLoadBalancerRpc extends AbstractEvmRpc implements EvmBasedRpcSuite {
  protected readonly loadBalancerRpc: LoadBalancerRpc

  constructor(id: string) {
    super()
    this.loadBalancerRpc = Container.of(id).get(LoadBalancerRpc)
  }

  private isParamForArchiveNode(param: unknown): boolean {
    return !!param && param !== 'latest'
  }

  private isArchiveMethod(rpc: JsonRpcCall): boolean {


    const isArchiveMethod = ARCHIVE_METHODS.includes(rpc.method)
    if (isArchiveMethod) {
      return true
    }

    const possibleArchiveMethod = POSSIBLE_ARCHIVE_METHODS.find((possibleArchiveMethod) => possibleArchiveMethod.method === rpc.method)
    if (possibleArchiveMethod) {
      const param = rpc?.params?.[possibleArchiveMethod.index]
      return this.isParamForArchiveNode(param)
    }

    if (rpc.method === 'eth_getLogs') {
      const param = rpc?.params?.[1]
      return this.isParamForArchiveNode(param.fromBlock) || this.isParamForArchiveNode(param.toBlock)
    }

    return false
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    const isArchive = this.isArchiveMethod(preparedCall)
    return (await this.loadBalancerRpc.rawRpcCall(preparedCall, isArchive)) as T
  }

  async rawRpcCall(body: JsonRpcCall): Promise<JsonRpcResponse<any>> {
    const isArchive = this.isArchiveMethod(body)
    return this.loadBalancerRpc.rawRpcCall(body, isArchive)
  }

  rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.loadBalancerRpc.rawBatchRpcCall(body)
  }

  public destroy() {
    this.loadBalancerRpc.destroy()
  }
}
