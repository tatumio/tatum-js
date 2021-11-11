import {
  DeployMultiToken,
  MintMultiToken,
  MintMultiTokenBatch,
  BurnMultiToken,
  BurnMultiTokenBatch,
  TransferMultiToken,
  TransferMultiTokenBatch,
} from '@tatumio/tatum-core'
import {
  sendBscDeployMultiTokenTransaction,
  sendBscMintMultiTokenTransaction,
  sendBscMintMultiTokenBatchTransaction,
  sendBscBurnMultiTokenTransaction,
  sendBscBurnBatchMultiTokenTransaction,
  sendBscMultiTokenTransaction,
  sendBscMultiTokenBatchTransaction,
} from '../'

export const deployMultiToken = async (body: DeployMultiToken, provider?: string) => {
  return sendBscDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (body: MintMultiToken, provider?: string) => {
  return sendBscMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
  return sendBscMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  return sendBscBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) => {
  return sendBscBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  return sendBscMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
  return sendBscMultiTokenBatchTransaction(body, provider)
}

export {
  getMultiTokenContractAddress,
  getMultiTokensBalance,
  getMultiTokensBatchBalance,
  getMultiTokenTransaction,
  getMultiTokenMetadata,
} from '@tatumio/tatum-core'
