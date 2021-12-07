import { BurnMultiToken, MintMultiToken, TransferMultiToken } from '@tatumio/tatum-core'
import {
  sendCreateFractionalNFTSignedTransaction,
  sendBurnFractionalNFTSignedTransaction,
  sendTransferFractionalNFTSignedTransaction,
} from '../'

export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  return sendCreateFractionalNFTSignedTransaction(testnet, body as MintMultiToken, provider)
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  return sendBurnFractionalNFTSignedTransaction(testnet, body as BurnMultiToken, provider)
}
export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  return sendTransferFractionalNFTSignedTransaction(testnet, body as TransferMultiToken, provider)
}
export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
