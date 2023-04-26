/* eslint-disable @typescript-eslint/no-explicit-any */
import { AbstractJsonRpcSuite } from './AbstractJsonRpcSuite'

export interface UtxoBasedRpcSuite extends AbstractJsonRpcSuite {
  // blockchain methods
  getBestBlockHash(): Promise<string>
  getBlock(hashOrHeight: string, verbose?: 0 | 1 | 2): Promise<any>
  getBlockChainInfo(): Promise<any>
  getBlockCount(): Promise<number>
  getBlockHash(height: number): Promise<string>
  getBlockHeader(hash: string, verbose?: boolean): Promise<any>
  getBlockStats(hash: string): Promise<any>
  getChainTips(): Promise<any>
  getDifficulty(): Promise<number>
  getMempoolAncestors(txId: string, verbose?: boolean): Promise<any>
  getMempoolDescendants(txId: string, verbose?: boolean): Promise<any>
  getMempoolEntry(txId: string): Promise<any>
  getMempoolInfo(): Promise<any>
  getRawMemPool(verbose?: boolean): Promise<any>
  getTxOut(txId: string, index: number, includeMempool?: boolean): Promise<any>
  getTxOutProof(txIds: string[], blockhash?: string): Promise<any>
  verifyTxOutProof(proof: string): Promise<any>

  // raw transactions methods
  createRawTransaction(inputs: any[], outputs: any, locktime?: number, replaceable?: boolean): Promise<string>
  decodeRawTransaction(hexstring: string): Promise<any>
  decodeScript(hexstring: string): Promise<any>
  getRawTransaction(txId: string, verbose?: boolean): Promise<any>
  sendRawTransaction(hexstring: string): Promise<string>

  // utility methods
  estimateSmartFee(blocks: number, estimateMode?: 'UNSET' | 'ECONOMICAL' | 'CONSERVATIVE'): Promise<any>
  validateAddress(address: string): Promise<any>
  verifyMessage(address: string, signature: string, message: string): Promise<boolean>
}
