import { Network } from '../../dto/Network'

export interface TatumConfig {
  /**
   * Blockchain network to use.
   */
  network: Network

  /**
   * API Version of Tatum. Use V1 for api.tatum.io/v3 API keys and V2 for api.tatum.com/v1 API keys. Defaults to V2.
   */
  version?: ApiVersion

  /**
   * Enter your API Key here. You can get it from https://tatum.com.
   * API Key is optional, but your data will by tied to the IP address you are using. If you want to store your data like address notifications, webhooks, etc. you need to use API Key.
   * If you are using Tatum API Key, you can use Tatum SDK without any limitations.
   */
  apiKey?: {
    /**
     * API Key for ApiVersion.V1
     */
    v1?: string
    /**
     * API Key for ApiVersion.V2
     */
    v2?: string
  }

  /**
   * Verbose logging is disabled by default.
   */
  verbose?: boolean

  /**
   * Delay between retries, defaults to 1000ms.
   */
  retryDelay?: number

  /**
   * Number of retries in case of failed requests, defaults to 1.
   */
  retryCount?: number

  /**
   * Optional configuration for an OpenRPC network support.
   */
  rpc?: {
    /**
     * How many blocks behind the head of the blockchain to tolerate before considering the node to be unhealthy. Defaults to `0`.
     */
    allowedBlocksBehind?: number

    /**
     * If this parameter is set, then the SDK will use this URL for all RPC calls. If this parameter is not set, then the SDK will RPC provisioned by Tatum. List of supported blockchains is available [here](https://docs.tatum.io/introduction/supported-blockchains).
     */
    nodes?: RpcNode[]

    /**
     * If this is set to `true`, the SDK will not automatically load balance and failover between the available OpenRPC nodes and will use the fastest URL fetched during the startup. Defaults to `false`.
     */
    oneTimeLoadBalancing?: boolean
  }
}

export enum ApiVersion {
  V1 = 'V1',
  V2 = 'V2',
}

export interface ApiInfoResponse {
  version: string
  status: string
  testnet: boolean
  planName: string
  planCode: string
  price: number
  expiration: number
  creditLimit: number
  usage: number
  rolloverDay: number
}

export interface RpcNode {
  // Url of the node
  url: string

  // Type of the node
  type: RpcNodeType
}

export enum RpcNodeType {
  // Normal node without access to archive data
  NORMAL,

  // Node with access to archive data, will be used for historical data
  ARCHIVE
}
