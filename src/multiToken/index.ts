import {
    CeloMintMultiToken,
    CeloMintMultiTokenBatch,
    Currency,
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
import { EthDeployMultiToken } from '../model/request/EthDeployMultiToken';
import { CeloDeployMultiToken } from '../model/request/CeloDeployMultiToken';
import { sendCeloUpdateCashbackForAuthorMultiTokenTransaction } from '../transaction/celo';
import { sendEthUpdateCashbackForAuthorMultiTokenTransaction } from '../transaction/eth';
import { sendBscUpdateCashbackForAuthorMultiTokenTransaction } from '../transaction/bsc';
import { UpdateCashbackMultiToken } from '../model/request/UpdateCashbackMultiToken';
import { CeloUpdateCashbackMultiToken } from '../model/request/CeloUpdateCashbackMultiToken';
import {
    sendCeloBurnMultiTokenTransaction,
    sendEthDeployMultiTokenTransaction,
    sendCeloDeployMultiTokenTransaction,
    sendBscDeployMultiTokenTransaction,
    sendCeloTransferMultiTokenTransaction,
    sendCeloTransferMultiTokenBatchTransaction,
    sendEthMultiTokenTransaction,
    sendEthMultiTokenBatchTransaction,
    sendEthMintMultiTokenTransaction,
    sendEthMintMultiTokenBatchTransaction,
    sendEthMintMultiTokenCashbackTransaction,
    sendEthMintMultiTokenBatchCashbackTransaction,
    sendEthBurnMultiTokenTransaction,
    sendEthBurnBatchMultiTokenTransaction,
    sendBscMultiTokenTransaction,
    sendBscMultiTokenBatchTransaction,
    sendBscMintMultiTokenBatchTransaction,
    sendBscMintMultiTokenTransaction,
    sendBscMintMultiTokenCashbackTransaction,
    sendBscMintMultiTokenBatchCashbackTransaction,
    sendBscBurnMultiTokenTransaction,
    sendBscBurnBatchMultiTokenTransaction,
    sendCeloMintMultiTokenTransaction,
    sendCeloMintMultiTokenBatchTransaction,
    sendCeloMintMultiTokenCashbackTransaction,
    sendCeloMintMultiTokenBatchCashbackTransaction,
    sendCeloBurnMultiTokenBatchTransaction
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
            if (body.authorAddresses) {
                return sendCeloMintMultiTokenCashbackTransaction(testnet, body as CeloMintMultiToken, provider);
            } else {
                return sendCeloMintMultiTokenTransaction(testnet, body as CeloMintMultiToken, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {

                return sendEthMintMultiTokenCashbackTransaction(body as MintMultiToken, provider)
            } else {
                return sendEthMintMultiTokenTransaction(body as MintMultiToken, provider);
            }
        case Currency.BSC:
            if (body.authorAddresses) {
                return sendBscMintMultiTokenCashbackTransaction(body, provider);
            }
            return sendBscMintMultiTokenTransaction(body, provider);
    }
};
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch | CeloMintMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if (body.authorAddresses) {
                return sendCeloMintMultiTokenBatchCashbackTransaction(testnet, body as CeloMintMultiTokenBatch, provider);
            } else {
                return sendCeloMintMultiTokenBatchTransaction(testnet, body as CeloMintMultiTokenBatch, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {
                return sendEthMintMultiTokenBatchCashbackTransaction(body as MintMultiTokenBatch, provider)
            } else {
                return sendEthMintMultiTokenBatchTransaction(body as MintMultiTokenBatch, provider);
            }
        case Currency.BSC:
            if (body.authorAddresses) {
                return sendBscMintMultiTokenBatchCashbackTransaction(body as MintMultiTokenBatch, provider);
            }
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
export const updateCashbackForAuthorMultiToken = async (testnet: boolean, body: UpdateCashbackMultiToken | CeloUpdateCashbackMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloUpdateCashbackForAuthorMultiTokenTransaction(testnet, body as CeloUpdateCashbackMultiToken, provider);
        case Currency.ETH:
            return sendEthUpdateCashbackForAuthorMultiTokenTransaction(body, provider);
        case Currency.BSC:
            return sendBscUpdateCashbackForAuthorMultiTokenTransaction(body, provider);
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