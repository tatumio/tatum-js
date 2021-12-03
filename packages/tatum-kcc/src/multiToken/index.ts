import {
  BurnMultiToken,
  BurnMultiTokenBatch,
  Currency,
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  Sort,
  TransferMultiToken,
  TransferMultiTokenBatch,
  getMultiTokenTransactionsByAddress as getMultiTokenTransactionsByAddressCore,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
} from '@tatumio/tatum-core'
import {
  sendKccDeployMultiTokenSignedTransaction,
  sendKccMintMultiTokenSignedTransaction,
  sendKccMintMultiTokenBatchSignedTransaction,
  sendKccBurnMultiTokenSignedTransaction,
  sendKccBurnMultiTokenBatchSignedTransaction,
  sendKccTransferMultiTokenSignedTransaction,
  prepareKccBatchTransferMultiTokenSignedTransaction,
} from '../transaction'

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendKccDeployMultiTokenSignedTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendKccMintMultiTokenSignedTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendKccMintMultiTokenBatchSignedTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendKccBurnMultiTokenSignedTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendKccBurnMultiTokenBatchSignedTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendKccTransferMultiTokenSignedTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return prepareKccBatchTransferMultiTokenSignedTransaction(body, provider)
}

export const getMultiTokenTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getMultiTokenTransactionsByAddressCore(Currency.KCS, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.KCS, txId)
}
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.KCS, contractAddress, address, tokenId)
}
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.KCS, contractAddress, address, tokenIds)
}
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.KCS, txId)
}
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.KCS, contractAddress, tokenId)
}
