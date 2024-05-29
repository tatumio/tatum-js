/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BnbAccount } from '../models/BnbAccount';
import type { BnbBlock } from '../models/BnbBlock';
import type { BnbTx } from '../models/BnbTx';
import type { BnbTxInAccount } from '../models/BnbTxInAccount';
import type { BnbWallet } from '../models/BnbWallet';
import type { Broadcast } from '../models/Broadcast';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferBnbBlockchain } from '../models/TransferBnbBlockchain';
import type { TransferBnbBlockchainKMS } from '../models/TransferBnbBlockchainKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BnbBeaconChainService {

    /**
     * Generate Binance wallet
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate BNB account. Tatum does not support HD wallet for BNB, only specific address and private key can be generated.</p>
     *
     * @returns BnbWallet OK
     * @throws ApiError
     */
    public static bnbGenerateWallet(): CancelablePromise<BnbWallet> {
        return __request({
            method: 'GET',
            path: `/v3/bnb/account`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Binance current block
     * <h4>5 credits per API call.</h4><br/><p>Get Binance current block number.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static bnbGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/bnb/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Binance Transactions in Block
     * <h4>5 credits per API call.</h4><br/><p>Get Transactions in block by block height.</p>
     * @param height Block height
     * @returns BnbBlock OK
     * @throws ApiError
     */
    public static bnbGetBlock(
        height: number,
    ): CancelablePromise<BnbBlock> {
        return __request({
            method: 'GET',
            path: `/v3/bnb/block/${height}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Binance Account
     * <h4>5 credits per API call.</h4><br/><p>Get Binance Account Detail by address.</p>
     * @param address Account address you want to get balance of
     * @returns BnbAccount OK
     * @throws ApiError
     */
    public static bnbGetAccount(
        address: string,
    ): CancelablePromise<BnbAccount> {
        return __request({
            method: 'GET',
            path: `/v3/bnb/account/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Binance Transaction
     * <h4>5 credits per API call.</h4><br/><p>Get Binance Transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns BnbTx OK
     * @throws ApiError
     */
    public static bnbGetTransaction(
        hash: string,
    ): CancelablePromise<BnbTx> {
        return __request({
            method: 'GET',
            path: `/v3/bnb/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Binance Transactions By Address
     * <h4>5 credits per API call.</h4><br/><p>Get Binance Transactions by address.</p>
     * @param address Account address
     * @param startTime Start time in milliseconds
     * @param endTime End time in milliseconds
     * @param limit Items per page.
     * @param offset Pagination offset
     * @param asset Asset name
     * @param addressType Address type
     * @returns BnbTxInAccount OK
     * @throws ApiError
     */
    public static bnbGetTxByAccount(
        address: string,
        startTime: number,
        endTime: number,
        limit?: number,
        offset?: number,
        asset?: string,
        addressType?: 'FROM' | 'TO',
    ): CancelablePromise<BnbTxInAccount> {
        return __request({
            method: 'GET',
            path: `/v3/bnb/account/transaction/${address}`,
            query: {
                'startTime': startTime,
                'endTime': endTime,
                'limit': limit,
                'offset': offset,
                'asset': asset,
                'addressType': addressType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send Binance / Binance Token from account to account
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send Binance or Binance Token token from account to account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static bnbBlockchainTransfer(
        requestBody: (TransferBnbBlockchain | TransferBnbBlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/bnb/transaction`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Broadcast signed BNB transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Binance blockchain. This method is used internally or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static bnbBroadcast(
        requestBody: Broadcast,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/bnb/broadcast`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
