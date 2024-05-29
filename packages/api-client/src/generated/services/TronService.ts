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
import type { SignatureId } from '../models/SignatureId';
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
     * Generate a TRON wallet
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Bitcoin wallet with derivation path m'/44'/195'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/tron/bips/blob/master/bip-0044.mediawiki</a>.
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate a TRON address from the wallet's extended public key
     * <p><b>5 credits per API call</b></p>
     * <p>Generate a TRON address from the extended public key of the wallet. The address is generated for the specific index - each extended public key can generate up to 2^32 addresses with the index starting from 0 up to 2^31.</p>
     *
     * @param xpub The extended public key of the wallet; can be in the base58 format (111 characters) or the hexadecimal format (130 characters)
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate the private key for a TRON address
     * <p><b>10 credits per API call</b></p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the current TRON block
     * <p><b>5 credits per API call</b></p>
     * <p>Get current Tron block.</p>
     *
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
     * Get a TRON block by its hash or height
     * <p><b>5 credits per API call</b></p>
     * <p>Get Tron block by hash or height.</p>
     *
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the TRON account by its address
     * <p><b>5 credits per API call</b></p>
     * <p>Get Tron account by address.</p>
     *
     * @param address Account address
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Freeze the balance of a TRON account
     * <p><b>10 credits per API call</b></p>
     * <p>Freeze Tron assets on the address. By freezing assets, you can obtain energy or bandwidth to perform transactions.</p>
     * <p><b>Signing a transaction</b><br/>
     * When freezing the balance, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static tronFreeze(
        requestBody: (FreezeTron | FreezeTronKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/tron/freezeBalance`,
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
     * Unfreeze the balance of a TRON account
     * <p><b>10 credits per API call</b></p>
     * <p>Unfreeze Tron assets on the address. By unfreezing assets, you can unlock your staked TRX.</p>
     * <p><b>Signing a transaction</b><br/>
     * When unfreezing the balance, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static tronUnfreeze(
        requestBody: (FreezeTron | FreezeTronKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/tron/unfreezeBalance`,
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
     * Get all transactions for a TRON account
     * <p><b>5 credits per API call</b></p>
     * <p>Get all transactions for a TRON account.</p>
     * <p>This API returns up to 200 transactions in one API call. If there are more than 200 transactions for the TRON account, the response body will contain the <code>next</code> parameter with the fingerprint of the transaction that follows the last (200<sup>th</sup>) transaction in the returned list.</p>
     * <p>To get the next 200 transactions, make another call using this API, but this time add the <code>next</code> parameter the endpoint URL and set it to the transaction fingerprint from the <code>next</code> parameter in the response, for example:</p>
     * <p><code>https://api.tatum.io/v3/tron/transaction/account/{address}?next=81d0524acf5967f3b361e03fd7d141ab511791cd7aad7ae406c4c8d408290991</code></p>
     *
     * @param address The address of the TRON account to get all transactions for
     * @param next The fingerprint of the transaction that follows the last (200<sup>th</sup>) transaction in the returned list of transactions. Use it to get the next 200 transactions for the specified account (for more information, see the description of this API).
     * @param onlyConfirmed If true, only confirmed transactions are returned
     * @param onlyUnconfirmed If true, only unconfirmed transactions are returned
     * @param onlyTo If true, only transactions to this address are returned
     * @param onlyFrom If true, only transactions from this address are returned
     * @param orderBy Order of the returned transactions
     * @param minTimestamp Minimum block_timestamp, default is 0
     * @param maxTimestamp Maximum block_timestamp, default is now
     * @returns any OK
     * @throws ApiError
     */
    public static tronAccountTx(
        address: string,
        next?: string,
        onlyConfirmed?: boolean,
        onlyUnconfirmed?: boolean,
        onlyTo?: boolean,
        onlyFrom?: boolean,
        orderBy?: 'block_timestamp,asc' | 'block_timestamp,desc',
        minTimestamp?: number,
        maxTimestamp?: number,
    ): CancelablePromise<{
        /**
         * If present, there are more transactions for the TRON account than the 200 transactions returned in the response, and this parameter specifies the fingerprint of the transaction that follows the last (200<sup>th</sup>) transaction in the returned list of transactions. Use it to get the next 200 transactions for the specified account (for more information, see the description of this API).
         */
        next?: string;
        /**
         * The list of transactions for the specified TRON account
         */
        transactions: Array<TronTx>;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/tron/transaction/account/${address}`,
            query: {
                'next': next,
                'onlyConfirmed': onlyConfirmed,
                'onlyUnconfirmed': onlyUnconfirmed,
                'onlyTo': onlyTo,
                'onlyFrom': onlyFrom,
                'orderBy': orderBy,
                'minTimestamp': minTimestamp,
                'maxTimestamp': maxTimestamp,
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
     * Get TRC-20 transactions for a TRON account
     * <p><b>5 credits per API call</b></p>
     * <p>Get TRC-20 transactions for a TRON account.</p>
     * <p>This API returns up to 200 transactions in one API call. If there are more than 200 transactions for the TRON account, the response body will contain the <code>next</code> parameter with the fingerprint of the transaction that follows the last (200<sup>th</sup>) transaction in the returned list.</p>
     * <p>To get the next 200 transactions, make another call using this API, but this time add the <code>next</code> parameter the endpoint URL and set it to the transaction fingerprint from the <code>next</code> parameter in the response, for example:</p>
     * <p><code>https://api.tatum.io/v3/tron/transaction/account/{address}/trc20?next=81d0524acf5967f3b361e03fd7d141ab511791cd7aad7ae406c4c8d408290991</code></p>
     *
     * @param address The address of the TRON account to get TRC-20 transactions for
     * @param next The fingerprint of the transaction that follows the last (200<sup>th</sup>) transaction in the returned list of transactions. Use it to get the next 200 transactions for the specified account (for more information, see the description of this API).
     * @param onlyConfirmed If true, only confirmed transactions are returned
     * @param onlyUnconfirmed If true, only unconfirmed transactions are returned
     * @param onlyTo If true, only transactions to this address are returned
     * @param onlyFrom If true, only transactions from this address are returned
     * @param orderBy Order of the returned transactions
     * @param minTimestamp Minimum block_timestamp, default is 0
     * @param maxTimestamp Maximum block_timestamp, default is now
     * @param contractAddress Receive only transactions with one specific smart contract
     * @returns any OK
     * @throws ApiError
     */
    public static tronAccountTx20(
        address: string,
        next?: string,
        onlyConfirmed?: boolean,
        onlyUnconfirmed?: boolean,
        onlyTo?: boolean,
        onlyFrom?: boolean,
        orderBy?: 'block_timestamp,asc' | 'block_timestamp,desc',
        minTimestamp?: number,
        maxTimestamp?: number,
        contractAddress?: string,
    ): CancelablePromise<{
        /**
         * If present, there are more transactions for the TRON account than the 200 transactions returned in the response, and this parameter specifies the fingerprint of the transaction that follows the last (200<sup>th</sup>) transaction in the returned list of transactions. Use it to get the next 200 transactions for the specified account (for more information, see the description of this API).
         */
        next?: string;
        /**
         * The list of transactions for the specified TRON account
         */
        transactions: Array<TronTx20>;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/tron/transaction/account/${address}/trc20`,
            query: {
                'next': next,
                'onlyConfirmed': onlyConfirmed,
                'onlyUnconfirmed': onlyUnconfirmed,
                'onlyTo': onlyTo,
                'onlyFrom': onlyFrom,
                'orderBy': orderBy,
                'minTimestamp': minTimestamp,
                'maxTimestamp': maxTimestamp,
                'contractAddress': contractAddress,
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
     * Send TRX to a TRON account
     * <p><b>10 credits per API call</b></p>
     * <p>Send an amount in TRX from address to address.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending TRX to a TRON account, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static tronTransfer(
        requestBody: (TransferTronBlockchain | TransferTronBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/tron/transaction`,
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
     * Send TRC-10 tokens to a TRON account
     * <p><b>10 credits per API call</b></p>
     * <p>Send TRC-10 tokens from address to address.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending TRC-10 tokens to a TRON account, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static tronTransferTrc10(
        requestBody: (TransferTronTrc10Blockchain | TransferTronTrc10BlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc10/transaction`,
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
     * Send TRC-20 tokens to a TRON account
     * <p><b>10 credits per API call</b></p>
     * <p>Send TRC-20 tokens from address to address.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending TRC-20 tokens to a TRON account, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static tronTransferTrc20(
        requestBody: (TransferTronTrc20Blockchain | TransferTronTrc20BlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc20/transaction`,
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
     * Create a TRC-10 token
     * <p><b>10 credits per API call</b></p>
     * <p>Create a TRON TRC-10 token.</p>
     * <p>One TRON account can create only one TRC-10 token. The whole supply of the token is transferred to the issuer's account 100 seconds after the token has been created.</p>
     * <p><b>Signing a transaction</b><br/>
     * When creating a TRC-10 token, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static tronCreateTrc10(
        requestBody: (CreateTronTrc10Blockchain | CreateTronTrc10BlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc10/deploy`,
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
     * Get information about a TRC-10 token
     * <p><b>5 credits per API call</b></p>
     * <p>Get information about a TRON TRC-10 token.</p>
     *
     * @param idOrOwnerAddress The ID of the TRC-10 token or the address of the token's owner
     * @returns TronTrc10Detail OK
     * @throws ApiError
     */
    public static tronTrc10Detail(
        idOrOwnerAddress: string,
    ): CancelablePromise<TronTrc10Detail> {
        return __request({
            method: 'GET',
            path: `/v3/tron/trc10/detail/${idOrOwnerAddress}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Create a TRC-20 token
     * <p><b>10 credits per API call</b></p>
     * <p>Create a TRON TRC-20 capped token. A capped TRC20 token is a type of token on the TRON blockchain that has a preset limit on the total number of tokens that can be created. This limit is specified during the token creation process and cannot be exceeded. Once the limit is reached, no more tokens can be minted. This feature helps to ensure the scarcity and value of the token and can provide investors with a sense of security. It is a popular choice for fundraising, as it allows for a predetermined amount of funds to be raised through the sale of tokens, and any excess tokens that are not sold are simply not minted.</p>
     * <p><b>Signing a transaction</b><br/>
     * When creating a TRC-20 token, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static tronCreateTrc20(
        requestBody: (CreateTronTrc20Blockchain | CreateTronTrc20BlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/tron/trc20/deploy`,
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
     * Get a TRON transaction by its hash
     * <p><b>5 credits per API call</b></p>
     * <p>Get Tron transaction by hash.</p>
     *
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Broadcast a TRON transaction
     * <p><b>5 credits per API call</b></p>
     * <p>Broadcast Tron transaction. This method is used internally from Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
