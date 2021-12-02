import {
  getAuction as getAuctionDefi,
  getAuctionFee as getAuctionFeeDefi,
  getAuctionFeeRecipient as getAuctionFeeRecipientDefi,
} from '@tatumio/tatum-defi'
import { Currency } from '@tatumio/tatum-core'

export const getAuctionFee = async (contractAddress: string) => {
  return getAuctionFeeDefi(Currency.ALGO, contractAddress)
}

export const getAuction = async (contractAddress: string, auctionId: string) => {
  return getAuctionDefi(Currency.ALGO, contractAddress, auctionId)
}

export const getAuctionFeeRecipient = async (contractAddress: string) => {
  return getAuctionFeeRecipientDefi(Currency.ALGO, contractAddress)
}
