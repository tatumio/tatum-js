/* eslint-disable @typescript-eslint/no-explicit-any */
import { BigNumber } from 'bignumber.js'
import { JsonRpcResponse } from '../JsonRpcResponse.dto'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'
import { BlockNumber, EvmBasedRpcInterface, LogFilter, TxPayload } from './EvmBasedRpcInterface'

export interface NativeEvmBasedRpcSuite extends NativeEvmBasedRpcInterface, AbstractRpcInterface {}
export interface NativeEvmBasedRpcInterface extends EvmBasedRpcInterface {
  blockNumber(nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>>
  chainId(nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>>
  estimateGas(callObject: TxPayload, nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>>
  gasPrice(nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>>
  getBalance(
    address: string,
    blockNumber?: BlockNumber,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<BigNumber>>
  getBlockByHash(
    blockHash: string,
    includeTransactions?: boolean,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>>
  getBlockByNumber(
    blockNumber: string | number,
    includeTransactions?: boolean,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>>
  getBlockTransactionCountByHash(blockHash: string, nativePrefix?: boolean): Promise<JsonRpcResponse<number>>
  getBlockTransactionCountByNumber(
    blockNumber: string | number,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<number>>
  getCode(
    address: string,
    blockNumber?: BlockNumber,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<string>>
  getLogs(filterObject: LogFilter, nativePrefix?: boolean): Promise<JsonRpcResponse<any>>
  getStorageAt(
    address: string,
    position: string,
    blockNumber?: BlockNumber,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<string>>
  getTransactionByBlockHashAndIndex(
    blockHash: string,
    index: number,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>>
  getTransactionByBlockNumberAndIndex(
    blockNumber: string | number,
    index: number,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<any>>
  getTransactionByHash(txHash: string, nativePrefix?: boolean): Promise<JsonRpcResponse<any>>
  getTransactionCount(
    address: string,
    blockNumber?: BlockNumber,
    nativePrefix?: boolean,
  ): Promise<JsonRpcResponse<BigNumber>>
  getTransactionReceipt(txHash: string, nativePrefix?: boolean): Promise<JsonRpcResponse<any>>
  maxPriorityFeePerGas(nativePrefix?: boolean): Promise<JsonRpcResponse<BigNumber>>
  sendRawTransaction(signedTransactionData: string, nativePrefix?: boolean): Promise<JsonRpcResponse<string>>
}
