/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallCeloReadSmartContractMethod } from '../models/CallCeloReadSmartContractMethod';
import type { CallCeloSmartContractMethod } from '../models/CallCeloSmartContractMethod';
import type { CallCeloSmartContractMethodKMS } from '../models/CallCeloSmartContractMethodKMS';
import type { CeloBlock } from '../models/CeloBlock';
import type { CeloTx } from '../models/CeloTx';
import type { Data } from '../models/Data';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { TransferCeloBlockchain } from '../models/TransferCeloBlockchain';
import type { TransferCeloBlockchainKMS } from '../models/TransferCeloBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class CeloService {

    /**
     * Generate Celo wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Celo wallet with derivation path m'/44'/52752'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Celo wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static celoGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/celo/wallet`,
            query: {
                'mnemonic': mnemonic,
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
     * Generate Celo account address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Celo account deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static celoGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Celo address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/celo/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Celo private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate private key of address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static celoGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/celo/wallet/priv`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Web3 HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Celo node provided by Tatum.
     * To learn more about Celo Web3, please visit <a href="https://ethereum.org/en/developers/" target="_blank">Celo developer's guide.</a></p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static celoWeb3Driver(
        xApiKey: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/celo/web3/${xApiKey}`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get current block number
     * <h4>1 credit per API call.</h4><br/><p>Get Celo current block number. This is the number of the latest block in the blockchain.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static celoGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/celo/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Celo block by hash
     * <h4>1 credit per API call.</h4><br/><p>Get Celo block by block hash or block number.</p>
     * @param hash Block hash or block number
     * @returns CeloBlock OK
     * @throws ApiError
     */
    public static celoGetBlock(
        hash: string,
    ): CancelablePromise<CeloBlock> {
        return __request({
            method: 'GET',
            path: `/v3/celo/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Celo Account balance
     * <h4>1 credit per API call.</h4><br/><p>Get Celo account balance in ETH. This method does not prints any balance of the ERC20 or ERC721 tokens on the account.</p>
     * @param address Account address you want to get balance of
     * @returns any OK
     * @throws ApiError
     */
    public static celoGetBalance(
        address: string,
    ): CancelablePromise<{
        /**
         * Balance of Celo
         */
        celo?: string;
        /**
         * Balance of cUSD
         */
        cUsd?: string;
        /**
         * Balance of cEUR
         */
        cEur?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/celo/account/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Celo transactions by address
     * <h4>1 credit per API call.</h4><br/><p>Get Celo transactions by address. This includes incoming and outgoing transactions for the address.</p>
     * @param address Account address you want to get balance of
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwords will be included.
     * @param to Transactions up to this block will be included.
     * @param sort Sorting of the data. ASC - oldest first, DESC - newest first.
     * @returns CeloTx OK
     * @throws ApiError
     */
    public static celoGetTransactionByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        from?: number,
        to?: number,
        sort: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<Array<CeloTx>> {
        return __request({
            method: 'GET',
            path: `/v3/celo/account/transaction/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'from': from,
                'to': to,
                'sort': sort,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Celo Transaction
     * <h4>2 credit per API call.</h4><br/><p>Get Celo transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns CeloTx OK
     * @throws ApiError
     */
    public static celoGetTransaction(
        hash: string,
    ): CancelablePromise<CeloTx> {
        return __request({
            method: 'GET',
            path: `/v3/celo/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get count of outgoing Celo transactions
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Celo transactions for the address. When a transaction is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     * @param address address
     * @returns number OK
     * @throws ApiError
     */
    public static celoGetTransactionCount(
        address: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/celo/transaction/count/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send Celo / ERC20 from account to account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send Celo, cUSD or Tatum supported ERC20 token from account to account.<br/><br/>
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
    public static celoBlockchainTransfer(
        requestBody: (TransferCeloBlockchain | TransferCeloBlockchainKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/celo/transaction`,
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
     * Invoke Smart Contract method
     * <h4>2 credits per API call.</h4><br/>
     * <p>Invoke any method on an existing Smart Contract. It is possible to call read or write method on the Smart Contract defined via contractAddress.
     * For read operations, data is returned, for write operations, transaction Id of the associated transaction is returned.<br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static celoBlockchainSmartContractInvocation(
        requestBody: (CallCeloReadSmartContractMethod | CallCeloSmartContractMethod | CallCeloSmartContractMethodKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/celo/smartcontract`,
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
     * Broadcast signed Celo transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Celo blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static celoBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/celo/broadcast`,
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