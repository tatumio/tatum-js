/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallOneReadSmartContractMethod } from '../models/CallOneReadSmartContractMethod';
import type { CallOneSmartContractMethod } from '../models/CallOneSmartContractMethod';
import type { CallOneSmartContractMethodKMS } from '../models/CallOneSmartContractMethodKMS';
import type { Data } from '../models/Data';
import type { EthBlock } from '../models/EthBlock';
import type { GeneratedAddressOne } from '../models/GeneratedAddressOne';
import type { OneBalance } from '../models/OneBalance';
import type { OneBlockCurrent } from '../models/OneBlockCurrent';
import type { OneTx } from '../models/OneTx';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferOneBlockchain } from '../models/TransferOneBlockchain';
import type { TransferOneBlockchainKMS } from '../models/TransferOneBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class HarmonyService {

    /**
     * Generate ONE wallet
     * <p><b>1 credit per API call</b></p>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for ONE wallet with derivation path m'/44'/60'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate ONE account address from Extended public key
     * <p><b>1 credit per API call</b></p>
     * <p>Generate ONE account deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns GeneratedAddressOne OK
     * @throws ApiError
     */
    public static oneGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<GeneratedAddressOne> {
        return __request({
            method: 'GET',
            path: `/v3/one/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Transform HEX address to Bech32 ONE address format
     * <p><b>1 credit per API call</b></p>
     * <p>Transform HEX address to Bech32 format with one prefix.</p>
     *
     * @param address Address in HEX (ETH compatible) format.
     * @returns GeneratedAddressOne OK
     * @throws ApiError
     */
    public static oneFormatAddress(
        address: string,
    ): CancelablePromise<GeneratedAddressOne> {
        return __request({
            method: 'GET',
            path: `/v3/one/address/format/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate ONE private key
     * <p><b>1 credit per API call</b></p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Web3 HTTP driver
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the ONE node provided by Tatum.
     * To learn more about ONE Web3, visit the <a href="https://docs.harmony.one/home/developers/api" target="_blank">ONE developer's guide</a>.</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get current block number
     * <p><b>1 credit per API call</b></p>
     * <p>Get ONE current block number. This is the number of the latest block in the blockchain.</p>
     *
     * @returns OneBlockCurrent OK
     * @throws ApiError
     */
    public static oneGetCurrentBlock(): CancelablePromise<Array<OneBlockCurrent>> {
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
     * <p><b>1 credit per API call</b></p>
     * <p>Get ONE block by block hash or block number.</p>
     *
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get ONE Account balance
     * <p><b>1 credit per API call</b></p>
     * <p>Get ONE account balance in ONE. This method does not prints any balance of the HRM20 or HRM721 tokens on the account.</p>
     *
     * @param address Account address you want to get balance of
     * @param shardId Shard to read data from
     * @returns OneBalance OK
     * @throws ApiError
     */
    public static oneGetBalance(
        address: string,
        shardId?: number,
    ): CancelablePromise<OneBalance> {
        return __request({
            method: 'GET',
            path: `/v3/one/account/balance/${address}`,
            query: {
                'shardID': shardId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get ONE Transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get ONE transaction by transaction hash.</p>
     *
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get count of outgoing ONE transactions
     * <p><b>1 credit per API call</b></p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send ONE from account to account
     * <p><b>2 credits per API call</b></p>
     * <p>Send ONE from account to account.</p>
     * <p>The default shard <code>0</code> is used for the sender and the recipient.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending ONE, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     * @param requestBody
     * @param shardId Shard to read data from
     * @returns any OK
     * @throws ApiError
     */
    public static oneBlockchainTransfer(
        requestBody: (TransferOneBlockchain | TransferOneBlockchainKMS),
        shardId?: number,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/one/transaction`,
            query: {
                'shardID': shardId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Invoke a method in a smart contract on Harmony
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Harmony.</p>
     * <p>You can call a read-only or write method.</p>
     * <ul>
     * <li>For <b>read-only</b> methods, the output of the invoked method is returned.</li>
     * <li>For <b>write</b> methods, the ID of the associated transaction is returned.</li>
     * </ul>
     * <p><b>Troubleshooting a failed transaction</b><br/>
     * Tatum ensures that this API works against the blockchain (accesses the blockchain, finds the specified smart contract, and executes the specified ABI method with the provided parameters).<br/>However, because this API can be run against any smart contract on the blockchain, Tatum cannot in any way guarantee that the method itself will be executed successfully.</p>
     * <p>If you have issues with invoking the method, refer to the user documentation for this method, or contact the author of the smart contract.</p>
     * <p>For more information about invoking methods in smart contracts, see <a href="https://support.tatum.io/support/solutions/articles/80001052441" target="_blank">this article</a> on our Support Portal.</p>
     * <p><b>Signing a transaction</b><br/>
     * When invoking a method in a smart contract, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param shardId Shard to read data from
     * @returns any OK
     * @throws ApiError
     */
    public static oneBlockchainSmartContractInvocation(
        requestBody: (CallOneReadSmartContractMethod | CallOneSmartContractMethod | CallOneSmartContractMethodKMS),
        shardId?: number,
    ): CancelablePromise<(TransactionHash | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/one/smartcontract`,
            query: {
                'shardID': shardId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Broadcast signed ONE transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to ONE blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @param shardId Shard to read data from
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static oneBroadcast(
        requestBody: BroadcastKMS,
        shardId?: number,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/one/broadcast`,
            query: {
                'shardID': shardId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}