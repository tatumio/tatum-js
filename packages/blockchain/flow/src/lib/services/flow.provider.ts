export interface FlowProvider {
  getProvider(): string
  isTestnet(): boolean
}

export const flowProvider = (args: { provider?: string; testnet: boolean }) => {
  const networkUrl = (testnet: boolean) => {
    return testnet ? 'https://rest-testnet.onflow.org' : 'https://rest-mainnet.onflow.org'
  }

  return {
    getProvider(): string {
      return args.provider || networkUrl(args.testnet)
    },
    isTestnet(): boolean {
      return args.testnet
    },
  }
}
