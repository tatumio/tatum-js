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
} from '../'

export const deployMultiToken = async (testnet: boolean, body: DeployMultiToken, provider?: string) => {
  return sendKccDeployMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  return sendKccMintMultiTokenSignedTransaction(testnet, body, provider)
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
  return sendKccMintMultiTokenBatchSignedTransaction(testnet, body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  return sendKccBurnMultiTokenSignedTransaction(testnet, body, provider)
}
export const burnMultiTokenBatch = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) => {
  return sendKccBurnMultiTokenBatchSignedTransaction(testnet, body, provider)
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  return sendKccTransferMultiTokenSignedTransaction(testnet, body, provider)
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
  return prepareKccBatchTransferMultiTokenSignedTransaction(testnet, body, provider)
}

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
