import { Chain, TatumChain } from '../tatum/tatum.dto'

export interface GetAllNotificationsQuery {
  pageSize?: string
  offset?: string
  address?: string
}

export type Notifications = {
  addressTransactions: AddressTransactionNotification[]
}

export type AddressTransactionNotification = {
  id: string
  chain: Chain
  address: string
  url: string
  type: NotificationType.ADDRESS_TRANSACTION,
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
  ADDRESS_TRANSACTION = 'ADDRESS_TRANSACTION',
}

export interface AddressTransactionNotificationApi {
  id: string
  type: NotificationType.ADDRESS_TRANSACTION
  attr: {
    chain: TatumChain
    address: string
    url: string
  }
}
