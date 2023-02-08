import { Chain } from '../tatum/tatum.dto'

export interface EstimateGas {
  chain: Chain
  from: string
  to: string
  contractAddress?: string
  amount: string
  data?: string
}

export interface EstimationsApi {
  error: string
  contractAddress: string
  data: {
    gasLimit: string
  }
}
