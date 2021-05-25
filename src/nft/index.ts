import { get } from '../connector/tatum';
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    Currency,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    CeloUpdateCashbackErc721,
    UpdateCashbackErc721,
} from '../model';
import {
    sendBep721Transaction,
    sendBurnBep721Transaction,
    sendBurnErc721Transaction,
    sendCeloBurnErc721Transaction,
    sendCeloDeployErc721Transaction,
    sendCeloMinCashbackErc721Transaction,
    sendCeloMinErc721Transaction,
    sendCeloMintMultipleCashbackErc721Transaction,
    sendCeloMintMultipleErc721Transaction,
    sendCeloTransferErc721Transaction,
    sendCeloUpdateCashbackForAuthorErc721Transaction,
    sendDeployBep721Transaction,
    sendDeployErc721Transaction,
    sendErc721Transaction,
    sendEthMintMultipleCashbackErc721SignedTransaction,
    sendMintBep721Transaction,
    sendMintBepCashback721Transaction,
    sendMintCashbackErc721Transaction,
    sendMintErc721Transaction,
    sendMintMultipleBep721Transaction,
    sendMintMultipleCashbackBep721Transaction,
    sendMintMultipleErc721Transaction,
    sendUpdateCashbackForAuthorBep721Transaction,
    sendUpdateCashbackForAuthorErc721Transaction
} from '../transaction';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */

export const getNFTsByAddress = async (chain: Currency, contractAddress: string, address: string): Promise<string[]> =>
    get(`/v3/nft/balance/${chain}/${contractAddress}/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> => get(`/v3/nft/metadata/${chain}/${contractAddress}/${tokenId}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetRoyaltyErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTRoyalty = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> => get(`/v3/nft/royalty/${chain}/${contractAddress}/${tokenId}`);

export const deployNFT = async (testnet: boolean, body: CeloDeployErc721 | EthDeployErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloDeployErc721Transaction(testnet, body as CeloDeployErc721, provider);
        case Currency.ETH:
            return sendDeployErc721Transaction(body, provider);
        case Currency.BSC:
            return sendDeployBep721Transaction(body, provider);
    }
};

export const mintNFTWithUri = async (testnet: boolean, body: CeloMintErc721 | EthMintErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if (body.authorAddresses) {
                return sendCeloMinCashbackErc721Transaction(testnet, body as CeloMintErc721, provider);
            } else {
                return sendCeloMinErc721Transaction(testnet, body as CeloMintErc721, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {
                return sendMintCashbackErc721Transaction(body, provider)
            } else {
                return sendMintErc721Transaction(body, provider);
            }
        case Currency.BSC:
            if (body.authorAddresses) {
                return sendMintBepCashback721Transaction(body, provider);
            }
            return sendMintBep721Transaction(body, provider);
    }
};

export const mintMultipleNFTWithUri = async (testnet: boolean, body: CeloMintMultipleErc721 | EthMintMultipleErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if (body.authorAddresses) {
                return sendCeloMintMultipleCashbackErc721Transaction(testnet, body as CeloMintMultipleErc721, provider);
            } else {
                return sendCeloMintMultipleErc721Transaction(testnet, body as CeloMintMultipleErc721, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {
                return sendEthMintMultipleCashbackErc721SignedTransaction(body, provider);
            } else {
                return sendMintMultipleErc721Transaction(body, provider);
            }
        case Currency.BSC:
            if (body.authorAddresses) {
                return sendMintMultipleCashbackBep721Transaction(body, provider);
            } else {
                return sendMintMultipleBep721Transaction(body, provider);
            }
    }
};

export const burnNFT = async (testnet: boolean, body: CeloBurnErc721 | EthBurnErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnErc721Transaction(testnet, body as CeloBurnErc721, provider);
        case Currency.ETH:
            return sendBurnErc721Transaction(body, provider);
        case Currency.BSC:
            return sendBurnBep721Transaction(body, provider);
    }
};

export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721 | CeloUpdateCashbackErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloUpdateCashbackForAuthorErc721Transaction(testnet, body as CeloUpdateCashbackErc721, provider);
        case Currency.ETH:
            return sendUpdateCashbackForAuthorErc721Transaction(body, provider);
        case Currency.BSC:
            return sendUpdateCashbackForAuthorBep721Transaction(body, provider);
    }
};

export const transferNFT = async (testnet: boolean, body: CeloTransferErc721 | EthTransferErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferErc721Transaction(testnet, body as CeloTransferErc721, provider);
        case Currency.ETH:
            return sendErc721Transaction(body, provider);
        case Currency.BSC:
            return sendBep721Transaction(body, provider);
    }
};