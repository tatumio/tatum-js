/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcResponse, UtxoBasedRpcInterface } from '../../../dto'
import { ResponseDto, ResponseUtils } from '../../../util'

export abstract class AbstractUtxoBasedRpc implements UtxoBasedRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async createRawTransaction(
    inputs: any[],
    outputs: any,
    locktime = 0,
    replaceable = false,
  ): Promise<ResponseDto<string>> {
    const res = await this.rpcCall<JsonRpcResponse>('createrawtransaction', [
      inputs,
      outputs,
      locktime,
      replaceable,
    ])
    return ResponseUtils.fromRpcResult(res)
  }

  async decodeRawTransaction(hexstring: string): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('decoderawtransaction', [hexstring])
    return ResponseUtils.fromRpcResult(res)
  }

  async decodeScript(hexstring: string): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('decodescript', [hexstring])
    return ResponseUtils.fromRpcResult(res)
  }

  async estimateSmartFee(blocks: number, estimateMode = 'CONSERVATIVE'): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('estimatesmartfee', [blocks, estimateMode])
    return ResponseUtils.fromRpcResult(res)
  }

  async getBestBlockHash(): Promise<ResponseDto<string>> {
    const res = await this.rpcCall<JsonRpcResponse>('getbestblockhash')
    return ResponseUtils.fromRpcResult(res)
  }

  async getBlock(hashOrHeight: string, verbose: 0 | 1 | 2 = 1): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getblock', [hashOrHeight, verbose])
    return ResponseUtils.fromRpcResult(res)
  }

  async getBlockChainInfo(): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockchaininfo')
    return ResponseUtils.fromRpcResult(res)
  }

  async getBlockCount(): Promise<ResponseDto<number>> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockcount')
    return ResponseUtils.fromRpcResult(res)
  }

  async getBlockHash(height: number): Promise<ResponseDto<string>> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockhash', [height])
    return ResponseUtils.fromRpcResult(res)
  }

  async getBlockHeader(hash: string, verbose = true): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockheader', [hash, verbose])
    return ResponseUtils.fromRpcResult(res)
  }

  async getBlockStats(hash: string): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockstats', [hash])
    return ResponseUtils.fromRpcResult(res)
  }

  async getChainTips(): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getchaintips')
    return ResponseUtils.fromRpcResult(res)
  }

  async getDifficulty(): Promise<ResponseDto<number>> {
    const res = await this.rpcCall<JsonRpcResponse>('getdifficulty')
    return ResponseUtils.fromRpcResult(res)
  }

  async getMempoolAncestors(txId: string, verbose = false): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempoolancestors', [txId, verbose])
    return ResponseUtils.fromRpcResult(res)
  }

  async getMempoolDescendants(txId: string, verbose = false): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempooldescendants', [txId, verbose])
    return ResponseUtils.fromRpcResult(res)
  }

  async getMempoolEntry(txId: string): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempoolentry', [txId])
    return ResponseUtils.fromRpcResult(res)
  }

  async getMempoolInfo(): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempoolinfo')
    return ResponseUtils.fromRpcResult(res)
  }

  async getRawMemPool(verbose = false): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getrawmempool', [verbose])
    return ResponseUtils.fromRpcResult(res)
  }

  async getRawTransaction(txId: string, verbose = false): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('getrawtransaction', [txId, verbose])
    return ResponseUtils.fromRpcResult(res)
  }

  async getTxOut(txId: string, index: number, includeMempool = true): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('gettxout', [txId, index, includeMempool])
    return ResponseUtils.fromRpcResult(res)
  }

  async getTxOutProof(txIds: string[], blockhash?: string): Promise<ResponseDto<any>> {
    const params: unknown[] = [txIds]
    if (blockhash) {
      params.push(blockhash)
    }
    const res = await this.rpcCall<JsonRpcResponse>('gettxoutproof', params)
    return ResponseUtils.fromRpcResult(res)
  }

  async sendRawTransaction(hexstring: string): Promise<ResponseDto<string>> {
    const res = await this.rpcCall<JsonRpcResponse>('sendrawtransaction', [hexstring])
    return ResponseUtils.fromRpcResult(res)
  }

  async validateAddress(address: string): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('validateaddress', [address])
    return ResponseUtils.fromRpcResult(res)
  }

  async verifyMessage(address: string, signature: string, message: string): Promise<ResponseDto<boolean>> {
    const res = await this.rpcCall<JsonRpcResponse>('verifymessage', [address, signature, message])
    return ResponseUtils.fromRpcResult(res)
  }

  async verifyTxOutProof(proof: string): Promise<ResponseDto<any>> {
    const res = await this.rpcCall<JsonRpcResponse>('verifytxoutproof', [proof])
    return ResponseUtils.fromRpcResult(res)
  }
}
