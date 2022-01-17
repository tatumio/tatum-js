/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { PrivKeyScrypta } from '../models/PrivKeyScrypta';
import type { ScryptaBlock } from '../models/ScryptaBlock';
import type { ScryptaInfo } from '../models/ScryptaInfo';
import type { ScryptaTransaction } from '../models/ScryptaTransaction';
import type { ScryptaTx } from '../models/ScryptaTx';
import type { ScryptaUTXO } from '../models/ScryptaUTXO';
import type { ScryptaWallet } from '../models/ScryptaWallet';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainScryptaService {

    /**
     * Generate Scrypta wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Scrypta wallet with derivation path m'/44'/0'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Scrypta wallet.</p>
     *
     * @returns ScryptaWallet OK
     * @throws ApiError
     */
    public static generateScryptawallet(): CancelablePromise<ScryptaWallet> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/wallet`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Scrypta private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index. Private key is generated for the concrete index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31.</p>
     *
     * @param requestBody
     * @returns PrivKeyScrypta OK
     * @throws ApiError
     */
    public static generateScryptaprivatekey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKeyScrypta> {
        return __request({
            method: 'POST',
            path: `/v3/scrypta/wallet/priv`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Block hash
     * <h4>1 credit per API call.</h4><br/><p>Get Scrypta Block hash. Returns hash of the block to get the block detail.</p>
     * @param i The number of blocks preceding a particular block on a block chain.
     * @returns any OK
     * @throws ApiError
     */
    public static getScryptaBlockhash(
        i: string,
    ): CancelablePromise<{
        /**
         * Block hash
         */
        hash?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/block/hash/${i}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Block by hash or height
     * <h4>1 credit per API call.</h4><br/><p>Get Scrypta Block detail by block hash or height.</p>
     * @param hash Block hash or height.
     * @returns ScryptaBlock OK
     * @throws ApiError
     */
    public static getScryptaBlockbyhashorheight(
        hash: string,
    ): CancelablePromise<ScryptaBlock> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send LYRA to blockchain addresses
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send Scrypta to blockchain addresses. It is possible to build a blockchain transaction in 2 ways:
     * <ul>
     * <li><b>fromAddress</b> - assets will be sent from the list of addresses. For each of the addresses last 100 transactions will be scanned for any unspent UTXO and will be included in the transaction.</li>
     * <li><b>fromUTXO</b> - assets will be sent from the list of unspent UTXOs. Each of the UTXO will be included in the transaction.</li>
     * </ul>
     * In scrypta-like blockchains, the transaction is created from the list of previously not spent UTXO. Every UTXO contains the number of funds, which can be spent.
     * When the UTXO enters into the transaction, the whole amount is included and must be spent. For example, address A receives 2 transactions, T1 with 1 LYRA and T2 with 2 LYRA.
     * The transaction, which will consume UTXOs for T1 and T2, will have available amount to spent 3 LYRA = 1 LYRA (T1) + 2 LYRA(T2).<br/><br/>
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
    public static sendLyrAtoblockchainaddresses(
        requestBody: ScryptaTransaction,
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/scrypta/transaction`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Scrypta Transaction by hash
     * <h4>1 credit per API call.</h4><br/><p>Get Scrypta Transaction detail by transaction hash.</p>
     * @param hash Transaction hash
     * @returns ScryptaTx OK
     * @throws ApiError
     */
    public static getScryptaTransactionbyhash(
        hash: string,
    ): CancelablePromise<ScryptaTx> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Transactions by address
     * <h4>1 credit per API call.</h4><br/><p>Get Scrypta Transactions by address.</p>
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param address Address
     * @returns ScryptaTx OK
     * @throws ApiError
     */
    public static getScryptaTransactionsbyaddress(
        pageSize: number,
        offset: number,
        address: string,
    ): CancelablePromise<Array<ScryptaTx>> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/transaction/address/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Scrypta spendable UTXO
     * <h4>1 credit per API call.</h4><br/><p>Get Scrypta spendable UTXO.</p>
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param address Address
     * @returns ScryptaUTXO OK
     * @throws ApiError
     */
    public static getScryptaspendableUtxo(
        pageSize: number,
        offset: number,
        address: string,
    ): CancelablePromise<Array<ScryptaUTXO>> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/utxo/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get UTXO of Transaction
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get UTXO of given transaction and output index. UTXO means Unspent Transaction Output, which is in blockchain terminology assets, that user
     * received on the concrete address and does not spend it yet.<br/>
     * In scrypta-like blockchains (LYRA, LTC, BCH), every transaction is built from the list of previously
     * not spent transactions connected to the address. If user owns address A, receives in transaciont T1 10 LYRA, he can spend in the next transaction
     * UTXO T1 of total value 10 LYRA. User can spend multiple UTXOs from different addresses in 1 transaction.<br/>
     * If UTXO is not spent, data are returned, otherwise 404 error code.</p>
     *
     * @param hash TX Hash
     * @param index Index of tx output to check if spent or not
     * @returns ScryptaUTXO OK
     * @throws ApiError
     */
    public static getScryptaUtxOofTransaction(
        hash: string,
        index: string,
    ): CancelablePromise<ScryptaUTXO> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/utxo/${hash}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Scrypta deposit address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Scrypta deposit address from Extended public key. Deposit address is generated for the concrete index - each extended public key can generate
     * up to 2^32 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static generateScryptadepositaddressfromExtendedpublickey(
        xpub: string,
        index: string,
    ): CancelablePromise<{
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Blockchain Information
     * <h4>1 credit per API call.</h4><br/><p>Get Scrypta Blockchain Information. Obtain basic info like testnet / mainent version of the chain, current block number and it's hash.</p>
     * @returns ScryptaInfo OK
     * @throws ApiError
     */
    public static getScryptaBlockchainInformation(): CancelablePromise<ScryptaInfo> {
        return __request({
            method: 'GET',
            path: `/v3/scrypta/info`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Broadcast signed Scrypta transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Scrypta blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static broadcastsignedScryptatransaction(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/scrypta/broadcast`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}