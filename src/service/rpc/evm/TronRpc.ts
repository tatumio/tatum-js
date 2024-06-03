/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { JsonRpcCall, JsonRpcResponse } from '../../../dto'
import { PostI } from '../../../dto/PostI'
import { Logger } from '../../../service/logger/logger.types'
import { CONFIG, Constant, LOGGER, Utils } from '../../../util'
import { TatumConfig } from '../../tatum'
import { GenericRpc } from '../generic/GenericRpc'
import { AbstractTronRpc } from './AbstractTronRpc'
import { GetI } from '../../../dto/GetI'

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
  protected readonly logger: Logger

  constructor(id: string) {
    super()
    this.genericRpc = Container.of(id).get(GenericRpc)
    this.config = Container.of(id).get(CONFIG)
    this.connector = Container.of(id).get(TatumConnector)
    this.logger = Container.of(id).get(LOGGER)
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

  protected get<T>(get: GetI): Promise<T> {
    return this.connector.get({
      basePath: `${Constant.TRON_SHASTA_BASE_URL.BASE}${get.path}`,
    })
  }

  destroy(): void {
    // do nothing
  }

  getRpcNodeUrl(): string {
    return this.genericRpc.getRpcNodeUrl()
  }
}
