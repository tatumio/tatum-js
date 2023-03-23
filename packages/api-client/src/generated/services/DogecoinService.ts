/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { BtcBasedBalance } from '../models/BtcBasedBalance';
import type { DogeBlock } from '../models/DogeBlock';
import type { DogeInfo } from '../models/DogeInfo';
import type { DogeTransactionAddress } from '../models/DogeTransactionAddress';
import type { DogeTransactionAddressKMS } from '../models/DogeTransactionAddressKMS';
import type { DogeTransactionUTXO } from '../models/DogeTransactionUTXO';
import type { DogeTransactionUTXOKMS } from '../models/DogeTransactionUTXOKMS';
import type { DogeTx } from '../models/DogeTx';
import type { DogeTxByAddress } from '../models/DogeTxByAddress';
import type { DogeUTXO } from '../models/DogeUTXO';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
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
     * Get Dogecoin Transactions by address
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Dogecoin Transaction by address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/doge-example/src/app/doge.blockchain.example.ts" target="_blank">Tatum Dogecoin SDK</a>.'
     *
     * @param address Address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param txType Type of the transaction to fetch - either incoming, or outgoing. If none is present - all transactions are fetched.
     * @returns DogeTxByAddress OK
     * @throws ApiError
     */
    public static dogeGetTxByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        txType?: 'incoming' | 'outgoing',
    ): CancelablePromise<Array<DogeTxByAddress>> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/transaction/address/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'txType': txType,
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
     * Get the balance of a Dogecoin address
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Dogecoin Balance of the address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/doge-example/src/app/doge.blockchain.example.ts" target="_blank">Tatum Dogecoin SDK</a>.'
     *
     * @param address Address
     * @returns BtcBasedBalance OK
     * @throws ApiError
     */
    public static dogeGetBalanceOfAddress(
        address: string,
    ): CancelablePromise<BtcBasedBalance> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/address/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get the balance of multiple Dogecoin addresses
     * <p><b>50 credits per API call</b></p>
     * <p>Get the balance of multiple Dogecoin addresses, up to 30.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an error with the <code>403</code> response code.</p>
     *
     * @param addresses The blockchain addresses separated by comma to get the balances for
     * @returns BtcBasedBalance OK
     * @throws ApiError
     */
    public static dogeGetBalanceOfAddressBatch(
        addresses: string,
    ): CancelablePromise<Array<BtcBasedBalance>> {
        return __request({
            method: 'GET',
            path: `/v3/dogecoin/address/balance/batch`,
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
     * Get information about a transaction output (UTXO) in a Dogecoin transaction
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about a transaction output in a transaction and check whether this output is a UTXO or has been spent.</p>
     * <p>"UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of DOGE that remains at a Dogecoin address after a cryptocurrency transaction involving this address has been performed. The UTXO can then be used as input for a new cryptocurrency transaction. For more information about the UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin user documentation</a>.</p>
     * <ul>
     * <li>If the transaction output is an UTXO, the API returns data about it.</li>
     * <li>If the transaction output has been spent and there is no UTXO to return, the API returns an error with the <code>404</code> response code.</li>
     * </ul>
     *
     * @param hash The transaction hash
     * @param index The index of the transaction output that you want to check for the UTXO
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
     * Send DOGE to Dogecoin addresses
     * <p><b>2 credits per API call</b></p>
     * <p>Send DOGE to blockchain addresses.</p>
     * <p>Dogecoin transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of DOGE that remains at a Bitcoin Cash address after a cryptocurrency transaction involving this address has been performed. The UTXO can then be used as input for a new cryptocurrency transaction. For more information the UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin user documentation</a>. To check UTXOs in a transaction, see the <a href="#operation/DogeGetUTXO">API for getting information about a transaction output (UTXO) in a Dogecoin transaction</a></p>
     * <p>You build a DOGE transaction by sending DOGE from UTXOs. Each UTXO is included in the transaction.</p>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and must be spent. For example, address A receives two transactions, T1 with 1 DOGE and T2 with 2 DOGE. A transaction that consumes the UTXOs from both T1 and T2 will have an available amount of 3 DOGE to spend:<br/><code>1 DOGE (from T1) + 2 DOGE (from T2) = 3 DOGE (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the UTXOs, the difference between these two amounts is by default used as the gas fee for the transaction. Because this amount may be considerable and you may not want to spend it all on the gas fee, you can explicitly specify the fee amount and the blockchain address where any extra funds remaining after covering the fee will be sent (the <code>fee</code> and <code>changeAddress</code> parameters in the request body, correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending DOGE, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static dogeTransferBlockchain(
        requestBody: (DogeTransactionAddress | DogeTransactionAddressKMS | DogeTransactionUTXO | DogeTransactionUTXOKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
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
     * <p>Broadcast signed transaction to Dogecoin blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static dogeBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
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