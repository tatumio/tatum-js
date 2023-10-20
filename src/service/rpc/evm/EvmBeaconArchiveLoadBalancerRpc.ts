/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Service } from 'typedi'
import { EvmBasedBeaconRpcSuite } from '../../../dto'
import { LoadBalancer } from '../generic/LoadBalancer'
import { EvmArchiveLoadBalancerRpc } from './EvmArchiveLoadBalancerRpc'
import { BeaconV1EvmRpc } from './BeaconV1EvmRpc'

@Service({
  factory: (data: { id: string }) => {
    return new EvmBeaconArchiveLoadBalancerRpc(data.id)
  },
  transient: true,
})
export class EvmBeaconArchiveLoadBalancerRpc extends EvmArchiveLoadBalancerRpc implements EvmBasedBeaconRpcSuite {
  protected readonly loadBalancerRpc: LoadBalancer
  public readonly beacon = {
    v1: Container.of(this.id).get(BeaconV1EvmRpc),
  };

  constructor(private id: string) {
    super(id);
    this.loadBalancerRpc = Container.of(id).get(LoadBalancer);
  }
}
