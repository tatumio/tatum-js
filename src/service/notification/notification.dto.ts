import { Chain } from '../../utils/enum'

export interface PageSize {
  pageSize?: string
}

export interface CreateSubscription {
  address: string
  chain: Chain
  url: string
}

export interface CreateSubscriptionResponse {
  id: string
}
