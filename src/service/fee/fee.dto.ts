import { Chain } from '../../dto'

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

export type CurrentFee = {
  [key in Chain]: {
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
