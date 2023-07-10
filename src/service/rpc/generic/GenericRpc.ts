import { Container, Service } from 'typedi'
import { CONFIG } from '../../../util'
import { TatumConfig } from '../../tatum'
import { AbstractBatchRpc } from './AbstractBatchRpc'

@Service({
  factory: (data: { id: string }) => {
    return new GenericRpc(data.id)
  },
  transient: true,
})
export class GenericRpc extends AbstractBatchRpc {
  protected readonly config: TatumConfig

  constructor(id: string) {
    super(id)
    this.config = Container.of(id).get(CONFIG)
  }

  protected getRpcNodeUrl() {
    const { apiKey, rpc, network } = this.config
    return (
      rpc?.nodes?.[0].url ||
      `https://api.tatum.io/v3/blockchain/node/${network}${apiKey?.v1 ? `/${apiKey.v1}` : '/'}`
    )
  }
}
