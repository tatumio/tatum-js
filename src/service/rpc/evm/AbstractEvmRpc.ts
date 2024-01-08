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
import { Logger } from '../../../service/logger/logger.types'
import { decodeHexString, decodeUInt256 } from '../../../util/decode'

@Service()
export abstract class AbstractEvmRpc implements EvmBasedRpcInterface {
  protected abstract logger: Logger
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async blockNumber(): Promise<JsonRpcResponse<any>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_blockNumber')

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async call(callObject: TxPayload, blockNumber: BlockNumber = 'latest'): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('eth_call', [
      callObject,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
  }

  async chainId(): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_chainId')

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async clientVersion(): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('web3_clientVersion')
  }

  async debugGetBadBlocks(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('debug_getBadBlocks')
  }

  async debugStorageRangeAt(
    blockHash: string,
    txIndex: number,
    contractAddress: string,
    startKey: string,
    maxResult: number,
  ): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('debug_storageRangeAt', [
      blockHash,
      txIndex,
      contractAddress,
      startKey,
      maxResult,
    ])
  }

  async debugTraceBlock(rplBlock: string, traceOptions?: TraceOptions): Promise<JsonRpcResponse<any>> {
    const params: unknown[] = [rplBlock]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.rpcCall<JsonRpcResponse<any>>('debug_traceBlock', params)
  }

  async debugTraceBlockByHash(blockHash: string, traceOptions?: TraceOptions): Promise<JsonRpcResponse<any>> {
    const params: unknown[] = [blockHash]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.rpcCall<JsonRpcResponse<any>>('debug_traceBlockByHash', params)
  }

  async debugTraceBlockByNumber(
    blockHash: string | number,
    traceOptions?: TraceOptions,
  ): Promise<JsonRpcResponse<any>> {
    const params: unknown[] = [`0x${new BigNumber(blockHash).toString(16)}`]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.rpcCall<JsonRpcResponse<any>>('debug_traceBlockByNumber', params)
  }

  async debugTraceCall(
    callObject: TxPayload,
    blockNumber: BlockNumber,
    traceOptions?: TraceOptions,
  ): Promise<JsonRpcResponse<any>> {
    const params: unknown[] = [callObject, blockNumber]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.rpcCall<JsonRpcResponse<any>>('debug_traceCall', params)
  }

  async debugTraceTransaction(txHash: string, traceOptions?: TraceOptions): Promise<JsonRpcResponse<any>> {
    const params: unknown[] = [txHash]
    if (traceOptions) {
      params.push(traceOptions)
    }
    return this.rpcCall<JsonRpcResponse<any>>('debug_traceTransaction', params)
  }

  async estimateGas(callObject: TxPayload): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_estimateGas', [callObject])

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async gasPrice(): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_gasPrice')
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async maxPriorityFeePerGas(): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_maxPriorityFeePerGas')
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getBalance(
    address: string,
    blockNumber: BlockNumber = 'latest',
  ): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_getBalance', [
      address,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getTokenDecimals(tokenAddress: string): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_call', [
      { to: tokenAddress, data: '0x313ce567' },
      'latest',
    ])
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getTokenSymbol(tokenAddress: string): Promise<JsonRpcResponse<string>> {
    const response = await this.rpcCall<JsonRpcResponse<string>>('eth_call', [
      { to: tokenAddress, data: '0x95d89b41' },
      'latest',
    ])
    if (response.result) {
      response.result = decodeHexString(response.result)
    }
    return response
  }

  async getTokenName(tokenAddress: string): Promise<JsonRpcResponse<string>> {
    const response = await this.rpcCall<JsonRpcResponse<string>>('eth_call', [
      { to: tokenAddress, data: '0x06fdde03' },
      'latest',
    ])
    if (response.result) {
      response.result = decodeHexString(response.result)
    }
    return response
  }

  async getTokenCap(tokenAddress: string): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_call', [
      { to: tokenAddress, data: '0x355274ea' },
      'latest',
    ])
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getTokenTotalSupply(tokenAddress: string): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_call', [
      { to: tokenAddress, data: '0x18160ddd' },
      'latest',
    ])
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async supportsInterfaceERC1155(tokenAddress: string): Promise<JsonRpcResponse<boolean>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_call', [
      {
        to: tokenAddress,
        //kecakk256 of supportsInterface(bytes4) + ERC1155 interface id + padding to 64 bytes
        data: '0x01ffc9a7d9b67a2600000000000000000000000000000000000000000000000000000000',
      },
      'latest',
    ])
    if (response.result) {
      response.result = decodeUInt256(response.result) === 1
    }
    return response
  }

  async getContractAddress(txHash: string): Promise<string | null> {
    try {
      const txReceipt = await this.getTransactionReceipt(txHash)
      return txReceipt.result.contractAddress
    } catch (e) {
      this.logger.error(
        'Failed to get contract address, transaction does not exist, or is not a contract creation tx or is not mined yet.',
      )
      return null
    }
  }
  async getBlockByHash(blockHash: string, includeTransactions = false): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getBlockByHash', [blockHash, includeTransactions])
  }

  async getBlockTransactionCountByHash(blockHash: string): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('eth_getBlockTransactionCountByHash', [blockHash])
  }

  async getBlockByNumber(blockNumber: BlockNumber, full = true): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getBlockByNumber', [
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      full,
    ])
  }

  async getBlockTransactionCountByNumber(blockNumber: BlockNumber): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('eth_getBlockTransactionCountByNumber', [
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
  }

  async getCode(address: string, blockNumber: BlockNumber = 'latest'): Promise<JsonRpcResponse<string>> {
    if (!blockNumber) {
      blockNumber = 'latest'
    }

    return this.rpcCall<JsonRpcResponse<string>>('eth_getCode', [
      address,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
  }

  async getLogs(filter: LogFilter): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getLogs', [filter])
  }

  async getProof(
    address: string,
    storageKeys: string[],
    blockNumber: BlockNumber = 'latest',
  ): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getProof', [
      address,
      storageKeys,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
  }

  async getStorageAt(
    address: string,
    position: string,
    blockNumber: BlockNumber = 'latest',
  ): Promise<JsonRpcResponse<string>> {
    if (!blockNumber) {
      blockNumber = 'latest'
    }

    return this.rpcCall<JsonRpcResponse<string>>('eth_getStorageAt', [
      address,
      position,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
  }

  async getTransactionByBlockHashAndIndex(blockHash: string, index: number): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getTransactionByBlockHashAndIndex', [
      blockHash,
      `0x${new BigNumber(index).toString(16)}`,
    ])
  }

  async getTransactionByBlockNumberAndIndex(
    blockNumber: string | number,
    index: number,
  ): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getTransactionByBlockNumberAndIndex', [
      `0x${new BigNumber(blockNumber).toString(16)}`,
      `0x${new BigNumber(index).toString(16)}`,
    ])
  }

  async getTransactionByHash(txHash: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getTransactionByHash', [txHash])
  }

  async getTransactionCount(
    address: string,
    blockNumber: BlockNumber = 'latest',
  ): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.rpcCall<JsonRpcResponse<any>>('eth_getTransactionCount', [
      address,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getTransactionReceipt(transactionHash: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getTransactionReceipt', [transactionHash])
  }

  async getBlockReceipts(blockNumber: string | number): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getBlockReceipts', [
      `0x${new BigNumber(blockNumber).toString(16)}`,
    ])
  }

  async getUncleByBlockHashAndIndex(blockHash: string, index: number): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getUncleByBlockHashAndIndex', [
      blockHash,
      `0x${new BigNumber(index).toString(16)}`,
    ])
  }

  async getUncleByBlockNumberAndIndex(
    blockNumber: string | number,
    index: number,
  ): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_getUncleByBlockNumberAndIndex', [
      `0x${new BigNumber(blockNumber).toString(16)}`,
      `0x${new BigNumber(index).toString(16)}`,
    ])
  }

  async getUncleCountByBlockHash(blockHash: string): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('eth_getUncleCountByBlockHash', [blockHash])
  }

  async getUncleCountByBlockNumber(blockNumber: string | number): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('eth_getUncleCountByBlockNumber', [
      `0x${new BigNumber(blockNumber).toString(16)}`,
    ])
  }

  async protocolVersion(): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('eth_protocolVersion')
  }

  async sendRawTransaction(signedTransactionData: string): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('eth_sendRawTransaction', [signedTransactionData])
  }

  async sha3(data: string): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('web3_sha', [data])
  }

  async syncing(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('eth_syncing')
  }

  async traceBlock(blockNumber: BlockNumber, traceOptions?: TraceOptions): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('trace_block', [
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      traceOptions,
    ])
  }

  async traceCall(
    callObject: TxPayload,
    traceTypes: TraceType[],
    blockNumber: BlockNumber = 'latest',
  ): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('trace_call', [
      callObject,
      traceTypes,
      {
        blockNumber:
          typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      },
    ])
  }

  async traceCallMany(
    callObject: TxPayload[],
    traceType: TraceType[][],
    blockNumber: BlockNumber,
  ): Promise<JsonRpcResponse<any>> {
    const params = callObject.map((call, index) => {
      return [call, traceType[index]]
    })
    return this.rpcCall<JsonRpcResponse<any>>('trace_callMany', [
      params,
      typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
    ])
  }

  async traceRawTransaction(
    signedTransactionData: string,
    traceOptions: TraceType[],
  ): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('trace_rawTransaction', [signedTransactionData, traceOptions])
  }

  async traceReplayBlockTransactions(
    blockNumber: BlockNumber,
    traceOptions: TraceType[],
  ): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('trace_replayBlockTransactions', [blockNumber, traceOptions])
  }

  async traceReplayTransaction(txHash: string, traceOptions: TraceType[]): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('trace_replayTransaction', [txHash, traceOptions])
  }

  async traceTransaction(txHash: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('trace_transaction', [txHash])
  }

  async txPoolContent(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('txpool_content')
  }

  async txPoolInspect(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('txpool_inspect')
  }

  async txPoolStatus(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('txpool_status')
  }
}
