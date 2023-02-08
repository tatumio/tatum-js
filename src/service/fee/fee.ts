import { Container, Service } from 'typedi'
import { TatumConnector } from '../../connector/tatum.connector'
import Web3 from 'web3'
import { EstimateGas, EstimationsApi } from './fee.dto'
import { Chain } from '../tatum/tatum.dto'

@Service()
export class Fee {
  private connector: TatumConnector = Container.get(TatumConnector)

  async getCurrentFee(chain: Chain) {
    const fee = await this.connector.get({ path: `blockchain/fee/${chain}` })
    return {
      gasPrice: this.mapGasPrice(fee),
      lastRecalculated: fee.time,
      basedOnBlockNumber: fee.block,
    }
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
        gasPrice: estimation
      }))
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
      unit: 'gwei',
      baseFee: Web3.utils.fromWei(baseFee.toString(), 'gwei'),
    }
  }


}
