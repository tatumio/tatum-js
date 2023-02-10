export interface TatumConfig {
    apiKey?: string
    testnet?: boolean
    validate?: boolean
}

export enum Chain {
  ethereum = 'ethereum',
}

export enum TatumChain {
  ETH = 'ETH',
}

export const ChainMap = {
  [Chain.ethereum]: TatumChain.ETH,
}
export const ChainMapInverse = {
  [TatumChain.ETH]: Chain.ethereum
}

export interface ApiInfoResponse {
  version: string;
  status: string;
  testnet: boolean;
  planName: string;
  planCode: string;
  price: number;
  expiration: number;
  creditLimit: number;
  usage: number;
  rolloverDay: number;
}
