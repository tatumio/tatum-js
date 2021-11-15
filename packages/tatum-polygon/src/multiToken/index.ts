import {
  BurnMultiToken,
  BurnMultiTokenBatch,
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
} from '@tatumio/tatum-core'
import {
  sendPolygonDeployMultiTokenSignedTransaction,
  sendPolygonMintMultiTokenSignedTransaction,
  sendPolygonMintMultiTokenBatchSignedTransaction,
  sendPolygonBurnMultiTokenSignedTransaction,
  sendPolygonBurnMultiTokenBatchSignedTransaction,
  sendPolygonTransferMultiTokenSignedTransaction,
  preparePolygonBatchTransferMultiTokenSignedTransaction,
} from '../'

export const deployMultiToken = async (testnet: boolean, body: DeployMultiToken, provider?: string) => {
  return sendPolygonDeployMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  return sendPolygonMintMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
  return sendPolygonMintMultiTokenBatchSignedTransaction(testnet, body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendPolygonBurnMultiTokenSignedTransaction(body, provider)
}
export const burnMultiTokenBatch = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) => {
  return sendPolygonBurnMultiTokenBatchSignedTransaction(testnet, body, provider)
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  return sendPolygonTransferMultiTokenSignedTransaction(testnet, body, provider)
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
  return preparePolygonBatchTransferMultiTokenSignedTransaction(testnet, body, provider)
}

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
