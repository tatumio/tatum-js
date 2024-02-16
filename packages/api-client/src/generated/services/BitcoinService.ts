/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { BtcBasedBalance } from '../models/BtcBasedBalance';
import type { BtcBlock } from '../models/BtcBlock';
import type { BtcBlockHash } from '../models/BtcBlockHash';
import type { BtcGetTxByAddressBatch } from '../models/BtcGetTxByAddressBatch';
import type { BtcInfo } from '../models/BtcInfo';
import type { BtcTransactionFromAddress } from '../models/BtcTransactionFromAddress';
import type { BtcTransactionFromAddressKMS } from '../models/BtcTransactionFromAddressKMS';
import type { BtcTransactionFromUTXO } from '../models/BtcTransactionFromUTXO';
import type { BtcTransactionFromUTXOKMS } from '../models/BtcTransactionFromUTXOKMS';
import type { BtcTx } from '../models/BtcTx';
import type { BtcUTXO } from '../models/BtcUTXO';
import type { GeneratedAddressBtc } from '../models/GeneratedAddressBtc';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BitcoinService {

    /**
     * Generate a Bitcoin wallet
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. Because they can generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A mnemonic phrase consists of 24 special words in a defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Bitcoin wallet with derivation path m'/44'/0'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
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
     * Generate a Bitcoin address from the wallet's extended public key
     * <p><b>1 credit per API call</b></p>
     * <p>Generate a Bitcoin address from the extended public key of the wallet. The address is generated for the specific index - each extended public key can generate up to 2^32 addresses with the index starting from 0 up to 2^31 - 1.</p>
     *
     * @param xpub Extended public key of a wallet.
     * @param index Derivation index of the desired address to be generated.
     * @returns GeneratedAddressBtc OK
     * @throws ApiError
     */
    public static btcGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<GeneratedAddressBtc> {
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
     * Generate the private key for a Bitcoin address
     * <p><b>1 credit per API call</b></p>
     * <p>Generates a private key for an address from a mnemonic for a given derivation path index. The private key is generated for the specific index - each mnemonic can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
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
     * Get Bitcoin blockchain information
     * <p><b>1 credit per API call</b></p>
     * <p>Gets Bitcoin blockchain information. Obtains basic info like the testnet / mainnet version of the chain, the current block number and its hash.</p>
     *
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
     * Get the hash of a Bitcoin block
     * <p><b>1 credit per API call</b></p>
     * <p>Gets a Bitcoin block hash. Returns the hash of the block to get the block's details.</p>
     *
     * @param i The number of blocks preceding a particular block on a blockchain.
     * @returns BtcBlockHash OK
     * @throws ApiError
     */
    public static btcGetBlockHash(
        i: number,
    ): CancelablePromise<BtcBlockHash> {
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
     * Get a Bitcoin block by its hash or height
     * <p><b>1 credit per API call</b></p>
     * <p>Gets Bitcoin block detail by block hash or height.</p>
     *
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
     * Get the balance of a Bitcoin address
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of a Bitcoin address.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an error with the <code>403</code> response code.</p>
     *
     * @param address The blockchain address to get the balance for
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
     * Get the balance of multiple Bitcoin addresses
     * <p><b>50 credits per API call</b></p>
     * <p>Get the balance of multiple Bitcoin addresses, up to 30.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an error with the <code>403</code> response code.</p>
     *
     * @param addresses The blockchain addresses separated by comma to get the balances for
     * @returns BtcBasedBalance OK
     * @throws ApiError
     */
    public static btcGetBalanceOfAddressBatch(
        addresses: string,
    ): CancelablePromise<Array<BtcBasedBalance>> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/address/balance/batch`,
            query: {
                'addresses': addresses,
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
     * Get all transactions for a Bitcoin address
     * <p><b>1 credit per API call</b></p>
     * <p>Get all transactions for a Bitcoin address.</p>
     *
     * @param address Address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain the next page of data.
     * @param blockFrom Only show transactions after this block height.
     * @param blockTo Only show transactions before this block height.
     * @param txType Type of the transaction to fetch - either incoming, or outgoing. If none is present - all transactions are fetched.
     * @returns BtcTx OK
     * @throws ApiError
     */
    public static btcGetTxByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        blockFrom?: number,
        blockTo?: number,
        txType?: 'incoming' | 'outgoing',
    ): CancelablePromise<Array<BtcTx>> {
        return __request({
            method: 'GET',
            path: `/v3/bitcoin/transaction/address/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'blockFrom': blockFrom,
                'blockTo': blockTo,
                'txType': txType,
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
     * Get transactions for multiple Bitcoin addresses in a batch
     * <p><b>1 credit per address for each API call</b></p>
     * <p>Retrieve transactions for multiple Bitcoin addresses in a batch.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static btcGetTxByAddressBatch(
        requestBody?: BtcGetTxByAddressBatch,
    ): CancelablePromise<Array<{
        /**
         * Address
         */
        address?: string;
        /**
         * Transactions for address.
         */
        transactions?: Array<BtcTx>;
    }>> {
        return __request({
            method: 'POST',
            path: `/v3/bitcoin/transaction/address/batch`,
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
     * Send BTC to Bitcoin addresses
     * <p><b>2 credits per API call</b></p>
     * <p>Send BTC to blockchain addresses.</p>
     * <p>Bitcoin transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of BTC/satoshis that remains at a Bitcoin address after a cryptocurrency transaction involving this address has been performed. The UTXO can then be used as input for a new cryptocurrency transaction. For more information about Bitcoin transactions and UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin user documentation</a>. To check UTXOs in a transaction, see the <a href="#operation/BtcGetUTXO">API for getting information about a transaction output (UTXO) in a Bitcoin transaction</a>.</p>
     * <p>You can build a BTC transaction by one of the following methods:</p>
     * <ul>
     * <li><b>Sending BTC from blockchain addresses</b><br/>The assets are sent from a list of addresses. For each address, the last 100 transactions are scanned for any UTXO to be included in the transaction. For easier control over the assets to be sent, we recommend that you use this method only if you have one address to send the assets from.<br/> To use this method, use the <code>BtcTransactionFromAddress</code> or <code>BtcTransactionFromAddressKMS</code> schema of the request body.</li>
     * <li><b>Sending BTC from UTXOs</b><br/>The assets are sent from a list of UTXOs. Each UTXO is included in the transaction. Use this method if you want to manually calculate the amount to send.<br/> To use this method, use the <code>BtcTransactionFromUTXO</code> or <code>BtcTransactionFromUTXOKMS</code> schema of the request body.</li>
     * </ul>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and must be spent. For example, address A receives two transactions, T1 with 1 BTC and T2 with 2 BTC. A transaction that consumes the UTXOs from both T1 and T2 will have an available amount of 3 BTC to spend:<br/><code>1 BTC (from T1) + 2 BTC (from T2) = 3 BTC (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the UTXOs, the difference between these two amounts is by default used as the gas fee for the transaction. Because this amount may be considerable and you may not want to spend it all on the gas fee, you can explicitly specify the fee amount and the blockchain address where any extra funds remaining after covering the fee will be sent (the <code>fee</code> and <code>changeAddress</code> parameters in the request body, correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending BTC, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static btcTransferBlockchain(
        requestBody: (BtcTransactionFromAddress | BtcTransactionFromAddressKMS | BtcTransactionFromUTXO | BtcTransactionFromUTXOKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
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
     * Get a Bitcoin transaction by its hash
     * <p><b>1 credit per API call</b></p>
     * <p>Get Bitcoin Transaction detail by transaction hash.</p>
     *
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
     * Get information about a transaction output (UTXO) in a Bitcoin transaction
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about a transaction output in a transaction and check whether this output is a UTXO or has been spent.</p>
     * <p>"UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of BTC/satoshis that remains at a Bitcoin address after a cryptocurrency transaction involving this address has been performed. The UTXO can then be used as input for a new cryptocurrency transaction. For more information about Bitcoin transactions and UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin user documentation</a>.</p>
     * <ul>
     * <li>If the transaction output is an UTXO, the API returns data about it.</li>
     * <li>If the transaction output has been spent and there is no UTXO to return, the API returns an error with the <code>404</code> response code.</li>
     * </ul>
     *
     * @param hash The transaction hash
     * @param index The index of the transaction output that you want to check for the UTXO
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
     * Get transactions from the Bitcoin mempool
     * <p><b>1 credit per API call</b></p>
     * <p>Gets Bitcoin transaction IDs in the mempool.</p>
     *
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
     * Broadcast a signed Bitcoin transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcasts a signed transaction to the Bitcoin blockchain. This method is used internally from Tatum KMS or Tatum Client Libraries.
     * It is possible to create a custom signing mechanism and only use this method for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static btcBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
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

    /**
     * @deprecated
     * Connect to a Bitcoin node through an RPC driver
     * <p>This endpoint is deprecated. Do not use it.<br/>
     * Instead, use <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">this API</a>.</b></p><br/>
     * <p><b>2 credits per API call</b></p>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the node provided by Tatum.
     * To learn more about JSON RPC, visit the <a href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Bitcoin developers' guide</a>.</p>
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
            params?: Array<any>;
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

}