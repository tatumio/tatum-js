import { TATUM_API_CONSTANTS } from '@tatumio/api-client'
import { LCDClient } from '@terra-money/terra.js'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'

export interface TerraClient {
  getClient(testnet: boolean, provider?: string): LCDClient
}

export const terraClient = (args: SDKArguments): TerraClient => {
  return {
    getClient(testnet: boolean): LCDClient {
      const url =
        args.provider ||
        `${process.env['TATUM_API_URL'] || TATUM_API_CONSTANTS.URL}/v3/blockchain/node/terra/${args.apiKey}`
      return new LCDClient({ URL: url, chainID: testnet ? 'bombay-12' : 'columbus-5' })
    },
  }
}
