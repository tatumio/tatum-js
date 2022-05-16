/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallReadSmartContractMethod } from '../models/CallReadSmartContractMethod';
import type { CallSmartContractMethod } from '../models/CallSmartContractMethod';
import type { CallSmartContractMethodKMS } from '../models/CallSmartContractMethodKMS';
import type { Data } from '../models/Data';
import type { EthBlock } from '../models/EthBlock';
import type { EthTx } from '../models/EthTx';
import type { EthTxInternal } from '../models/EthTxInternal';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { TransferEthBlockchain } from '../models/TransferEthBlockchain';
import type { TransferEthBlockchainKMS } from '../models/TransferEthBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class EthereumService {

    /**
     * Generate Ethereum wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A mnemonic phrase consists of 24 special words in a defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value which should never be revealed</li><li>Public Key - a public address to be published</li><li>Derivation index - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification and generates for Ethereum wallets with the derivation path m'/44'/60'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Ethereum wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generating extended public and private keys.
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static ethGenerateWallet(
        mnemonic?: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/wallet`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'mnemonic': mnemonic,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Ethereum account address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Ethereum account deposit address from an Extended public key. The deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of the address to be generated.
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns any OK
     * @throws ApiError
     */
    public static ethGenerateAddress(
        xpub: string,
        index: number,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<{
        /**
         * Ethereum address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/address/${xpub}/${index}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate Ethereum private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static ethGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/wallet/priv`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
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
     * Web3 HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Ethereum node provided by Tatum.
     * To learn more about Ethereum Web3, please visit <a href="https://ethereum.org/en/developers/" target="_blank">Ethereum developers' guide.</a></p>
     * <br/><p><strong>This endpoint is deprecated</strong>, you should use <a href="#operation/NodeJsonPostRpcDriver">Blockchain/Node/RPC HTTP Driver</a></p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @param testnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns any OK
     * @throws ApiError
     */
    public static ethWeb3Driver(
        xApiKey: string,
        requestBody: any,
        testnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/web3/${xApiKey}`,
            query: {
                'testnetType': testnetType,
            },
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
     * Get current block number
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Ethereum block number. This is the number of the latest block in the blockchain.</p>
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns number OK
     * @throws ApiError
     */
    public static ethGetCurrentBlock(
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/block/current`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Ethereum block by hash
     * <h4>1 credit per API call.</h4><br/><p>Gets an Ethereum block-by-block hash or block number.</p>
     * @param hash Block hash or block number
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns EthBlock OK
     * @throws ApiError
     */
    public static ethGetBlock(
        hash: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<EthBlock> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/block/${hash}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Ethereum account balance
     * <h4>1 credit per API call.</h4><br/><p>Gets an Ethereum account balance in ETH. This method does not display the balance of ERC20 or ERC721 tokens in the account.</p>
     * @param address Account address
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns any OK
     * @throws ApiError
     */
    public static ethGetBalance(
        address: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<{
        /**
         * Balance in ETH
         */
        balance?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/account/balance/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Ethereum Transaction
     * <h4>1 credit per API call.</h4><br/><p>Get Ethereum transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns EthTx OK
     * @throws ApiError
     */
    public static ethGetTransaction(
        hash: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<EthTx> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/transaction/${hash}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Transaction not found.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get count of outgoing Ethereum transactions
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Ethereum transactions for the address. When a transaction is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     * @param address address
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns number OK
     * @throws ApiError
     */
    public static ethGetTransactionCount(
        address: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/transaction/count/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get Ethereum transactions by address
     * <h4>1 credit per API call.</h4><br/><p>Get Ethereum transactions by address. This includes incoming and outgoing transactions for the address.</p>
     * @param address Account address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwords will be included.
     * @param to Transactions up to this block will be included.
     * @param sort Sorting of the data. ASC - oldest first, DESC - newest first.
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns EthTx OK
     * @throws ApiError
     */
    public static ethGetTransactionByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        from?: number,
        to?: number,
        sort: 'ASC' | 'DESC' = 'DESC',
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<Array<EthTx>> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/account/transaction/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
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
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Send Ethereum / ERC20 from account to account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send Ethereum or Tatum supported ERC20 token from account to account.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns any OK
     * @throws ApiError
     */
    public static ethBlockchainTransfer(
        requestBody: (TransferEthBlockchain | TransferEthBlockchainKMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/transaction`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
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
     * Invoke Smart Contract method
     * <h4>2 credits per API call.</h4><br/>
     * <p>Invoke any method on an existing Smart Contract. It is possibleto call read or write method on the Smsrt Contract defined via contractAddress.
     * For read operations, data is returned, for write operations, transaction Id of the associated transaction is returned.<br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns any OK
     * @throws ApiError
     */
    public static ethBlockchainSmartContractInvocation(
        requestBody: (CallSmartContractMethod | CallReadSmartContractMethod | CallSmartContractMethodKMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/smartcontract`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
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
     * Get Ethereum internal transactions by address
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Ethereum internal transactions by address.<br/></p>
     *
     * @param address Account address
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns EthTxInternal OK
     * @throws ApiError
     */
    public static ethGetInternalTransactionByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<Array<EthTxInternal>> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/account/transaction/erc20/internal/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Broadcast signed Ethereum transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Ethereum blockchain. This method is used internally from Tatum KMS, Tatum Middleware or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-ropsten.
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static ethBroadcast(
        requestBody: BroadcastKMS,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/broadcast`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
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