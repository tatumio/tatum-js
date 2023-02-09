import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import Web3 from 'web3'
import { CurrentFee, EstimateGas, EstimationsApi } from './fee.dto'
import { Chain } from '../tatum/tatum.dto'
import { Utils } from '../../util/util.shared'

@Service()
export class Fee {
  private connector: TatumConnector = Container.get(TatumConnector)

  async getCurrentFee(chains: Chain[]): Promise<CurrentFee> {
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

  async estimateGas(estimate: EstimateGas) {
    const { gasLimit, estimations } = await this.connector.post({ path: 'ethereum/gas', body: estimate })
    return {
      gasLimit: gasLimit.toString(),
      gasPrice: this.mapGasPrice({
        slow: estimations.safe,
        medium: estimations.standard,
        fast: estimations.fast,
        baseFee: estimations.baseFee,
      }),
    }
  }


  async estimateGasBatch(estimate: EstimateGas[]) {
    const { estimations, error } = await this.connector.post({ path: 'ethereum/gas/batch', body: estimate })

    return {
      error,
      result: (estimations as EstimationsApi[]).map(estimation => ({
        error: estimation.error,
        contractAddress: estimation.contractAddress,
        gasLimit: estimation.data.gasLimit,
        gasPrice: estimation,
      })),
    }
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
