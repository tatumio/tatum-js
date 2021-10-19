import {
    Currency, 
    MintMultiTokenBatch, 
    TransferMultiToken, 
    TransferMultiTokenBatch,
    BurnMultiToken,
    BurnMultiTokenBatch,
    DeployMultiToken,
    MintMultiToken
} from '@tatumio/tatum-core';
import {
    sendEthBurnBatchMultiTokenTransaction,
    sendEthBurnMultiTokenTransaction,
    sendEthDeployMultiTokenTransaction,
    sendEthMintMultiTokenBatchTransaction,
    sendEthMintMultiTokenTransaction,
    sendEthMultiTokenBatchTransaction,
    sendEthMultiTokenTransaction
} from '../transaction';

export const deployMultiToken = async (testnet: boolean, body: DeployMultiToken, provider?: string) => {
    return sendEthDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
    return sendEthMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
    return sendEthMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
    return sendEthBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) => {
    return sendEthBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
    return sendEthMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
    return sendEthMultiTokenBatchTransaction(body, provider)
}

export {
    getMultiTokenContractAddress,
    getMultiTokensBalance,
    getMultiTokensBatchBalance,
    getMultiTokenTransaction,
    getMultiTokenMetadata
} from '@tatumio/tatum-core'