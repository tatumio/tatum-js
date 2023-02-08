import { Chain } from '../tatum/tatum.dto'

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
