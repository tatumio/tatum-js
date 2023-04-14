/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { CONFIG } from '../../../util'
import { AbstractJsonRpc } from './AbstractJsonRpc'

@Service({
  factory: (data: { id: string }) => {
    return new GenericRpc(data.id)
  },
  transient: true,
})
export class GenericRpc extends AbstractJsonRpc {
  constructor(id: string) {
    super(id, Container.of(id).get(CONFIG).network)
  }
}
