/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallOneReadSmartContractMethod } from '../models/CallOneReadSmartContractMethod';
import type { CallOneSmartContractMethod } from '../models/CallOneSmartContractMethod';
import type { CallOneSmartContractMethodKMS } from '../models/CallOneSmartContractMethodKMS';
import type { Data } from '../models/Data';
import type { EthBlock } from '../models/EthBlock';
import type { OneTx } from '../models/OneTx';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { TransferOneBlockchain } from '../models/TransferOneBlockchain';
import type { TransferOneBlockchainKMS } from '../models/TransferOneBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class HarmonyService {

    /**
     * Generate ONE wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for ONE wallet with derivation path m'/44'/60'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible ONE wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static oneGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/one/wallet`,
            query: {
                'mnemonic': mnemonic,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate ONE account address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate ONE account deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static oneGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * ONE address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/one/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Transform HEX address to Bech32 ONE address format
     * <h4>1 credit per API call.</h4><br/>
     * <p>Transform HEX address to Bech32 format with one prefix.</p>
     *
     * @param address Address in HEX (ETH compatible) format.
     * @returns any OK
     * @throws ApiError
     */
    public static oneFormatAddress(
        address: string,
    ): CancelablePromise<{
        /**
         * ONE address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/one/address/format/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate ONE private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate private key of address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static oneGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/one/wallet/priv`,
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
     * @deprecated
     * Web3 HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the ONE node provided by Tatum.
     * To learn more about ONE Web3, please visit <a href="https://docs.harmony.one/home/developers/api" target="_blank">ONE developer's guide.</a></p>
     * <br/><p><strong>This endpoint is deprecated</strong>, you should use <a href="#operation/NodeJsonPostRpcDriver">Blockchain/Node/RPC HTTP Driver</a></p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @param shardId Shard to read data from
     * @returns any OK
     * @throws ApiError
     */
    public static oneWeb3Driver(
        xApiKey: string,
        requestBody: any,
        shardId?: number,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/one/web3/${xApiKey}`,
            query: {
                'shardID': shardId,
            },
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
     * <h4>1 credit per API call.</h4><br/><p>Get ONE current block number. This is the number of the latest block in the blockchain.</p>
     * @returns any OK
     * @throws ApiError
     */
    public static oneGetCurrentBlock(): CancelablePromise<Array<{
        /**
         * Shard ID
         */
        shardID?: number;
        /**
         * Current block number in this shard
         */
        blockNumber?: number;
    }>> {
        return __request({
            method: 'GET',
            path: `/v3/one/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get ONE block by hash
     * <h4>1 credit per API call.</h4><br/><p>Get ONE block by block hash or block number.</p>
     * @param hash Block hash or block number
     * @param shardId Shard to read data from
     * @returns EthBlock OK
     * @throws ApiError
     */
    public static oneGetBlock(
        hash: string,
        shardId?: number,
    ): CancelablePromise<EthBlock> {
        return __request({
            method: 'GET',
            path: `/v3/one/block/${hash}`,
            query: {
                'shardID': shardId,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get ONE Account balance
     * <h4>1 credit per API call.</h4><br/><p>Get ONE account balance in ONE. This method does not prints any balance of the HRM20 or HRM721 tokens on the account.</p>
     * @param address Account address you want to get balance of
     * @param shardId Shard to read data from
     * @returns any OK
     * @throws ApiError
     */
    public static oneGetBalance(
        address: string,
        shardId?: number,
    ): CancelablePromise<{
        /**
         * Balance in ONE
         */
        balance?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/one/account/balance/${address}`,
            query: {
                'shardID': shardId,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get ONE Transaction
     * <h4>2 credit per API call.</h4><br/><p>Get ONE transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @param shardId Shard to read data from
     * @returns OneTx OK
     * @throws ApiError
     */
    public static oneGetTransaction(
        hash: string,
        shardId?: number,
    ): CancelablePromise<OneTx> {
        return __request({
            method: 'GET',
            path: `/v3/one/transaction/${hash}`,
            query: {
                'shardID': shardId,
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
     * Get count of outgoing ONE transactions
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing ONE transactions for the address. When a transaction is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     * @param address address
     * @param shardId Shard to read data from
     * @returns number OK
     * @throws ApiError
     */
    public static oneGetTransactionCount(
        address: string,
        shardId?: number,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/one/transaction/count/${address}`,
            query: {
                'shardID': shardId,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send ONE / HRM20 from account to account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send ONE or Tatum supported HRM20 token from account to account.<br/><br/>
     * Default shard 0 is used for sender and recipient.<br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param shardId Shard to read data from
     * @returns any OK
     * @throws ApiError
     */
    public static oneBlockchainTransfer(
        requestBody: (TransferOneBlockchain | TransferOneBlockchainKMS),
        shardId?: number,
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/one/transaction`,
            query: {
                'shardID': shardId,
            },
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
     * Default shard 0 is used for this operation.<br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     * @param requestBody
     * @param shardId Shard to read data from
     * @returns any OK
     * @throws ApiError
     */
    public static oneBlockchainSmartContractInvocation(
        requestBody: (CallOneReadSmartContractMethod | CallOneSmartContractMethod | CallOneSmartContractMethodKMS),
        shardId?: number,
    ): CancelablePromise<(TransactionHashKMS | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/one/smartcontract`,
            query: {
                'shardID': shardId,
            },
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
     * Broadcast signed ONE transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to ONE blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @param shardId Shard to read data from
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static oneBroadcast(
        requestBody: BroadcastKMS,
        shardId?: number,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/one/broadcast`,
            query: {
                'shardID': shardId,
            },
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