/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Container, Service } from 'typedi'
import {
  BlockNumber,
  EvmBasedRpcSuite,
  JsonRpcResponse,
  LogFilter,
  TraceOptions,
  TraceType,
  TxPayload,
} from '../../../dto'
import { CONFIG } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EvmBasedRpc(data.id)
  },
  transient: true,
})
export class EvmBasedRpc extends AbstractJsonRpc implements EvmBasedRpcSuite {
  constructor(id: string) {
    super(id, Container.of(id).get(CONFIG).network)
  }

  blockNumber(): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_blockNumber'))
      .then((r) => new BigNumber(r.result))
  }

  call(callObject: TxPayload, blockNumber?: BlockNumber): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_call', [
          callObject,
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        ]),
      )
      .then((r) => r.result)
  }

  chainId(): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_chainId'))
      .then((r) => new BigNumber(r.result))
  }

  clientVersion(): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('web3_clientVersion'))
      .then((r) => r.result)
  }

  debugGetBadBlocks(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('debug_getBadBlocks'))
      .then((r) => r.result)
  }

  debugStorageRangeAt(
    blockHash: string,
    txIndex: number,
    contractAddress: string,
    startKey: string,
    maxResult: string,
  ): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('debug_storageRangeAt', [
          blockHash,
          txIndex,
          contractAddress,
          startKey,
          maxResult,
        ]),
      )
      .then((r) => r.result)
  }

  debugTraceBlockByHash(blockHash: string, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [blockHash]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('debug_traceBlockByHash', params))
      .then((r) => r.result)
  }

  debugTraceBlockByNumber(blockHash: string | number, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [`0x${new BigNumber(blockHash).toString(16)}`]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('debug_traceBlockByNumber', params))
      .then((r) => r.result)
  }

  debugTraceCall(callObject: TxPayload, blockNumber: BlockNumber, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [callObject, blockNumber]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('debug_traceCall', params))
      .then((r) => r.result)
  }

  debugTraceTransaction(txHash: string, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [txHash]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('debug_traceTransaction', params))
      .then((r) => r.result)
  }

  estimateGas(callObject: TxPayload): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_estimateGas', [callObject]))
      .then((r) => new BigNumber(r.result))
  }

  gasPrice(): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_gasPrice'))
      .then((r) => new BigNumber(r.result))
  }

  maxPriorityFeePerGas(): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_maxPriorityFeePerGas'))
      .then((r) => new BigNumber(r.result))
  }

  getBalance(address: string, blockNumber?: BlockNumber): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getBalance', [address, blockNumber || 'pending']),
      )
      .then((r) => new BigNumber(r.result))
  }

  getTokenDecimals(tokenAddress: string): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_call', [{ to: tokenAddress, data: '0x313ce567' }, 'latest']),
      )
      .then((r) => new BigNumber(r.result))
  }

  async getContractAddress(txHash: string): Promise<string | null> {
    try {
      const txReceipt = await this.getTransactionReceipt(txHash)
      return txReceipt.contractAddress
    } catch (e) {
      console.error('Failed to get contract address, transaction does not exist, or is not a contract creation tx or is not mined yet.')
      return null
    }
  }

  getBlockByHash(blockHash: string, includeTransactions = false): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getTransactionByBlockNumberAndIndex', [blockHash, includeTransactions]),
      )
      .then((r) => r.result)
  }

  getBlockByNumber(blockNumber: string | number, includeTransactions = false): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getTransactionByBlockNumberAndIndex', [
          `0x${new BigNumber(blockNumber).toString(16)}`,
          includeTransactions,
        ]),
      )
      .then((r) => r.result)
  }

  getCode(address: string, blockNumber?: BlockNumber): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getCode', [
          address,
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        ]),
      )
      .then((r) => r.result)
  }

  getLogs(filterObject: LogFilter): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_getLogs', [filterObject]))
      .then((r) => r.result)
  }

  getProof(address: string, storageKeys: string[], blockNumber?: BlockNumber): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getProof', [
          address,
          storageKeys,
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        ]),
      )
      .then((r) => r.result)
  }

  getStorageAt(address: string, position: string, blockNumber?: BlockNumber): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getStorageAt', [
          address,
          position,
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        ]),
      )
      .then((r) => r.result)
  }

  getTransactionByBlockHashAndIndex(blockHash: string, index: number): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getTransactionByBlockNumberAndIndex', [
          blockHash,
          `0x${new BigNumber(index).toString(16)}`,
        ]),
      )
      .then((r) => r.result)
  }

  getTransactionByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getTransactionByBlockNumberAndIndex', [
          `0x${new BigNumber(blockNumber).toString(16)}`,
          `0x${new BigNumber(index).toString(16)}`,
        ]),
      )
      .then((r) => r.result)
  }

  getTransactionByHash(txHash: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getTransactionByHash', [txHash]),
      )
      .then((r) => r.result)
  }

  getTransactionCount(address: string, blockNumber?: BlockNumber): Promise<BigNumber> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getTransactionCount', [address, blockNumber || 'pending']),
      )
      .then((r) => new BigNumber(r.result))
  }

  getTransactionReceipt(txHash: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getTransactionReceipt', [txHash]),
      )
      .then((r) => r.result)
  }

  getUncleByBlockHashAndIndex(blockHash: string, index: number): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getUncleByBlockHashAndIndex', [
          blockHash,
          `0x${new BigNumber(index).toString(16)}`,
        ]),
      )
      .then((r) => r.result)
  }

  getUncleByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getUncleByBlockNumberAndIndex', [
          `0x${new BigNumber(blockNumber).toString(16)}`,
          `0x${new BigNumber(index).toString(16)}`,
        ]),
      )
      .then((r) => r.result)
  }

  getUncleCountByBlockHash(blockHash: string): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getUncleCountByBlockHash', [blockHash]),
      )
      .then((r) => r.result)
  }

  getUncleCountByBlockNumber(blockNumber: string | number): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_getUncleCountByBlockNumber', [
          `0x${new BigNumber(blockNumber).toString(16)}`,
        ]),
      )
      .then((r) => r.result)
  }

  protocolVersion(): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_protocolVersion'))
      .then((r) => r.result)
  }

  sendRawTransaction(signedTransactionData: string): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('eth_sendRawTransaction', [signedTransactionData]),
      )
      .then((r) => r.result)
  }

  sha3(data: string): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('web3_sha', [data]))
      .then((r) => r.result)
  }

  syncing(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('eth_syncing'))
      .then((r) => r.result)
  }

  traceBlock(blockNumber: BlockNumber): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('trace_block', [
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        ]),
      )
      .then((r) => r.result)
  }

  traceCall(callObject: TxPayload, traceType: TraceType[], blockNumber: BlockNumber): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('trace_call', [
          callObject,
          traceType,
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        ]),
      )
      .then((r) => r.result)
  }

  traceCallMany(callObject: TxPayload[], traceType: TraceType[][], blockNumber: BlockNumber): Promise<any> {
    const params = callObject.map((call, index) => {
      return [call, traceType[index]]
    })
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('trace_callMany', [
          params,
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        ]),
      )
      .then((r) => r.result)
  }

  traceRawTransaction(signedTransactionData: string, traceOptions: TraceType[]): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('trace_rawTransaction', [signedTransactionData, traceOptions]),
      )
      .then((r) => r.result)
  }

  traceReplayBlockTransactions(blockNumber: BlockNumber, traceOptions: TraceType[]): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('trace_replayBlockTransactions', [blockNumber, traceOptions]),
      )
      .then((r) => r.result)
  }

  traceReplayTransaction(txHash: string, traceOptions: TraceType[]): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('trace_replayTransaction', [txHash, traceOptions]),
      )
      .then((r) => r.result)
  }

  traceTransaction(txHash: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('trace_transaction', [txHash]))
      .then((r) => r.result)
  }

  txPoolContent(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('txpool_content'))
      .then((r) => r.result)
  }

  txPoolInspect(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('txpool_inspect'))
      .then((r) => r.result)
  }

  txPoolStatus(include = 'pending'): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('txpool_status', [include]))
      .then((r) => r.result)
  }
}
