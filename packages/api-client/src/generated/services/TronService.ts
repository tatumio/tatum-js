/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTronTrc10Blockchain } from '../models/CreateTronTrc10Blockchain';
import type { CreateTronTrc10BlockchainKMS } from '../models/CreateTronTrc10BlockchainKMS';
import type { CreateTronTrc20Blockchain } from '../models/CreateTronTrc20Blockchain';
import type { CreateTronTrc20BlockchainKMS } from '../models/CreateTronTrc20BlockchainKMS';
import type { FreezeTron } from '../models/FreezeTron';
import type { FreezeTronKMS } from '../models/FreezeTronKMS';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferTronBlockchain } from '../models/TransferTronBlockchain';
import type { TransferTronBlockchainKMS } from '../models/TransferTronBlockchainKMS';
import type { TransferTronTrc10Blockchain } from '../models/TransferTronTrc10Blockchain';
import type { TransferTronTrc10BlockchainKMS } from '../models/TransferTronTrc10BlockchainKMS';
import type { TransferTronTrc20Blockchain } from '../models/TransferTronTrc20Blockchain';
import type { TransferTronTrc20BlockchainKMS } from '../models/TransferTronTrc20BlockchainKMS';
import type { TronAccount } from '../models/TronAccount';
import type { TronBlock } from '../models/TronBlock';
import type { TronBroadcast } from '../models/TronBroadcast';
import type { TronTrc10Detail } from '../models/TronTrc10Detail';
import type { TronTx } from '../models/TronTx';
import type { TronTx20 } from '../models/TronTx20';
import type { TronWallet } from '../models/TronWallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class TronService {

    /**
     * Generate Tron wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Bitcoin wallet with derivation path m'/44'/195'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/tron/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Tron wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns TronWallet OK
     * @throws ApiError
     */
    public static generateTronwallet(
        mnemonic?: string,
    ): CancelablePromise<TronWallet> {
        return __request({
            method: 'GET',
            path: `/v3/tron/wallet`,
            query: {
                'mnemonic': mnemonic,
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
     * Generate Tron deposit address from Extended public key
     * <h4>5 credit per API call.</h4><br/>
     * <p>Generate Tron deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^32 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static tronGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Tron address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/tron/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Tron private key
     * <h4>10 credit per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static tronGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/tron/wallet/priv`,
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
     * Get current Tron block
     * <h4>5 credits per API call.</h4><br/><p>Get current Tron block.</p>
     * @returns any OK
     * @throws ApiError
     */
    public static tronGetCurrentBlock(): CancelablePromise<{
        /**
         * Block height.
         */
        blockNumber?: number;
        /**
         * Block hash.
         */
        hash?: string;
        /**
         * Wether the block is from mainnet of Shasta testnet
         */
        testnet?: boolean;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/tron/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Tron block
     * <h4>5 credits per API call.</h4><br/><p>Get Tron block by hash or height.</p>
     * @param hash Block hash or height.
     * @returns TronBlock OK
     * @throws ApiError
     */
    public static tronGetBlock(
        hash: string,
    ): CancelablePromise<TronBlock> {
        return __request({
            method: 'GET',
            path: `/v3/tron/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Tron Account transactions
     * <h4>5 credits per API call.</h4><br/><p>Get Tron Account transactions. Default page size is 200 transactions per request.</p>
     * @param address Address to get transactions for.
     * @param next If
     * @returns any OK
     * @throws ApiError
     */
    public static tronAccountTx(
        address: string,
        next?: string,
    ): CancelablePromise<{
        /**
         * If present, there are more transactions for address.
         */
        next?: string;
        /**
         * List of transactions.
         */
        transactions: Array<TronTx>;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/tron/transaction/account/${address}`,
            query: {
                'next': next,
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
     * Get Tron Account TRC20 transactions
     * <h4>5 credits per API call.</h4><br/><p>Get Tron Account TRC20 transactions. Default page size is 200 transactions per request.</p>
     * @param address Address to get transactions for.
     * @param next If
     * @returns any OK
     * @throws ApiError
     */
    public static tronAccountTx20(
        address: string,
        next?: string,
    ): CancelablePromise<{
        /**
         * If present, there are more transactions for address.
         */
        next?: string;
        /**
         * List of transactions.
         */
        transactions: Array<TronTx20>;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/tron/transaction/account/${address}/trc20`,
            query: {
                'next': next,
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
     * Get Tron Account by address
     * <h4>5 credits per API call.</h4><br/><p>Get Tron account by address.</p>
     * @param address Account address.
     * @returns TronAccount OK
     * @throws ApiError
     */
    public static tronGetAccount(
        address: string,
    ): CancelablePromise<TronAccount> {
        return __request({
            method: 'GET',
            path: `/v3/tron/account/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Tron transaction by hash
     * <h4>5 credits per API call.</h4><br/><p>Get Tron transaction by hash.</p>
     * @param hash Transaction hash.
     * @returns TronTx OK
     * @throws ApiError
     */
    public static tronGetTransaction(
        hash: string,
    ): CancelablePromise<TronTx> {
        return __request({
            method: 'GET',
            path: `/v3/tron/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send Tron transaction
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send Tron transaction from address to address.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages or Tatum Middleware with a custom key management system.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static tronTransfer(
        requestBody: (TransferTronBlockchain | TransferTronBlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/tron/transaction`,
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
     * Freeze Tron balance
     * <h4>10 credits per API call.</h4><br/>
     * <p>Freeze Tron assets on the address. By freezing assets, you can obtain energy or bandwith to perform transactions.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages or Tatum Middleware with a custom key management system.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static tronFreeze(
        requestBody: (FreezeTron | FreezeTronKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/tron/freezeBalance`,
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
     * Send Tron TRC10 transaction
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send Tron TRC10 transaction from address to address.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages or Tatum Middleware with a custom key management system.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static tronTransferTrc10(
        requestBody: (TransferTronTrc10Blockchain | TransferTronTrc10BlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc10/transaction`,
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
     * Create Tron TRC10 token
     * <h4>10 credits per API call.</h4><br/>
     * <p>Create Tron TRC10 token. 1 account can create only 1 token. All supply of the tokens are transfered to the issuer account 100 seconds after the creation.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages or Tatum Middleware with a custom key management system.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static tronCreateTrc10(
        requestBody: (CreateTronTrc10Blockchain | CreateTronTrc10BlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc10/deploy`,
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
     * Get Tron TRC10 token detail
     * <h4>5 credits per API call.</h4><br/>
     * <p>Get Tron TRC10 token details.</p>
     *
     * @param id TRC10 token ID
     * @returns TronTrc10Detail OK
     * @throws ApiError
     */
    public static tronTrc10Detail(
        id: number,
    ): CancelablePromise<TronTrc10Detail> {
        return __request({
            method: 'GET',
            path: `/v3/tron/trc10/detail/${id}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send Tron TRC20 transaction
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send Tron TRC20 transaction from address to address.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages or Tatum Middleware with a custom key management system.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static tronTransferTrc20(
        requestBody: (TransferTronTrc20Blockchain | TransferTronTrc20BlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc20/transaction`,
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
     * Create Tron TRC20 token
     * <h4>10 credits per API call.</h4><br/>
     * <p>Create Tron TRC20 token. 1 account can create only 1 token. All supply of the tokens are transfered to the issuer account 100 seconds after the creation.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey.
     * PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * it is possible to use the Tatum client library for supported languages or Tatum Middleware with a custom key management system.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static tronCreateTrc20(
        requestBody: (CreateTronTrc20Blockchain | CreateTronTrc20BlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc20/deploy`,
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
     * Broadcast Tron transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast Tron transaction. This method is used internally from Tatum Middleware or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static tronBroadcast(
        requestBody: TronBroadcast,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/tron/broadcast`,
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

}