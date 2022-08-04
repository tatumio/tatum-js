/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { BtcBasedBalance } from '../models/BtcBasedBalance';
import type { LtcBlock } from '../models/LtcBlock';
import type { LtcInfo } from '../models/LtcInfo';
import type { LtcTransactionAddress } from '../models/LtcTransactionAddress';
import type { LtcTransactionAddressKMS } from '../models/LtcTransactionAddressKMS';
import type { LtcTransactionUTXO } from '../models/LtcTransactionUTXO';
import type { LtcTransactionUTXOKMS } from '../models/LtcTransactionUTXOKMS';
import type { LtcTx } from '../models/LtcTx';
import type { LtcUTXO } from '../models/LtcUTXO';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class LitecoinService {

    /**
     * Generate Litecoin wallet
     * <h4>5 credits per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Litecoin wallet with derivation path m'/44'/2'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki">https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Litecoin wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static ltcGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/wallet`,
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
     * @deprecated
     * JSON RPC HTTP driver
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the node provided by Tatum.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static ltcRpcDriver(
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
            path: `/v3/litecoin/node`,
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
     * Get Litecoin Blockchain Information
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.</p>
     * @returns LtcInfo OK
     * @throws ApiError
     */
    public static ltcGetBlockChainInfo(): CancelablePromise<LtcInfo> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Litecoin Block hash
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Block hash. Returns hash of the block to get the block detail.</p>
     * @param i The number of blocks preceding a particular block on a block chain.
     * @returns any OK
     * @throws ApiError
     */
    public static ltcGetBlockHash(
        i: number,
    ): CancelablePromise<{
        /**
         * Block hash
         */
        hash?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/block/hash/${i}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Litecoin Block by hash or height
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Block detail by block hash or height.</p>
     * @param hash Block hash or height.
     * @returns LtcBlock OK
     * @throws ApiError
     */
    public static ltcGetBlock(
        hash: string,
    ): CancelablePromise<LtcBlock> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Block not found.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Litecoin Transaction by hash
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Transaction detail by transaction hash.</p>
     * @param hash Transaction hash
     * @returns LtcTx OK
     * @throws ApiError
     */
    public static ltcGetRawTransaction(
        hash: string,
    ): CancelablePromise<LtcTx> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/transaction/${hash}`,
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
     * <h4>1 credit per API call.</h4><br/><p>Get Litecoin Transaction ids in the mempool.</p>
     * @returns string OK
     * @throws ApiError
     */
    public static ltcGetMempool(): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/mempool`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Litecoin Transactions by address
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Transaction by address.</p>
     * @param address Address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @returns LtcTx OK
     * @throws ApiError
     */
    public static ltcGetTxByAddress(
        address: string,
        pageSize: number,
        offset?: number,
    ): CancelablePromise<Array<LtcTx>> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/transaction/address/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
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
     * Get Litecoin Balance of the address
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Balance of the address.</p>
     * @param address Address
     * @returns BtcBasedBalance OK
     * @throws ApiError
     */
    public static ltcGetBalanceOfAddress(
        address: string,
    ): CancelablePromise<BtcBasedBalance> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/address/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Litecoin UTXO of Transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Get UTXO of given transaction and output index. UTXO means Unspent Transaction Output, which is in blockchain terminology assets, that user
     * received on the specific address and does not spend it yet.<br/>
     * In bitcoin-like blockchains (BTC, LTC, DOGE, BCH), every transaction is built from the list of previously
     * not spent transactions connected to the address. If user owns address A, receives in transaciont T1 10 LTC, he can spend in the next transaction
     * UTXO T1 of total value 10 LTC. User can spend multiple UTXOs from different addresses in 1 transaction.<br/>
     * If UTXO is not spent, data are returned, otherwise 404 error code.</p>
     *
     * @param hash TX Hash
     * @param index Index of tx output to check if spent or not
     * @returns LtcUTXO OK
     * @throws ApiError
     */
    public static ltcGetUtxo(
        hash: string,
        index: number,
    ): CancelablePromise<LtcUTXO> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/utxo/${hash}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Litecoin deposit address from Extended public key
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate Litecoin deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static ltcGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Litecoin address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Litecoin private key
     * <h4>5 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static ltcGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/litecoin/wallet/priv`,
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
     * Send Litecoin to blockchain addresses
     * <h4>10 credits per API call.</h4><br/>
     * <p>Send Litecoin to blockchain addresses. It is possible to build a blockchain transaction in 2 ways:
     * <ul>
     * <li><b>fromAddress</b> - assets will be sent from the list of addresses. For each of the addresses last 100 transactions will be scanned for any unspent UTXO and will be included in the transaction.</li>
     * <li><b>fromUTXO</b> - assets will be sent from the list of unspent UTXOs. Each of the UTXO will be included in the transaction.</li>
     * </ul>
     * In bitcoin-like blockchains, the transaction is created from the list of previously not spent UTXO. Every UTXO contains the number of funds, which can be spent.
     * When the UTXO enters into the transaction, the whole amount is included and must be spent. For example, address A receives 2 transactions, T1 with 1 LTC and T2 with 2 LTC.
     * The transaction, which will consume UTXOs for T1 and T2, will have available amount to spent 3 LTC = 1 LTC (T1) + 2 LTC(T2).<br/><br/>
     * There can be multiple recipients of the transactions, not only one. In the <b>to</b> section, every recipient address has it's corresponding amount.
     * When the amount of funds, that should receive the recipient is lower than the number of funds from the UTXOs, the difference is used as a transaction fee.<br/><br/>
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
    public static ltcTransferBlockchain(
        requestBody: (LtcTransactionAddress | LtcTransactionAddressKMS | LtcTransactionUTXO | LtcTransactionUTXOKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/litecoin/transaction`,
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
     * Broadcast signed Litecoin transaction
     * <h4>5 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Litecoin blockchain. This method is used internally from Tatum KMS, Tatum Middleware or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static ltcBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/litecoin/broadcast`,
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