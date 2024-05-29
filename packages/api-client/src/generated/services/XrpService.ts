/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountSettingsXrpBlockchain } from '../models/AccountSettingsXrpBlockchain';
import type { AccountSettingsXrpBlockchainKMS } from '../models/AccountSettingsXrpBlockchainKMS';
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferXrpBlockchain } from '../models/TransferXrpBlockchain';
import type { TransferXrpBlockchainAsset } from '../models/TransferXrpBlockchainAsset';
import type { TransferXrpBlockchainAssetKMS } from '../models/TransferXrpBlockchainAssetKMS';
import type { TransferXrpBlockchainKMS } from '../models/TransferXrpBlockchainKMS';
import type { TrustLineXrpBlockchain } from '../models/TrustLineXrpBlockchain';
import type { TrustLineXrpBlockchainKMS } from '../models/TrustLineXrpBlockchainKMS';
import type { XrpAccount } from '../models/XrpAccount';
import type { XrpAccountBalance } from '../models/XrpAccountBalance';
import type { XrpAccountTx } from '../models/XrpAccountTx';
import type { XrpFee } from '../models/XrpFee';
import type { XrpInfo } from '../models/XrpInfo';
import type { XrpLedger } from '../models/XrpLedger';
import type { XrpTx } from '../models/XrpTx';
import type { XrpWallet } from '../models/XrpWallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class XrpService {

    /**
     * Generate XRP account
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate XRP account. Tatum does not support HD wallet for XRP, only specific address and private key can be generated.</p>
     *
     * @returns XrpWallet OK
     * @throws ApiError
     */
    public static xrpWallet(): CancelablePromise<XrpWallet> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/account`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get XRP Blockchain Information
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Blockchain last closed ledger index and hash.</p>
     * @returns XrpInfo OK
     * @throws ApiError
     */
    public static xrpGetLastClosedLedger(): CancelablePromise<XrpInfo> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get actual Blockchain fee
     * <h4>5 credits per API call.</h4><br/>
     * <p>Get XRP Blockchain fee. Standard fee for the transaction is available in the drops.base_fee section and is 10 XRP drops by default.
     * When there is a heavy traffic on the blockchain, fees are increasing according to current traffic.</p>
     *
     * @returns XrpFee OK
     * @throws ApiError
     */
    public static xrpGetFee(): CancelablePromise<XrpFee> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/fee`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Account transactions
     * <h4>5 credits per API call.</h4><br/><p>List all Account transactions.</p>
     * @param account Address of XRP account.
     * @param min Ledger version to start scanning for transactions from.
     * @param marker Marker from the last paginated request. It is stringified JSON from previous response.
     * @returns XrpAccountTx OK
     * @throws ApiError
     */
    public static xrpGetAccountTx(
        account: string,
        min?: number,
        marker?: string,
    ): CancelablePromise<XrpAccountTx> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/account/tx/${account}`,
            query: {
                'min': min,
                'marker': marker,
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
     * Get Ledger
     * <h4>5 credits per API call.</h4><br/><p>Get ledger by sequence.</p>
     * @param i Sequence of XRP ledger.
     * @returns XrpLedger OK
     * @throws ApiError
     */
    public static xrpGetLedger(
        i: number,
    ): CancelablePromise<XrpLedger> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/ledger/${i}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get XRP Transaction by hash
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns XrpTx OK
     * @throws ApiError
     */
    public static xrpGetTransaction(
        hash: string,
    ): CancelablePromise<XrpTx> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Account info
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Account info.</p>
     * @param account Account address you want to get balance of
     * @returns XrpAccount OK
     * @throws ApiError
     */
    public static xrpGetAccountInfo(
        account: string,
    ): CancelablePromise<XrpAccount> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/account/${account}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Account Balance
     * <h4>5 credits per API call.</h4><br/><p>Get XRP Account Balance. Obtain balance of the XRP and other assets on the account.</p>
     * @param account Account address you want to get balance of
     * @returns XrpAccountBalance OK
     * @throws ApiError
     */
    public static xrpGetAccountBalance(
        account: string,
    ): CancelablePromise<XrpAccountBalance> {
        return __request({
            method: 'GET',
            path: `/v3/xrp/account/${account}/balance`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send XRP from address to address
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send XRP from account to account.<br/><br/>
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
    public static xrpTransferBlockchain(
        requestBody: (TransferXrpBlockchain | TransferXrpBlockchainAsset | TransferXrpBlockchainKMS | TransferXrpBlockchainAssetKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/xrp/transaction`,
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
     * Create / Update / Delete XRP trust line
     * <h4>10 credits per API call.</h4><br/><p>
     * <p>Create / Update / Delete XRP trust line between accounts to transfer private assets.
     * By creating trustline for the first time, the asset is created automatically and can be used in the transactions.<br/>
     * Account setting rippling must be enabled on the issuer account before the trust line creation to asset work correctly.
     * Creating a trust line will cause an additional 5 XRP to be blocked on the account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static xrpTrustLineBlockchain(
        requestBody: (TrustLineXrpBlockchain | TrustLineXrpBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/xrp/trust`,
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
     * Modify XRP account
     * <h4>10 credits per API call.</h4><br/><p>
     * <p>Modify XRP account settings. If an XRP account should be an issuer of the custom asset, this accounts should have rippling enabled to true.
     * In order to support off-chain processing, required destination tag should be set on the account.<br/><br/>
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
    public static xrpAccountSettings(
        requestBody: (AccountSettingsXrpBlockchain | AccountSettingsXrpBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/xrp/account/settings`,
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
     * Broadcast signed XRP transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to XRP blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static xrpBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/xrp/broadcast`,
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