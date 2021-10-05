import {get, Currency, MintMultiTokenBatch, TransferMultiToken, TransferMultiTokenBatch} from '@tatumio/tatum-core';
import { MintMultiToken } from '@tatumio/tatum-core';
import {
    EthBurnMultiToken,
    EthBurnMultiTokenBatch,
    EthDeployMultiToken,
} from '../model';
import {
    sendEthBurnBatchMultiTokenTransaction,
    sendEthBurnMultiTokenTransaction,
    sendEthDeployMultiTokenTransaction,
    sendEthMintMultiTokenBatchTransaction,
    sendEthMintMultiTokenTransaction,
    sendEthMultiTokenBatchTransaction,
    sendEthMultiTokenTransaction
} from '../transaction';

/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetContractAddress" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokenContractAddress = async (chain: Currency, txId: string): Promise<{ contractAddress: string }> =>
    get(`/v3/multitoken/address/${chain}/${txId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalanceBatch" target="_blank">Tatum API documentation</a>
 */

export const getMultiTokensBalance = async (chain: Currency, contractAddress: string, address: string, tokenId: string): Promise<string[]> =>
    get(`/v3/multitoken/balance/${chain}/${contractAddress}/${address}/${tokenId}`)

/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalance" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokensBatchBalance = async (chain: Currency, contractAddress: string, address: string, tokenIds: string): Promise<string[]> =>
    get(`/v3/multitoken/balance/batch/${chain}/${contractAddress}?address=${address}&tokenId=${tokenIds}`)


/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetTransaction" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokenTransaction = async (chain: Currency, txId: string): Promise<any> =>
    get(`/v3/multitoken/transaction/${chain}/${txId}`)
/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetMetadata" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokenMetadata = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> =>
    get(`/v3/multitoken/metadata/${chain}/${contractAddress}/${tokenId}`)


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
