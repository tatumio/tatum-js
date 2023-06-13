import { BigNumber } from 'bignumber.js'
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { Currency, networkToCurrency } from '../../dto/Currency'
import { CONFIG } from '../../util/'
import { Network, TatumConfig } from '../tatum'
import { ApiEvmFeeResponse, ApiUtxoFeeResponse, CurrentEvmFee, CurrentUtxoFee } from './fee.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Fee(data.id)
  },
  transient: true,
})
export class Fee {
  private readonly connector: TatumConnector
  private readonly config: TatumConfig

  constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
    this.config = Container.of(this.id).get(CONFIG)
  }
  async getCurrentFee(): Promise<CurrentUtxoFee | CurrentEvmFee> {
    const currency = networkToCurrency(this.config.network)

    const fee = await this.connector.get<ApiEvmFeeResponse | ApiUtxoFeeResponse>({
      path: `blockchain/fee/${currency}`,
    })

    return Fee.map(this.config.network, currency, fee)
  }

  private static map(
    network: Network,
    currency: Currency,
    fee: ApiEvmFeeResponse | ApiUtxoFeeResponse,
  ): CurrentUtxoFee | CurrentEvmFee {
    switch (currency) {
      case Currency.BTC:
      case Currency.LTC:
      case Currency.DOGE:
        return {
          chain: network,
          lastRecalculated: fee.time,
          basedOnBlockNumber: fee.block,
          slow: fee.slow.toString(),
          medium: fee.medium.toString(),
          fast: fee.fast.toString(),
        } as CurrentUtxoFee
      case Currency.ETH:
        return {
          chain: network,
          gasPrice: Fee.mapGasPrice(fee as ApiEvmFeeResponse),
          lastRecalculated: fee.time,
          basedOnBlockNumber: fee.block,
        } as CurrentEvmFee

      default:
        throw new Error('Not supported network')
    }
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
