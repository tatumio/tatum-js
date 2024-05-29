/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallPolygonSmartContractMethod } from '../models/CallPolygonSmartContractMethod';
import type { CallPolygonSmartContractMethodCaller } from '../models/CallPolygonSmartContractMethodCaller';
import type { CallPolygonSmartContractMethodKMS } from '../models/CallPolygonSmartContractMethodKMS';
import type { CallPolygonSmartContractReadMethod } from '../models/CallPolygonSmartContractReadMethod';
import type { Data } from '../models/Data';
import type { GeneratedAddressMatic } from '../models/GeneratedAddressMatic';
import type { MaticBalance } from '../models/MaticBalance';
import type { PolygonBlock } from '../models/PolygonBlock';
import type { PolygonTx } from '../models/PolygonTx';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferPolygonBlockchain } from '../models/TransferPolygonBlockchain';
import type { TransferPolygonBlockchainKMS } from '../models/TransferPolygonBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class PolygonService {

    /**
     * Generate Polygon wallet
     * <b><p>1 credit per API call</p></b>
     * <p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Polygon wallet with derivation path m'/44'/966'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Polygon wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static polygonGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/wallet`,
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
     * Generate Polygon account address from Extended public key
     * <b><p>1 credit per API call</p></b>
     * <p>Generate Polygon account deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns GeneratedAddressMatic OK
     * @throws ApiError
     */
    public static polygonGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<GeneratedAddressMatic> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Polygon private key
     * <b><p>1 credit per API call</p></b>
     * <p>Generate private key of address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static polygonGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/polygon/wallet/priv`,
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
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Polygon node provided by Tatum.
     * To learn more about Polygon Web3, visit the <a href="https://docs.matic.network/" target="_blank">Polygon developer's guide</a>.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static polygonWeb3Driver(
        xApiKey: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/polygon/web3/${xApiKey}`,
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
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon current block number. This is the number of the latest block in the blockchain.</p>
     *
     * @returns number OK
     * @throws ApiError
     */
    public static polygonGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Polygon block by hash
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon block by block hash or block number.</p>
     *
     * @param hash Block hash or block number
     * @returns PolygonBlock OK
     * @throws ApiError
     */
    public static polygonGetBlock(
        hash: string,
    ): CancelablePromise<PolygonBlock> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/block/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Polygon Account balance
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon account balance in MATIC. This method does not prints any balance of the ERC20 or ERC721 tokens on the account.</p>
     *
     * @param address Account address you want to get balance of
     * @returns MaticBalance OK
     * @throws ApiError
     */
    public static polygonGetBalance(
        address: string,
    ): CancelablePromise<MaticBalance> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/account/balance/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Polygon Transaction
     * <b><p>2 credits per API call</p></b>
     * <p>Get Polygon transaction by transaction hash.</p>
     *
     * @param hash Transaction hash
     * @returns PolygonTx OK
     * @throws ApiError
     */
    public static polygonGetTransaction(
        hash: string,
    ): CancelablePromise<PolygonTx> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get Polygon transactions by address
     * <p>This endpoint is deprecated. Do not use it.</p>
     * <b><p>1 credit per API call</p></b>
     * <p>Get Polygon transactions by address. This includes incoming and outgoing transactions for the address.</p>
     *
     * @param address Account address you want to get balance of
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwards will be included.
     * @param to Transactions up to this block will be included.
     * @param sort Sorting of the data. ASC - oldest first, DESC - newest first.
     * @returns PolygonTx OK
     * @throws ApiError
     */
    public static polygonGetTransactionByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        from?: number,
        to?: number,
        sort: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<Array<PolygonTx>> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/account/transaction/${address}`,
            query: {
                'pageSize': pageSize,
                'offset': offset,
                'from': from,
                'to': to,
                'sort': sort,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get count of outgoing Polygon transactions
     * <b><p>1 credit per API call</p></b>
     * <p>Get a number of outgoing Polygon transactions for the address. When a transaction is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     * @param address address
     * @returns number OK
     * @throws ApiError
     */
    public static polygonGetTransactionCount(
        address: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/polygon/transaction/count/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send MATIC from account to account
     * <b><p>2 credits per API call</p></b>
     * <p>Send MATIC from account to account.<br/><br/>
     * <p><b>Signing a transaction</b></p>
     * <p>When sending MATIC, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static polygonBlockchainTransfer(
        requestBody: (TransferPolygonBlockchain | TransferPolygonBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/polygon/transaction`,
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
     * Invoke a method in a smart contract on Polygon
     * <b><p>2 credits per API call</p></b>
     * <p>Invoke a method in an existing smart contract on Polygon.</p>
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
     * <p>If <b>caller</b> field is present instead of the private key, Tatum will sign the transaction with the managed private key connected to the caller address. This is applicable only for paid mainnet plans and all testnet plans. Keep in mind that the caller address must have enough access right to perform the action in the smart contract method.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static polygonBlockchainSmartContractInvocation(
        requestBody: (CallPolygonSmartContractReadMethod | CallPolygonSmartContractMethod | CallPolygonSmartContractMethodCaller | CallPolygonSmartContractMethodKMS),
    ): CancelablePromise<(TransactionHash | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/polygon/smartcontract`,
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
     * Broadcast signed Polygon transaction
     * <b><p>2 credits per API call</p></b>
     * <p>Broadcast signed transaction to Polygon blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static polygonBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/polygon/broadcast`,
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