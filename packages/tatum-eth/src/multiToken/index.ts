import {
  MintMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
  BurnMultiToken,
  BurnMultiTokenBatch,
  DeployMultiToken,
  MintMultiToken,
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

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendEthDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendEthMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (body: MintMultiTokenBatch, provider?: string) => {
  return sendEthMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (body: BurnMultiToken, provider?: string) => {
  return sendEthBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (body: BurnMultiTokenBatch, provider?: string) => {
  return sendEthBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (body: TransferMultiToken, provider?: string) => {
  return sendEthMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (body: TransferMultiTokenBatch, provider?: string) => {
  return sendEthMultiTokenBatchTransaction(body, provider)
}

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
