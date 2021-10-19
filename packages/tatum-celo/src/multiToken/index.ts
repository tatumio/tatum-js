import { CeloDeployMultiToken, CeloMintMultiToken, CeloMintMultiTokenBatch, CeloBurnMultiToken, CeloTransferMultiToken, CeloTransferMultiTokenBatch, CeloBurnMultiTokenBatch } from '../model'
import { sendCeloBurnMultiTokenBatchTransaction, sendCeloBurnMultiTokenTransaction, sendCeloDeployMultiTokenTransaction, sendCeloMintMultiTokenBatchTransaction, sendCeloMintMultiTokenTransaction, sendCeloTransferMultiTokenBatchTransaction, sendCeloTransferMultiTokenTransaction } from '../transaction'

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

export {
    getMultiTokenContractAddress,
    getMultiTokensBalance,
    getMultiTokensBatchBalance,
    getMultiTokenTransaction,
    getMultiTokenMetadata
} from '@tatumio/tatum-core'