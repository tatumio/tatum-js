export interface TatumConfig {
    apiKey?: string
    testnet?: boolean
    testnetConfig?: TestnetConfig
    validate?: boolean
}

export interface TestnetConfig {
  ethereum: EthereumTestnetChains;
}

export enum EthereumTestnetChains {
  sepolia = 'sepolia',
  goerli = 'goerli',
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
