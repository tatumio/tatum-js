/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallEthSmartContractMethodCaller } from '../models/CallEthSmartContractMethodCaller';
import type { CallReadSmartContractMethod } from '../models/CallReadSmartContractMethod';
import type { CallSmartContractMethod } from '../models/CallSmartContractMethod';
import type { CallSmartContractMethodKMS } from '../models/CallSmartContractMethodKMS';
import type { Data } from '../models/Data';
import type { EthBalance } from '../models/EthBalance';
import type { EthBlock } from '../models/EthBlock';
import type { EthTestnetType } from '../models/EthTestnetType';
import type { EthTx } from '../models/EthTx';
import type { EthTxInternal } from '../models/EthTxInternal';
import type { GeneratedAddressEth } from '../models/GeneratedAddressEth';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferEthBlockchain } from '../models/TransferEthBlockchain';
import type { TransferEthBlockchainKMS } from '../models/TransferEthBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class EthereumService {

    /**
     * Generate Ethereum wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A mnemonic phrase consists of 24 special words in a defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value which should never be revealed</li><li>Public Key - a public address to be published</li><li>Derivation index - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification and generates for Ethereum wallets with the derivation path m/44'/60'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Ethereum wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generating extended public and private keys.
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static ethGenerateWallet(
        mnemonic?: string,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/wallet`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'mnemonic': mnemonic,
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
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
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns GeneratedAddressEth OK
     * @throws ApiError
     */
    public static ethGenerateAddress(
        xpub: string,
        index: number,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<GeneratedAddressEth> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/address/${xpub}/${index}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
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
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static ethGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/wallet/priv`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
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
     * @deprecated
     * Web3 HTTP driver
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Ethereum node provided by Tatum.
     * To learn more about Ethereum Web3, visit the <a href="https://ethereum.org/en/developers/" target="_blank">Ethereum developers' guide</a>.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static ethWeb3Driver(
        xApiKey: string,
        requestBody: any,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/web3/${xApiKey}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
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
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Ethereum block number. This is the number of the latest block in the blockchain.</p>
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns number OK
     * @throws ApiError
     */
    public static ethGetCurrentBlock(
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/block/current`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Ethereum block by hash
     * <h4>1 credit per API call.</h4><br/><p>Gets an Ethereum block-by-block hash or block number.</p>
     * @param hash Block hash or block number
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns EthBlock OK
     * @throws ApiError
     */
    public static ethGetBlock(
        hash: string,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<EthBlock> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/block/${hash}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the ETH balance of an Ethereum account
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>ETH</b> of an Ethereum account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress" target="_blank">fungible tokens (ERC-20)</a> and <a href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721" target="_blank">NFTs (ERC-721)</a>.</p>
     *
     * @param address Account address you want to get balance of
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns EthBalance OK
     * @throws ApiError
     */
    public static ethGetBalance(
        address: string,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<EthBalance> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/account/balance/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Ethereum Transaction
     * <p><b>1 credit per API call</b></p>
     * <p>Get Ethereum transaction by transaction hash.</p>
     *
     * @param hash Transaction hash
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns EthTx OK
     * @throws ApiError
     */
    public static ethGetTransaction(
        hash: string,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<EthTx> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/transaction/${hash}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Transaction not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
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
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns number OK
     * @throws ApiError
     */
    public static ethGetTransactionCount(
        address: string,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/transaction/count/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get Ethereum transactions by address
     * <p>This endpoint is deprecated. Do not use it.</p>
     * <p><h4>1 credit per API call.</h4></p>
     * <p>Get Ethereum transactions by address. This includes incoming and outgoing transactions for the address.</p>
     *
     * @param address Account address you want to get balance of
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwards will be included.
     * @param to Transactions up to this block will be included.
     * @param sort Sorting of the data. ASC - oldest first, DESC - newest first.
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-sepolia.
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
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send ETH or fungible tokens (ERC-20) from account to account
     * <p><b>2 credits per API call</b></p>
     * <p>Send ETH or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending ETH, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static ethBlockchainTransfer(
        requestBody: (TransferEthBlockchain | TransferEthBlockchainKMS),
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/transaction`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
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
     * Invoke a method in a smart contract on Ethereum
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Ethereum.</p>
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
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static ethBlockchainSmartContractInvocation(
        requestBody: (CallSmartContractMethod | CallReadSmartContractMethod | CallEthSmartContractMethodCaller | CallSmartContractMethodKMS),
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/smartcontract`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
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
     * Get Ethereum internal transactions by address
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get Ethereum internal transactions by address.<br/></p>
     *
     * @param address Account address you want to get balance of
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-sepolia.
     * @returns EthTxInternal OK
     * @throws ApiError
     */
    public static ethGetInternalTransactionByAddress(
        address: string,
        pageSize: number,
        offset?: number,
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
    ): CancelablePromise<Array<EthTxInternal>> {
        return __request({
            method: 'GET',
            path: `/v3/ethereum/account/transaction/internal/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'pageSize': pageSize,
                'offset': offset,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Broadcast signed Ethereum transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Ethereum blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @param testnetType Type of Ethereum testnet in query. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @param xTestnetType Type of Ethereum testnet in header. Defaults to ethereum-sepolia. For mainnet API Key, this value is ignored.
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static ethBroadcast(
        requestBody: BroadcastKMS,
        testnetType?: EthTestnetType,
        xTestnetType?: EthTestnetType,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/broadcast`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
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