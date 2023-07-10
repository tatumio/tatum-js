import { Container, Service } from 'typedi'
import { EvmBasedRpc } from '../rpc'
import { MetaMask } from './metaMask'

@Service({
  factory: (data: { id: string }) => {
    return new WalletProvider(data.id)
  },
  transient: true,
})
export class WalletProvider {
  readonly metaMask: MetaMask<EvmBasedRpc>

  constructor(private readonly id: string) {
    this.metaMask = Container.of(this.id).get(MetaMask)
  }
}
