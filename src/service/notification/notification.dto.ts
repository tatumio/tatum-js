import { Chain, TatumChain } from '../tatum/tatum.dto'

export interface GetAllNotificationsQuery {
  pageSize?: number
  offset?: number
  address?: string
}

export type AddressEventNotification = {
  id: string
  chain: Chain
  address: string
  url: string
  type: NotificationType.ADDRESS_EVENT,
}

export interface AddressNotificationDetail {
  address: string
  chain: Chain
  url: string
}

export interface AddressNotification extends AddressNotificationDetail {
  id: string
}

export enum NotificationType {
  ADDRESS_EVENT = 'ADDRESS_EVENT',
}

export interface AddressEventNotificationApi {
  id: string
  type: NotificationType.ADDRESS_EVENT
  attr: {
    chain: TatumChain
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
  type: NotificationType,
  id: string,
  subscriptionId: string,
  url: string
  data: {
    address: string,
    amount: string,
    asset: string,
    blockNumber: number,
    txId: string,
    type: string,
    chain: string,
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
