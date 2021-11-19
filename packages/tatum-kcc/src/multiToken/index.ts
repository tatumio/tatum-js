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

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
