/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { EgldBlock } from '../models/EgldBlock';
import type { EgldTx } from '../models/EgldTx';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferEgldBlockchain } from '../models/TransferEgldBlockchain';
import type { TransferEgldBlockchainKMS } from '../models/TransferEgldBlockchainKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ElrondService {

    /**
     * Generate EGLD wallet
     * <h4>1 credit per API call.</h4><br/>
     * <p>The Elrond Address format is bech32, specified by the BIP 0173. The address always starts with an erd1. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase.
     * Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.
     * <br/>
     * Each address is identified by 3 main values:
     * <ul><li>Private Key - your secret value, which should never be revealed</li>
     * <li>Public Key - public address to be published</li>
     * <li>Derivation index - index of generated address</li></ul>
     * </p>
     * <p>Tatum follows BIP44 specification and generates for EGLD wallet with derivation path m'/44'/508'/0'/0'.
     * More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible EGLD wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of private key.
     * @returns any OK
     * @throws ApiError
     */
    public static egldGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<{
        /**
         * Mnemonic to use for generation of private key
         */
        mnemonic?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/egld/wallet`,
            query: {
                'mnemonic': mnemonic,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate EGLD account address from mnemonic
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate EGLD account deposit address from mnemonic phrase. Deposit address is generated for the specific
     * index - each mnemonic phrase can generate up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     * @param mnemonic Mnemonic to use for generation of address.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static egldGenerateAddress(
        mnemonic: string,
        index: number,
    ): CancelablePromise<{
        /**
         * EGLD address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/egld/address/${mnemonic}/${index}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate EGLD private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate private key of address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static egldGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/egld/wallet/priv`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Node HTTP driver
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based driver to connect directly to the EGLD node provided by Tatum.
     * To learn more about EGLD, visit the <a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">EGLD developer's guide</a>.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static egldNodePost(
        xApiKey: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/egld/node/${xApiKey}/*`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Node HTTP driver
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based driver to connect directly to the EGLD node provided by Tatum.
     * To learn more about EGLD, visit the <a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">EGLD developer's guide</a>.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @returns any OK
     * @throws ApiError
     */
    public static egldNodeGet(
        xApiKey: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/v3/egld/node/${xApiKey}/*`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get current block number
     * <h4>1 credit per API call.</h4><br/> <p>Get EGLD current block number. This is the number of the latest block in the blockchain.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static eGldGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/egld/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get EGLD block by hash
     * <h4>1 credit per API call.</h4><br/> <p>Get EGLD block by block hash or block number. <a href='https://docs.elrond.com/sdk-and-tools/rest-api/blocks/' target='_blank'> EGLD docs </a></p>
     * @param hash Block hash or nonce
     * @returns EgldBlock OK
     * @throws ApiError
     */
    public static egldGetBlock(
        hash: string,
    ): CancelablePromise<EgldBlock> {
        return __request({
            method: 'GET',
            path: `/v3/egld/block/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get EGLD Account balance
     * <h4>1 credit per API call.</h4><br/> <p>Get account balance in EGLD.</p>
     * @param address Account address you want to get balance of
     * @returns any OK
     * @throws ApiError
     */
    public static egldGetBalance(
        address: string,
    ): CancelablePromise<{
        /**
         * Balance in EGLD
         */
        balance?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/egld/account/balance/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get EGLD Transaction
     * <h4>1 credit per API call.</h4><br/> <p>Get EGLD transaction by transaction hash. Detail result please find here <a href='https://docs.elrond.com/sdk-and-tools/rest-api/transactions/#get-transaction' target='_blank'> EGLD docs </a></p>
     * @param hash Transaction hash
     * @returns EgldTx OK
     * @throws ApiError
     */
    public static egldGetTransaction(
        hash: string,
    ): CancelablePromise<EgldTx> {
        return __request({
            method: 'GET',
            path: `/v3/egld/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get count of outgoing EGLD transactions
     * <h4>1 credit per API call.</h4><br/>
     * <p>This endpoint allows one to retrieve the latest 20 transactions sent from an address.</p>
     *
     * @param address address
     * @returns any OK
     * @throws ApiError
     */
    public static egldGetTransactionAddress(
        address: string,
    ): CancelablePromise<Array<any>> {
        return __request({
            method: 'GET',
            path: `/v3/egld/transaction/address/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get count of outgoing EGLD transactions
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing EGLD transactions for the address. When a transaction is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     * @param address address
     * @returns number OK
     * @throws ApiError
     */
    public static egldGetTransactionCount(
        address: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/egld/transaction/count/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send EGLD from account to account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send EGLD from account to account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on devnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static egldBlockchainTransfer(
        requestBody: (TransferEgldBlockchain | TransferEgldBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/egld/transaction`,
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
     * Broadcast signed EGLD transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to EGLD blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static egldBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/egld/broadcast`,
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