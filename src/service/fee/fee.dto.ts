import { Chain, Network } from '../../dto'

export interface NativeTransferFeeEstimationDetails {
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
    estimations: {
      safe: string
      standard: string
      fast: string
      baseFee: string
    }
  }
}

export interface CurrentEvmFee {
  chain: Network
  gasPrice: {
    slow: string
    medium: string
    fast: string
    baseFee: string
    unit: string
  }
  lastRecalculated: string
  basedOnBlockNumber: string
}

export interface CurrentUtxoFee {
  chain: Network
  slow: string
  medium: string
  fast: string
  unit: string
  lastRecalculated: string
  basedOnBlockNumber: string
}

export type EmptyObject = Record<string, never>

export type NativeTransferFeeEstimation = {
  [key in Chain]: {
    gasPrice: {
      slow: string
      medium: string
      fast: string
      baseFee: string
      unit: string
    }
    gasLimit: string
  }[]
}

export interface ApiUtxoFeeResponse {
  fast: string
  medium: string
  slow: string
  time: string
  block: string
}

export interface ApiEvmFeeResponse {
  slow: string
  baseFee: string
  fast: string
  medium: string
  time: string
  block: string
}
