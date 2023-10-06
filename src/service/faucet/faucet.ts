import { Container, Service } from 'typedi'

import { TatumConnector } from '../../connector/tatum.connector'
import { ErrorUtils, ResponseDto } from '../../util'

import { FaucetRequest, TxIdResponse } from './faucet.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Faucet(data.id)
  },
  transient: true,
})
export class Faucet {
  private connector: TatumConnector

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
  }

  getCurrentRateBatch({ chain, address }: FaucetRequest): Promise<ResponseDto<TxIdResponse>> {
    return ErrorUtils.tryFail(async () => {
      return this.connector.post<TxIdResponse>({
        path: `faucet/${chain}/${address}`,
      })
    })
  }
}
