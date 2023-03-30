export interface TatumConfig {
  /**
   * Blockchain to use, mainnet or testnet. Mainnet is the default one.
   */
  network?: Network

  /**
   * Verbose logging is disabled by default.
   */
  verbose?: boolean

  /**
   * Delay between retries, defaults to 1000ms.
   */
  retryDelay?: number,

  /**
   * Number of retries in case of failed requests, defaults to 1.
   */
  retryCount?: number

  /**
   * Optional configuration for an OpenRPC network support.
   */
  rpc?: {

    /**
     * How many blocks behind the head of the blockchain to tolerate before considering the node to be unhealthy. Defaults to `2`.
     */
    allowedBlocksBehind?: number
    /**
     * In case this is set to `true`, the SDK will not automatically load balance and failover between the available OpenRPC nodes and will use static URLs defined bellow. Defaults to `false`.
     */
    ignoreLoadBalancing?: boolean

    /**
     * In case this url is set, all the requests to Bitcoin will be proxied to this url without automatic load balancing and failover. For now, only first elements of the array is used as a default URL.
     */
    bitcoin?: {
      url: string[]
    }

    /**
     * In case this url is set, all the requests to Litecoin will be proxied to this url without automatic load balancing and failover. For now, only first elements of the array is used as a default URL.
     */
    litecoin?: {
      url: string[]
    }

    /**
     * In case this url is set, all the requests to Ethereum will be proxied to this url without automatic load balancing and failover. For now, only first elements of the array is used as a default URL.
     */
    ethereum?: {
      url: string[]
    }

    /**
     * In case this url is set, all the requests to Polygon will be proxied to this url without automatic load balancing and failover. For now, only first elements of the array is used as a default URL.
     */
    polygon?: {
      url: string[]
    }

    /**
     * In case this url is set, all the requests to Monero will be proxied to this url without automatic load balancing and failover. For now, only first elements of the array is used as a default URL.
     */
    monero?: {
      url: string[]
    }
  }
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
