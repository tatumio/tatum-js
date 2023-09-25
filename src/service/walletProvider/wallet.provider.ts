import { Container, Service } from 'typedi'
import { ITatumSdkContainer, TatumSdkWalletProvider } from "../extensions";

@Service({
  factory: (data: { id: string }) => {
    return new WalletProvider(data.id)
  },
  transient: true,
})
export class WalletProvider {
  constructor(private readonly id: string) {
  }

  use<T extends TatumSdkWalletProvider>(type: new (tatumSdkContainer: ITatumSdkContainer, ...args: unknown[]) => T): T {
    return Container.of(this.id).get(type);
  }
}
