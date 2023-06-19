import { BigNumber } from 'bignumber.js'
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { networkToCurrency } from '../../dto/Currency'
import { CONFIG } from '../../util/'
import { TatumConfig } from '../tatum'
import { ApiEvmFeeResponse, ApiUtxoFeeResponse, CurrentEvmFee, CurrentUtxoFee } from './fee.dto'

export interface FeeService<T> {
  getCurrentFee(): Promise<T>
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
  async getCurrentFee(): Promise<CurrentUtxoFee> {
    const currency = networkToCurrency(this.config.network)

    const fee = await this.connector.get<ApiUtxoFeeResponse>({
      path: `blockchain/fee/${currency}`,
    })

    return {
      chain: this.config.network,
      lastRecalculated: fee.time,
      basedOnBlockNumber: fee.block,
      slow: fee.slow.toString(),
      medium: fee.medium.toString(),
      fast: fee.fast.toString(),
    } as CurrentUtxoFee
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
  async getCurrentFee(): Promise<CurrentEvmFee> {
    const currency = networkToCurrency(this.config.network)

    const fee = await this.connector.get<ApiEvmFeeResponse>({
      path: `blockchain/fee/${currency}`,
    })

    return {
      chain: this.config.network,
      gasPrice: FeeEvm.mapGasPrice(fee as ApiEvmFeeResponse),
      lastRecalculated: fee.time,
      basedOnBlockNumber: fee.block,
    } as CurrentEvmFee
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
