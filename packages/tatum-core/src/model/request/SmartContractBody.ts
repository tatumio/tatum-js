import { UpdateAuctionFee } from './UpdateAuctionFee'
import { ApproveCustodialTransfer } from './ApproveCustodialTransfer'
import { GenerateCustodialAddressBatch } from './GenerateCustodialAddressBatch'
import { UpdateMarketplaceFeeRecipient } from './UpdateMarketplaceFeeRecipient'
import { ApproveNftTransfer } from './ApproveNftTransfer'
import { CreateAuction } from './CreateAuction'
import { InvokeAuctionOperation } from './InvokeAuctionOperation'
import { ApproveErc20 } from './ApproveErc20'
import { AddMinter } from './AddMinter'
import { UpdateMarketplaceFee } from './UpdateMarketplaceFee'
import { InvokeMarketplaceListingOperation } from './InvokeMarketplaceListingOperation'

export type SCBody =
  | UpdateAuctionFee
  | (ApproveCustodialTransfer & { contractAddress: string }) // added in abstraction
  | (GenerateCustodialAddressBatch & { contractAddress: string }) // added in abstraction
  | UpdateMarketplaceFeeRecipient
  | ApproveNftTransfer
  | CreateAuction
  | InvokeAuctionOperation
  | ApproveErc20
  | AddMinter
  | UpdateMarketplaceFee
  | InvokeMarketplaceListingOperation
