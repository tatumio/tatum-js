/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedBeaconRpcSuite } from '../../../dto'
// Need to import like this to keep browser working
import { LoadBalancer } from '../generic/LoadBalancer'
import { BeaconV1EvmRpc } from './BeaconV1EvmRpc'
import { EvmArchiveLoadBalancerRpc } from './EvmArchiveLoadBalancerRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EvmBeaconArchiveLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class EvmBeaconArchiveLoadBalancerRpc
  extends EvmArchiveLoadBalancerRpc
  implements EvmBasedBeaconRpcSuite
{
  protected readonly loadBalancer: LoadBalancer
  public readonly beacon = {
    v1: Container.of(this.id).get(BeaconV1EvmRpc),
  }

  constructor(private id: string) {
    super(id)
    this.loadBalancer = Container.of(id).get(LoadBalancer)
  }
}
