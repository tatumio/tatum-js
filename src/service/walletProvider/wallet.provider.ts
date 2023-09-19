import { Container, Service } from 'typedi'
import { MetaMask } from './metaMask'
import { WalletConnect } from './walletConnect'
import { EvmRpc } from '../rpc'

@Service({
  factory: (data: { id: string }) => {
    return new WalletProvider(data.id)
  },
  transient: true,
})
export class WalletProvider {
  readonly metaMask: MetaMask<EvmRpc>
  readonly walletConnect: WalletConnect<EvmRpc>

  constructor(private readonly id: string) {
    this.metaMask = Container.of(this.id).get(MetaMask)
    this.walletConnect = Container.of(this.id).get(WalletConnect)}
}
