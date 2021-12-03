import {
  CeloBurnMultiToken,
  CeloBurnMultiTokenBatch,
  CeloDeployMultiToken,
  CeloMintMultiToken,
  CeloMintMultiTokenBatch,
  CeloTransferMultiToken,
  CeloTransferMultiTokenBatch,
} from '../model'
import {
  sendCeloBurnMultiTokenBatchTransaction,
  sendCeloBurnMultiTokenTransaction,
  sendCeloDeployMultiTokenTransaction,
  sendCeloMintMultiTokenBatchTransaction,
  sendCeloMintMultiTokenTransaction,
  sendCeloTransferMultiTokenBatchTransaction,
  sendCeloTransferMultiTokenTransaction,
} from '../transaction'
import {
  ChainAddMinter,
  Currency,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenTransactionsByAddress as getMultiTokenTransactionsByAddressCore,
  listing,
  prepareAddMultiTokenMinterAbstraction,
  Sort,
} from '@tatumio/tatum-core'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

export const deployMultiToken = async (testnet: boolean, body: CeloDeployMultiToken, provider?: string) => {
  return sendCeloDeployMultiTokenTransaction(testnet, body as CeloDeployMultiToken, provider)
}

export const mintMultiToken = async (testnet: boolean, body: CeloMintMultiToken, provider?: string) => {
  return sendCeloMintMultiTokenTransaction(testnet, body as CeloMintMultiToken, provider)
}

export const mintMultiTokenBatch = async (testnet: boolean, body: CeloMintMultiTokenBatch, provider?: string) => {
  return sendCeloMintMultiTokenBatchTransaction(testnet, body as CeloMintMultiTokenBatch, provider)
}

export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken, provider?: string) => {
  return sendCeloBurnMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider)
}

export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch, provider?: string) => {
  return sendCeloBurnMultiTokenBatchTransaction(testnet, body as CeloBurnMultiTokenBatch, provider)
}

export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken, provider?: string) => {
  return sendCeloTransferMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider)
}

export const transferMultiTokenBatch = async (testnet: boolean, body: CeloTransferMultiTokenBatch, provider?: string) => {
  return sendCeloTransferMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider)
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (testnet: boolean, body: ChainAddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction({ ...body, chain: Currency.CELO })
  return await helperPrepareSCCall(testnet, body, 'grantRole', params, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (testnet: boolean, body: ChainAddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddMultiTokenMinter(testnet, body, provider), body.signatureId)

export const getMultiTokenTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getMultiTokenTransactionsByAddressCore(Currency.CELO, address, tokenAddress, pageSize, offset, from, to, sort)
}
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.CELO, txId)
}
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.CELO, contractAddress, address, tokenId)
}
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.CELO, contractAddress, address, tokenIds)
}
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.CELO, txId)
}
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.CELO, contractAddress, tokenId)
}
