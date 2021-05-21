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
import { sendUpdateCashbackForAuthorMultiTokenTransaction } from '../transaction/eth';
import { sendUpdateCashbackForAuthorBep1155Transaction } from '../transaction/bsc';
import {
    sendBep1155Transaction,
    sendBep1155BatchTransaction,
    sendBurnBatchBep1155Transaction,
    sendBurnBep1155Transaction,
    sendCeloBurnMultiTokenTransaction,
    sendBurnMultiTokenTransaction,
    sendBurnBatchMultiTokenTransaction,
    sendDeployBep1155Transaction,
    sendCeloDeployMultiTokenTransaction,
    sendMintBep1155Transaction,
    sendMintBatchBep1155Transaction,
    sendMintCashbackBep1155Transaction,
    sendMintCashbackBatchBep1155Transaction,
    sendMintMultiTokenTransaction,
    sendDeployMultiTokenTransaction,
    sendCeloTransferMultiTokenTransaction,
    sendCeloTransferMultiTokenBatchTransaction,
    sendMultiTokenTransaction,
    sendMultiTokenBatchTransaction,
    sendMintMultiTokenBatchTransaction,
    sendMintMultiTokenCashbackTransaction,
    sendMintMultiTokenBatchCashbackTransaction,
    sendCeloMintMultiTokenTransaction,
    sendCeloMintBatchMultiTokenTransaction,
    sendCeloMintCashbackMultiTokenTransaction,
    sendCeloMintBatchCashbackMultiTokenTransaction,
    sendCeloBurnBatchMultiTokenTransaction
} from '../transaction';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */

export const deployMultiToken = async (testnet: boolean, body: CeloDeployMultiToken | EthDeployMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloDeployMultiTokenTransaction(testnet, body as CeloDeployMultiToken, provider);
        case Currency.ETH:
            return sendDeployMultiTokenTransaction(body, provider);
        case Currency.BSC:
            return sendDeployBep1155Transaction(body, provider);
    }
};
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken | CeloMintMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if (body.authorAddresses) {
                return sendCeloMintCashbackMultiTokenTransaction(testnet, body as CeloMintMultiToken, provider);
            } else {
                return sendCeloMintMultiTokenTransaction(testnet, body as CeloMintMultiToken, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {

                return sendMintMultiTokenCashbackTransaction(body as MintMultiToken, provider)
            } else {
                return sendMintMultiTokenTransaction(body as MintMultiToken, provider);
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
                return sendCeloMintBatchCashbackMultiTokenTransaction(testnet, body as CeloMintMultiTokenBatch, provider);
            } else {
                return sendCeloMintBatchMultiTokenTransaction(testnet, body as CeloMintMultiTokenBatch, provider);
            }
        case Currency.ETH:
            if (body.authorAddresses) {
                return sendMintMultiTokenBatchCashbackTransaction(body as MintMultiTokenBatch, provider)
            } else {
                return sendMintMultiTokenBatchTransaction(body as MintMultiTokenBatch, provider);
            }
        case Currency.BSC:
            if (body.authorAddresses) {
                return sendMintCashbackBatchBep1155Transaction(body as MintMultiTokenBatch, provider);
            }
            return sendMintBatchBep1155Transaction(body as MintMultiTokenBatch, provider);
    }
};
export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken | EthBurnMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider);
        case Currency.ETH:
            return sendBurnMultiTokenTransaction(body, provider);
        case Currency.BSC:
            return sendBurnBep1155Transaction(body, provider);
    }
};
export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch | EthBurnMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnBatchMultiTokenTransaction(testnet, body as CeloBurnMultiTokenBatch, provider);
        case Currency.ETH:
            return sendBurnBatchMultiTokenTransaction(body, provider);
        case Currency.BSC:
            return sendBurnBatchBep1155Transaction(body, provider);
    }
};
export const updateCashbackForAuthorMultiToken = async (testnet: boolean, body: UpdateCashbackErc721 | CeloUpdateCashbackErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloUpdateCashbackForAuthorMultiTokenTransaction(testnet, body as CeloUpdateCashbackErc721, provider);
        case Currency.ETH:
            return sendUpdateCashbackForAuthorMultiTokenTransaction(body, provider);
        case Currency.BSC:
            return sendUpdateCashbackForAuthorBep1155Transaction(body, provider);
    }
};
export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken | TransferMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider);
        case Currency.ETH:
            return sendMultiTokenTransaction(body, provider);
        case Currency.BSC:
            return sendBep1155Transaction(body, provider);
    }
};
export const transferMultiTokenBatch = async (testnet: boolean, body: CeloTransferMultiTokenBatch | TransferMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider);
        case Currency.ETH:
            return sendMultiTokenBatchTransaction(body, provider);
        case Currency.BSC:
            return sendBep1155BatchTransaction(body, provider);
    }
};