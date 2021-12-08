import { ChainDeployErc721, ChainBurnErc721, ChainTransferErc721 } from '@tatumio/tatum-core'

import { sendCreateNFTSignedTransaction, sendTransferNFTSignedTransaction, sendBurnNFTSignedTransaction } from '../transaction'

/**
 * Create new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the create request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: ChainDeployErc721, provider?: string) => {
  return sendCreateNFTSignedTransaction(testnet, body, provider)
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the burn request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: ChainBurnErc721, provider?: string) => {
  return sendBurnNFTSignedTransaction(testnet, body, provider)
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: ChainTransferErc721, provider?: string) => {
  return sendTransferNFTSignedTransaction(testnet, body, provider)
}
