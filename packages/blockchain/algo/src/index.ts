export type AlgoApiCallsType = {
  getBlockchainAccountBalance: (account: string) => Promise<{ balance?: number }>
}

export * from './lib/algo.sdk'
