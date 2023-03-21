import { Chain, TatumChain } from '../tatum'

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

export interface AddressBasedNotificationDetail<TChainEnum extends keyof typeof Chain> {
  address: string
  chain: TChainEnum
  url: string
}

export interface AddressBasedNotification<TChainEnum extends keyof typeof Chain> extends AddressBasedNotificationDetail<TChainEnum> {
  id: string
}

export interface BlockBasedNotificationDetail<TChainEnum extends keyof typeof Chain> {
  chain: TChainEnum
  url: string
}

export interface BlockBasedNotification<TChainEnum extends keyof typeof Chain> extends BlockBasedNotificationDetail<TChainEnum> {
  id: string
}

export enum FailedTxPerBlockChain {
  Ethereum = 'Ethereum',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
  BinanceSmartChain = 'BinanceSmartChain',
}

export enum IncomingNativeTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
  Bitcoin = 'Bitcoin',
  Litecoin = 'Litecoin',
  Dogecoin = 'Dogecoin',
}

export enum OutgoingNativeTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
  Bitcoin = 'Bitcoin',
  Litecoin = 'Litecoin',
}

export enum OutgoingFailedTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum PaidFeeChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum IncomingInternalTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum OutgoingInternalTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum IncomingFungibleTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum OutgoingFungibleTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum IncomingNftTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum OutgoingNftTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum IncomingMultitokenTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
}

export enum OutgoingMultitokenTxChain {
  Ethereum = 'Ethereum',
  BinanceSmartChain = 'BinanceSmartChain',
  Polygon = 'Polygon',
  Celo = 'Celo',
  Klaytn = 'Klaytn',
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

  FAILED_TXS_PER_BLOCK = 'FAILED_TXS_PER_BLOCK'
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
