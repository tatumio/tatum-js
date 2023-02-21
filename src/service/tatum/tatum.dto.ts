export interface TatumConfig {
    apiKey?: string
    network?: Network
    validate?: boolean
    debug?: boolean
    retryDelay?: number,
    retryCount?: number
}

export enum Network {
  Mainnet = 'Mainnet',
  Testnet = 'Testnet',
}

export enum Chain {
  Ethereum = 'Ethereum',
  Solana = 'Solana',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
  Bitcoin = 'Bitcoin',
  Litecoin = 'Litecoin',
  BitcoinCash = 'BitcoinCash',
  Dogecoin = 'Dogecoin',
  Tron = 'Tron',
  BinanceSmartChain = 'BinanceSmartChain',
}

export enum TatumChain {
  ETH = 'ETH',
  SOL = 'SOL',
  MATIC = 'MATIC',
  CELO = 'CELO',
  KLAY = 'KLAY',
  BTC = 'BTC',
  LTC = 'LTC',
  BCH = 'BCH',
  DOGE = 'DOGE',
  TRON = 'TRON',
  BSC = 'BSC',
}

export const ChainMap = {
  [Chain.Ethereum]: TatumChain.ETH,
  [Chain.Solana]: TatumChain.SOL,
  [Chain.Polygon]: TatumChain.MATIC,
  [Chain.Celo]: TatumChain.CELO,
  [Chain.Klaytn]: TatumChain.KLAY,
  [Chain.Bitcoin]: TatumChain.BTC,
  [Chain.Litecoin]: TatumChain.LTC,
  [Chain.BitcoinCash]: TatumChain.BCH,
  [Chain.Dogecoin]: TatumChain.DOGE,
  [Chain.Tron]: TatumChain.TRON,
  [Chain.BinanceSmartChain]: TatumChain.BSC,
}
export const ChainMapInverse = {
  [TatumChain.ETH]: Chain.Ethereum,
  [TatumChain.SOL]: Chain.Solana,
  [TatumChain.MATIC]: Chain.Polygon,
  [TatumChain.CELO]: Chain.Celo,
  [TatumChain.KLAY]: Chain.Klaytn,
  [TatumChain.BTC]: Chain.Bitcoin,
  [TatumChain.LTC]: Chain.Litecoin,
  [TatumChain.BCH]: Chain.BitcoinCash,
  [TatumChain.DOGE]: Chain.Dogecoin,
  [TatumChain.TRON]: Chain.Tron,
  [TatumChain.BSC]: Chain.BinanceSmartChain,
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
