import { Container, Service } from 'typedi'
import { MetaMask } from './metaMask'
import { EvmBasedRpc } from '../rpc'

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