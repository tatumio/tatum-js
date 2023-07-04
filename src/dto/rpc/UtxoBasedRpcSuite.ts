/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseDto } from '../../util'
import { AbstractRpcInterface } from './AbstractJsonRpcInterface'

export interface UtxoBasedRpcSuite extends UtxoBasedRpcInterface, AbstractRpcInterface {}

export interface UtxoBasedRpcInterface {
  // blockchain methods
  getBestBlockHash(): Promise<ResponseDto<string>>
  getBlock(hashOrHeight: string, verbose?: 0 | 1 | 2): Promise<ResponseDto<any>>
  getBlockChainInfo(): Promise<ResponseDto<any>>
  getBlockCount(): Promise<ResponseDto<number>>
  getBlockHash(height: number): Promise<ResponseDto<string>>
  getBlockHeader(hash: string, verbose?: boolean): Promise<ResponseDto<any>>
  getBlockStats(hash: string): Promise<ResponseDto<any>>
  getChainTips(): Promise<ResponseDto<any>>
  getDifficulty(): Promise<ResponseDto<number>>
  getMempoolAncestors(txId: string, verbose?: boolean): Promise<ResponseDto<any>>
  getMempoolDescendants(txId: string, verbose?: boolean): Promise<ResponseDto<any>>
  getMempoolEntry(txId: string): Promise<ResponseDto<any>>
  getMempoolInfo(): Promise<ResponseDto<any>>
  getRawMemPool(verbose?: boolean): Promise<ResponseDto<any>>
  getTxOut(txId: string, index: number, includeMempool?: boolean): Promise<ResponseDto<any>>
  getTxOutProof(txIds: string[], blockhash?: string): Promise<ResponseDto<any>>
  verifyTxOutProof(proof: string): Promise<ResponseDto<any>>

  // raw transactions methods
  createRawTransaction(
    inputs: any[],
    outputs: any,
    locktime?: number,
    replaceable?: boolean,
  ): Promise<ResponseDto<string>>
  decodeRawTransaction(hexstring: string): Promise<ResponseDto<any>>
  decodeScript(hexstring: string): Promise<ResponseDto<any>>
  getRawTransaction(txId: string, verbose?: boolean): Promise<ResponseDto<any>>
  sendRawTransaction(hexstring: string): Promise<ResponseDto<string>>

  // utility methods
  estimateSmartFee(
    blocks: number,
    estimateMode?: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE',
  ): Promise<ResponseDto<any>>
  validateAddress(address: string): Promise<ResponseDto<any>>
  verifyMessage(address: string, signature: string, message: string): Promise<ResponseDto<boolean>>
}
