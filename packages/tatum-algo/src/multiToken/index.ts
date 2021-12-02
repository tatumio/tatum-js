import {
  BurnMultiToken,
  MintMultiToken,
  TransferMultiToken,
  getMultiTokenTransactionsByAddress as getMultiTokenTransactionsByAddressCore,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
  Sort,
  Currency,
} from '@tatumio/tatum-core'
import {
  sendAlgoCreateFractionalNFTSignedTransaction,
  sendAlgoBurnFractionalNFTSignedTransaction,
  sendAlgoTransferFractionalNFTSignedTransaction,
} from '../'

export const getMultiTokenTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getMultiTokenTransactionsByAddressCore(Currency.ALGO, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.ALGO, txId)
}
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.ALGO, contractAddress, address, tokenId)
}
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.ALGO, contractAddress, address, tokenIds)
}
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.ALGO, txId)
}
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.ALGO, contractAddress, tokenId)
}

export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  return sendAlgoCreateFractionalNFTSignedTransaction(testnet, body as MintMultiToken, provider)
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  return sendAlgoBurnFractionalNFTSignedTransaction(testnet, body as BurnMultiToken, provider)
}
export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  return sendAlgoTransferFractionalNFTSignedTransaction(testnet, body as TransferMultiToken, provider)
}
