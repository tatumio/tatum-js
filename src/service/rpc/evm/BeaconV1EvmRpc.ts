/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
// Need to import like this to keep browser working
import { GetI } from '../../../dto/GetI'
import { LoadBalancer } from '../generic/LoadBalancer'
import { AbstractBeaconV1EvmRpc } from './AbstractBeaconV1EvmRpc'

@Service({
  factory: (data: { id: string }) => {
    return new BeaconV1EvmRpc(data.id)
  },
  transient: true,
})
export class BeaconV1EvmRpc extends AbstractBeaconV1EvmRpc {
  protected readonly loadBalancer: LoadBalancer

  constructor(id: string) {
    super()
    this.loadBalancer = Container.of(id).get(LoadBalancer)
  }

  public destroy() {
    this.loadBalancer.destroy()
  }

  protected get<T>(get: GetI): Promise<T> {
    return this.loadBalancer.get(get)
  }
}
