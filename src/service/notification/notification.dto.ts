import { Chain } from '../../util/enum'

export interface PageSize {
  pageSize?: string
}

export interface AddressNotification {
  address: string
  chain: Chain
  url: string
}

export interface CreateSubscriptionResponse {
  id: string
}
