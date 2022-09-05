/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdaAccount } from '../models/AdaAccount';
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
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class CardanoService {

    /**
     * @deprecated
     * Get Blockchain information
     * <p><b>Support for Cardano is deprecated.<br/>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/><h4>1 credit per API call.</h4><p>Gets Ada blockchain information. Obtains basic info like the testnet / mainnet version of the chain, the current block number and its hash.</p>
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
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Ada GraphQL
     * <p><b>Support for Cardano is deprecated.<br/>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/>
     * <p><b>100 credits per API call</b></p>
     * <p>Use this endpoint URL as an GraphQL to connect directly to the Ada node provided by Tatum. You can find full documentation on the <a target='_blank' href='https://github.com/input-output-hk/cardano-graphql'>Cardano GraphQL API</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static adaGraphQl(
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/ada/graphql`,
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
     * @deprecated
     * Generate Ada wallet
     * <p><b>Support for Cardano is deprecated.<br/>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Generate Ada deposit address from Extended public key
     * <p><b>Support for Cardano is deprecated.<br/>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Generate Ada private key
     * <p><b>Support for Cardano is deprecated.<br/>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get Block by hash or height
     * <p><b>Support for Cardano is deprecated.<br/>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/><h4>1 credit per API call.</h4><p>Gets Ada block detail by block hash or height.</p>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Block not found.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get transaction by hash
     * <p><b>Support for Cardano is deprecated.<br/>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/><h4>1 credit per API call.</h4><p>Get Ada Transaction detail by transaction hash.</p>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get transactions by address
     * <p><b>Support for Cardano is deprecated.<br/>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/><h4>1 credit per API call.</h4><p>Gets a Ada transaction by address.</p>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get UTXOs by address
     * <p><b>Support for Cardano is deprecated.<br/>You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/><h4>1 credit per API call.</h4><p>Gets a Ada UTXOs by address.</p>
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
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Send Ada to blockchain addresses
     * <p><b>Support for Cardano is deprecated.<br/>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/>
     * <h4>2 credits per API call.</h4>
     * <p>Send Ada to blockchain addresses. It is possible to build a blockchain transaction in 2 ways:
     * <ul>
     * <li><b>fromAddress</b> - assets will be sent from the list of addresses. For each of the addresses, the last 100 transactions will be scanned for any unspent UTXO to be included in the transaction.</li>
     * <li><b>fromUTXO</b> - assets will be sent from the list of unspent UTXOs. Each of the UTXOs will be included in the transaction.</li>
     * </ul>
     * In bitcoin-like blockchains, a transaction is created from the list of previously unspent UTXOs. Every UTXO contains the amount of funds that can be spent.
     * When the UTXO is entered into the transaction, the whole amount is included and must be spent. For example, address A receives 2 transactions, T1 with 1 ADA and T2 with 2 ADA.
     * The transaction, which will consume the UTXOs for T1 and T2, will have an available amount to spend of 3 ADA = 1 ADA (T1) + 2 ADA(T2).<br/><br/>
     * There can be multiple recipients of the transactions. In the <b>to</b> section, every recipient address has its own corresponding amount.
     * When the amount of funds that the recipient should receive is lower than the amount of funds from the UTXOs, the difference is split as transaction fee and change, which will be send to change address..<br/><br/>
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
    public static adaTransferBlockchain(
        requestBody: (AdaTransactionFromAddress | AdaTransactionFromAddressKMS | AdaTransactionFromUTXO | AdaTransactionFromUTXOKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/ada/transaction`,
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
     * Broadcast signed Ada transaction
     * <p><b>Support for Cardano is deprecated.<br/>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/>
     * <h4>2 credits per API call.</h4>
     * <p>Broadcasts a signed transaction to the Ada blockchain. This method is used internally from Tatum KMS, Tatum Middleware or Tatum Client Libraries.
     * It is possible to create a custom signing mechanism and only use this method for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static adaBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/ada/broadcast`,
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
     * Gets a Ada account by address
     * <p><b>Support for Cardano is deprecated.<br/>
     * You can work with Cardano by <a href="https://apidoc.tatum.io/tag/Node-RPC#operation/NodeJsonPostRpcDriver" target="_blank">connecting directly to a blockchain node provided by Tatum</a></b>.</p><br/>
     * <h4>2 credits per API call.</h4>
     * <p>Gets a Ada account by address.</p>
     *
     * @param address Address
     * @returns AdaAccount OK
     * @throws ApiError
     */
    public static adaGetAccount(
        address: string,
    ): CancelablePromise<Array<AdaAccount>> {
        return __request({
            method: 'GET',
            path: `/v3/ada/account/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}