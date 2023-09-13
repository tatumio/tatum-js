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
}
