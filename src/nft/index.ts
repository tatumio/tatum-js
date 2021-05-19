import { get } from '../connector/tatum';
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintMultiToken,
    CeloMintMultiTokenBatch,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    Currency,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    MintMultiToken,
    MintMultiTokenBatch,
    TransferMultiToken,
    TransferMultiTokenBatch,
    CeloTransferMultiToken,
    CeloTransferMultiTokenBatch
} from '../model';
import { CeloUpdateCashbackErc721 } from '../model/request/CeloUpdateCashbackErc721';
import { UpdateCashbackErc721 } from '../model/request/UpdateCashbackErc721';
import { EthBurnMultiToken } from '../model/request/EthBurnMultiToken';
import { EthBurnMultiTokenBatch } from '../model/request/EthBurnMultiTokenBatch';
import { CeloBurnMultiTokenBatch } from '../model/request/CeloBurnMultiTokenBatch';
import { CeloBurnMultiToken } from '../model/request/CeloBurnMultiToken';
import { EthDeployErc1155 } from '../model/request/EthDeployErc1155';
import { CeloDeployErc1155 } from '../model/request/CeloDeployErc1155';
import { sendCeloUpdateCashbackForAuthorErc1155Transaction } from '../transaction/celo';
import { sendUpdateCashbackForAuthorErc1155Transaction } from '../transaction/eth';
import { sendUpdateCashbackForAuthorBep1155Transaction } from '../transaction/bsc';
import {
    sendBep1155Transaction,
    sendBep1155BatchTransaction,
    sendBep721Transaction,
    sendBurnBep721Transaction,
    sendBurnBatchBep1155Transaction,
    sendBurnBep1155Transaction,
    sendCeloBurnErc1155Transaction,
    sendBurnErc721Transaction,
    sendBurnErc1155Transaction,
    sendBurnBatchErc1155Transaction,
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
    sendDeployBep1155Transaction,
    sendCeloDeployErc1155Transaction,
    sendErc721Transaction,
    sendEthMintMultipleCashbackErc721SignedTransaction,
    sendMintBep721Transaction,
    sendMintBepCashback721Transaction,
    sendMintCashbackErc721Transaction,
    sendMintErc721Transaction,
    sendMintMultipleBep721Transaction,
    sendMintBep1155Transaction,
    sendMintBatchBep1155Transaction,
    sendMintCashbackBep1155Transaction,
    sendMintCashbackBatchBep1155Transaction,
    sendMintMultipleCashbackBep721Transaction,
    sendMintMultipleErc721Transaction,
    sendUpdateCashbackForAuthorBep721Transaction,
    sendUpdateCashbackForAuthorErc721Transaction,
    sendMintErc1155Transaction,
    sendDeployErc1155Transaction,
    sendCeloTransferErc1155Transaction,
    sendCeloTransferErc1155BatchTransaction,
    sendErc1155Transaction,
    sendErc1155BatchTransaction,
    sendMintErc1155BatchTransaction,
    sendMintErc1155CashbackTransaction,
    sendMintErc1155BatchCashbackTransaction,
    sendCeloMintErc1155Transaction,
    sendCeloMintBatchErc1155Transaction,
    sendCeloMintCashbackErc1155Transaction,
    sendCeloMintBatchCashbackErc1155Transaction,
    sendCeloBurnBatchErc1155Transaction
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
export const deployMultiToken = async (testnet: boolean, body: CeloDeployErc1155 | EthDeployErc1155, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloDeployErc1155Transaction(testnet, body as CeloDeployErc1155, provider);
        case Currency.ETH:
            return sendDeployErc1155Transaction(body, provider);
        case Currency.BSC:
            return sendDeployBep1155Transaction(body, provider);
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
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken | CeloMintMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if (body.authorAddresses) {
                return sendCeloMintCashbackErc1155Transaction(testnet, body as CeloMintMultiToken, provider);
            } else {
                return sendCeloMintErc1155Transaction(testnet, body as CeloMintMultiToken, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {

                return sendMintErc1155CashbackTransaction(body as MintMultiToken, provider)
            } else {
                return sendMintErc1155Transaction(body as MintMultiToken, provider);
            }
        case Currency.BSC:
            if (body.authorAddresses) {
                return sendMintCashbackBep1155Transaction(body, provider);
            }
            return sendMintBep1155Transaction(body, provider);
    }
};
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch | CeloMintMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if (body.authorAddresses) {
                return sendCeloMintBatchCashbackErc1155Transaction(testnet, body as CeloMintMultiTokenBatch, provider);
            } else {
                return sendCeloMintBatchErc1155Transaction(testnet, body as CeloMintMultiTokenBatch, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {
                return sendMintErc1155BatchCashbackTransaction(body as MintMultiTokenBatch, provider)
            } else {
                return sendMintErc1155BatchTransaction(body as MintMultiTokenBatch, provider);
            }
        case Currency.BSC:
            if (body.authorAddresses) {
                return sendMintCashbackBatchBep1155Transaction(body as MintMultiTokenBatch, provider);
            }
            return sendMintBatchBep1155Transaction(body as MintMultiTokenBatch, provider);
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
export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken | EthBurnMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnErc1155Transaction(testnet, body as CeloBurnMultiToken, provider);
        case Currency.ETH:
            return sendBurnErc1155Transaction(body, provider);
        case Currency.BSC:
            return sendBurnBep1155Transaction(body, provider);
    }
};
export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch | EthBurnMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnBatchErc1155Transaction(testnet, body as CeloBurnMultiTokenBatch, provider);
        case Currency.ETH:
            return sendBurnBatchErc1155Transaction(body, provider);
        case Currency.BSC:
            return sendBurnBatchBep1155Transaction(body, provider);
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
export const updateCashbackForAuthorMultiToken = async (testnet: boolean, body: UpdateCashbackErc721 | CeloUpdateCashbackErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloUpdateCashbackForAuthorErc1155Transaction(testnet, body as CeloUpdateCashbackErc721, provider);
        case Currency.ETH:
            return sendUpdateCashbackForAuthorErc1155Transaction(body, provider);
        case Currency.BSC:
            return sendUpdateCashbackForAuthorBep1155Transaction(body, provider);
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
export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken | TransferMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferErc1155Transaction(testnet, body as CeloTransferMultiToken, provider);
        case Currency.ETH:
            return sendErc1155Transaction(body, provider);
        case Currency.BSC:
            return sendBep1155Transaction(body, provider);
    }
};
export const transferMultiTokenBatch = async (testnet: boolean, body: CeloTransferMultiTokenBatch | TransferMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferErc1155BatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider);
        case Currency.ETH:
            return sendErc1155BatchTransaction(body, provider);
        case Currency.BSC:
            return sendBep1155BatchTransaction(body, provider);
    }
};