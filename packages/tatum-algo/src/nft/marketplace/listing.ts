import {
  getMarketplaceFee as getMarketplaceFeeDefi,
  getMarketplaceFeeRecipient as getMarketplaceFeeRecipientDefi,
  getMarketplaceListing as getMarketplaceListingDefi,
} from '@tatumio/tatum-defi'
import { Currency } from '@tatumio/tatum-core'

export const getMarketplaceFee = async (contractAddress: string) => {
  return getMarketplaceFeeDefi(Currency.ALGO, contractAddress)
}
export const getMarketplaceListing = async (contractAddress: string, listingId: string) => {
  return getMarketplaceListingDefi(Currency.ALGO, contractAddress, listingId)
}
export const getMarketplaceFeeRecipient = async (contractAddress: string) => {
  return getMarketplaceFeeRecipientDefi(Currency.ALGO, contractAddress)
}
