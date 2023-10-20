import { AddressEventNotificationChain, Network } from '../../dto'

export interface GetAllSubscriptionsQuery {
  /**
   * Number of records to return. The default is 10.
   */
  pageSize?: number
  /**
   * Number of records to skip. The default is 0.
   */
  offset?: number
  /**
   * Address to filter by.
   */
  address?: string
}

export interface NotificationSubscription {
  /**
   * ID of a subscription.
   */
  id: string
  /**
   * Blockchain network.
   */
  network: Network
  /**
   * URL of the webhook listener.
   */
  url: string
  /**
   * Type of notification subscription.
   */
  type: NotificationType
  /**
   * Address to monitor, valid for some of the types only.
   */
  address?: string
  /**
   * Contract Address to monitor, valid for some of the types only.
   */
  contractAddress?: string
  /**
   * topic[0] event to be tracked.
   */
  event?: string
}

export interface ContractBasedNotificationDetail {
  /**
   * topic[0] event to be tracked.
   */
  event: string
  /**
   * Monitored contract address.
   */
  contractAddress: string
  /**
   * URL of a webhook listener.
   */
  url: string
}

export interface AddressBasedNotificationDetail {
  /**
   * Monitored address.
   */
  address: string
  /**
   * URL of a webhook listener.
   */
  url: string
}

export interface ContractBasedNotification extends ContractBasedNotificationDetail {
  /**
   * ID of a subscription.
   */
  id: string
}

export interface AddressBasedNotification extends AddressBasedNotificationDetail {
  /**
   * ID of a subscription.
   */
  id: string
}

export interface BlockBasedNotificationDetail {
  url: string
}

export interface BlockBasedNotification extends BlockBasedNotificationDetail {
  id: string
}

export enum NotificationType {
  ADDRESS_EVENT = 'ADDRESS_EVENT',
  INCOMING_NATIVE_TX = 'INCOMING_NATIVE_TX',
  OUTGOING_NATIVE_TX = 'OUTGOING_NATIVE_TX',
  OUTGOING_FAILED_TX = 'OUTGOING_FAILED_TX',
  PAID_FEE = 'PAID_FEE',
  INCOMING_INTERNAL_TX = 'INCOMING_INTERNAL_TX',
  OUTGOING_INTERNAL_TX = 'OUTGOING_INTERNAL_TX',
  INCOMING_FUNGIBLE_TX = 'INCOMING_FUNGIBLE_TX',
  OUTGOING_FUNGIBLE_TX = 'OUTGOING_FUNGIBLE_TX',
  INCOMING_NFT_TX = 'INCOMING_NFT_TX',
  OUTGOING_NFT_TX = 'OUTGOING_NFT_TX',
  INCOMING_MULTITOKEN_TX = 'INCOMING_MULTITOKEN_TX',
  OUTGOING_MULTITOKEN_TX = 'OUTGOING_MULTITOKEN_TX',
  CONTRACT_ADDRESS_LOG_EVENT = 'CONTRACT_ADDRESS_LOG_EVENT',

  FAILED_TXS_PER_BLOCK = 'FAILED_TXS_PER_BLOCK',
}

export interface AddressEventNotificationApi {
  id: string
  type: NotificationType.ADDRESS_EVENT
  attr: {
    chain: AddressEventNotificationChain
    address: string
    url: string
  }
}

export interface ContractAddressLogEventNotificationApi {
  id: string
  type: NotificationType.CONTRACT_ADDRESS_LOG_EVENT
  attr: {
    chain: AddressEventNotificationChain
    contractAddress: string
    event: string
    url: string
  }
}

export interface GetAllExecutedWebhooksQuery {
  /**
   * The number of items to return per page. Defaults to 10.
   */
  pageSize?: number
  /**
   * The page offset. Defaults to 0.
   */
  offset?: number
  /**
   * Order of the returned items. 'desc' means the most recent items are returned first. Defaults to 'desc'.
   */
  direction?: 'asc' | 'desc'
  /**
   * Filter failed notifications. If the present method will return only successful or failed results based on the filterFailed field.
   */
  filterFailed?: boolean
}

export interface Webhook {
  // Type of the subscription
  type: NotificationType
  // Id of the notification
  id: string
  // Id of the subscription
  subscriptionId: string
  // The URL on which is notifications request sent
  url: string
  // The webhook payload
  data: {
    // Monitored address
    address: string
    // Amount of the transaction
    amount: string
    // The asset of the notification
    asset: string
    // The number of the block in which the transaction occurs
    blockNumber: number
    // Transaction hash
    txId: string
    // Type of the notification
    type: string
    // Network of the notification
    chain: string
    // Type of the subscription
    subscriptionType: NotificationType
  }
  // Next notification execution try time	- Unix timestamp
  nextTime: number
  // Notification execution time - Unix timestamp
  timestamp: number
  // Number of retries in case of the failed attempts in the past
  retryCount: number
  // Flag indicating whether this notification was successful or not
  failed: boolean
  // Response from the server in case the notification was unsuccessful
  response: {
    code: number
    data: string
    networkError: boolean
  }
}
