export * from './lib/algo.sdk'
export * from './lib/services'
export * from './lib/services/algo.wallet'
export * from './lib/services/algo.tx'
export * from './lib/services/algo.web'

export type AlgoApiCallsType = {
  getBlockchainAccountBalance: (account: string) => Promise<{ balance?: number }>
}
