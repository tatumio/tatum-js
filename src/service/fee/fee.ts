import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import { CurrentFee, EmptyObject } from './fee.dto'
import { Chain } from '../tatum'
import { Utils } from '../../util'
import BigNumber from 'bignumber.js'

@Service()
export class Fee {
  private connector: TatumConnector = Container.get(TatumConnector)

  async getCurrentFee(chains: Chain[]): Promise<CurrentFee | EmptyObject> {
    if (!chains.length) {
      return {}
    }

    const uniqueChains = [...new Set(chains)]
    const fees = await Promise.all(uniqueChains.map(chain => this.connector.get<{
      slow: string,
      baseFee: string,
      fast: string,
      medium: string,
      time: number,
      block: number,
    }>({ path: `blockchain/fee/${Utils.mapChain(chain)}` })))
    return chains.reduce((obj, chain) => {
      const fee = fees[uniqueChains.indexOf(chain)]
      return ({
        ...obj, [chain]: {
          gasPrice: Fee.mapGasPrice(fee),
          lastRecalculated: fee.time,
          basedOnBlockNumber: fee.block,
        },
      })
    }, {} as CurrentFee)
  }


  private static mapGasPrice({
                               slow,
                               baseFee,
                               fast,
                               medium,
                             }: { slow: string, medium: string, fast: string, baseFee: string }) {
    return {
      slow: new BigNumber(slow.toString()).dividedBy(1e9).toFixed(),
      medium: new BigNumber(medium.toString()).dividedBy(1e9).toFixed(),
      fast: new BigNumber(fast.toString()).dividedBy(1e9).toFixed(),
      unit: 'Gwei',
      baseFee: new BigNumber(baseFee.toString()).dividedBy(1e9).toFixed(),
    }
  }


}
