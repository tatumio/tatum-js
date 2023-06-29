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

@Service()
export abstract class AbstractEvmBasedRpc implements EvmBasedRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async blockNumber(): Promise<BigNumber> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_blockNumber')
    return new BigNumber(r.result)
  }

  async call(callObject: TxPayload, blockNumber?: BlockNumber): Promise<string> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_call', [callObject,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ])
    return r.result;
  }

  async chainId(): Promise<BigNumber> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_chainId');
    return new BigNumber(r.result);
  }

  async clientVersion(): Promise<string> {
    const r = await this.rpcCall<JsonRpcResponse>('web3_clientVersion')
    return r.result;
  }

  async debugGetBadBlocks(): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>('debug_getBadBlocks')
    return r.result;
  }

  async debugStorageRangeAt(
    blockHash: string,
    txIndex: number,
    contractAddress: string,
    startKey: string,
    maxResult: string,
  ): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'debug_storageRangeAt', [blockHash,
        txIndex,
        contractAddress,
        startKey,
        maxResult,
      ])
    return r.result;
  }

  async debugTraceBlockByHash(blockHash: string, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [blockHash];
    if (traceOptions) {
      params.push(traceOptions);
    }
    const r = await this.rpcCall<JsonRpcResponse>('debug_traceBlockByHash', params)
    return r.result;
  }

  async debugTraceBlockByNumber(blockHash: string | number, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [`0x${new BigNumber(blockHash).toString(16)}`];
    if (traceOptions) {
      params.push(traceOptions);
    }
    const r = await this.rpcCall<JsonRpcResponse>('debug_traceBlockByNumber', params)
    return r.result;
  }

  async debugTraceCall(callObject: TxPayload, blockNumber: BlockNumber, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [callObject, blockNumber];
    if (traceOptions) {
      params.push(traceOptions);
    }
    const r = await this.rpcCall <JsonRpcResponse>('debug_traceCall', params,
    )
    return r.result;
  }

  async debugTraceTransaction(txHash: string, traceOptions?: TraceOptions): Promise<any> {
    const params: unknown[] = [txHash];
    if (traceOptions) {
      params.push(traceOptions);
    }
    const r = await this.rpcCall<JsonRpcResponse>('debug_traceTransaction', params)
    return r.result;
  }

  async estimateGas(callObject: TxPayload): Promise<BigNumber> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_estimateGas', [callObject])
    return new BigNumber(r.result)
  }

  async gasPrice(): Promise<BigNumber> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_gasPrice')
    return new BigNumber(r.result);
  }

  async maxPriorityFeePerGas(): Promise<BigNumber> {
    const r = await this.rpcCall <JsonRpcResponse>('eth_maxPriorityFeePerGas')
    return new BigNumber(r.result);
  }

  async getBalance(address: string, blockNumber?: BlockNumber): Promise<BigNumber> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getBalance',
      [address, typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber],
    )
    return new BigNumber(r.result)
  }

  async getTokenDecimals(tokenAddress: string): Promise<BigNumber> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_call', [{ to: tokenAddress, data: '0x313ce567' }, 'latest'])
    return new BigNumber(r.result);
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

  async getBlockByHash(blockHash: string, includeTransactions = false): Promise<any> {
    const r = await this.rpcCall <JsonRpcResponse>('eth_getBlockByHash', [blockHash, includeTransactions])
    return r.result;
  }

  async getBlockTransactionCountByHash(blockHash: string): Promise<number> {
    const r = await this.rpcCall <JsonRpcResponse>('eth_getBlockTransactionCountByHash', [blockHash])
    return r.result;
  }

  async getBlockByNumber(blockNumber: BlockNumber, full?: boolean): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getBlockByNumber',
      [typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber, full],
    )
    return r.result
  }

  async getBlockTransactionCountByNumber(blockNumber: BlockNumber): Promise<number> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getBlockTransactionCountByNumber',
      [typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber],
    )
    return r.result
  }

  async getCode(address: string, blockNumber?: BlockNumber): Promise<string> {
    if(!blockNumber){
      blockNumber = 'latest'
    }

    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getCode',
      [address, typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber],
    )
    return r.result
  }

  async getLogs(filter: LogFilter): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getLogs', [filter])
    return r.result
  }

  async getProof(address: string, storageKeys: string[], blockNumber?: BlockNumber): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getProof', [address,
        storageKeys,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ])
    return r.result;
  }

  async getStorageAt(address: string, position: string, blockNumber?: BlockNumber): Promise<string> {
    if(!blockNumber){
      blockNumber = 'latest'
    }

    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getStorageAt', [address,
        position,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ])
    return r.result;
  }

  async getTransactionByBlockHashAndIndex(blockHash: string, index: number): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getTransactionByBlockHashAndIndex', [blockHash,
        `0x${new BigNumber(index).toString(16)}`,
      ])
    return r.result;
  }

  async getTransactionByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getTransactionByBlockNumberAndIndex', [`0x${new BigNumber(blockNumber).toString(16)}`,
        `0x${new BigNumber(index).toString(16)}`,
      ])
    return r.result;
  }

  async getTransactionByHash(txHash: string): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getTransactionByHash', [txHash]);
    return r.result;
  }


  async getTransactionCount(address: string, blockNumber?: BlockNumber): Promise<BigNumber> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getTransactionCount',
      [address, typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber],
    )
    return new BigNumber(r.result)
  }


  async getTransactionReceipt(transactionHash: string): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>('eth_getTransactionReceipt', [transactionHash])
    return r.result
  }

  async getUncleByBlockHashAndIndex(blockHash: string, index: number): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getUncleByBlockHashAndIndex', [blockHash,
        `0x${new BigNumber(index).toString(16)}`,
      ])
    return r.result;
  }

  async getUncleByBlockNumberAndIndex(blockNumber: string | number, index: number): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getUncleByBlockNumberAndIndex', [`0x${new BigNumber(blockNumber).toString(16)}`,
        `0x${new BigNumber(index).toString(16)}`,
      ])
    return r.result;
  }

  async getUncleCountByBlockHash(blockHash: string): Promise<string> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getUncleCountByBlockHash', [blockHash]);
    return r.result;
  }

  async getUncleCountByBlockNumber(blockNumber: string | number): Promise<string> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_getUncleCountByBlockNumber', [`0x${new BigNumber(blockNumber).toString(16)}`,
      ]);
    return r.result;
  }

  async protocolVersion(): Promise<string> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_protocolVersion');
    return r.result;
  }

  async sendRawTransaction(signedTransactionData: string): Promise<string> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_sendRawTransaction', [signedTransactionData]);
    return r.result;
  }

  async sha3(data: string): Promise<string> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'web3_sha', [data])
    ;
    return r.result;
  }

  async syncing(): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'eth_syncing')
    ;
    return r.result;
  }

  async traceBlock(blockNumber: BlockNumber, traceOptions?: TraceOptions): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'trace_block',
      [typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber, traceOptions],
    )
    return r.result
  }

  async traceCall(callObject: TxPayload, traceTypes: TraceType[], blockNumber?: BlockNumber): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'trace_call',
      [
        callObject,
        traceTypes,
        { blockNumber: typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber },
      ],
    )
    return r.result
  }

  async traceCallMany(callObject: TxPayload[], traceType: TraceType[][], blockNumber: BlockNumber): Promise<any> {
    const params = callObject.map((call, index) => {
      return [call, traceType[index]]
    });
    const r = await this.rpcCall<JsonRpcResponse>(
      'trace_callMany', [params,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ])
    return r.result;
  }

  async traceRawTransaction(signedTransactionData: string, traceOptions: TraceType[]): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'trace_rawTransaction', [signedTransactionData, traceOptions])
    return r.result;
  }

  async traceReplayBlockTransactions(blockNumber: BlockNumber, traceOptions: TraceType[]): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'trace_replayBlockTransactions', [blockNumber, traceOptions])
    return r.result;
  }

  async traceReplayTransaction(txHash: string, traceOptions: TraceType[]): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'trace_replayTransaction', [txHash, traceOptions])
    return r.result;
  }

  async traceTransaction(txHash: string): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'trace_transaction', [txHash])
    return r.result;
  }

  async txPoolContent(): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'txpool_content')
    return r.result;
  }

  async txPoolInspect(): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'txpool_inspect')
    return r.result;
  }

  async txPoolStatus(): Promise<any> {
    const r = await this.rpcCall<JsonRpcResponse>(
      'txpool_status')
    return r.result;
  }
}

