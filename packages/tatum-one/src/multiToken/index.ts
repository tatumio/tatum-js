import {
  BurnMultiToken,
  BurnMultiTokenBatch,
  Currency,
  DeployMultiToken,
  get,
  MintMultiToken,
  MintMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
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

export const deployMultiToken = async (testnet: boolean, body: DeployMultiToken, provider?: string) => {
  return sendOneDeployMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  return sendOneMintMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
  return sendOneMintMultiTokenBatchSignedTransaction(testnet, body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  return sendOneBurnMultiTokenSignedTransaction(testnet, body, provider)
}
export const burnMultiTokenBatch = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) => {
  return sendOneBurnMultiTokenBatchSignedTransaction(testnet, body, provider)
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  return sendOneTransferMultiTokenSignedTransaction(testnet, body, provider)
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
  return prepareOneBatchTransferMultiTokenSignedTransaction(testnet, body, provider)
}

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
