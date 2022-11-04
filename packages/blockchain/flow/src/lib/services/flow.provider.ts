import { TATUM_API_CONSTANTS } from '@tatumio/api-client'

export interface FlowProvider {
  getProvider(): string
  isTestnet(): boolean
}

export const flowProvider = (args: { provider?: string; testnet: boolean }) => {
  return {
    getProvider(): string {
      return (
        args.provider ||
        `${process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL}/v3/blockchain/node/FLOW/${
          TATUM_API_CONSTANTS.API_KEY
        }`
      )
    },
    isTestnet(): boolean {
      return args.testnet
    },
  }
}
