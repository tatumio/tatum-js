/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { JsonRpcResponse, UtxoBasedRpcSuite } from '../../../dto'
import { CONFIG } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

@Service({
  factory: (data: { id: string }) => {
    return new UtxoBasedRpc(data.id)
  },
  transient: true,
})
export class UtxoBasedRpc extends AbstractJsonRpc implements UtxoBasedRpcSuite {
  constructor(id: string) {
    super(id, Container.of(id).get(CONFIG).network)
  }

  createRawTransaction(inputs: any[], outputs: any, locktime = 0, replaceable = false): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('createrawtransaction', [inputs, outputs, locktime, replaceable]),
      )
      .then((r) => r.result)
  }

  decodeRawTransaction(hexstring: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('decoderawtransaction', [hexstring]),
      )
      .then((r) => r.result)
  }

  decodeScript(hexstring: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('decodescript', [hexstring]))
      .then((r) => r.result)
  }

  estimateSmartFee(blocks: number, estimateMode = 'CONSERVATIVE'): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('estimatesmartfee', [blocks, estimateMode]),
      )
      .then((r) => r.result)
  }

  getBestBlockHash(): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getbestblockhash'))
      .then((r) => r.result)
  }

  getBlock(hashOrHeight: string, verbose: 0 | 1 | 2 = 1): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getblock', [hashOrHeight, verbose]),
      )
      .then((r) => r.result)
  }

  getBlockChainInfo(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getblockchaininfo'))
      .then((r) => r.result)
  }

  getBlockCount(): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getblockcount'))
      .then((r) => r.result)
  }

  getBlockHash(height: number): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getblockhash', [height]))
      .then((r) => r.result)
  }

  getBlockHeader(hash: string, verbose = true): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getblockheader', [hash, verbose]))
      .then((r) => r.result)
  }

  getBlockStats(hash: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getblockstats', [hash]))
      .then((r) => r.result)
  }

  getChainTips(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getchaintips'))
      .then((r) => r.result)
  }

  getDifficulty(): Promise<number> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getdifficulty'))
      .then((r) => r.result)
  }

  getMempoolAncestors(txId: string, verbose = false): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getmempoolancestors', [txId, verbose]),
      )
      .then((r) => r.result)
  }

  getMempoolDescendants(txId: string, verbose = false): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getmempooldescendants', [txId, verbose]),
      )
      .then((r) => r.result)
  }

  getMempoolEntry(txId: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getmempoolentry', [txId]))
      .then((r) => r.result)
  }

  getMempoolInfo(): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getmempoolinfo'))
      .then((r) => r.result)
  }

  getRawMemPool(verbose = false): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('getrawmempool', [verbose]))
      .then((r) => r.result)
  }

  getRawTransaction(txId: string, verbose = false): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('getrawtransaction', [txId, verbose]),
      )
      .then((r) => r.result)
  }

  getTxOut(txId: string, index: number, includeMempool = true): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('gettxout', [txId, index, includeMempool]),
      )
      .then((r) => r.result)
  }

  getTxOutProof(txIds: string[], blockhash?: string): Promise<any> {
    const params: unknown[] = [txIds]
    if (blockhash) {
      params.push(blockhash)
    }
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('gettxoutproof', params))
      .then((r) => r.result)
  }
  sendRawTransaction(hexstring: string): Promise<string> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('sendrawtransaction', [hexstring]))
      .then((r) => r.result)
  }

  validateAddress(address: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('validateaddress', [address]))
      .then((r) => r.result)
  }

  verifyMessage(address: string, signature: string, message: string): Promise<boolean> {
    return this.connector
      .rpcCall<JsonRpcResponse>(
        this.getRpcNodeUrl(),
        this.prepareRpcCall('verifymessage', [address, signature, message]),
      )
      .then((r) => r.result)
  }

  verifyTxOutProof(proof: string): Promise<any> {
    return this.connector
      .rpcCall<JsonRpcResponse>(this.getRpcNodeUrl(), this.prepareRpcCall('verifytxoutproof', [proof]))
      .then((r) => r.result)
  }
}
