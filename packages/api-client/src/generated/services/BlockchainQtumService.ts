/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { GeneratePrivateKey } from '../models/GeneratePrivateKey';
import type { QtumBlock } from '../models/QtumBlock';
import type { QtumIGetInfo } from '../models/QtumIGetInfo';
import type { QtumIRawTransactionInfo } from '../models/QtumIRawTransactionInfo';
import type { QtumIRawTransactions } from '../models/QtumIRawTransactions';
import type { QtumIUTXO } from '../models/QtumIUTXO';
import type { QtumWallet } from '../models/QtumWallet';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainQtumService {

    /**
     * Generate QTUM wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Qtum wallet with derivation path m'/44'/2301'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible QTum wallet.</p>
     *
     * @param mnemonic Mnemonic
     * @returns QtumWallet OK
     * @throws ApiError
     */
    public static qtumGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<QtumWallet> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/wallet`,
            query: {
                'mnemonic': mnemonic,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate QTUM account address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate QTUM account deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param i Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static qtumGenerateAddress(
        xpub: string,
        i: number,
    ): CancelablePromise<{
        /**
         * QTUM address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/address/${xpub}/${i}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate QTUM private key
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Qtum wallet with derivation path defined by QTUM. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible QTUM wallet.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static generatePrivateKeyFromMnemonic(
        requestBody: GeneratePrivateKey,
    ): CancelablePromise<{
        /**
         * key
         */
        key?: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/qtum/wallet/priv`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get current block number
     * <h4>1 credit per API call.</h4><br/><p>Get QTUM current block number. This is the number of the latest block in the blockchain.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static qtumGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get QTUM block by hash
     * <h4>1 credit per API call.</h4><br/><p>Get BSC block by block hash or block number.</p>
     * @param hash Block hash or block number
     * @returns QtumBlock OK
     * @throws ApiError
     */
    public static qtumGetBlock(
        hash: string,
    ): CancelablePromise<QtumBlock> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate QTUM Address from private key
     * <h4>1 credit per API call.</h4><br/><p>Generate Address by private key</p>
     * @param key Private key
     * @returns any OK
     * @throws ApiError
     */
    public static generateAddressPrivatekey(
        key: string,
    ): CancelablePromise<{
        /**
         * Address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/address/${key}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get UTXO
     * <h4>1 credit per API call.</h4><br/><p>Get UTXOS by address</p>
     * @param address address
     * @returns QtumIUTXO OK
     * @throws ApiError
     */
    public static getQtumUtxOs(
        address: string,
    ): CancelablePromise<QtumIUTXO> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/utxo/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get QTUM Account balance
     * <h4>1 credit per API call.</h4><br/><p>Get QTUM account balance in QTUM tokens on an account.</p>
     * @param address Account address
     * @returns QtumIGetInfo OK
     * @throws ApiError
     */
    public static qtumGetBalance(
        address: string,
    ): CancelablePromise<QtumIGetInfo> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/account/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get QTUM Transaction
     * <h4>1 credit per API call.</h4><br/><p>Get QTUM transaction by transaction hash.</p>
     * @param id Transaction hash
     * @returns QtumIRawTransactionInfo OK
     * @throws ApiError
     */
    public static getQtumTransaction(
        id: string,
    ): CancelablePromise<QtumIRawTransactionInfo> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/transaction/${id}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get QTUM Transactions by address
     * <h4>1 credit per API call.</h4><br/><p>Get QTUM paginated transactions by address.</p>
     * @param address Address
     * @param pageSize pageSize
     * @param offset offset
     * @returns QtumIRawTransactions OK
     * @throws ApiError
     */
    public static getQtumPaginatedTransaction(
        address: string,
        pageSize: number,
        offset?: number,
    ): CancelablePromise<QtumIRawTransactions> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/transactions/address/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
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
     * Get QTUM estimated gas fees
     * <h4>1 credit per API call.</h4><br/><p>Get estimated gas fees</p>
     * @param nblocks nblocks
     * @returns any OK
     * @throws ApiError
     */
    public static estimateFee(
        nblocks: number,
    ): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/transactions/gas/${nblocks}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get QTUM estimated gas fees per byte
     * <h4>1 credit per API call.</h4><br/><p>Get estimated gas fees per byte</p>
     * @param nblocks nblocks
     * @returns any OK
     * @throws ApiError
     */
    public static estimateFeePerByte(
        nblocks: number,
    ): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/v3/qtum/transactions/gasbytes/${nblocks}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Broadcast signed QTUM transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to QTUM blockchain. This method is used internally from Tatum KMS, Tatum Middleware or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static qtumBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/qtum/broadcast`,
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