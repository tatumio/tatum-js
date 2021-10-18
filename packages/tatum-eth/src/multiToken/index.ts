import {
    Currency, 
    MintMultiTokenBatch, 
    TransferMultiToken, 
    TransferMultiTokenBatch,
    EthBurnMultiToken,
    EthBurnMultiTokenBatch,
    EthDeployMultiToken,
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

export const deployMultiToken = async (testnet: boolean, body: EthDeployMultiToken & { chain: Currency.ETH }, provider?: string) => {
    return sendEthDeployMultiTokenTransaction(body, provider)
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken & { chain: Currency.ETH }, provider?: string) => {
    return sendEthMintMultiTokenTransaction(body, provider)
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch & { chain: Currency.ETH }, provider?: string) => {
    return sendEthMintMultiTokenBatchTransaction(body, provider)
}
export const burnMultiToken = async (testnet: boolean, body: EthBurnMultiToken & { chain: Currency.ETH }, provider?: string) => {
    return sendEthBurnMultiTokenTransaction(body, provider)
}
export const burnMultiTokenBatch = async (testnet: boolean, body: EthBurnMultiTokenBatch & { chain: Currency.ETH }, provider?: string) => {
    return sendEthBurnBatchMultiTokenTransaction(body, provider)
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken & { chain: Currency.ETH }, provider?: string) => {
    return sendEthMultiTokenTransaction(body, provider)
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch & { chain: Currency.ETH }, provider?: string) => {
    return sendEthMultiTokenBatchTransaction(body, provider)
}

export {
    getMultiTokenContractAddress,
    getMultiTokensBalance,
    getMultiTokensBatchBalance,
    getMultiTokenTransaction,
    getMultiTokenMetadata
} from '@tatumio/tatum-core'