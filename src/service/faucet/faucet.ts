import { Container, Service } from 'typedi'

import { TatumConnector } from '../../connector/tatum.connector'
import { CONFIG, ErrorUtils, ResponseDto } from '../../util'
import { TatumConfig } from '../tatum'

import { FaucetRequest, TxIdResponse } from './faucet.dto'

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

  getFaucetFunds({ address, chain }: FaucetRequest): Promise<ResponseDto<TxIdResponse>> {
    return ErrorUtils.tryFail(async () => {
      return this.connector.post<TxIdResponse>({
        path: `faucet/${chain || this.config.network}/${address}`,
      })
    })
  }
}
