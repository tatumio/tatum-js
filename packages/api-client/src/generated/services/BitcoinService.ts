/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { BtcBasedBalance } from '../models/BtcBasedBalance';
import type { BtcBlock } from '../models/BtcBlock';
import type { BtcInfo } from '../models/BtcInfo';
import type { BtcTransactionFromAddress } from '../models/BtcTransactionFromAddress';
import type { BtcTransactionFromAddressKMS } from '../models/BtcTransactionFromAddressKMS';
import type { BtcTransactionFromUTXO } from '../models/BtcTransactionFromUTXO';
import type { BtcTransactionFromUTXOKMS } from '../models/BtcTransactionFromUTXOKMS';
import type { BtcTx } from '../models/BtcTx';
import type { BtcUTXO } from '../models/BtcUTXO';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BitcoinService {

    /**
     * Generate Bitcoin wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A mnemonic phrase consists of 24 special words in a defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Bitcoin wallet with derivation path m'/44'/0'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Bitcoin wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static btcGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/wallet`,
            query: {
                'mnemonic': mnemonic,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Bitcoin deposit address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates a Bitcoin deposit address from an Extended public key. The deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of a wallet.
     * @param index Derivation index of the desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static btcGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Bitcoin address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Bitcoin private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates a private key for an address from a mnemonic for a given derivation path index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static btcGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/bitcoin/wallet/priv`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
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
    public static btcRpcDriver(
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
            path: `/v3/bitcoin/node`,
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
     * Get Blockchain information
     * <h4>1 credit per API call.</h4><br/><p>Gets Bitcoin blockchain information. Obtains basic info like the testnet / mainnet version of the chain, the current block number and its hash.</p>
     * @returns BtcInfo OK
     * @throws ApiError
     */
    public static btcGetBlockChainInfo(): CancelablePromise<BtcInfo> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Block hash
     * <h4>1 credit per API call.</h4><br/><p>Gets a Bitcoin block hash. Returns the hash of the block to get the block's details.</p>
     * @param i The number of blocks preceding a particular block on a blockchain.
     * @returns any OK
     * @throws ApiError
     */
    public static btcGetBlockHash(
        i: number,
    ): CancelablePromise<{
        /**
         * Block hash
         */
        hash?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/block/hash/${i}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Block by hash or height
     * <h4>1 credit per API call.</h4><br/><p>Gets Bitcoin block detail by block hash or height.</p>
     * @param hash Block hash or height.
     * @returns BtcBlock OK
     * @throws ApiError
     */
    public static btcGetBlock(
        hash: string,
    ): CancelablePromise<BtcBlock> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Block not found.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get transaction by hash
     * <h4>1 credit per API call.</h4><br/><p>Get Bitcoin Transaction detail by transaction hash.</p>
     * @param hash Transaction hash
     * @returns BtcTx OK
     * @throws ApiError
     */
    public static btcGetRawTransaction(
        hash: string,
    ): CancelablePromise<BtcTx> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get mempool transactions
     * <h4>1 credit per API call.</h4><br/><p>Gets Bitcoin transaction IDs in the mempool.</p>
     * @returns string OK
     * @throws ApiError
     */
    public static btcGetMempool(): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/mempool`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get transactions by address
     * <h4>1 credit per API call.</h4><br/><p>Gets a Bitcoin transaction by address.</p>
     * @param address Address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain the next page of data.
     * @returns BtcTx OK
     * @throws ApiError
     */
    public static btcGetTxByAddress(
        address: string,
        pageSize: number,
        offset?: number,
    ): CancelablePromise<Array<BtcTx>> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/transaction/address/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get the balance of an address
     * <h4>1 credit per API call.</h4><br/><p>Gets the Bitcoin balance of the address.</p>
     * @param address Address
     * @returns BtcBasedBalance OK
     * @throws ApiError
     */
    public static btcGetBalanceOfAddress(
        address: string,
    ): CancelablePromise<BtcBasedBalance> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/address/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get UTXO of transaction
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get the UTXO of given transaction and output index. UTXO means Unspent Transaction Output, which in blockchain terminology means assets that a user
     * has received at a specific address and has not yet spent.<br/>
     * In bitcoin-like blockchains (BTC, LTC, DOGE, BCH), every transaction is built from a list of previously
     * unspent transactions connected to the address. If a user owns address A, and receives 10 BTC in transaction T1, they can spend
     * a UTXO T1 with a total value of 10 BTC in the next transaction. The user can spend multiple UTXOs from different addresses in one transaction.<br/>
     * If the UTXO is not spent, the data are returned, or a 404 error code is generated.</p>
     *
     * @param hash TX Hash
     * @param index Index of tx output to check if it has been spent or not
     * @returns BtcUTXO OK
     * @throws ApiError
     */
    public static btcGetUtxo(
        hash: string,
        index: number,
    ): CancelablePromise<BtcUTXO> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/utxo/${hash}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Send Bitcoin to blockchain addresses
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send Bitcoin to blockchain addresses. It is possible to build a blockchain transaction in 2 ways:
     * <ul>
     * <li><b>fromAddress</b> - assets will be sent from the list of addresses. For each of the addresses, the last 100 transactions will be scanned for any unspent UTXO to be included in the transaction.</li>
     * <li><b>fromUTXO</b> - assets will be sent from the list of unspent UTXOs. Each of the UTXOs will be included in the transaction.</li>
     * </ul>
     * In bitcoin-like blockchains, a transaction is created from the list of previously unspent UTXOs. Every UTXO contains the amount of funds that can be spent.
     * When the UTXO is entered into the transaction, the whole amount is included and must be spent. For example, address A receives 2 transactions, T1 with 1 BTC and T2 with 2 BTC.
     * The transaction, which will consume the UTXOs for T1 and T2, will have an available amount to spend of 3 BTC = 1 BTC (T1) + 2 BTC(T2).<br/><br/>
     * There can be multiple recipients of the transactions. In the <b>to</b> section, every recipient address has its own corresponding amount.
     * When the amount of funds that the recipient should receive is lower than the amount of funds from the UTXOs, the difference is used as a transaction fee.<br/><br/>
     * This operation requires the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send their private keys to the Internet because there is a strong possibility that they will be stolen and the funds will be lost. In this method, it is possible to enter a privateKey
     * or signatureId. The privateKey should be used only for quick development on testnet versions of blockchains when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used to ensure the highest level of security, and the signatureId should be present in the request.
     * Alternatively, it is also possible to use the Tatum Client Library for supported languages.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static btcTransferBlockchain(
        requestBody: (BtcTransactionFromAddress | BtcTransactionFromAddressKMS | BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/bitcoin/transaction`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Broadcast signed Bitcoin transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcasts a signed transaction to the Bitcoin blockchain. This method is used internally from Tatum KMS, Tatum Middleware or Tatum Client Libraries.
     * It is possible to create a custom signing mechanism and only use this method for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static btcBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/bitcoin/broadcast`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}