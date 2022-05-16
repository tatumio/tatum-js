/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { DogeBlock } from '../models/DogeBlock';
import type { DogeInfo } from '../models/DogeInfo';
import type { DogeTransactionUTXO } from '../models/DogeTransactionUTXO';
import type { DogeTransactionUTXOKMS } from '../models/DogeTransactionUTXOKMS';
import type { DogeTx } from '../models/DogeTx';
import type { DogeUTXO } from '../models/DogeUTXO';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class DogecoinService {

    /**
     * Generate Dogecoin wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Dogecoin wallet with derivation path m'/44'/3'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki">https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Dogecoin wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static dogeGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/wallet`,
            query: {
                'mnemonic': mnemonic,
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
     * Generate Dogecoin deposit address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Dogecoin deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static dogeGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Dogecoin address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Dogecoin private key
     * <h4>2 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static dogeGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/dogecoin/wallet/priv`,
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
     * JSON RPC HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the node provided by Tatum.
     * To learn more about JSON RPC, please visit <a href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Bitcoin developers' guide.</a></p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static dogeRpcDriver(
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
            path: `/v3/dogecoin/node`,
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
     * Get Dogecoin Blockchain Information
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.</p>
     * @returns DogeInfo OK
     * @throws ApiError
     */
    public static dogeGetBlockChainInfo(): CancelablePromise<DogeInfo> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Dogecoin Block hash
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Block hash. Returns hash of the block to get the block detail.</p>
     * @param i The number of blocks preceding a particular block on a block chain.
     * @returns any OK
     * @throws ApiError
     */
    public static dogeGetBlockHash(
        i: number,
    ): CancelablePromise<{
        /**
         * Block hash
         */
        hash?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/block/hash/${i}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Dogecoin Block by hash or height
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Block detail by block hash or height.</p>
     * @param hash Block hash or height.
     * @returns DogeBlock OK
     * @throws ApiError
     */
    public static dogeGetBlock(
        hash: string,
    ): CancelablePromise<DogeBlock> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Block not found.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Dogecoin Transaction by hash
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Transaction detail by transaction hash.</p>
     * @param hash Transaction hash
     * @returns DogeTx OK
     * @throws ApiError
     */
    public static dogeGetRawTransaction(
        hash: string,
    ): CancelablePromise<DogeTx> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Mempool Transactions
     * <h4>1 credit per API call.</h4><br/><p>Get Dogecoin Transaction ids in the mempool.</p>
     * @returns string OK
     * @throws ApiError
     */
    public static dogeGetMempool(): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/mempool`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Dogecoin UTXO of Transaction
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get UTXO of given transaction and output index. UTXO means Unspent Transaction Output, which is in blockchain terminology assets, that user
     * received on the specific address and does not spend it yet.<br/>
     * In bitcoin-like blockchains (BTC, LTC, DOGE, BCH), every transaction is built from the list of previously
     * not spent transactions connected to the address. If user owns address A, receives in transaciont T1 10 DOGE, he can spend in the next transaction
     * UTXO T1 of total value 10 DOGE. User can spend multiple UTXOs from different addresses in 1 transaction.<br/>
     * If UTXO is not spent, data are returned, otherwise 404 error code.</p>
     *
     * @param hash TX Hash
     * @param index Index of tx output to check if spent or not
     * @returns DogeUTXO OK
     * @throws ApiError
     */
    public static dogeGetUtxo(
        hash: string,
        index: number,
    ): CancelablePromise<DogeUTXO> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/utxo/${hash}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Send Dogecoin to blockchain addresses
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send Dogecoin to blockchain addresses. It is possible to build a blockchain transaction in 1 way:
     * <ul>
     * <li><b>fromUTXO</b> - assets will be sent from the list of unspent UTXOs. Each of the UTXO will be included in the transaction.</li>
     * </ul>
     * In bitcoin-like blockchains, the transaction is created from the list of previously not spent UTXO. Every UTXO contains the number of funds, which can be spent.
     * When the UTXO enters into the transaction, the whole amount is included and must be spent. For example, address A receives 2 transactions, T1 with 1 DOGE and T2 with 2 DOGE.
     * The transaction, which will consume UTXOs for T1 and T2, will have available amount to spent 3 DOGE = 1 DOGE (T1) + 2 DOGE(T2).<br/><br/>
     * There can be multiple recipients of the transactions, not only one. In the <b>to</b> section, every recipient address has it's corresponding amount.
     * When the amount of funds, that should receive the recipient is lower than the number of funds from the UTXOs, the difference is sent to the change address.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and losing funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static dogeTransferBlockchain(
        requestBody: (DogeTransactionUTXO | DogeTransactionUTXOKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/dogecoin/transaction`,
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
     * Broadcast signed Dogecoin transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Dogecoin blockchain. This method is used internally from Tatum KMS, Tatum Middleware or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static dogeBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/dogecoin/broadcast`,
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