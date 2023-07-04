import { BigNumber } from 'bignumber.js'
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { networkToCurrency } from '../../dto/Currency'
import { CONFIG, ErrorUtils, ResponseDto, Status } from '../../util/'
import { TatumConfig } from '../tatum'
import { ApiEvmFeeResponse, ApiUtxoFeeResponse, CurrentEvmFee, CurrentUtxoFee } from './fee.dto'

export interface FeeService<T> {
  getCurrentFee(): Promise<ResponseDto<T>>
}

@Service({
  factory: (data: { id: string }) => {
    return new FeeUtxo(data.id)
  },
  transient: true,
})
export class FeeUtxo implements FeeService<CurrentUtxoFee> {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.config = Container.of(this.id).get(CONFIG)
  }
  async getCurrentFee(): Promise<ResponseDto<CurrentUtxoFee>> {
    const currency = networkToCurrency(this.config.network)

    const response = await ErrorUtils.tryFail(() =>
      this.connector.get<ApiUtxoFeeResponse>({
        path: `blockchain/fee/${currency}`,
      }),
    )

    const result: ResponseDto<CurrentUtxoFee> = {
      data: null as unknown as CurrentUtxoFee,
      status: Status.ERROR,
      error: response.error,
    }

    if (response.data) {
      result.data = {
        chain: this.config.network,
        lastRecalculated: response.data.time,
        basedOnBlockNumber: response.data.block,
        slow: response.data.slow.toString(),
        medium: response.data.medium.toString(),
        fast: response.data.fast.toString(),
      } as CurrentUtxoFee
      result.status = Status.SUCCESS
    }

    return result
  }
}

@Service({
  factory: (data: { id: string }) => {
    return new FeeEvm(data.id)
  },
  transient: true,
})
export class FeeEvm implements FeeService<CurrentEvmFee> {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.config = Container.of(this.id).get(CONFIG)
  }
  async getCurrentFee(): Promise<ResponseDto<CurrentEvmFee>> {
    const currency = networkToCurrency(this.config.network)

    const response = await ErrorUtils.tryFail(() =>
      this.connector.get<ApiEvmFeeResponse>({
        path: `blockchain/fee/${currency}`,
      }),
    )

    const result: ResponseDto<CurrentEvmFee> = {
      data: null as unknown as CurrentEvmFee,
      status: Status.ERROR,
      error: response.error,
    }

    if (response.data) {
      result.data = {
        chain: this.config.network,
        gasPrice: FeeEvm.mapGasPrice(response.data as ApiEvmFeeResponse),
        lastRecalculated: response.data.time,
        basedOnBlockNumber: response.data.block,
      } as CurrentEvmFee

      result.status = Status.SUCCESS
    }

    return result
  }

  private static mapGasPrice({
    slow,
    baseFee,
    fast,
    medium,
  }: {
    slow: string
    medium: string
    fast: string
    baseFee: string
  }) {
    return {
      slow: new BigNumber(slow.toString()).dividedBy(1e9).toFixed(),
      medium: new BigNumber(medium.toString()).dividedBy(1e9).toFixed(),
      fast: new BigNumber(fast.toString()).dividedBy(1e9).toFixed(),
      unit: 'Gwei',
      baseFee: new BigNumber(baseFee.toString()).dividedBy(1e9).toFixed(),
    }
  }
}
