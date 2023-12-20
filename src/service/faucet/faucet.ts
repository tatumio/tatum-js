import { Container, Service } from 'typedi'

import { TatumConnector } from '../../connector/tatum.connector'
import { CONFIG, ErrorUtils, ResponseDto, TatumLogger } from '../../util'
import { Network, TatumConfig } from '../tatum'

import { TxIdResponse } from './faucet.dto'

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

  async fund(address: string): Promise<ResponseDto<TxIdResponse>> {
    if (!this.config.quiet && !this.config.apiKey?.v4) {
      TatumLogger.error(
        'Unable to make Faucet Calls, get an api key to successfully use this feature - ',
        'https://co.tatum.io/signup',
      )
    }

    const chain = this.convertToFaucetChain(this.config.network)

    return ErrorUtils.tryFail(async () => {
      return this.connector.post<TxIdResponse>({
        path: `faucet/${chain}/${address}`,
      })
    })
  }

  private convertToFaucetChain(network: Network) {
    return network === Network.HORIZEN_EON_GOBI ? 'eon-testnet' : network
  }
}
