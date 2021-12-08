import {
  AddMinter,
  prepareAddMultiTokenMinterAbstraction,
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
} from '@tatumio/tatum-core'
import {
  prepareOneBatchTransferMultiTokenSignedTransaction,
  sendOneBurnMultiTokenBatchSignedTransaction,
  sendOneBurnMultiTokenSignedTransaction,
  sendOneDeployMultiTokenSignedTransaction,
  sendOneMintMultiTokenBatchSignedTransaction,
  sendOneMintMultiTokenSignedTransaction,
  sendOneTransferMultiTokenSignedTransaction,
} from '../transaction'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'

export const deployMultiToken = async (body: ChainDeployMultiToken, provider?: string) => {
  return sendOneDeployMultiTokenSignedTransaction(body, provider)
}
export const mintMultiToken = async (body: ChainMintMultiToken, provider?: string) => {
  return sendOneMintMultiTokenSignedTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: ChainMintMultiTokenBatch, provider?: string) => {
  return sendOneMintMultiTokenBatchSignedTransaction(body, provider)
}
export const burnMultiToken = async (body: ChainBurnMultiToken, provider?: string) => {
  return sendOneBurnMultiTokenSignedTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: ChainBurnMultiTokenBatch, provider?: string) => {
  return sendOneBurnMultiTokenBatchSignedTransaction(body, provider)
}

export const transferMultiToken = async (body: ChainTransferMultiToken, provider?: string) => {
  return sendOneTransferMultiTokenSignedTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: ChainTransferMultiTokenBatch, provider?: string) => {
  return prepareOneBatchTransferMultiTokenSignedTransaction(body, provider)
}

/**
 * Prepare add new minter to the MultiToken (1155) contract transaction.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddMultiTokenMinter = async (body: AddMinter, provider?: string) => {
  const params = await prepareAddMultiTokenMinterAbstraction(body)
  return await helperPrepareSCCall(body, 'grantRole', params, provider, listing.abi)
}

/**
 * Add new minter to the MultiToken (1155) contract.
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddMultiTokenMinter = async (body: AddMinter, provider?: string) =>
  helperBroadcastTx(await prepareAddMultiTokenMinter(body, provider), body.signatureId)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/MultiTokenGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenTransactionsByAddress = async (
  address: string,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: string,
  to?: string,
  sort?: Sort
) => {
  return getMultiTokenTransactionsByAddressCore(Currency.ONE, address, tokenAddress, pageSize, offset, from, to, sort)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.ONE, txId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.ONE, contractAddress, address, tokenId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalanceBatch" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.ONE, contractAddress, address, tokenIds)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.ONE, txId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetMetadata" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.ONE, contractAddress, tokenId)
}
