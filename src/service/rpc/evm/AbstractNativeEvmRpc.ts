/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { Service } from 'typedi'
import { BlockNumber, JsonRpcResponse, LogFilter, TxPayload } from '../../../dto'
import { NativeEvmBasedRpcInterface } from '../../../dto/rpc/NativeEvmBasedRpcInterface'
import { Constant } from '../../../util'
import { AbstractEvmRpc } from './AbstractEvmRpc'

@Service()
export abstract class AbstractNativeEvmRpc extends AbstractEvmRpc implements NativeEvmBasedRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>
  protected abstract getNativePrefix(): string

  private nativeRpcCall<T>({
    method,
    params,
    nativePrefix,
  }: {
    method: string
    params?: unknown[]
    nativePrefix?: boolean
  }): Promise<T> {
    return this.rpcCall<T>(
      `${nativePrefix ? this.getNativePrefix() : Constant.RPC.METHOD_PREFIX}${method}`,
      params,
    )
  }

  async blockNumber(nativePrefix?: boolean): Promise<JsonRpcResponse<any>> {
    const response = await this.nativeRpcCall<JsonRpcResponse<any>>({ method: 'blockNumber', nativePrefix })

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async chainId(nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.nativeRpcCall<JsonRpcResponse<any>>({ method: 'chainId', nativePrefix })

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async estimateGas(callObject: TxPayload, nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'estimateGas',
      params: [callObject],
      nativePrefix,
    })

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async gasPrice(nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.nativeRpcCall<JsonRpcResponse<any>>({ method: 'gasPrice', nativePrefix })
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async maxPriorityFeePerGas(nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'maxPriorityFeePerGas',
      nativePrefix,
    })
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getBalance(
    address: string,
    blockNumber: BlockNumber = 'latest',
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getBalance',
      params: [
        address,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ],
      nativePrefix,
    })
    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getBlockByHash(
    blockHash: string,
    includeTransactions = false,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>> {
    return this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getBlockByHash',
      params: [blockHash, includeTransactions],
      nativePrefix,
    })
  }

  async getBlockTransactionCountByHash(
    blockHash: string,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<number>> {
    return this.nativeRpcCall<JsonRpcResponse<number>>({
      method: 'getBlockTransactionCountByHash',
      params: [blockHash],
      nativePrefix,
    })
  }

  async getBlockByNumber(
    blockNumber: BlockNumber,
    full = true,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>> {
    return this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getBlockByNumber',
      params: [
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
        full,
      ],
      nativePrefix,
    })
  }

  async getBlockTransactionCountByNumber(
    blockNumber: BlockNumber,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<number>> {
    return this.nativeRpcCall<JsonRpcResponse<number>>({
      method: 'getBlockTransactionCountByNumber',
      params: [
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ],
      nativePrefix,
    })
  }

  async getCode(
    address: string,
    blockNumber: BlockNumber = 'latest',
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<string>> {
    if (!blockNumber) {
      blockNumber = 'latest'
    }

    return this.nativeRpcCall<JsonRpcResponse<string>>({
      method: 'getCode',
      params: [
        address,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ],
      nativePrefix,
    })
  }

  async getLogs(filter: LogFilter, nativePrefix?: boolean): Promise<JsonRpcResponse<any>> {
    return this.nativeRpcCall<JsonRpcResponse<any>>({ method: 'getLogs', params: [filter], nativePrefix })
  }

  async getStorageAt(
    address: string,
    position: string,
    blockNumber: BlockNumber = 'latest',
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<string>> {
    if (!blockNumber) {
      blockNumber = 'latest'
    }

    return this.nativeRpcCall<JsonRpcResponse<string>>({
      method: 'getStorageAt',
      params: [
        address,
        position,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ],
      nativePrefix,
    })
  }

  async getTransactionByBlockHashAndIndex(
    blockHash: string,
    index: number,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>> {
    return this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getTransactionByBlockHashAndIndex',
      params: [blockHash, `0x${new BigNumber(index).toString(16)}`],
      nativePrefix,
    })
  }

  async getTransactionByBlockNumberAndIndex(
    blockNumber: string | number,
    index: number,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>> {
    return this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getTransactionByBlockNumberAndIndex',
      params: [`0x${new BigNumber(blockNumber).toString(16)}`, `0x${new BigNumber(index).toString(16)}`],
      nativePrefix,
    })
  }

  async getTransactionByHash(txHash: string, nativePrefix?: boolean): Promise<JsonRpcResponse<any>> {
    return this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getTransactionByHash',
      params: [txHash],
      nativePrefix,
    })
  }

  async getTransactionCount(
    address: string,
    blockNumber: BlockNumber = 'latest',
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<BigNumber>> {
    const response = await this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getTransactionCount',
      params: [
        address,
        typeof blockNumber === 'number' ? '0x' + new BigNumber(blockNumber).toString(16) : blockNumber,
      ],
      nativePrefix,
    })

    if (response.result) {
      response.result = new BigNumber(response.result)
    }
    return response
  }

  async getTransactionReceipt(
    transactionHash: string,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>> {
    return this.nativeRpcCall<JsonRpcResponse<any>>({
      method: 'getTransactionReceipt',
      params: [transactionHash],
      nativePrefix,
    })
  }

  async sendRawTransaction(
    signedTransactionData: string,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<string>> {
    return this.nativeRpcCall<JsonRpcResponse<string>>({
      method: 'sendRawTransaction',
      params: [signedTransactionData],
      nativePrefix,
    })
  }
}
