/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Service } from 'typedi'
import {
  BlockNumber,
  EvmBasedRpcInterface,
  JsonRpcResponse,
  LogFilter,
  TraceOptions,
  TraceType,
  TxPayload,
} from '../../../dto'
import { ErrorUtils, ResponseDto, ResponseUtils, Status } from '../../../util'

@Service()
export abstract class AbstractEvmBasedRpc implements EvmBasedRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async blockNumber(): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_blockNumber')
    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async call(callObject: TxPayload, blockNumber?: BlockNumber): Promise<ResponseDto<string>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_call', [
      callObject,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async chainId(): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_chainId')
    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async clientVersion(): Promise<ResponseDto<string>> {
    const r = await this.rpcCall<JsonRpcResponse>('web3_clientVersion')
    return ResponseUtils.fromRpcResult(r)
  }

  async debugGetBadBlocks(): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('debug_getBadBlocks')
    return ResponseUtils.fromRpcResult(r)
  }

  async debugStorageRangeAt(
    blockHash: string,
    txIndex: number,
    contractAddress: string,
    startKey: string,
    maxResult: string,
  ): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('debug_storageRangeAt', [
      blockHash,
      txIndex,
      contractAddress,
      startKey,
      maxResult,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async debugTraceBlockByHash(blockHash: string, traceOptions?: TraceOptions): Promise<ResponseDto<any>> {
    const params: unknown[] = [blockHash]
    if (traceOptions) {
      params.push(traceOptions)
    }
    const r = await this.rpcCall<JsonRpcResponse>('debug_traceBlockByHash', params)
    return ResponseUtils.fromRpcResult(r)
  }

  async debugTraceBlockByNumber(
    blockHash: string | number,
    traceOptions?: TraceOptions,
  ): Promise<ResponseDto<any>> {
    const params: unknown[] = [`0x${new BigNumber(blockHash).toString(16)}`]
    if (traceOptions) {
      params.push(traceOptions)
    }
    const r = await this.rpcCall<JsonRpcResponse>('debug_traceBlockByNumber', params)
    return ResponseUtils.fromRpcResult(r)
  }

  async debugTraceCall(
    callObject: TxPayload,
    blockNumber: BlockNumber,
    traceOptions?: TraceOptions,
  ): Promise<ResponseDto<any>> {
    const params: unknown[] = [callObject, blockNumber]
    if (traceOptions) {
      params.push(traceOptions)
    }
    const r = await this.rpcCall<JsonRpcResponse>('debug_traceCall', params)
    return ResponseUtils.fromRpcResult(r)
  }

  async debugTraceTransaction(txHash: string, traceOptions?: TraceOptions): Promise<ResponseDto<any>> {
    const params: unknown[] = [txHash]
    if (traceOptions) {
      params.push(traceOptions)
    }
    const r = await this.rpcCall<JsonRpcResponse>('debug_traceTransaction', params)
    return ResponseUtils.fromRpcResult(r)
  }

  async estimateGas(callObject: TxPayload): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_estimateGas', [callObject])

    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async gasPrice(): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_gasPrice')
    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async maxPriorityFeePerGas(): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_maxPriorityFeePerGas')
    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async getBalance(address: string, blockNumber?: BlockNumber): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getBalance', [
      address,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async getTokenDecimals(tokenAddress: string): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_call', [
      { to: tokenAddress, data: '0x313ce567' },
      'latest',
    ])
    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async getContractAddress(txHash: string): Promise<ResponseDto<string | null>> {
    const txReceipt = await this.getTransactionReceipt(txHash)
    if (txReceipt.data?.contractAddress) {
      return {
        data: txReceipt.data.contractAddress,
        status: Status.SUCCESS,
      } as ResponseDto<string>
    }

    return {
      status: Status.ERROR,
      error: ErrorUtils.toErrorWithMessage(
        'Failed to get contract address, transaction does not exist, or is not a contract creation tx or is not mined yet.',
      ),
    } as ResponseDto<string>
  }

  async getBlockByHash(blockHash: string, includeTransactions = false): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getBlockByHash', [blockHash, includeTransactions])
    return ResponseUtils.fromRpcResult(r)
  }

  async getBlockTransactionCountByHash(blockHash: string): Promise<ResponseDto<number>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getBlockTransactionCountByHash', [blockHash])
    return ResponseUtils.fromRpcResult(r)
  }

  async getBlockByNumber(blockNumber: BlockNumber, full?: boolean): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getBlockByNumber', [
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      full,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getBlockTransactionCountByNumber(blockNumber: BlockNumber): Promise<ResponseDto<number>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getBlockTransactionCountByNumber', [
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getCode(address: string, blockNumber?: BlockNumber): Promise<ResponseDto<string>> {
    if (!blockNumber) {
      blockNumber = 'latest'
    }

    const r = await this.rpcCall<JsonRpcResponse>('eth_getCode', [
      address,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getLogs(filter: LogFilter): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getLogs', [filter])
    return ResponseUtils.fromRpcResult(r)
  }

  async getProof(
    address: string,
    storageKeys: string[],
    blockNumber?: BlockNumber,
  ): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getProof', [
      address,
      storageKeys,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getStorageAt(
    address: string,
    position: string,
    blockNumber?: BlockNumber,
  ): Promise<ResponseDto<string>> {
    if (!blockNumber) {
      blockNumber = 'latest'
    }

    const r = await this.rpcCall<JsonRpcResponse>('eth_getStorageAt', [
      address,
      position,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getTransactionByBlockHashAndIndex(blockHash: string, index: number): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getTransactionByBlockHashAndIndex', [
      blockHash,
      `0x${new BigNumber(index).toString(16)}`,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getTransactionByBlockNumberAndIndex(
    blockNumber: string | number,
    index: number,
  ): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getTransactionByBlockNumberAndIndex', [
      `0x${new BigNumber(blockNumber).toString(16)}`,
      `0x${new BigNumber(index).toString(16)}`,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getTransactionByHash(txHash: string): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getTransactionByHash', [txHash])
    return ResponseUtils.fromRpcResult(r)
  }

  async getTransactionCount(address: string, blockNumber?: BlockNumber): Promise<ResponseDto<BigNumber>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getTransactionCount', [
      address,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    const response = ResponseUtils.fromRpcResult<BigNumber>(r)
    if (response.data) {
      response.data = new BigNumber(r.result)
    }
    return response
  }

  async getTransactionReceipt(transactionHash: string): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getTransactionReceipt', [transactionHash])
    return ResponseUtils.fromRpcResult(r)
  }

  async getUncleByBlockHashAndIndex(blockHash: string, index: number): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getUncleByBlockHashAndIndex', [
      blockHash,
      `0x${new BigNumber(index).toString(16)}`,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getUncleByBlockNumberAndIndex(
    blockNumber: string | number,
    index: number,
  ): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getUncleByBlockNumberAndIndex', [
      `0x${new BigNumber(blockNumber).toString(16)}`,
      `0x${new BigNumber(index).toString(16)}`,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async getUncleCountByBlockHash(blockHash: string): Promise<ResponseDto<string>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getUncleCountByBlockHash', [blockHash])
    return ResponseUtils.fromRpcResult(r)
  }

  async getUncleCountByBlockNumber(blockNumber: string | number): Promise<ResponseDto<string>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getUncleCountByBlockNumber', [
      `0x${new BigNumber(blockNumber).toString(16)}`,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async protocolVersion(): Promise<ResponseDto<string>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_protocolVersion')
    return ResponseUtils.fromRpcResult(r)
  }

  async sendRawTransaction(signedTransactionData: string): Promise<ResponseDto<string>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_sendRawTransaction', [signedTransactionData])
    return ResponseUtils.fromRpcResult(r)
  }

  async sha3(data: string): Promise<ResponseDto<string>> {
    const r = await this.rpcCall<JsonRpcResponse>('web3_sha', [data])
    return ResponseUtils.fromRpcResult(r)
  }

  async syncing(): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_syncing')
    return ResponseUtils.fromRpcResult(r)
  }

  async traceBlock(blockNumber: BlockNumber, traceOptions?: TraceOptions): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('trace_block', [
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      traceOptions,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async traceCall(
    callObject: TxPayload,
    traceTypes: TraceType[],
    blockNumber?: BlockNumber,
  ): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('trace_call', [
      callObject,
      traceTypes,
      {
        blockNumber:
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      },
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async traceCallMany(
    callObject: TxPayload[],
    traceType: TraceType[][],
    blockNumber: BlockNumber,
  ): Promise<ResponseDto<any>> {
    const params = callObject.map((call, index) => {
      return [call, traceType[index]]
    })
    const r = await this.rpcCall<JsonRpcResponse>('trace_callMany', [
      params,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async traceRawTransaction(
    signedTransactionData: string,
    traceOptions: TraceType[],
  ): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('trace_rawTransaction', [
      signedTransactionData,
      traceOptions,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async traceReplayBlockTransactions(
    blockNumber: BlockNumber,
    traceOptions: TraceType[],
  ): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('trace_replayBlockTransactions', [
      blockNumber,
      traceOptions,
    ])
    return ResponseUtils.fromRpcResult(r)
  }

  async traceReplayTransaction(txHash: string, traceOptions: TraceType[]): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('trace_replayTransaction', [txHash, traceOptions])
    return ResponseUtils.fromRpcResult(r)
  }

  async traceTransaction(txHash: string): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('trace_transaction', [txHash])
    return ResponseUtils.fromRpcResult(r)
  }

  async txPoolContent(): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('txpool_content')
    return ResponseUtils.fromRpcResult(r)
  }

  async txPoolInspect(): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('txpool_inspect')
    return ResponseUtils.fromRpcResult(r)
  }

  async txPoolStatus(): Promise<ResponseDto<any>> {
    const r = await this.rpcCall<JsonRpcResponse>('txpool_status')
    return ResponseUtils.fromRpcResult(r)
  }
}
