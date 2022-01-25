/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Broadcast } from '../models/Broadcast';
import type { NeoAccount } from '../models/NeoAccount';
import type { NeoAccountTx } from '../models/NeoAccountTx';
import type { NeoAsset } from '../models/NeoAsset';
import type { NeoBlock } from '../models/NeoBlock';
import type { NeoClaimGas } from '../models/NeoClaimGas';
import type { NeoContract } from '../models/NeoContract';
import type { NeoInvokeSmart } from '../models/NeoInvokeSmart';
import type { NeoTx } from '../models/NeoTx';
import type { NeoTxOut } from '../models/NeoTxOut';
import type { NeoWallet } from '../models/NeoWallet';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferNeoBlockchain } from '../models/TransferNeoBlockchain';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainNeoService {

    /**
     * Generate NEO account
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate NEO account. Tatum does not support HD wallet for NEO, only specific address and private key can be generated.</p>
     *
     * @returns NeoWallet OK
     * @throws ApiError
     */
    public static neoGenerateWallet(): CancelablePromise<NeoWallet> {
        return __request({
            method: 'GET',
            path: `/v3/neo/wallet`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get current NEO block
     * <h4>5 credits per API call.</h4><br/><p>Get current NEO block.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static neoGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/neo/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NEO block
     * <h4>5 credits per API call.</h4><br/><p>Get NEO block by hash or height.</p>
     * @param hash Block hash or height.
     * @returns NeoBlock OK
     * @throws ApiError
     */
    public static neoGetBlock(
        hash: string,
    ): CancelablePromise<NeoBlock> {
        return __request({
            method: 'GET',
            path: `/v3/neo/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NEO Account balance
     * <h4>5 credits per API call.</h4><br/><p>Get Balance of all assets (NEO, GAS, etc.) and tokens for the Account.</p>
     * @param address Address to get balance
     * @returns NeoAccount OK
     * @throws ApiError
     */
    public static neoAccountDetail(
        address: string,
    ): CancelablePromise<NeoAccount> {
        return __request({
            method: 'GET',
            path: `/v3/neo/account/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Neo Asset details
     * <h4>5 credits per API call.</h4><br/><p>Get information about asset.</p>
     * @param asset Asset ID
     * @returns NeoAsset OK
     * @throws ApiError
     */
    public static neoAsset(
        asset: string,
    ): CancelablePromise<NeoAsset> {
        return __request({
            method: 'GET',
            path: `/v3/neo/asset/${asset}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NEO unspent transaction outputs
     * <h4>5 credits per API call.</h4><br/><p>Get NEO unspent transaction outputs.</p>
     * @param txId Transaction ID.
     * @param index Index of output.
     * @returns NeoTxOut OK
     * @throws ApiError
     */
    public static neoTxOut(
        txId: string,
        index: number,
    ): CancelablePromise<NeoTxOut> {
        return __request({
            method: 'GET',
            path: `/v3/neo/transaction/out/${txId}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NEO Account transactions
     * <h4>5 credits per API call.</h4><br/><p>Get NEO Account transactions.</p>
     * @param address
     * @returns NeoAccountTx OK
     * @throws ApiError
     */
    public static neoAccountTx(
        address: string,
    ): CancelablePromise<Array<NeoAccountTx>> {
        return __request({
            method: 'GET',
            path: `/v3/neo/account/tx/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NEO contract details
     * <h4>5 credits per API call.</h4><br/><p>Get NEO contract details.</p>
     * @param scriptHash Hash of smart contract
     * @returns NeoContract OK
     * @throws ApiError
     */
    public static neoContractDetail(
        scriptHash: string,
    ): CancelablePromise<NeoContract> {
        return __request({
            method: 'GET',
            path: `/v3/neo/contract/${scriptHash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get NEO transaction by hash
     * <h4>5 credits per API call.</h4><br/><p>Get NEO transaction by hash.</p>
     * @param hash Transaction hash.
     * @returns NeoTx OK
     * @throws ApiError
     */
    public static neoGetTransaction(
        hash: string,
    ): CancelablePromise<NeoTx> {
        return __request({
            method: 'GET',
            path: `/v3/neo/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Send NEO assets
     * <h4>5 credits per API call.</h4><br/>
     * <p>Send NEO assets from address to address. It is possible to send NEO and GAS in the same transaction.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static neoTransfer(
        requestBody: TransferNeoBlockchain,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/neo/transaction`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Claim GAS
     * <h4>5 credits per API call.</h4><br/>
     * <p>Claim GAS for NEO account. Every account owner can claim for the GAS, which is produced for owning NEO on the address.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static neoClaimGas(
        requestBody: NeoClaimGas,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/neo/claim`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Send NEO smart contract tokens
     * <h4>5 credits per API call.</h4><br/>
     * <p>Send NEO smart contract tokens. It is possible to transfer custom NEO-based tokens to another account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static neoInvokeSmart(
        requestBody: NeoInvokeSmart,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/neo/invoke`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Broadcast NEO transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast NEO transaction. This method is used internally from Tatum Middleware or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static neoBroadcast(
        requestBody: Broadcast,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/neo/broadcast`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}