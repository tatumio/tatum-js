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
import type { TransactionHash } from '../models/TransactionHash';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class LitecoinService {

    /**
     * Generate Litecoin wallet
     * <h4>5 credits per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Litecoin wallet with derivation path m'/44'/2'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki">https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Litecoin wallet.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.wallet.example.ts" target="_blank">Tatum LTC SDK</a>.
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
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Blockchain Information. Obtain basic info like testnet / mainnet version of the chain, current block number and it's hash.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.
     *
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
     * <h4>5 credits per API call.</h4><br/><p>Get Litecoin Block hash. Returns hash of the block to get the block detail.</p><br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.
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
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Block detail by block hash or height.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.
     *
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
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Transaction detail by transaction hash.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.'
     *
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
     * <h4>1 credit per API call.</h4>
     * <br/><p>Get Litecoin Transaction ids in the mempool.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.'
     *
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
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Transaction by address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.'
     *
     * @param address Address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param blockFrom Only show transactions after this block height.
     * @param blockTo Only show transactions before this block height.
     * @param txType Type of the transaction to fetch - either incoming, or outgoing. If none is present - all transactions are fetched.
     * @returns LtcTx OK
     * @throws ApiError
     */
    public static ltcGetTxByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        blockFrom?: number,
        blockTo?: number,
        txType?: 'incoming' | 'outgoing',
    ): CancelablePromise<Array<LtcTx>> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/transaction/address/${address}`,
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
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get the balance of a Litecoin address
     * <h4>5 credits per API call.</h4>
     * <br/><p>Get Litecoin Balance of the address.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.'
     *
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
     * Get the balance of multiple Litecoin addresses
     * <p><b>50 credits per API call</b></p>
     * <p>Get the balance of multiple Litecoin addresses, up to 30.</p>
     * <p>The API returns the balance only if the address has up to 50,000 UTXOs (Unspent Transaction Outputs). For an address with more than 50,000 UTXOs, the API returns an error with the <code>403</code> response code.</p>
     *
     * @param addresses The blockchain addresses separated by comma to get the balances for
     * @returns BtcBasedBalance OK
     * @throws ApiError
     */
    public static ltcGetBalanceOfAddressBatch(
        addresses: string,
    ): CancelablePromise<Array<BtcBasedBalance>> {
        return __request({
            method: 'GET',
            path: `/v3/litecoin/address/balance/batch`,
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
     * Get information about a transaction output (UTXO) in a Litecoin transaction
     * <p><b>5 credits per API call</b></p>
     * <p>Get information about a transaction output in a transaction and check whether this output is a UTXO or has been spent.</p>
     * <p>"UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of LTC that remains at a Litecoin address after a cryptocurrency transaction involving this address has been performed. The UTXO can then be used as input for a new cryptocurrency transaction. For more information the UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin user documentation</a>.</p>
     * <ul>
     * <li>If the transaction output is an UTXO, the API returns data about it.</li>
     * <li>If the transaction output has been spent and there is no UTXO to return, the API returns an error with the <code>404</code> response code.</li>
     * </ul>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.
     *
     * @param hash The transaction hash
     * @param index The index of the transaction output that you want to check for the UTXO
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
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.wallet.example.ts" target="_blank">Tatum LTC SDK</a>.
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
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.wallet.example.ts" target="_blank">Tatum LTC SDK</a>.
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
     * Send LTC to Litecoin addresses
     * <p><b>10 credits per API call</b></p>
     * <p>Send LTC to blockchain addresses.</p>
     * <p>Litecoin transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of LTC that remains at a Litecoin address after a cryptocurrency transaction involving this address has been performed. The UTXO can then be used as input for a new cryptocurrency transaction. For more information about the UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin user documentation</a>. To check UTXOs in a transaction, see the <a href="#operation/LtcGetUTXO">API for getting information about a transaction output (UTXO) in a Litecoin transaction</a>.</p>
     * <p>You can build a LTC transaction by one of the following methods:</p>
     * <ul>
     * <li><b>Sending LTC from blockchain addresses</b><br/>The assets are sent from a list of addresses. For each address, the last 100 transactions are scanned for any UTXO to be included in the transaction. For easier control over the assets to be sent, we recommend that you use this method only if you have one address to send the assets from.<br/> To use this method, use the <code>LtcTransactionAddress</code> or <code>LtcTransactionAddressKMS</code> schema of the request body.</li>
     * <li><b>Sending LTC from UTXOs</b><br/>The assets are sent from a list of UTXOs. Each UTXO is included in the transaction. Use this method if you want to manually calculate the amount to send.<br/> To use this method, use the <code>LtcTransactionFromUTXO</code> or <code>LtcTransactionFromUTXOKMS</code> schema of the request body.</li>
     * </ul>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and must be spent. For example, address A receives two transactions, T1 with 1 LTC and T2 with 2 LTC. A transaction that consumes the UTXOs from both T1 and T2 will have an available amount of 3 LTC to spend:<br/><code>1 LTC (from T1) + 2 LTC (from T2) = 3 LTC (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the UTXOs, the difference between these two amounts is by default used as the gas fee for the transaction. Because this amount may be considerable and you may not want to spend it all on the gas fee, you can explicitly specify the fee amount and the blockchain address where any extra funds remaining after covering the fee will be sent (the <code>fee</code> and <code>changeAddress</code> parameters in the request body, correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending LTC, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static ltcTransferBlockchain(
        requestBody: (LtcTransactionAddress | LtcTransactionAddressKMS | LtcTransactionUTXO | LtcTransactionUTXOKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
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
     * <p>Broadcast signed transaction to Litecoin blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     * <br />Examples of using this endpoint with the Tatum JS SDK can be found in <a href="https://github.com/tatumio/tatum-js/tree/v2/examples/ltc-example/src/app/ltc.blockchain.example.ts" target="_blank">Tatum LTC SDK</a>.
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static ltcBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
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