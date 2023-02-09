import { Token } from 'typedi'

export const CONFIG = new Token<TatumContainerConfig>('TATUM_CONFIG')

export interface TatumContainerConfig {
  apiKey?: string
  testnet?: boolean
}
