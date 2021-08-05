import { get, post } from '../connector/tatum';
import {
    CeloBurnMultiToken,
    CeloBurnMultiTokenBatch,
    CeloDeployMultiToken,
    CeloMintMultiToken,
    CeloMintMultiTokenBatch,
    CeloTransferMultiToken,
    CeloTransferMultiTokenBatch,
    Currency,
    EthBurnMultiToken,
    EthBurnMultiTokenBatch,
    EthDeployMultiToken,
    MintMultiToken,
    MintMultiTokenBatch,
    TransferMultiToken,
    TransferMultiTokenBatch,
} from '../model';
import {
    prepareOneBatchTransferMultiTokenSignedTransaction,
    preparePolygonBatchTransferMultiTokenSignedTransaction,
    sendBscBurnBatchMultiTokenTransaction,
    sendBscBurnMultiTokenTransaction,
    sendBscDeployMultiTokenTransaction,
    sendBscMintMultiTokenBatchTransaction,
    sendBscMintMultiTokenTransaction,
    sendBscMultiTokenBatchTransaction,
    sendBscMultiTokenTransaction,
    sendCeloBurnMultiTokenBatchTransaction,
    sendCeloBurnMultiTokenTransaction,
    sendCeloDeployMultiTokenTransaction,
    sendCeloMintMultiTokenBatchTransaction,
    sendCeloMintMultiTokenTransaction,
    sendCeloTransferMultiTokenBatchTransaction,
    sendCeloTransferMultiTokenTransaction,
    sendEthBurnBatchMultiTokenTransaction,
    sendEthBurnMultiTokenTransaction,
    sendEthDeployMultiTokenTransaction,
    sendEthMintMultiTokenBatchTransaction,
    sendEthMintMultiTokenTransaction,
    sendEthMultiTokenBatchTransaction,
    sendEthMultiTokenTransaction,
    sendOneBurnMultiTokenBatchSignedTransaction,
    sendOneBurnMultiTokenSignedTransaction,
    sendOneDeployMultiTokenSignedTransaction,
    sendOneMintMultiTokenBatchSignedTransaction,
    sendOneMintMultiTokenSignedTransaction,
    sendOneTransferMultiTokenSignedTransaction,
    sendPolygonBurnMultiTokenBatchSignedTransaction,
    sendPolygonBurnMultiTokenSignedTransaction,
    sendPolygonDeployMultiTokenSignedTransaction,
    sendPolygonMintMultiTokenBatchSignedTransaction,
    sendPolygonMintMultiTokenSignedTransaction,
    sendPolygonTransferMultiTokenSignedTransaction
} from '../transaction';

/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetContractAddress" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokenContractAddress = async (chain: Currency, txId: string): Promise<{ contractAddress: string }> =>
    get(`/v3/multitoken/address/${chain}/${txId}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalanceBatch" target="_blank">Tatum API documentation</a>
 */

export const getMultiTokensBalance = async (chain: Currency, contractAddress: string, address: string, tokenId: string): Promise<string[]> =>
    get(`/v3/multitoken/balance/${chain}/${contractAddress}/${address}/${tokenId}`);

/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetBalance" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokensBatchBalance = async (chain: Currency, contractAddress: string, address: string, tokenIds: string): Promise<string[]> =>
    get(`/v3/multitoken/balance/batch/${chain}/${contractAddress}?address=${address}&tokenId=${tokenIds}`);


/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetTransaction" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokenTransaction = async (chain: Currency, txId: string): Promise<any> =>
    get(`/v3/multitoken/transaction/${chain}/${txId}`);
/**
* For more details, see <a href="https://tatum.io/apidoc#operation/MultiTokenGetMetadata" target="_blank">Tatum API documentation</a>
*/
export const getMultiTokenMetadata = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> =>
    get(`/v3/multitoken/metadata/${chain}/${contractAddress}/${tokenId}`);


export const deployMultiToken = async (testnet: boolean, body: CeloDeployMultiToken | EthDeployMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloDeployMultiTokenTransaction(testnet, body as CeloDeployMultiToken, provider);
        case Currency.MATIC:
            return sendPolygonDeployMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneDeployMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.ETH:
            return sendEthDeployMultiTokenTransaction(body, provider);
        case Currency.BSC:
            return sendBscDeployMultiTokenTransaction(body, provider);
    }
};
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken | CeloMintMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloMintMultiTokenTransaction(testnet, body as CeloMintMultiToken, provider);
        case Currency.ETH:
            return sendEthMintMultiTokenTransaction(body, provider);
        case Currency.MATIC:
            return sendPolygonMintMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneMintMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return sendBscMintMultiTokenTransaction(body, provider);
    }
};
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch | CeloMintMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloMintMultiTokenBatchTransaction(testnet, body as CeloMintMultiTokenBatch, provider);
        case Currency.ETH:
            return sendEthMintMultiTokenBatchTransaction(body, provider);
        case Currency.MATIC:
            return sendPolygonMintMultiTokenBatchSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneMintMultiTokenBatchSignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return sendBscMintMultiTokenBatchTransaction(body, provider);
    }
};
export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken | EthBurnMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider);
        case Currency.ETH:
            return sendEthBurnMultiTokenTransaction(body, provider);
        case Currency.MATIC:
            return sendPolygonBurnMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneBurnMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return sendBscBurnMultiTokenTransaction(body, provider);
    }
};
export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch | EthBurnMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnMultiTokenBatchTransaction(testnet, body as CeloBurnMultiTokenBatch, provider);
        case Currency.ETH:
            return sendEthBurnBatchMultiTokenTransaction(body, provider);
        case Currency.MATIC:
            return sendPolygonBurnMultiTokenBatchSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneBurnMultiTokenBatchSignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return sendBscBurnBatchMultiTokenTransaction(body, provider);
    }
};

export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken | TransferMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider);
        case Currency.ETH:
            return sendEthMultiTokenTransaction(body, provider);
        case Currency.MATIC:
            return sendPolygonTransferMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneTransferMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return sendBscMultiTokenTransaction(body, provider);
    }
};
export const transferMultiTokenBatch = async (testnet: boolean, body: CeloTransferMultiTokenBatch | TransferMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider);
        case Currency.ETH:
            return sendEthMultiTokenBatchTransaction(body, provider);
        case Currency.MATIC:
            return preparePolygonBatchTransferMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return prepareOneBatchTransferMultiTokenSignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return sendBscMultiTokenBatchTransaction(body, provider);
    }
};
