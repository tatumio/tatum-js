/* eslint-disable @typescript-eslint/no-explicit-any */

import { JsonRpcResponse } from '../JsonRpcResponse.dto'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'

export interface UtxoBasedRpcSuite extends UtxoBasedRpcInterface, AbstractRpcInterface {}

export interface UtxoBasedCommonRpcInterface {
  // blockchain methods
  getBestBlockHash(): Promise<JsonRpcResponse<string>>
  getBlockChainInfo(): Promise<JsonRpcResponse<any>>
  getBlockCount(): Promise<JsonRpcResponse<number>>
  getBlockHash(height: number): Promise<JsonRpcResponse<string>>
  getBlockHeader(hash: string, verbose?: boolean): Promise<JsonRpcResponse<any>>
  getBlockStats(hash: string): Promise<JsonRpcResponse<any>>
  getChainTips(): Promise<JsonRpcResponse<any>>
  getDifficulty(): Promise<JsonRpcResponse<number>>
  getMempoolAncestors(txId: string, verbose?: boolean): Promise<JsonRpcResponse<any>>
  getMempoolDescendants(txId: string, verbose?: boolean): Promise<JsonRpcResponse<any>>
  getMempoolEntry(txId: string): Promise<JsonRpcResponse<any>>
  getMempoolInfo(): Promise<JsonRpcResponse<any>>
  getRawMemPool(verbose?: boolean): Promise<JsonRpcResponse<any>>
  getTxOut(txId: string, index: number, includeMempool?: boolean): Promise<JsonRpcResponse<any>>
  getTxOutProof(txIds: string[], blockhash?: string): Promise<JsonRpcResponse<any>>
  verifyTxOutProof(proof: string): Promise<JsonRpcResponse<any>>

  // raw transactions methods
  createRawTransaction(
    inputs: any[],
    outputs: any,
    locktime?: number,
    replaceable?: boolean,
  ): Promise<JsonRpcResponse<string>>
  decodeRawTransaction(hexstring: string): Promise<JsonRpcResponse<any>>
  decodeScript(hexstring: string): Promise<JsonRpcResponse<any>>
  getRawTransaction(txId: string, verbose?: boolean): Promise<JsonRpcResponse<any>>
  sendRawTransaction(hexstring: string): Promise<JsonRpcResponse<string>>

  // utility methods
  estimateSmartFee(
    blocks: number,
    estimateMode?: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE',
  ): Promise<JsonRpcResponse<any>>
  validateAddress(address: string): Promise<JsonRpcResponse<any>>
  verifyMessage(address: string, signature: string, message: string): Promise<JsonRpcResponse<boolean>>
}

export interface UtxoBasedRpcInterface extends UtxoBasedCommonRpcInterface{
  getBlock(hashOrHeight: string, verbose?: 0 | 1 | 2): Promise<JsonRpcResponse<any>>
}

export interface UtxoBasedRpcInterfaceEstimateFee extends UtxoBasedRpcInterface {
  estimateFee(): Promise<JsonRpcResponse<any>>
}

export interface UtxoBasedRpcSuiteEstimateFee extends UtxoBasedRpcSuite, UtxoBasedRpcInterfaceEstimateFee {}
