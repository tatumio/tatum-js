import { Container, Service } from 'typedi'

import { TatumConnector } from '../../connector/tatum.connector'
import { CONFIG, ErrorUtils, ResponseDto } from '../../util'
import { Network, TatumConfig } from '../tatum'

import { FaucetNetwork, FaucetRequest, TxIdResponse } from './faucet.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Faucet(data.id)
  },
  transient: true,
})
export class Faucet {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.config = Container.of(this.id).get(CONFIG)
  }

  async fund({ address, chain }: FaucetRequest): Promise<ResponseDto<TxIdResponse>> {
    const faucetChain = this.convertToFaucetChain(chain || this.config.network)

    return ErrorUtils.tryFail(async () => {
      return this.connector.post<TxIdResponse>({
        path: `faucet/${faucetChain}/${address}`,
      })
    })
  }

  private convertToFaucetChain(network: FaucetNetwork | Network) {
    return network === Network.HORIZEN_EON_GOBI ? 'eon-testnet' : network
  }
}
