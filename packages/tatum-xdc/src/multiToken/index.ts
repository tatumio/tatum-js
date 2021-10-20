import {
    get,
    Currency,
    BurnMultiToken,
    BurnMultiTokenBatch,
    DeployMultiToken,
    MintMultiToken,
    MintMultiTokenBatch,
    TransferMultiToken,
    TransferMultiTokenBatch,
} from '@tatumio/tatum-core';

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


export const deployMultiToken = async (testnet: boolean, body: DeployMultiToken, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
}
export const burnMultiToken = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
}
export const burnMultiTokenBatch = async (testnet: boolean, body: BurnMultiTokenBatch, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
}

export const transferMultiToken = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
}
export const transferMultiTokenBatch = async (testnet: boolean, body: TransferMultiTokenBatch, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
}
