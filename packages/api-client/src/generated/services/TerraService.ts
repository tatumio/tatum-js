/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Broadcast } from '../models/Broadcast';
import type { TerraAccount } from '../models/TerraAccount';
import type { TerraBlock } from '../models/TerraBlock';
import type { TerraTx } from '../models/TerraTx';
import type { TerraWallet } from '../models/TerraWallet';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferTerraBlockchain } from '../models/TransferTerraBlockchain';
import type { TransferTerraBlockchainKMS } from '../models/TransferTerraBlockchainKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class TerraService {

    /**
     * Generate Terra wallet
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Terra account. Tatum does not support HD wallet for Terra, only specific address and private key can be generated.</p>
     *
     * @returns TerraWallet OK
     * @throws ApiError
     */
    public static terraGenerateWallet(): CancelablePromise<TerraWallet> {
        return __request({
            method: 'GET',
            path: `/v3/terra/account`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Terra current block
     * <h4>1 credit per API call.</h4><br/><p>Get Terra current block number.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static terraGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/terra/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Block
     * <h4>1 credit per API call.</h4><br/><p>Get Transactions in block by block height.</p>
     * @param height Block height
     * @returns TerraBlock OK
     * @throws ApiError
     */
    public static terraGetBlock(
        height: number,
    ): CancelablePromise<TerraBlock> {
        return __request({
            method: 'GET',
            path: `/v3/terra/block/${height}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Terra Account
     * <h4>1 credit per API call.</h4><br/><p>Get Terra Account Detail by address.</p>
     * @param address Account address
     * @returns TerraAccount OK
     * @throws ApiError
     */
    public static terraGetAccount(
        address: string,
    ): CancelablePromise<TerraAccount> {
        return __request({
            method: 'GET',
            path: `/v3/terra/account/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Terra Transaction
     * <h4>1 credit per API call.</h4><br/><p>Get Terra Transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns TerraTx OK
     * @throws ApiError
     */
    public static terraGetTransaction(
        hash: string,
    ): CancelablePromise<TerraTx> {
        return __request({
            method: 'GET',
            path: `/v3/terra/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Send Terra / Terra tokens from account to account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send Terra or Terra Token token from account to account.<br/><br/>
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
    public static terraBlockchainTransfer(
        requestBody: (TransferTerraBlockchain | TransferTerraBlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/terra/transaction`,
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
     * Broadcast signed Terra transaction
     * <h4>2 credit per API call.</h4><br/>
     * <p>Broadcast signed transaction to Terra blockchain. This method is used internally or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static terraBroadcast(
        requestBody: Broadcast,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/terra/broadcast`,
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