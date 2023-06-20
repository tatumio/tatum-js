/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcResponse, UtxoBasedRpcInterface } from '../../../dto'

export abstract class AbstractUtxoBasedRpc implements UtxoBasedRpcInterface {
  protected abstract rpcCall<T>(method: string, params?: unknown[]): Promise<T>

  async createRawTransaction(inputs: any[], outputs: any, locktime = 0, replaceable = false): Promise<string> {
    const res = await this.rpcCall<JsonRpcResponse>('createrawtransaction', [inputs, outputs, locktime, replaceable]);
    return res.result;
  }

  async decodeRawTransaction(hexstring: string): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('decoderawtransaction', [hexstring]);
    return res.result;
  }

  async decodeScript(hexstring: string): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('decodescript', [hexstring]);
    return res.result;
  }

  async estimateSmartFee(blocks: number, estimateMode = 'CONSERVATIVE'): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('estimatesmartfee', [blocks, estimateMode]);
    return res.result;
  }

  async getBestBlockHash(): Promise<string> {
    const res = await this.rpcCall<JsonRpcResponse>('getbestblockhash');
    return res.result;
  }

  async getBlock(hashOrHeight: string, verbose: 0 | 1 | 2 = 1): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getblock', [hashOrHeight, verbose]);
    return res.result;
  }

  async getBlockChainInfo(): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockchaininfo');
    return res.result;
  }

  async getBlockCount(): Promise<number> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockcount');
    return res.result;
  }

  async getBlockHash(height: number): Promise<string> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockhash', [height]);
    return res.result;
  }

  async getBlockHeader(hash: string, verbose = true): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockheader', [hash, verbose]);
    return res.result;
  }

  async getBlockStats(hash: string): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getblockstats', [hash]);
    return res.result;
  }

  async getChainTips(): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getchaintips');
    return res
  }

  async getDifficulty(): Promise<number> {
    const res = await this.rpcCall<JsonRpcResponse>('getdifficulty');
    return res.result;
  }

  async getMempoolAncestors(txId: string, verbose = false): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempoolancestors', [txId, verbose]);
    return res.result;
  }

  async getMempoolDescendants(txId: string, verbose = false): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempooldescendants', [txId, verbose]);
    return res.result;
  }

  async getMempoolEntry(txId: string): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempoolentry', [txId]);
    return res.result;
  }

  async getMempoolInfo(): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getmempoolinfo');
    return res.result;
  }

  async getRawMemPool(verbose = false): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getrawmempool', [verbose]);
    return res.result;
  }

  async getRawTransaction(txId: string, verbose = false): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('getrawtransaction', [txId, verbose]);
    return res.result;
  }

  async getTxOut(txId: string, index: number, includeMempool = true): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('gettxout', [txId, index, includeMempool]);
    return res.result;
  }

  async getTxOutProof(txIds: string[], blockhash?: string): Promise<any> {
    const params: unknown[] = [txIds];
    if (blockhash) {
      params.push(blockhash);
    }
    const res = await this.rpcCall<JsonRpcResponse>('gettxoutproof', params);
    return res.result;
  }

  async sendRawTransaction(hexstring: string): Promise<string> {
    const res = await this.rpcCall<JsonRpcResponse>('sendrawtransaction', [hexstring]);
    return res.result;
  }

  async validateAddress(address: string): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('validateaddress', [address]);
    return res.result;
  }

  async verifyMessage(address: string, signature: string, message: string): Promise<boolean> {
    const res = await this.rpcCall<JsonRpcResponse>('verifymessage', [address, signature, message]);
    return res.result;
  }

  async verifyTxOutProof(proof: string): Promise<any> {
    const res = await this.rpcCall<JsonRpcResponse>('verifytxoutproof', [proof]);
    return res.result;
  }
}

