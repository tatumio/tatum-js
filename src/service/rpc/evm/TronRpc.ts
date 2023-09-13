/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { CONFIG, Constant, Utils } from '../../../util'
import { TatumConfig } from '../../tatum'
import { AbstractTronRpc, PostI } from '../AbstractTronRpc'
import { GenericRpc } from '../generic/GenericRpc'

@Service({
  factory: (data: { id: string }) => {
    return new TronRpc(data.id)
  },
  transient: true,
})
export class TronRpc extends AbstractTronRpc {
  public readonly genericRpc: GenericRpc
  protected readonly config: TatumConfig
  protected readonly connector: TatumConnector

  constructor(id: string) {
    super()
    this.genericRpc = Container.of(id).get(GenericRpc)
    this.config = Container.of(id).get(CONFIG)
    this.connector = Container.of(id).get(TatumConnector)
  }

  protected async rpcCall<T>(method: string, params?: unknown[]): Promise<T> {
    const preparedCall = Utils.prepareRpcCall(method, params)
    return (await this.connector.rpcCall(Constant.TRON_SHASTA_BASE_URL.RPC, preparedCall)) as T
  }

  async rawRpcCall<T>(body: JsonRpcCall): Promise<T> {
    return (await this.connector.rpcCall(Constant.TRON_SHASTA_BASE_URL.RPC, body)) as T
  }

  async rawBatchRpcCall(body: JsonRpcCall[]): Promise<JsonRpcResponse<any>[] | JsonRpcResponse<any>> {
    return this.connector.rpcCall(Constant.TRON_SHASTA_BASE_URL.RPC, body)
  }

  protected post<T>(post: PostI): Promise<T> {
    return this.connector.post({
      basePath: `${Constant.TRON_SHASTA_BASE_URL.BASE}${post.path}`,
      body: post.body,
    })
  }

  destroy(): void {
    // do nothing
  }
}
