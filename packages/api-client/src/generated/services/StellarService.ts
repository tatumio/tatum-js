/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferXlmBlockchain } from '../models/TransferXlmBlockchain';
import type { TransferXlmBlockchainAsset } from '../models/TransferXlmBlockchainAsset';
import type { TransferXlmBlockchainKMS } from '../models/TransferXlmBlockchainKMS';
import type { TransferXlmBlockchainKMSAsset } from '../models/TransferXlmBlockchainKMSAsset';
import type { TrustLineXlmBlockchain } from '../models/TrustLineXlmBlockchain';
import type { TrustLineXlmBlockchainKMS } from '../models/TrustLineXlmBlockchainKMS';
import type { XlmAccount } from '../models/XlmAccount';
import type { XlmLedger } from '../models/XlmLedger';
import type { XlmTx } from '../models/XlmTx';
import type { XlmWallet } from '../models/XlmWallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class StellarService {

    /**
     * Generate XLM account
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate XLM account. Tatum does not support HD wallet for XLM, only specific address and private key can be generated.</p>
     *
     * @returns XlmWallet OK
     * @throws ApiError
     */
    public static xlmWallet(): CancelablePromise<XlmWallet> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/account`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get XLM Blockchain Information
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain last closed ledger.</p>
     * @returns XlmLedger OK
     * @throws ApiError
     */
    public static xlmGetLastClosedLedger(): CancelablePromise<XlmLedger> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get XLM Blockchain Ledger by sequence
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain ledger for ledger sequence.</p>
     * @param sequence Sequence of the ledger.
     * @returns XlmLedger OK
     * @throws ApiError
     */
    public static xlmGetLedger(
        sequence: string,
    ): CancelablePromise<XlmLedger> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/ledger/${sequence}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get XLM Blockchain Transactions in Ledger
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain transactions in the ledger.</p>
     * @param sequence Sequence of the ledger.
     * @returns XlmTx OK
     * @throws ApiError
     */
    public static xlmGetLedgerTx(
        sequence: string,
    ): CancelablePromise<Array<XlmTx>> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/ledger/${sequence}/transaction`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get actual XLM fee
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Blockchain fee in 1/10000000 of XLM (stroop)</p>
     * @returns number OK
     * @throws ApiError
     */
    public static xlmGetFee(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/fee`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get XLM Account transactions
     * <h4>5 credits per API call.</h4><br/><p>List all XLM account transactions.</p>
     * @param account Address of XLM account.
     * @param pagination Paging token from the last transaction gives you next page
     * @returns XlmTx OK
     * @throws ApiError
     */
    public static xlmGetAccountTx(
        account: string,
        pagination?: string,
    ): CancelablePromise<Array<XlmTx>> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/account/tx/${account}`,
            query: {
                'pagination': pagination,
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
     * Get XLM Transaction by hash
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns XlmTx OK
     * @throws ApiError
     */
    public static xlmGetTransaction(
        hash: string,
    ): CancelablePromise<XlmTx> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get XLM Account info
     * <h4>5 credits per API call.</h4><br/><p>Get XLM Account detail.</p>
     * @param account Account address you want to get balance of
     * @returns XlmAccount OK
     * @throws ApiError
     */
    public static xlmGetAccountInfo(
        account: string,
    ): CancelablePromise<XlmAccount> {
        return __request({
            method: 'GET',
            path: `/v3/xlm/account/${account}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send XLM from address to address
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send XLM from account to account. It is possbile to send native XLM asset, or any other custom asset present on the network.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static xlmTransferBlockchain(
        requestBody: (TransferXlmBlockchain | TransferXlmBlockchainAsset | TransferXlmBlockchainKMS | TransferXlmBlockchainKMSAsset),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/xlm/transaction`,
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
     * Create / Update / Delete XLM trust line
     * <h4>10 credits per API call.</h4><br/><p>
     * <p>Create / Update / Delete XLM trust line between accounts to transfer private assets.
     * By creating trustline for the first time, the asset is created automatically and can be used in the transactions.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static xlmTrustLineBlockchain(
        requestBody: (TrustLineXlmBlockchain | TrustLineXlmBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/xlm/trust`,
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
     * Broadcast signed XLM transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to XLM blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static xlmBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/xlm/broadcast`,
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