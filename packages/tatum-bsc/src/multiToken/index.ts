import {
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  BurnMultiToken,
  BurnMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
  prepareAddMultiTokenMinterAbstraction,
  AddMinter,
  listing,
  getMultiTokenContractAddress as getMultiTokenContractAddressCore,
  getMultiTokensBalance as getMultiTokensBalanceCore,
  getMultiTokensBatchBalance as getMultiTokensBatchBalanceCore,
  getMultiTokenTransaction as getMultiTokenTransactionCore,
  getMultiTokenMetadata as getMultiTokenMetadataCore,
  Currency,
} from '@tatumio/tatum-core'
import {
  sendBscDeployMultiTokenTransaction,
  sendBscMintMultiTokenTransaction,
  sendBscMintMultiTokenBatchTransaction,
  sendBscBurnMultiTokenTransaction,
  sendBscBurnBatchMultiTokenTransaction,
  sendBscMultiTokenTransaction,
  sendBscMultiTokenBatchTransaction,
  helperPrepareSCCall,
  helperBroadcastTx,
} from '../'

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendBscDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendBscMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendBscMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendBscBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendBscBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendBscMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return sendBscMultiTokenBatchTransaction(body, provider)
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
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenContractAddress = async (txId: string) => {
  return getMultiTokenContractAddressCore(Currency.BSC, txId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalance" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokensBalance = async (contractAddress: string, address: string, tokenId: string) => {
  return getMultiTokensBalanceCore(Currency.BSC, contractAddress, address, tokenId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalanceBatch" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokensBatchBalance = async (contractAddress: string, address: string, tokenIds: string) => {
  return getMultiTokensBatchBalanceCore(Currency.BSC, contractAddress, address, tokenIds)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenTransaction = async (txId: string) => {
  return getMultiTokenTransactionCore(Currency.BSC, txId)
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetMetadata" target="_blank">Tatum API documentation</a>
 */
export const getMultiTokenMetadata = async (contractAddress: string, tokenId: string) => {
  return getMultiTokenMetadataCore(Currency.BSC, contractAddress, tokenId)
}
