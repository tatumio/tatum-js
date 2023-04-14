import BigNumber from 'bignumber.js'
import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { Chain } from '../../dto'
import { CurrentFee, EmptyObject } from './fee.dto'

@Service({
  factory: (data: { id: string }) => {
    return new Fee(data.id)
  },
  transient: true,
})
export class Fee {
  private readonly connector: TatumConnector

  private constructor(private readonly id: string) {
    this.connector = Container.of(this.id).get(TatumConnector)
  }
  async getCurrentFee(chains: Chain[]): Promise<CurrentFee | EmptyObject> {
    if (!chains.length) {
      return {}
    }

    const uniqueChains = [...new Set(chains)]
    const fees = await Promise.all(
      uniqueChains.map((chain) =>
        this.connector.get<{
          slow: string
          baseFee: string
          fast: string
          medium: string
          time: number
          block: number
          // TODO
        }>({ path: `blockchain/fee/${chain}` }),
      ),
    )
    return chains.reduce((obj, chain) => {
      const fee = fees[uniqueChains.indexOf(chain)]
      return {
        ...obj,
        [chain]: {
          gasPrice: Fee.mapGasPrice(fee),
          lastRecalculated: fee.time,
          basedOnBlockNumber: fee.block,
        },
      }
    }, {} as CurrentFee)
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
