/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetI } from 'src/dto/GetI'
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { PostI } from '../../../dto/PostI'
import { StellarRpcSuite } from '../../../dto/rpc/StellarRpcSuite'
import { CONFIG, Utils } from '../../../util'
import { TatumConfig } from '../../tatum'
import { AbstractStellarRpc } from './AbstractStellarRpc'

@Service({
  factory: (data: { id: string }) => {
    return new StellarRpc(data.id)
  },
  transient: true,
})
export class StellarRpc extends AbstractStellarRpc implements StellarRpcSuite {
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

  getRpcNodeUrl(): string {
    return Utils.getV3RpcUrl(this.config)
  }
}
