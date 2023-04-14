import { AddressEventNotificationChain, Network } from '../../dto'

export interface GetAllNotificationsQuery {
  pageSize?: number
  offset?: number
  address?: string
}

export type AddressEventNotification = {
  id: string
  network: Network
  address: string
  url: string
  type: NotificationType.ADDRESS_EVENT
}

export interface AddressBasedNotificationDetail {
  address: string
  url: string
}

export interface AddressBasedNotification extends AddressBasedNotificationDetail {
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

export interface GetAllExecutedWebhooksQuery {
  pageSize?: number
  offset?: number
  direction?: 'asc' | 'desc'
  filterFailed?: boolean
}

export interface Webhook {
  type: NotificationType
  id: string
  subscriptionId: string
  url: string
  data: {
    address: string
    amount: string
    asset: string
    blockNumber: number
    txId: string
    type: string
    chain: string
    subscriptionType: NotificationType
  }
  nextTime: number
  timestamp: number
  retryCount: number
  failed: boolean
  response: {
    code: number
    data: string
    networkError: boolean
  }
}
