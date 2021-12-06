import {
  prepareAddMultiTokenMinterAbstraction,
  listing,
  ChainDeployMultiToken,
  ChainMintMultiToken,
  ChainMintMultiTokenBatch,
  ChainBurnMultiToken,
  ChainBurnMultiTokenBatch,
  ChainTransferMultiToken,
  ChainTransferMultiTokenBatch,
  ChainAddMinter,
  Sort,
  getMultiTokenTransactionsByAddress as getMultiTokenTransactionsByAddressCore,
  Currency,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
} from '@tatumio/tatum-core'
import {
  sendPolygonDeployMultiTokenSignedTransaction,
  sendPolygonMintMultiTokenSignedTransaction,
  sendPolygonMintMultiTokenBatchSignedTransaction,
  sendPolygonBurnMultiTokenSignedTransaction,
  sendPolygonBurnMultiTokenBatchSignedTransaction,
  sendPolygonTransferMultiTokenSignedTransaction,
  preparePolygonBatchTransferMultiTokenSignedTransaction,
  helperPrepareSCCall,
  helperBroadcastTx,
} from '../'
import { MaticTx } from '../model'

export const deployMultiToken = async (body: ChainDeployMultiToken, provider?: string) => {
  return sendPolygonDeployMultiTokenSignedTransaction(body, provider)
}
export const mintMultiToken = async (body: ChainMintMultiToken, provider?: string) => {
  return sendPolygonMintMultiTokenSignedTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: ChainMintMultiTokenBatch, provider?: string) => {
  return sendPolygonMintMultiTokenBatchSignedTransaction(body, provider)
}
export const burnMultiToken = async (body: ChainBurnMultiToken, provider?: string) => {
  return sendPolygonBurnMultiTokenSignedTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: ChainBurnMultiTokenBatch, provider?: string) => {
  return sendPolygonBurnMultiTokenBatchSignedTransaction(body, provider)
}

export const transferMultiToken = async (body: ChainTransferMultiToken, provider?: string) => {
  return sendPolygonTransferMultiTokenSignedTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: ChainTransferMultiTokenBatch, provider?: string) => {
  return preparePolygonBatchTransferMultiTokenSignedTransaction(body, provider)
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction({ ...body, chain: Currency.MATIC })
  return await helperPrepareSCCall(body, 'grantRole', params, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (body: ChainAddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddMultiTokenMinter(body, provider), body.signatureId)

export const getMultiTokenTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getMultiTokenTransactionsByAddressCore(Currency.MATIC, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.MATIC, txId)
}
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.MATIC, contractAddress, address, tokenId)
}
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.MATIC, contractAddress, address, tokenIds)
}
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.MATIC, txId)
}
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.MATIC, contractAddress, tokenId)
}
