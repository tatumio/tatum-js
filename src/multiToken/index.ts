import {
    CeloMintMultiToken,
    CeloMintMultiTokenBatch,
    CeloTransferMultiToken,
    CeloTransferMultiTokenBatch,
    Currency,
    MintMultiToken,
    MintMultiTokenBatch,
    TransferMultiToken,
    TransferMultiTokenBatch
} from '../model';
import { CeloBurnMultiToken } from '../model/request/CeloBurnMultiToken';
import { CeloBurnMultiTokenBatch } from '../model/request/CeloBurnMultiTokenBatch';
import { CeloDeployMultiToken } from '../model/request/CeloDeployMultiToken';
import { EthBurnMultiToken } from '../model/request/EthBurnMultiToken';
import { EthBurnMultiTokenBatch } from '../model/request/EthBurnMultiTokenBatch';
import { EthDeployMultiToken } from '../model/request/EthDeployMultiToken';
import {
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
    sendEthMultiTokenTransaction
} from '../transaction';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */

export const deployMultiToken = async (testnet: boolean, body: CeloDeployMultiToken | EthDeployMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloDeployMultiTokenTransaction(testnet, body as CeloDeployMultiToken, provider);
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
                return sendEthMintMultiTokenTransaction(body as MintMultiToken, provider);
        case Currency.BSC:
            return sendBscMintMultiTokenTransaction(body, provider);
    }
};
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch | CeloMintMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
                return sendCeloMintMultiTokenBatchTransaction(testnet, body as CeloMintMultiTokenBatch, provider);
        case Currency.ETH:
                return sendEthMintMultiTokenBatchTransaction(body as MintMultiTokenBatch, provider);
        case Currency.BSC:
            return sendBscMintMultiTokenBatchTransaction(body as MintMultiTokenBatch, provider);
    }
};
export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken | EthBurnMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider);
        case Currency.ETH:
            return sendEthBurnMultiTokenTransaction(body, provider);
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
        case Currency.BSC:
            return sendBscMultiTokenBatchTransaction(body, provider);
    }
};