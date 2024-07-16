/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetI } from 'src/dto/GetI'
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { PostI } from '../../../dto/PostI'
import { CONFIG, Utils } from '../../../util'
import { TatumConfig } from '../../tatum'
import { AbstractTonRpc } from './AbstractTonRpc'
import { TonRpcSuite } from '../../../dto/rpc/ton/TonRpcSuite'

@Service({
  factory: (data: { id: string }) => {
    return new TonRpc(data.id)
  },
  transient: true,
})
export class TonRpc extends AbstractTonRpc implements TonRpcSuite {
  protected readonly connector: TatumConnector
  protected readonly config: TatumConfig

  constructor(id: string) {
    super()
    this.connector = Container.of(id).get(TatumConnector)
    this.config = Container.of(id).get(CONFIG)
  }

  public destroy() {
    // Do nothing
  }

  protected post<T>(post: PostI): Promise<T> {
    const basePath = Utils.getV3RpcUrl(this.config)
    return this.connector.post({ ...post, basePath })
  }

  protected get<T>(get: GetI): Promise<T> {
    const basePath = Utils.getV3RpcUrl(this.config)
    return this.connector.get({ ...get, basePath })
  }

  protected put<T>(put: PostI): Promise<T> {
    const basePath = Utils.getV3RpcUrl(this.config)
    return this.connector.post({ ...put, basePath })
  }
}
