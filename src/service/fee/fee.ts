import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import Web3 from 'web3'
import {
  CurrentFee,
  EmptyObject,
} from './fee.dto'
import { Chain } from '../tatum/tatum.dto'
import { Utils } from '../../util/util.shared'

@Service()
export class Fee {
  private connector: TatumConnector = Container.get(TatumConnector)

  async getCurrentFee(chains: Chain[]): Promise<CurrentFee | EmptyObject> {
    if (!chains.length) {
      return {}
    }

    const uniqueChains = [...new Set(chains)]
    const fees = await Promise.all(uniqueChains.map(chain => this.connector.get({ path: `blockchain/fee/${Utils.mapChain(chain)}` })))
    return chains.reduce((obj, chain) => {
      const fee = fees[uniqueChains.indexOf(chain)]
      return ({
        ...obj, [chain]: {
          gasPrice: this.mapGasPrice(fee),
          lastRecalculated: fee.time,
          basedOnBlockNumber: fee.block,
        },
      })
    }, {} as CurrentFee)
  }


  private mapGasPrice({
                        slow,
                        baseFee,
                        fast,
                        medium,
                      }: { slow: string, medium: string, fast: string, baseFee: string }) {
    return {
      slow: Web3.utils.fromWei(slow.toString(), 'gwei'),
      medium: Web3.utils.fromWei(medium.toString(), 'gwei'),
      fast: Web3.utils.fromWei(fast.toString(), 'gwei'),
      unit: 'Gwei',
      baseFee: Web3.utils.fromWei(baseFee.toString(), 'gwei'),
    }
  }


}
