/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddMultiTokenMinter } from '../models/AddMultiTokenMinter';
import type { AddMultiTokenMinterKMS } from '../models/AddMultiTokenMinterKMS';
import type { BurnMultiToken } from '../models/BurnMultiToken';
import type { BurnMultiTokenBatch } from '../models/BurnMultiTokenBatch';
import type { BurnMultiTokenBatchCelo } from '../models/BurnMultiTokenBatchCelo';
import type { BurnMultiTokenBatchKMS } from '../models/BurnMultiTokenBatchKMS';
import type { BurnMultiTokenBatchKMSCelo } from '../models/BurnMultiTokenBatchKMSCelo';
import type { BurnMultiTokenCelo } from '../models/BurnMultiTokenCelo';
import type { BurnMultiTokenKMS } from '../models/BurnMultiTokenKMS';
import type { BurnMultiTokenKMSCelo } from '../models/BurnMultiTokenKMSCelo';
import type { CeloTx } from '../models/CeloTx';
import type { DeployMultiToken } from '../models/DeployMultiToken';
import type { DeployMultiTokenCelo } from '../models/DeployMultiTokenCelo';
import type { DeployMultiTokenCeloKMS } from '../models/DeployMultiTokenCeloKMS';
import type { DeployMultiTokenKMS } from '../models/DeployMultiTokenKMS';
import type { EthTx } from '../models/EthTx';
import type { MintMultiToken } from '../models/MintMultiToken';
import type { MintMultiTokenBatch } from '../models/MintMultiTokenBatch';
import type { MintMultiTokenBatchCelo } from '../models/MintMultiTokenBatchCelo';
import type { MintMultiTokenBatchKMS } from '../models/MintMultiTokenBatchKMS';
import type { MintMultiTokenBatchKMSCelo } from '../models/MintMultiTokenBatchKMSCelo';
import type { MintMultiTokenCelo } from '../models/MintMultiTokenCelo';
import type { MintMultiTokenKMS } from '../models/MintMultiTokenKMS';
import type { MintMultiTokenKMSCelo } from '../models/MintMultiTokenKMSCelo';
import type { MultiTx } from '../models/MultiTx';
import type { SignatureId } from '../models/SignatureId';
import type { TestnetType } from '../models/TestnetType';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferMultiToken } from '../models/TransferMultiToken';
import type { TransferMultiTokenBatch } from '../models/TransferMultiTokenBatch';
import type { TransferMultiTokenBatchCelo } from '../models/TransferMultiTokenBatchCelo';
import type { TransferMultiTokenBatchKMS } from '../models/TransferMultiTokenBatchKMS';
import type { TransferMultiTokenBatchKMSCelo } from '../models/TransferMultiTokenBatchKMSCelo';
import type { TransferMultiTokenCelo } from '../models/TransferMultiTokenCelo';
import type { TransferMultiTokenKMS } from '../models/TransferMultiTokenKMS';
import type { TransferMultiTokenKMSCelo } from '../models/TransferMultiTokenKMSCelo';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class MultiTokensErc1155OrCompatibleService {

    /**
     * Deploy a Multi Token smart contract
     * <p><b>2 credits per API call</b></p>
     * <p>Deploy Multi Token Smart Contract. This method creates new ERC1155 Smart Contract (Multi Tokens) on the blockchain. Smart contract is standardized and audited.
     * It is possible to mint, burn and transfer tokens. It is also possible to mint multiple tokens at once.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When deploying a Multi Token smart contract, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static deployMultiToken(
        requestBody: (DeployMultiToken | DeployMultiTokenKMS | DeployMultiTokenCelo | DeployMultiTokenCeloKMS),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/deploy`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Mint a Multi Token
     * <p><b>2 credits per API call</b></p>
     * <p>Mint a fixed amount of Multi Token and transfer it to destination account. Create and transfer any Multi Token token from smart contract defined in contractAddress. It is possible to add Metadata to the created token with a more detailed information about instead.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When minting a Multi Token, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static mintMultiToken(
        requestBody: (MintMultiToken | MintMultiTokenKMS | MintMultiTokenCelo | MintMultiTokenKMSCelo),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/mint`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Mint multiple Multi Tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Create a fixed amount of multiple Multi Tokens Tokens and transfer them to destination account in one transaction. Create and transfer Multi Tokens tokens from smart contract defined in contractAddress.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When minting multiple Multi Tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static mintMultiTokenBatch(
        requestBody: (MintMultiTokenBatch | MintMultiTokenBatchKMS | MintMultiTokenBatchCelo | MintMultiTokenBatchKMSCelo),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/mint/batch`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Burn a Multi Token
     * <p><b>2 credits per API call</b></p>
     * <p>Burn a fixed amount of Multi Tokens by id. This method destroys Multi Tokens from smart contract defined in contractAddress.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When burning a Multi Token, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static burnMultiToken(
        requestBody: (BurnMultiToken | BurnMultiTokenKMS | BurnMultiTokenCelo | BurnMultiTokenKMSCelo),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/burn`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Burn multiple Multi Tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Burn multiple Multi Token Tokens by id assigned to same address in one transaction. This method destroys any Multi Tokens token from smart contract defined in contractAddress.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When burning multiple Multi Tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static burnMultiTokenBatch(
        requestBody: (BurnMultiTokenBatch | BurnMultiTokenBatchKMS | BurnMultiTokenBatchCelo | BurnMultiTokenBatchKMSCelo),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/burn/batch`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Transfer a Multi Token
     * <p><b>2 credits per API call</b></p>
     * <p>Transfer a certain amount of Multi Token from account to another account. Transfer Multi Tokens token from smart contract defined in contractAddress.</p>
     * <p>Only 1 specific token with specified tokenId and value can be transferred. This method invokes ERC1155 method safeTransfer() to transfer the token in case of ETH, Celo and blockchains.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When transferring a Multi Token, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static transferMultiToken(
        requestBody: (TransferMultiToken | TransferMultiTokenCelo | TransferMultiTokenKMS | TransferMultiTokenKMSCelo),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/transaction`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Transfer multiple Multi Tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Transfer Multi Token Batch from account to various other accounts in one transaction. Transfer multiple Multi Tokens token from smart contract defined in contractAddress.</p>
     * <p>Multiple token with specified tokenIds and values can be transferred. This method invokes ERC1155 method safeTransfer() to transfer the token in case of ETH, Celo and BSC.</b>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When transferring multiple Multi Tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static transferMultiTokenBatch(
        requestBody: (TransferMultiTokenBatch | TransferMultiTokenBatchKMS | TransferMultiTokenBatchCelo | TransferMultiTokenBatchKMSCelo),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/transaction/batch`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Add a Multi Token minter
     * <p><b>2 credits per API call</b></p>
     * <p>Add Multi Token minter.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When adding a Multi Token minter, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static addMultiTokenMinter(
        requestBody: (AddMultiTokenMinter | AddMultiTokenMinterKMS),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/mint/add`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Multi Token transactions on a blockchain address
     * <p><b>1 credit per API call</b></p>
     * <p>Get incoming and outgoing Multi Token transactions on a blockchain address.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Polygon</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param address Account address you want to get balance of
     * @param tokenAddress Address of the token smart contract
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwards will be included.
     * @param to Transactions up to this block will be included.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetTransactionByAddress(
        chain: 'CELO' | 'ETH' | 'MATIC',
        address: string,
        tokenAddress: string,
        pageSize: number,
        offset?: number,
        from?: number,
        to?: number,
    ): CancelablePromise<Array<MultiTx>> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/transaction/${chain}/${address}/${tokenAddress}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'from': from,
                'to': to,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get a Multi Token transaction by its hash
     * <p><b>1 credit per API call</b></p>
     * <p>Get Multi Token transaction by transaction hash.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param hash Transaction hash
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetTransaction(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC' | 'FLR' | 'CRO',
        hash: string,
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(CeloTx | EthTx)> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/transaction/${chain}/${hash}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get all Multi Tokens that a blockchain address holds
     * <p><b>1 credit per API call</b></p>
     * <p>Get all Multi Tokens that a blockchain address holds. The Multi Tokens are returned grouped by the smart contracts they were minted on.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Polygon</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param address Blockchain address
     * @param xTestnetType Type of testnet. Defaults to Sepolia. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetAddressBalance(
        chain: 'ETH' | 'MATIC' | 'CELO',
        address: string,
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
    ): CancelablePromise<Array<{
        /**
         * Contract address of the Multi Token
         */
        contractAddress?: string;
        balances?: Array<{
            /**
             * Token ID.
             */
            tokenId?: string;
            /**
             * Number of tokens held by the address.
             */
            amount?: string;
            /**
             * Block number when the token was received by the address.
             */
            blockNumber?: number;
        }>;
        metadata?: Array<{
            /**
             * The ID of the Multi Token owned by this address
             */
            tokenId?: string;
            /**
             * The URL pointing to the Multi Token metadata; the URL may not be present, and if it is not returned, you can get it by calling the Multi Token Contract.uri() method
             */
            url?: string;
            /**
             * The metadata scheme obtained from the metadata URL; the scheme may not be present, and if it is not returned, you can get it using the <a href="#operation/MultiTokenGetMetadata">Multi Token metadata API</a>
             */
            metadata?: any;
        }>;
    }>> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/address/balance/${chain}/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the amount of a specific MultiToken that a blockchain address holds
     * <p><b>1 credit per API call</b></p>
     * <p>Get the amount of a specific Multi Token (minted on the smart contract specified by the <code>contractAddress</code> path parameter in the request endpoint URL) that a blockchain address holds.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param address The blockchain address that you want to get the token balance of
     * @param contractAddress The address of the Multi Token smart contract
     * @param tokenId The ID of the Multi Token
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetBalance(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC' | 'FLR' | 'CRO',
        address: string,
        contractAddress: string,
        tokenId: string,
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<{
        /**
         * The amount of the specified Multi Token
         */
        data?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/balance/${chain}/${contractAddress}/${address}/${tokenId}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the amount of one or multiple Multi Tokens for multiple blockchain addresses
     * <p><b>1 credit per API call</b></p>
     * <p>For multiple blockchain addresses, get the amount of one or multiple Multi Tokens (minted on the smart contract specified by the <code>contractAddress</code> path parameter in the request endpoint URL) that those addresses hold.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param contractAddress The address of the Multi Token smart contract
     * @param tokenId Comma-separated IDs of the Multi Tokens to get the amounts for
     * @param address Comma-separated blockchain addresses to get the token balance for
     * @param xTestnetType Type of testnet. Defaults to Sepolia. Valid only for ETH invocations.
     * @returns string OK
     * @throws ApiError
     */
    public static multiTokenGetBalanceBatch(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC',
        contractAddress: string,
        tokenId: string,
        address: string,
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
    ): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/balance/batch/${chain}/${contractAddress}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'tokenId': tokenId,
                'address': address,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Multi Token metadata
     * <p><b>1 credit per API call</b></p>
     * <p>Get Multi Token metadata.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param token Token ID
     * @param contractAddress Multi Token contract address
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetMetadata(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC' | 'FLR' | 'CRO',
        token: string,
        contractAddress: string,
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<{
        /**
         * Metadata associated with token.
         */
        data?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/metadata/${chain}/${contractAddress}/${token}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get the address of a Multi Token smart contract by its transaction hash
     * <p><p>This endpoint is deprecated. Do not use it.<br/>
     * Instead, use <a href="https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress" target="_blank">this API</a>.</b></p><br/>
     * <p><b>1 credit per API call</b></p>
     * <p>Get Multi Token contract address from deploy transaction.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * </ul>
     *
     * @param chain Blockchain to work with
     * @param hash Transaction hash
     * @param xTestnetType Type of testnet. Defaults to Sepolia. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetContractAddress(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC',
        hash: string,
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
    ): CancelablePromise<{
        /**
         * Address of the Multi Token token.
         */
        contractAddress?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/address/${chain}/${hash}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}