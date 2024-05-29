/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdaAccountBalance } from '../models/AdaAccountBalance';
import type { AdaBlock } from '../models/AdaBlock';
import type { AdaInfo } from '../models/AdaInfo';
import type { AdaTransactionFromAddress } from '../models/AdaTransactionFromAddress';
import type { AdaTransactionFromAddressKMS } from '../models/AdaTransactionFromAddressKMS';
import type { AdaTransactionFromUTXO } from '../models/AdaTransactionFromUTXO';
import type { AdaTransactionFromUTXOKMS } from '../models/AdaTransactionFromUTXOKMS';
import type { AdaTx } from '../models/AdaTx';
import type { AdaUTXO } from '../models/AdaUTXO';
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class CardanoService {

    /**
     * Get Blockchain information
     * <p><b>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets Ada blockchain information. Obtains basic info like the testnet / mainnet version of the chain, the current block number and its hash.</p>
     * @returns AdaInfo OK
     * @throws ApiError
     */
    public static adaGetBlockChainInfo(): CancelablePromise<AdaInfo> {
        return __request({
            method: 'GET',
            path: `/v3/ada/info`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Ada wallet
     * <p><b>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/>
     * <h4>1 credit per API call.</h4><p>Tatum supports BIP44 HD wallets. Because they can generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A mnemonic phrase consists of 24 special words in a defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for ADA wallet with derivation path m/1852'/1815'/0'. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Ada wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static adaGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/ada/wallet`,
            query: {
                'mnemonic': mnemonic,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Ada deposit address from Extended public key
     * <p><b>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/>
     * <h4>1 credit per API call.</h4>
     * <p>Generates a Ada deposit address from an Extended public key. The deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of a wallet.
     * @param index Derivation index of the desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static adaGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Ada address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/ada/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Ada private key
     * <p><b>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/>
     * <h4>1 credit per API call.</h4>
     * <p>Generates a private key for an address from a mnemonic for a given derivation path index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static adaGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/ada/wallet/priv`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Block by hash or height
     * <p><b>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets Ada block detail by block hash or height.</p>
     * @param hash Block hash or height.
     * @returns AdaBlock OK
     * @throws ApiError
     */
    public static adaGetBlock(
        hash: string,
    ): CancelablePromise<AdaBlock> {
        return __request({
            method: 'GET',
            path: `/v3/ada/block/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Block not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get transaction by hash
     * <p><b>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Get Ada Transaction detail by transaction hash.</p>
     * @param hash Transaction hash
     * @returns AdaTx OK
     * @throws ApiError
     */
    public static adaGetRawTransaction(
        hash: string,
    ): CancelablePromise<AdaTx> {
        return __request({
            method: 'GET',
            path: `/v3/ada/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get transactions by address
     * <p><b>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets a Ada transaction by address.</p>
     * @param address Address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain the next page of data.
     * @returns AdaTx OK
     * @throws ApiError
     */
    public static adaGetTxByAddress(
        address: string,
        pageSize: number,
        offset?: number,
    ): CancelablePromise<Array<AdaTx>> {
        return __request({
            method: 'GET',
            path: `/v3/ada/transaction/address/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get UTXOs by address
     * <p><b>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/><h4>1 credit per API call.</h4><p>Gets a Ada UTXOs by address.</p>
     * @param address Address
     * @returns AdaUTXO OK
     * @throws ApiError
     */
    public static adaGetUtxoByAddress(
        address: string,
    ): CancelablePromise<Array<AdaUTXO>> {
        return __request({
            method: 'GET',
            path: `/v3/ada/${address}/utxos`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send ADA to Cardano addresses
     * <p><b>2 credits per API call</b></p>
     * <p>Send ADA to blockchain addresses.</p>
     * <p>Cardano transactions are based on UTXOs. "UTXO" stands for "Unspent Transaction Output". A UTXO is the amount of ADA that remains at a Cardano address after a cryptocurrency transaction involving this address has been performed. The UTXO can then be used as input for a new cryptocurrency transaction. For more information about the UTXO, see the <a href="https://developer.bitcoin.org/devguide/transactions.html" target="_blank">Bitcoin user documentation</a>.</p>
     * <p>You can build an ADA transaction by one of the following methods:</p>
     * <ul>
     * <li><b>Sending ADA from blockchain addresses</b><br/>The assets are sent from a list of addresses. For each address, the last 100 transactions are scanned for any UTXO to be included in the transaction. For easier control over the assets to be sent, we recommend that you use this method only if you have one address to send the assets from.<br/> To use this method, use the <code>AdaTransactionFromAddress</code> or <code>AdaTransactionFromAddressKMS</code> schema of the request body.</li>
     * <li><b>Sending ADA from UTXOs</b><br/>The assets are sent from a list of UTXOs. Each UTXO is included in the transaction. Use this method if you want to manually calculate the amount to send.<br/> To use this method, use the <code>AdaTransactionFromUTXO</code> or <code>AdaTransactionFromUTXOKMS</code> schema of the request body.</li>
     * </ul>
     * <p>When an UTXO is entered into a transaction, the whole UTXO amount is included and must be spent. For example, address A receives two transactions, T1 with 1 ADA and T2 with 2 ADA. A transaction that consumes the UTXOs from both T1 and T2 will have an available amount of 3 ADA to spend:<br/><code>1 ADA (from T1) + 2 ADA (from T2) = 3 ADA (to spend in total)</code></p>
     * <p>You can send the assets to one or multiple recipients in one transaction. If you send the assets to multiple addresses, each address must have its own amount to receive.</p>
     * <p><b>Paying the gas fee and receiving the change</b><br/>
     * When the amount that the recipients should receive is lower than the amount from the UTXOs, the difference between these two amounts is by default used as the gas fee for the transaction. Because this amount may be considerable and you may not want to spend it all on the gas fee, you can explicitly specify the fee amount and the blockchain address where any extra funds remaining after covering the fee will be sent (the <code>fee</code> and <code>changeAddress</code> parameters in the request body, correspondingly).</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending ADA, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static adaTransferBlockchain(
        requestBody: (AdaTransactionFromAddress | AdaTransactionFromAddressKMS | AdaTransactionFromUTXO | AdaTransactionFromUTXOKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/ada/transaction`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Broadcast signed Ada transaction
     * <p><b>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/>
     * <h4>2 credits per API call.</h4>
     * <p>Broadcasts a signed transaction to the Ada blockchain. This method is used internally from Tatum KMS or Tatum Client Libraries.
     * It is possible to create a custom signing mechanism and only use this method for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static adaBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/ada/broadcast`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Gets a Ada account by address
     * <p><b>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a>.</b></p><br/>
     * <h4>2 credits per API call.</h4>
     * <p>Gets a Ada account by address.</p>
     *
     * @param address Address
     * @returns AdaAccountBalance OK
     * @throws ApiError
     */
    public static adaGetAccount(
        address: string,
    ): CancelablePromise<Array<AdaAccountBalance>> {
        return __request({
            method: 'GET',
            path: `/v3/ada/account/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}