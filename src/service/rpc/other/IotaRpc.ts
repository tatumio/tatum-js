/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
// Need to import like this to keep browser working
import { GetI } from 'src/dto/GetI'
import { PostI } from 'src/dto/PostI'
import { IotaRpcSuite } from '../../../dto/rpc/IotaRpcSuite'
import { AbstractIotaRpc } from './AbstractIotaRpc'
import { TatumConnector } from '../../../connector'
import { TatumConfig } from '../../tatum'
import { CONFIG, Utils } from '../../../util'

@Service({
  factory: (data: { id: string }) => {
    return new IotaRpc(data.id)
  },
  transient: true,
})
export class IotaRpc extends AbstractIotaRpc implements IotaRpcSuite {
  protected readonly connector: TatumConnector
  protected readonly config: TatumConfig

  constructor(id: string) {
    super()
    this.connector = Container.of(id).get(TatumConnector)
    this.config = Container.of(id).get(CONFIG)
  }

  getRpcNodeUrl(): string {
    return Utils.getV3RpcUrl(this.config)
  }

  protected get<T>(get: GetI): Promise<T> {
    const basePath = Utils.getV3RpcUrl(this.config)
    return this.connector.get({ ...get, basePath })
  }

  protected post<T>(post: PostI): Promise<T> {
    const basePath = Utils.getV3RpcUrl(this.config)
    return this.connector.post({ ...post, basePath })
  }

  protected put<T>(put: PostI): Promise<T> {
    const basePath = Utils.getV3RpcUrl(this.config)
    return this.connector.put({ ...put, basePath })
  }

  protected delete<T>(get: GetI): Promise<T> {
    const basePath = Utils.getV3RpcUrl(this.config)
    return this.connector.delete({ ...get, basePath })
  }
}
