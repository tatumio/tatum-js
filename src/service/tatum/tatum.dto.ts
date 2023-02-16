export interface TatumConfig {
    apiKey?: string
    network?: Network
    validate?: boolean
}

export enum Network {
  Mainnet = 'Mainnet',
  Testnet = 'Testnet',
}

export enum Chain {
  ethereum = 'ethereum',
  solana = 'solana',
  polygon = 'polygon',
  celo = 'celo',
  klaytn = 'klaytn',
  bitcoin = 'bitcoin',
  litecoin = 'litecoin',
  bitcoinCash = 'bitcoinCash',
  dogecoin = 'dogecoin',
  tron = 'tron',
  binanceSmartChain = 'binanceSmartChain',
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
  [Chain.ethereum]: TatumChain.ETH,
  [Chain.solana]: TatumChain.SOL,
  [Chain.polygon]: TatumChain.MATIC,
  [Chain.celo]: TatumChain.CELO,
  [Chain.klaytn]: TatumChain.KLAY,
  [Chain.bitcoin]: TatumChain.BTC,
  [Chain.litecoin]: TatumChain.LTC,
  [Chain.bitcoinCash]: TatumChain.BCH,
  [Chain.dogecoin]: TatumChain.DOGE,
  [Chain.tron]: TatumChain.TRON,
  [Chain.binanceSmartChain]: TatumChain.BSC,
}
export const ChainMapInverse = {
  [TatumChain.ETH]: Chain.ethereum,
  [TatumChain.SOL]: Chain.solana,
  [TatumChain.MATIC]: Chain.polygon,
  [TatumChain.CELO]: Chain.celo,
  [TatumChain.KLAY]: Chain.klaytn,
  [TatumChain.BTC]: Chain.bitcoin,
  [TatumChain.LTC]: Chain.litecoin,
  [TatumChain.BCH]: Chain.bitcoinCash,
  [TatumChain.DOGE]: Chain.dogecoin,
  [TatumChain.TRON]: Chain.tron,
  [TatumChain.BSC]: Chain.binanceSmartChain,
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
