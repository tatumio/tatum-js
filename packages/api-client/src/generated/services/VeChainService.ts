/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferVetBlockchain } from '../models/TransferVetBlockchain';
import type { TransferVetBlockchainKMS } from '../models/TransferVetBlockchainKMS';
import type { VetBlock } from '../models/VetBlock';
import type { VetTx } from '../models/VetTx';
import type { VetTxReceipt } from '../models/VetTxReceipt';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class VeChainService {

    /**
     * Generate VeChain wallet
     * <h4>5 credits per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for VeChain wallet with derivation path m'/44'/818'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible VeChain wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static vetGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/vet/wallet`,
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
     * Generate VeChain account address from Extended public key
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate VeChain account deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static vetGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * VeChain addres
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/vet/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate VeChain private key
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate private key of address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static vetGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/vet/wallet/priv`,
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
     * Get VeChain current block
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain current block number.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static vetGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/vet/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get VeChain Block by hash
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain Block by block hash or block number.</p>
     * @param hash Block hash or block number
     * @returns VetBlock OK
     * @throws ApiError
     */
    public static vetGetBlock(
        hash: string,
    ): CancelablePromise<VetBlock> {
        return __request({
            method: 'GET',
            path: `/v3/vet/block/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get VeChain Account balance
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain Account balance in VET.</p>
     * @param address Account address you want to get balance of
     * @returns any OK
     * @throws ApiError
     */
    public static vetGetBalance(
        address: string,
    ): CancelablePromise<{
        /**
         * Balance in VET
         */
        balance?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/vet/account/balance/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get VeChain Account energy (VTHO)
     * <h4>5 credits per API call.</h4><br/><p>Get VeChain Account energy in VTHO. VTHO is used for paying for the transaction fee.</p>
     * @param address Account address you want to get balance of
     * @returns any OK
     * @throws ApiError
     */
    public static vetGetEnergy(
        address: string,
    ): CancelablePromise<{
        /**
         * Balance in VTHO
         */
        energy?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/vet/account/energy/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get VeChain Transaction
     * <h4>10 credits per API call.</h4><br/><p>Get VeChain Transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns VetTx OK
     * @throws ApiError
     */
    public static vetGetTransaction(
        hash: string,
    ): CancelablePromise<VetTx> {
        return __request({
            method: 'GET',
            path: `/v3/vet/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get VeChain Transaction Receipt
     * <h4>5 credits per API call.</h4><br/>
     * <p>Get VeChain Transaction Receipt by transaction hash. Transaction receipt is available only after transaction is
     * included in the block and contains information about paid fee or created contract address and much more.</p>
     *
     * @param hash Transaction hash
     * @returns VetTxReceipt OK
     * @throws ApiError
     */
    public static vetGetTransactionReceipt(
        hash: string,
    ): CancelablePromise<VetTxReceipt> {
        return __request({
            method: 'GET',
            path: `/v3/vet/transaction/${hash}/receipt`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send VeChain from account to account
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send VET from account to account. Fee for the transaction is paid in VTHO.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static vetBlockchainTransfer(
        requestBody: (TransferVetBlockchain | TransferVetBlockchainKMS),
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/vet/transaction`,
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
     * Broadcast signed VeChain transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to VeChain blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static vetBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/vet/broadcast`,
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