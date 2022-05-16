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
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
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
     * Deploy Multi Token Smart Contract.
     * <p>Deploy Multi Token Smart Contract. This method creates new ERC1155 Smart Contract (Multi Tokens) on the blockchain. Smart contract is standardized and audited.
     * It is possible to mint, burn and transfer tokens. It is also possible to mint multiple tokens at once.<br/>
     * Tatum now supports Multi Tokens on these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * </ul>
     *
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static deployMultiToken(
        requestBody: (DeployMultiToken | DeployMultiTokenKMS | DeployMultiTokenCelo | DeployMultiTokenCeloKMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/deploy`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Mint Multi Token
     * <h4>2 credits per API call.</h4><br/>
     * <p>Mint a fixed amount of Multi Token and transfer it to destination account. Create and transfer any Multi Token token from smart contract defined in contractAddress.
     * It is possible to add Metadata to the created token with a more detailed information about it.<br/><br/>
     * Tatum now supports Multi Token these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * <li><b>Algorand</b></li>
     * </ul>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static mintMultiToken(
        requestBody: (MintMultiToken | MintMultiTokenKMS | MintMultiTokenCelo | MintMultiTokenKMSCelo),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/mint`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Mint Multi Token Batch
     * <h4>2 credits per API call.</h4><br/>
     * <p>Create a fixed amount of multiple Multi Tokens Tokens and transfer them to destination account in one transaction. Create and transfer Multi Tokens tokens from smart contract defined in contractAddress.<br/><br/>
     * Tatum now supports Multi Tokens on these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * </ul>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static mintMultiTokenBatch(
        requestBody: (MintMultiTokenBatch | MintMultiTokenBatchKMS | MintMultiTokenBatchCelo | MintMultiTokenBatchKMSCelo),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/mint/batch`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Burn Multi Token
     * <h4>2 credits per API call.</h4><br/>
     * <p>Burn a fixed amount of Multi Tokens by id. This method destroys Multi Tokens from smart contract defined in contractAddress.<br/><br/>
     * Tatum now supports Multi Token these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (Matic)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * <li><b>Algorand</b></li>
     * </ul>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static burnMultiToken(
        requestBody: (BurnMultiToken | BurnMultiTokenKMS | BurnMultiTokenCelo | BurnMultiTokenKMSCelo),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/burn`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Burn Multi Token Batch
     * <h4>2 credits per API call.</h4><br/>
     * <p>Burn multiple Multi Token Tokens by id assigned to same address in one transaction. This method destroys any Multi Tokens token from smart contract defined in contractAddress.<br/><br/>
     * Tatum now supports Multi Tokens these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * </ul>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static burnMultiTokenBatch(
        requestBody: (BurnMultiTokenBatch | BurnMultiTokenBatchKMS | BurnMultiTokenBatchCelo | BurnMultiTokenBatchKMSCelo),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/burn/batch`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Transfer Multi Token Token
     * <h4>2 credits per API call.</h4><br/>
     * <p>Transfer a certain amount of Multi Token from account to another account. Transfer Multi Tokens token from smart contract defined in contractAddress.
     * Only 1 specific token with specified tokenId and value can be transfered. This method invokes ERC1155 method safeTransfer() to transfer the token in case of ETH, Celo and BSC.<br/><br/>
     * Tatum now supports Multi Token these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * <li><b>Algorand</b></li>
     * </ul>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static transferMultiToken(
        requestBody: (TransferMultiToken | TransferMultiTokenCelo | TransferMultiTokenKMS | TransferMultiTokenKMSCelo),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/transaction`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Transfer Multi Token Batch
     * <h4>2 credits per API call.</h4><br/>
     * <p>Transfer Multi Token Batch from account to various other accounts in one transaction. Transfer multiple Multi Tokens token from smart contract defined in contractAddress.
     * Multiple token with specified tokenIds and values can be transfered. This method invokes ERC1155 method safeTransfer() to transfer the token in case of ETH, Celo and BSC.<br/><br/>
     * Tatum now supports Multi Tokens these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * </ul>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static transferMultiTokenBatch(
        requestBody: (TransferMultiTokenBatch | TransferMultiTokenBatchKMS | TransferMultiTokenBatchCelo | TransferMultiTokenBatchKMSCelo),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/transaction/batch`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Add Multi Token miter
     * <h4>2 credits per API call.</h4><br/>
     * <p>Add Multi Token minter.<br/><br/>
     * Tatum now supports Multi Tokens these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * </ul>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static addMultiTokenMinter(
        requestBody: (AddMultiTokenMinter | AddMultiTokenMinterKMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/multitoken/mint/add`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Get Multi Token transactions by address
     * <h4>1 credit per API call.</h4><br/><p>Get Multi Token (ERC-1155) transactions by address. This includes incoming and outgoing transactions for the address.</p>
     * @param chain Blockchain to work with
     * @param address Account address
     * @param tokenAddress Token address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwords will be included.
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
     * @deprecated
     * Get Contract address
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Multi Token contract address from deploy transaction. This method is deprecated, use <a href="#operation/SCGetContractAddress">Get contract address</a> instead.</p>
     *
     * @param chain Blockchain to work with
     * @param hash Transaction hash
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetContractAddress(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC',
        hash: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
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

    /**
     * Get Transaction
     * <h4>1 credit per API call.</h4><br/><p>Get Multi Token transaction by transaction hash.</p>
     * @param chain Blockchain to work with
     * @param hash Transaction hash
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetTransaction(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC',
        hash: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(CeloTx | EthTx)> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/transaction/${chain}/${hash}`,
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
     * Get Multi Tokens by Address
     * <h4>1 credit per API call.</h4><br/><p>Get Multi Tokens on address. Returns all tokenIDs of all contracts this address holds.</p>
     *
     * @param chain Blockchain to work with
     * @param address Blockchain address
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetAddressBalance(
        chain: 'ETH' | 'MATIC' | 'CELO',
        address: string,
        xTestnetType: 'ethereum-ropsten' = 'ethereum-ropsten',
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
     * Get Multi Token Account balance
     * <h4>1 credit per API call.</h4><br/><p>Get Multi Tokens on Account. Returns tokenIDs of tokens Account holds.</p>
     *
     * @param chain Blockchain to work with
     * @param address Account address
     * @param contractAddress Multi Token contract address
     * @param tokenId Multi Token tokenID
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns string OK
     * @throws ApiError
     */
    public static multiTokenGetBalance(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC',
        address: string,
        contractAddress: string,
        tokenId: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/multitoken/balance/${chain}/${contractAddress}/${address}/${tokenId}`,
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
     * Get Multi Token Account balance Batch
     * <h4>1 credit per API call.</h4><br/><p>Get Multi Tokens on Account. Returns tokenIDs of tokens Account holds.</p>
     *
     * @param chain Blockchain to work with
     * @param contractAddress Multi Token contract address
     * @param tokenId Comma separated TokenIds to get balance for
     * @param address Comma separated addresses to get balance for
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns string OK
     * @throws ApiError
     */
    public static multiTokenGetBalanceBatch(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC',
        contractAddress: string,
        tokenId: string,
        address: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
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
     * Get Multi Token Token Metadata
     * <h4>1 credit per API call.</h4><br/><p>Get Multi Token metadata.</p>
     * @param chain Blockchain to work with
     * @param token Token ID
     * @param contractAddress Multi Token contract address
     * @param xTestnetType Type of testnet. Defaults to ropsten. Valid only for ETH invocations.
     * @returns any OK
     * @throws ApiError
     */
    public static multiTokenGetMetadata(
        chain: 'ETH' | 'MATIC' | 'KCS' | 'KLAY' | 'ONE' | 'CELO' | 'BSC',
        token: string,
        contractAddress: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
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
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}