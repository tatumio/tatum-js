import {
  getMarketplaceFee as getMarketplaceFeeDefi,
  getMarketplaceFeeRecipient as getMarketplaceFeeRecipientDefi,
  getMarketplaceListing as getMarketplaceListingDefi,
} from '@tatumio/tatum-defi'
import { Currency } from '@tatumio/tatum-core'

export const getMarketplaceFee = async (contractAddress: string) => {
  return getMarketplaceFeeDefi(Currency.ADA, contractAddress)
}
export const getMarketplaceListing = async (contractAddress: string, listingId: string) => {
  return getMarketplaceListingDefi(Currency.ADA, contractAddress, listingId)
}
export const getMarketplaceFeeRecipient = async (contractAddress: string) => {
  return getMarketplaceFeeRecipientDefi(Currency.ADA, contractAddress)
}
