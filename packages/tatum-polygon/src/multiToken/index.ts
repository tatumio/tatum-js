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
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendPolygonMintMultiTokenSignedTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendPolygonMintMultiTokenBatchSignedTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendPolygonBurnMultiTokenSignedTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendPolygonBurnMultiTokenBatchSignedTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendPolygonTransferMultiTokenSignedTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return preparePolygonBatchTransferMultiTokenSignedTransaction(body, provider)
}

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
