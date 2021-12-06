import {
  prepareAddMultiTokenMinterAbstraction,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  listing,
  Sort,
  getMultiTokenTransactionsByAddress as getMultiTokenTransactionsByAddressCore,
  Currency,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
  ChainDeployMultiToken,
  ChainMintMultiToken,
  ChainMintMultiTokenBatch,
  ChainBurnMultiToken,
  ChainBurnMultiTokenBatch,
  ChainTransferMultiToken,
  ChainTransferMultiTokenBatch,
  ChainAddMinter,
} from '@tatumio/tatum-core'
import {
  sendEthBurnBatchMultiTokenTransaction,
  sendEthBurnMultiTokenTransaction,
  sendEthDeployMultiTokenTransaction,
  sendEthMintMultiTokenBatchTransaction,
  sendEthMintMultiTokenTransaction,
  sendEthMultiTokenBatchTransaction,
  sendEthMultiTokenTransaction,
} from '../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import { ETHTx } from '../model'

export const deployMultiToken = async (body: ChainDeployMultiToken, provider?: string) => {
  return sendEthDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (body: ChainMintMultiToken, provider?: string) => {
  return sendEthMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: ChainMintMultiTokenBatch, provider?: string) => {
  return sendEthMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (body: ChainBurnMultiToken, provider?: string) => {
  return sendEthBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: ChainBurnMultiTokenBatch, provider?: string) => {
  return sendEthBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (body: ChainTransferMultiToken, provider?: string) => {
  return sendEthMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: ChainTransferMultiTokenBatch, provider?: string) => {
  return sendEthMultiTokenBatchTransaction(body, provider)
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction({ ...body, chain: Currency.ETH })
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
  return getMultiTokenTransactionsByAddressCore(Currency.ETH, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.ETH, txId)
}
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.ETH, contractAddress, address, tokenId)
}
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.ETH, contractAddress, address, tokenIds)
}
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.ETH, txId)
}
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.ETH, contractAddress, tokenId)
}
