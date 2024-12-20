import { Network } from '../../dto'
import { ExtensionConstructorOrConfig, WalletProviderConstructorOrConfig } from '../extensions'
import { Logger } from '../logger/logger.types'

export interface TatumConfig {
  /**
   * Blockchain network to use.
   */
  network: Network

  /**
   * API Version of Tatum. Use V3 for api.tatum.io/v3 API keys and V4 for api.tatum.io/v4 API keys. Defaults to V4.
   */
  version?: ApiVersion

  /**
   * Enter your API Key here. You can get it from https://tatum.com.
   * API Key is optional, but your data will by tied to the IP address you are using. If you want to store your data like address notifications, webhooks, etc. you need to use API Key.
   * If you are using Tatum API Key, you can use Tatum SDK without any limitations.
   */
  apiKey?:
    | string
    /**
     * @deprecated Use `string` format instead.
     */
    | {
        /**
         * API Key for ApiVersion.V3
         */
        v3?: string
        /**
         * API Key for ApiVersion.V4
         */
        v4?: string
      }

  /**
   * Verbose logging is disabled by default.
   *
   * @deprecated Use `logger` instead.
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
     * If this is set to `true`, the SDK will not automatically load balance and failover between the available OpenRPC nodes and will use the fastest URL fetched during the startup. Defaults to `false` unless there only a single node is provided.
     */
    oneTimeLoadBalancing?: boolean

    /**
     * If this is set to `true`, the SDK will evict nodes from routing pool if they are failing. If `oneTimeLoadBalancing` is set to `true` or you haven't provided your own rpc nodes, this parameter will default to `false`. Defaults to `true` otherwise.
     *
     * We discourage setting this to `true` if you are using `oneTimeLoadBalancing` as it will result in the SDK not being able to recover a failing node.
     */
    evictNodesOnFailure?: boolean
  }

  /**
   * Optional list of TatumSdkExtensions.
   */
  configureExtensions?: ExtensionConstructorOrConfig[]

  /**
   * Optional list of TatumSdkWalletExtensions.
   */
  configureWalletProviders?: WalletProviderConstructorOrConfig[]

  /**
   * Quiet mode, disables all logging.
   */
  quiet?: boolean

  /**
   * Optional custom logger.
   */
  logger?: Logger
}

export enum ApiVersion {
  V3 = 'V3',
  V4 = 'V4',
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
  ARCHIVE,
}
