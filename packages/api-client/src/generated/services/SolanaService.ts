/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SignatureId } from '../models/SignatureId';
import type { SolanaBlock } from '../models/SolanaBlock';
import type { SolanaBroadcastConfirm } from '../models/SolanaBroadcastConfirm';
import type { SolanaTransactionHashWithConfirm } from '../models/SolanaTransactionHashWithConfirm';
import type { SolanaTx } from '../models/SolanaTx';
import type { SolanaWallet } from '../models/SolanaWallet';
import type { SolBalance } from '../models/SolBalance';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferSolanaBlockchain } from '../models/TransferSolanaBlockchain';
import type { TransferSolanaBlockchainKMS } from '../models/TransferSolanaBlockchainKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class SolanaService {

    /**
     * Generate Solana wallet
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Solana private key and account address.</p>
     *
     * @returns SolanaWallet OK
     * @throws ApiError
     */
    public static solanaGenerateWallet(): CancelablePromise<SolanaWallet> {
        return __request({
            method: 'GET',
            path: `/v3/solana/wallet`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * JSON RPC HTTP driver
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based JSON RPC driver to connect directly to the Solana node provided by Tatum.
     * To learn more about Solana JSON RPC, visit the <a href="https://docs.solana.com/developing/clients/jsonrpc-api" target="_blank">Solana developer's guide</a>.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static solanaWeb3Driver(
        xApiKey: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/solana/web3/${xApiKey}`,
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
     * Get current block number
     * <h4>1 credit per API call.</h4><br/><p>Get Solana current block number. This is the number of the latest block in the blockchain.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static solanaGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/solana/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Solana block by number
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Solana block by block hash or block number. <br/>
     * You can find full data description here - <a target="blank" href="https://docs.solana.com/developing/clients/jsonrpc-api#getblock">https://docs.solana.com/developing/clients/jsonrpc-api#getblock</a>
     * </p>
     *
     * @param height Block number
     * @returns SolanaBlock OK
     * @throws ApiError
     */
    public static solanaGetBlock(
        height: number,
    ): CancelablePromise<SolanaBlock> {
        return __request({
            method: 'GET',
            path: `/v3/solana/block/${height}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Solana Account balance
     * <h4>1 credit per API call.</h4><br/><p>Get Solana account balance in SOL. This method does not prints any balance of the SPL or NFT tokens on the account.</p>
     * @param address Account address you want to get balance of
     * @returns SolBalance OK
     * @throws ApiError
     */
    public static solanaGetBalance(
        address: string,
    ): CancelablePromise<SolBalance> {
        return __request({
            method: 'GET',
            path: `/v3/solana/account/balance/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Solana Transaction
     * <h4>2 credit per API call.</h4><br/><p>Get Solana transaction by transaction hash.<br/>
     * You can find full data description here - <a target="blank" href="https://docs.solana.com/developing/clients/jsonrpc-api#gettransaction">https://docs.solana.com/developing/clients/jsonrpc-api#gettransaction</a>
     * </p>
     *
     * @param hash Transaction hash
     * @param commitment Commitment of the transaction. If not defined, all transactions are being scanned.
     * @returns SolanaTx OK
     * @throws ApiError
     */
    public static solanaGetTransaction(
        hash: string,
        commitment?: 'finalized' | 'confirmed',
    ): CancelablePromise<SolanaTx> {
        return __request({
            method: 'GET',
            path: `/v3/solana/transaction/${hash}`,
            query: {
                'commitment': commitment,
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
     * Send SOL from account to account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send SOL from account to account.<br/><br/>
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
    public static solanaBlockchainTransfer(
        requestBody: (TransferSolanaBlockchain | TransferSolanaBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/solana/transaction`,
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
     * Broadcast and confirm signed Solana transaction
     * <h4>10 credits per API call.</h4><br/>
     * <p>Broadcast signed custom transactions to Solana blockchain and waits for transaction confirmation depending on the commitment given. More information about commitment levels <a target="_blank" href="https://docs.solana.com/ru/developing/clients/jsonrpc-api#configuring-state-commitment">here</a></p>
     *
     * @param requestBody
     * @returns SolanaTransactionHashWithConfirm OK
     * @throws ApiError
     */
    public static solanaBroadcastConfirm(
        requestBody: SolanaBroadcastConfirm,
    ): CancelablePromise<SolanaTransactionHashWithConfirm> {
        return __request({
            method: 'POST',
            path: `/v3/solana/broadcast/confirm`,
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
