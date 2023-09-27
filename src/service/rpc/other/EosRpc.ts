/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../../connector/tatum.connector'
import { PostI } from '../../../dto/PostI'
import { EosRpcSuite } from '../../../dto/rpc/EosRpcSuite'
import { CONFIG, Constant, Utils } from '../../../util'
import { TatumConfig } from '../../tatum'
import { AbstractEosRpc } from './AbstractEosRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EosRpc(data.id)
  },
  transient: true,
})
export class EosRpc extends AbstractEosRpc implements EosRpcSuite {
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
    const basePath = Utils.getV3RpcUrl(this.config, `/${Constant.EOS_PREFIX}`)
    return this.connector.post({ ...post, basePath })
  }

  getRpcNodeUrl(): string {
    return Utils.getV3RpcUrl(this.config)
  }
}
