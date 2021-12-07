import { ChainBurnMultiToken, ChainMintMultiToken, ChainTransferMultiToken } from '@tatumio/tatum-core'
import {
  sendAlgoCreateFractionalNFTSignedTransaction,
  sendAlgoBurnFractionalNFTSignedTransaction,
  sendAlgoTransferFractionalNFTSignedTransaction,
} from '../'

export const mintMultiToken = async (testnet: boolean, body: ChainMintMultiToken, provider?: string) => {
  return sendAlgoCreateFractionalNFTSignedTransaction(testnet, body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: ChainBurnMultiToken, provider?: string) => {
  return sendAlgoBurnFractionalNFTSignedTransaction(testnet, body, provider)
}
export const transferMultiToken = async (testnet: boolean, body: ChainTransferMultiToken, provider?: string) => {
  return sendAlgoTransferFractionalNFTSignedTransaction(testnet, body, provider)
}
