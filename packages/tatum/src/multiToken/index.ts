import {
    deployMultiToken as deployCeloMultiToken,
    mintMultiToken as mintCeloMultiToken,
} from '@tatumio/tatum-celo';
import {
    deployMultiToken as deployPolygonMultiToken,
    mintMultiToken as mintPolygonMultiToken,
} from '@tatumio/tatum-polygon';
import {
    deployMultiToken as deployOneMultiToken,
    mintMultiToken as mintOneMultiToken,
} from '@tatumio/tatum-one';
import {
    deployMultiToken as deployEthMultiToken,
    mintMultiToken as mintEhtMultiToken,
} from '@tatumio/tatum-eth';
import {
    deployMultiToken as deployBscMultiToken,
    mintMultiToken as mintBscMultiToken,
} from '@tatumio/tatum-bsc';

export const deployMultiToken = async (testnet: boolean, body: CeloDeployMultiToken | EthDeployMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return deployCeloMultiToken(testnet, body as CeloDeployMultiToken, provider)
        case Currency.MATIC:
            return deployPolygonMultiToken(testnet, body, provider)
        case Currency.ONE:
            return deployOneMultiToken(testnet, body, provider)
        case Currency.ETH:
            return deployEthMultiToken(body, provider)
        case Currency.BSC:
            return deployBscMultiToken(body, provider)
    }
}
export const mintMultiToken = async (testnet: boolean, body: MintMultiToken | CeloMintMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return mintCeloMultiToken(testnet, body as CeloMintMultiToken, provider)
        case Currency.ETH:
            return mintEhtMultiToken(body, provider)
        case Currency.MATIC:
            return mintPolygonMultiToken(testnet, body, provider)
        case Currency.ONE:
            return mintOneMultiToken(testnet, body, provider)
        case Currency.BSC:
            return mintBscMultiToken(body, provider)
    }
}
export const mintMultiTokenBatch = async (testnet: boolean, body: MintMultiTokenBatch | CeloMintMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return mintCeloMultiTokenBatch(testnet, body as CeloMintMultiTokenBatch, provider)
        case Currency.ETH:
            return mintEthMultiTokenBatch(body, provider)
        case Currency.MATIC:
            return mintPolygonMultiTokenBatchSigned(testnet, body, provider)
        case Currency.ONE:
            return mintOneMintMultiTokenBatchSigned(testnet, body, provider)
        case Currency.BSC:
            return mintBscMultiTokenBatch(body, provider)
    }
}
export const burnMultiToken = async (testnet: boolean, body: CeloBurnMultiToken | EthBurnMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return burnCeloMultiTokenTransaction(testnet, body as CeloBurnMultiToken, provider)
        case Currency.ETH:
            return burnEthMultiTokenTransaction(body, provider)
        case Currency.MATIC:
            return burnPolygonMultiTokenSignedTransaction(testnet, body, provider)
        case Currency.ONE:
            return burnOneMultiTokenSignedTransaction(testnet, body, provider)
        case Currency.BSC:
            return burnBscMultiTokenTransaction(body, provider)
    }
}
export const burnMultiTokenBatch = async (testnet: boolean, body: CeloBurnMultiTokenBatch | EthBurnMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return burnCeloMultiTokenBatchTransaction(testnet, body as CeloBurnMultiTokenBatch, provider)
        case Currency.ETH:
            return burnEthBatchMultiTokenTransaction(body, provider)
        case Currency.MATIC:
            return burnPolygonMultiTokenBatchSignedTransaction(testnet, body, provider)
        case Currency.ONE:
            return burnOneMultiTokenBatchSignedTransaction(testnet, body, provider)
        case Currency.BSC:
            return burnBscBatchMultiTokenTransaction(body, provider)
    }
}

export const transferMultiToken = async (testnet: boolean, body: CeloTransferMultiToken | TransferMultiToken, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return transferCeloMultiTokenTransaction(testnet, body as CeloTransferMultiToken, provider)
        case Currency.ETH:
            return transferEthMultiTokenTransaction(body, provider)
        case Currency.MATIC:
            return transferPolygonMultiTokenSignedTransaction(testnet, body, provider)
        case Currency.ONE:
            return transferOneMultiTokenSignedTransaction(testnet, body, provider)
        case Currency.BSC:
            return transferBscMultiTokenTransaction(body, provider)
    }
}

export const transferMultiTokenBatch = async (testnet: boolean, body: CeloTransferMultiTokenBatch | TransferMultiTokenBatch, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return transferCeloMultiTokenBatchTransaction(testnet, body as CeloTransferMultiTokenBatch, provider)
        case Currency.ETH:
            return transferEthMultiTokenBatchTransaction(body, provider)
        case Currency.MATIC:
            return transferPolygonMultiTokenSignedBatchTransaction(testnet, body, provider)
        case Currency.ONE:
            return transferOneMultiTokenSignedBatchTransaction(testnet, body, provider)
        case Currency.BSC:
            return transferBscMultiTokenBatchTransaction(body, provider)
    }
}

export {
    getMultiTokenContractAddress,
    getMultiTokensBalance,
    getMultiTokensBatchBalance,
    getMultiTokenTransaction,
    getMultiTokenMetadata,
} from '@tatumio/tatum-core'
