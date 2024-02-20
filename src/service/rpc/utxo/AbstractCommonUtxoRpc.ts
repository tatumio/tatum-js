/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcResponse, UtxoBasedCommonRpcInterface } from '../../../dto'

export abstract class AbstractCommonUtxoRpc implements UtxoBasedCommonRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async createRawTransaction(
    inputs: any[],
    outputs: any,
    locktime: number,
    replaceable: boolean,
  ): Promise<JsonRpcResponse<string>> {
    const params: unknown[] = [inputs, outputs]
    if (locktime) {
      params.push(locktime)
    }
    if (replaceable) {
      params.push(replaceable)
    }
    return this.rpcCall<JsonRpcResponse<string>>('createrawtransaction', params)
  }

  async decodeRawTransaction(hexstring: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('decoderawtransaction', [hexstring])
  }

  async decodeScript(hexstring: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('decodescript', [hexstring])
  }

  async estimateSmartFee(blocks: number, estimateMode?: string): Promise<JsonRpcResponse<any>> {
    const params: unknown[] = [blocks]
    if (estimateMode) {
      params.push(estimateMode)
    }
    return this.rpcCall<JsonRpcResponse<any>>('estimatesmartfee', params)
  }

  async getBestBlockHash(): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('getbestblockhash')
  }

  async getBlockChainInfo(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getblockchaininfo')
  }

  async getBlockCount(): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getblockcount')
  }

  async getBlockHash(height: number): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('getblockhash', [height])
  }

  async getBlockHeader(hash: string, verbose = true): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getblockheader', [hash, verbose])
  }

  async getBlockStats(hash: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getblockstats', [hash])
  }

  async getChainTips(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getchaintips')
  }

  async getDifficulty(): Promise<JsonRpcResponse<number>> {
    return this.rpcCall<JsonRpcResponse<number>>('getdifficulty')
  }

  async getMempoolAncestors(txId: string, verbose = false): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getmempoolancestors', [txId, verbose])
  }

  async getMempoolDescendants(txId: string, verbose = false): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getmempooldescendants', [txId, verbose])
  }

  async getMempoolEntry(txId: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getmempoolentry', [txId])
  }

  async getMempoolInfo(): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getmempoolinfo')
  }

  async getRawMemPool(verbose = false): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getrawmempool', [verbose])
  }

  async getRawTransaction(txId: string, verbose = false): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('getrawtransaction', [txId, verbose])
  }

  async getTxOut(txId: string, index: number, includeMempool = true): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('gettxout', [txId, index, includeMempool])
  }

  async getTxOutProof(txIds: string[], blockhash?: string): Promise<JsonRpcResponse<any>> {
    const params: unknown[] = [txIds]
    if (blockhash) {
      params.push(blockhash)
    }
    return this.rpcCall<JsonRpcResponse<any>>('gettxoutproof', params)
  }

  async sendRawTransaction(hexstring: string): Promise<JsonRpcResponse<string>> {
    return this.rpcCall<JsonRpcResponse<string>>('sendrawtransaction', [hexstring])
  }

  async validateAddress(address: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('validateaddress', [address])
  }

  async verifyMessage(
    address: string,
    signature: string,
    message: string,
  ): Promise<JsonRpcResponse<boolean>> {
    return this.rpcCall<JsonRpcResponse<boolean>>('verifymessage', [address, signature, message])
  }

  async verifyTxOutProof(proof: string): Promise<JsonRpcResponse<any>> {
    return this.rpcCall<JsonRpcResponse<any>>('verifytxoutproof', [proof])
  }
}
