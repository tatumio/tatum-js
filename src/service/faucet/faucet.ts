import { Container, Service } from 'typedi'

import { TatumConnector } from '../../connector/tatum.connector'
import { CONFIG, ErrorUtils, LOGGER, ResponseDto } from '../../util'
import { Network, TatumConfig } from '../tatum'

import { Logger } from '../logger/logger.types'
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
  private readonly logger: Logger

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.config = Container.of(this.id).get(CONFIG)
    this.logger = Container.of(this.id).get(LOGGER)
  }

  async fund(address: string): Promise<ResponseDto<TxIdResponse>> {
    if (!this.config.apiKey?.v4) {
      this.logger.warn(
        'Unable to make Faucet calls, get an api key to successfully use this feature: https://co.tatum.io/signup',
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
