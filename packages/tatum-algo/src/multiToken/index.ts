import { ChainBurnMultiToken, ChainMintMultiToken, ChainTransferMultiToken } from '@tatumio/tatum-core'
import {
  sendCreateFractionalNFTSignedTransaction,
  sendBurnFractionalNFTSignedTransaction,
  sendTransferFractionalNFTSignedTransaction,
} from '../'

export const mintMultiToken = async (testnet: boolean, body: ChainMintMultiToken, provider?: string) => {
  return sendCreateFractionalNFTSignedTransaction(testnet, body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: ChainBurnMultiToken, provider?: string) => {
  return sendBurnFractionalNFTSignedTransaction(testnet, body, provider)
}
export const transferMultiToken = async (testnet: boolean, body: ChainTransferMultiToken, provider?: string) => {
  return sendTransferFractionalNFTSignedTransaction(testnet, body, provider)
}
