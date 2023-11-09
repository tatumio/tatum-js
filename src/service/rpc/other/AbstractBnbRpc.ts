/* eslint-disable @typescript-eslint/no-explicit-any */
import { JsonRpcResponse } from '../../../dto'
import { PostI } from '../../../dto/PostI'
import {
  AbciQuery,
  Blockchain,
  BnbRpcInterface,
  Broadcast,
  Height,
  Tx,
  TxSearch,
} from '../../../dto/rpc/BnbRpcSuite'
import { Utils } from '../../../util'

export abstract class AbstractBnbRpc implements BnbRpcInterface {
  protected abstract post<T>(post: PostI): Promise<T>

  sendRpcCall<T, U>(method: string, params?: T): Promise<U> {
    const body = {
      id: 1,
      jsonrpc: '2.0',
      method,
      params: params ? Utils.convertObjCamelToSnake(params) : {},
    }
    return this.post({ body, path: '' })
  }

  status(): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('status')
  }

  abciInfo(): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('abci_info')
  }

  abciQuery(params: AbciQuery): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('abci_query', params)
  }

  block(params?: Height): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('block', params)
  }

  blockResult(params?: Height): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('block_result', params)
  }

  blockchain(params?: Blockchain): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('blockchain', params)
  }

  commit(params?: Height): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('commit', params)
  }

  tx(params: Tx): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('tx', params)
  }

  broadcastTxAsync(params: Broadcast): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('broadcast_tx_async', params)
  }

  broadcastTxCommit(params: Broadcast): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('broadcast_tx_commit', params)
  }

  broadcastTxSync(params: Broadcast): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('broadcast_tx_sync', params)
  }

  txSearch(params: TxSearch): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('tx_search', params)
  }

  validators(params: Height): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('validators', params)
  }

  unconfirmedTxs(params: { limit: string }): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('unconfirmed_txs', params)
  }

  genesis(): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('genesis')
  }

  health(): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('health')
  }

  netInfo(): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('net_info')
  }

  numUnconfirmedTxs(): Promise<JsonRpcResponse<any>> {
    return this.sendRpcCall('num_unconfirmed_txs')
  }
}
