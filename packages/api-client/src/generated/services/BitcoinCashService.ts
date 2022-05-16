/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BchBlock } from '../models/BchBlock';
import type { BchInfo } from '../models/BchInfo';
import type { BchTransaction } from '../models/BchTransaction';
import type { BchTransactionKMS } from '../models/BchTransactionKMS';
import type { BchTx } from '../models/BchTx';
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BitcoinCashService {

    /**
     * Generate Bitcoin Cash wallet
     * <h4>5 credits per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Bitcoin Cash wallet with derivation path m'/44'/145'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Bitcoin Cash wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static bchGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/bcash/wallet`,
            query: {
                'mnemonic': mnemonic,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * JSON RPC HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the node provided by Tatum.
     * To learn more about JSON RPC, please visit <a href="https://github.com/gcash/bchd/blob/master/docs/json_rpc_api.md#Methods" target="_blank">Bitcoin Cash developers' guide.</a></p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static bchRpcDriver(
        requestBody: {
            /**
             * Version of the JSON RPC.
             */
            jsonrpc?: string;
            /**
             * ID of the request, could be any arbitrary identifier.
             */
            id?: string;
            /**
             * Method to invoke on the node.
             */
            method?: string;
            /**
             * Params to the method call, if required.
             */
            params?: any[];
        },
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/bcash/node`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Bitcoin Cash Blockchain Information
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.</p>
     * @returns BchInfo OK
     * @throws ApiError
     */
    public static bchGetBlockChainInfo(): CancelablePromise<BchInfo> {
        return __request({
            method: 'GET',
            path: `/v3/bcash/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Bitcoin Cash Block hash
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Block hash. Returns hash of the block to get the block detail.</p>
     * @param i The number of blocks preceding a particular block on a block chain.
     * @returns any OK
     * @throws ApiError
     */
    public static bchGetBlockHash(
        i: number,
    ): CancelablePromise<{
        /**
         * Block hash
         */
        hash?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/bcash/block/hash/${i}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Bitcoin Cash Block by hash
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Block detail by block hash or height.</p>
     * @param hash Block hash or height
     * @returns BchBlock OK
     * @throws ApiError
     */
    public static bchGetBlock(
        hash: string,
    ): CancelablePromise<BchBlock> {
        return __request({
            method: 'GET',
            path: `/v3/bcash/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Bitcoin Cash Transaction by hash
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns BchTx OK
     * @throws ApiError
     */
    public static bchGetRawTransaction(
        hash: string,
    ): CancelablePromise<BchTx> {
        return __request({
            method: 'GET',
            path: `/v3/bcash/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Bitcoin Cash Transactions by address
     * <h4>5 credits per API call.</h4><br/><p>Get Bitcoin Cash Transaction by address. Limit is 50 transaction per response.</p>
     * @param address Address
     * @param skip Define, how much transactions should be skipped to obtain another page.
     * @returns BchTx OK
     * @throws ApiError
     */
    public static bchGetTxByAddress(
        address: string,
        skip?: number,
    ): CancelablePromise<Array<BchTx>> {
        return __request({
            method: 'GET',
            path: `/v3/bcash/transaction/address/${address}`,
            query: {
                'skip': skip,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Bitcoin Cash deposit address from Extended public key
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate Bitcoin Cash deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1. Generates new format of address starting with bitcoincash: in case of mainnet, bchtest: in case of testnet..</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static bchGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Bitcoin Cash address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/bcash/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Bitcoin Cash private key
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static bchGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/bcash/wallet/priv`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Send Bitcoin Cash to blockchain addresses
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send Bitcoin Cash to blockchain addresses. It is possible to build a blockchain transaction in 1 way:
     * <ul>
     * <li><b>fromUTXO</b> - assets will be sent from the list of unspent UTXOs. Each of the UTXO will be included in the transaction.</li>
     * </ul>
     * In bitcoin-like blockchains, transaction is created from the list of previously not spent UTXO. Every UTXO contains amount of funds, which can be spent.
     * When the UTXO enters into the transaction, the whole amount is included and must be spent. For example, address A receives 2 transactions, T1 with 1 BCH and T2 with 2 BCH.
     * The transaction, which will consume UTXOs for T1 and T2, will have available amount to spent 3 BCH = 1 BCH (T1) + 2 BCH(T2).<br/><br/>
     * There can be multiple recipients of the transactions, not only one. In the <b>to</b> section, every recipient address has it's corresponding amount.
     * When the amount of funds, that should receive the recipient is lower than the amount of funds from the UTXOs, the difference is used as a transaction fee.<br/><br/>
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
    public static bchTransferBlockchain(
        requestBody: (BchTransaction | BchTransactionKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/bcash/transaction`,
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
     * Broadcast signed Bitcoin Cash transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Bitcoin Cash blockchain. This method is used internally from Tatum KMS, Tatum Middleware or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static bchBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/bcash/broadcast`,
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