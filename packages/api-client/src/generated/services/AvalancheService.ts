/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvalancheBalance } from '../models/AvalancheBalance';
import type { AvalancheBlock } from '../models/AvalancheBlock';
import type { AvalancheTx } from '../models/AvalancheTx';
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallAvalancheSmartContractMethodCaller } from '../models/CallAvalancheSmartContractMethodCaller';
import type { CallReadSmartContractMethod } from '../models/CallReadSmartContractMethod';
import type { CallSmartContractMethod } from '../models/CallSmartContractMethod';
import type { CallSmartContractMethodKMS } from '../models/CallSmartContractMethodKMS';
import type { Data } from '../models/Data';
import type { GeneratedAddressAvalanche } from '../models/GeneratedAddressAvalanche';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferAvalancheBlockchain } from '../models/TransferAvalancheBlockchain';
import type { TransferAvalancheBlockchainKMS } from '../models/TransferAvalancheBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class AvalancheService {

    /**
     * Generate Avalanche wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. Because they can generate 2^31 addresses from 1 mnemonic phrase, they are very convenient and secure. A mnemonic phrase consists of 24 special words in a defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value which should never be revealed</li><li>Public Key - a public address to be published</li><li>Derivation index - an index of generated address</li></ul></p><p>Tatum follows the BIP44 specification and generates for Avalanche wallets with the derivation path m/44'/60'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generates a BIP44 compatible Avalanche wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generating extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static avalancheGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/avalanche/wallet`,
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
     * Generate Avalanche account address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates an Avalanche account deposit address from an Extended public key. The deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of the address to be generated.
     * @returns GeneratedAddressAvalanche OK
     * @throws ApiError
     */
    public static avalancheGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<GeneratedAddressAvalanche> {
        return __request({
            method: 'GET',
            path: `/v3/avalanche/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Avalanche private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generates the private key of an address from a mnemonic for a given derivation path index. The private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static avalancheGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/avalanche/wallet/priv`,
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
     * <p><b>2 credits per API call</b></p>
     * <p><b>This endpoint is deprecated. Use the <a href="https://apidoc.tatum.io/tag/Node-RPC" target="_blank">HTTP-based JSON RPC driver</a> instead.</b></p><br/>
     * <p>Use this endpoint URL as an http-based web3 driver to connect directly to the Avalanche node provided by Tatum.
     * To learn more about Avalanche Web3, visit the <a href="https://avalanche.network/" target="_blank">Avalanche developers' guide</a>.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static avalancheWeb3Driver(
        xApiKey: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/avalanche/web3/${xApiKey}`,
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
     * <h4>1 credit per API call.</h4><br/><p>Gets the current Avalanche block number. This is the number of the latest block in the blockchain.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static avalancheGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/avalanche/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Avalanche block by hash
     * <h4>1 credit per API call.</h4><br/><p>Gets an Avalanche block-by-block hash or block number.</p>
     * @param hash Block hash or block number
     * @returns AvalancheBlock OK
     * @throws ApiError
     */
    public static avalancheGetBlock(
        hash: string,
    ): CancelablePromise<AvalancheBlock> {
        return __request({
            method: 'GET',
            path: `/v3/avalanche/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the AVAX balance of an Avalanche account
     * <p><b>1 credit per API call</b></p>
     * <p>Get the balance of <b>AVAX</b> of an Avalanche account.</p>
     * <p>To get the balance of <b>tokens</b>, use the APIs for getting the balance of <a href="https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20GetBalanceAddress" target="_blank">fungible tokens (ERC-20)</a> and <a href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftGetTokensByAddressErc721" target="_blank">NFTs (ERC-721)</a>.</p>
     *
     * @param address Account address you want to get balance of
     * @returns AvalancheBalance OK
     * @throws ApiError
     */
    public static avalancheGetBalance(
        address: string,
    ): CancelablePromise<AvalancheBalance> {
        return __request({
            method: 'GET',
            path: `/v3/avalanche/account/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Avalanche Transaction
     * <p><b>1 credit per API call</b></p>
     * <p>Get Avalanche transaction by transaction hash.</p>
     *
     * @param hash Transaction hash
     * @returns AvalancheTx OK
     * @throws ApiError
     */
    public static avalancheGetTransaction(
        hash: string,
    ): CancelablePromise<AvalancheTx> {
        return __request({
            method: 'GET',
            path: `/v3/avalanche/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Transaction not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get count of outgoing Avalanche transactions
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Avalanche transactions for the address. When a transaction is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     * @param address address
     * @returns number OK
     * @throws ApiError
     */
    public static avalancheGetTransactionCount(
        address: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/avalanche/transaction/count/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send AVAX or fungible tokens (ERC-20) from account to account
     * <p><b>2 credits per API call</b></p>
     * <p>Send AVAX or Tatum-supported fungible tokens (ERC-20) from account to account.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> Sending the fungible tokens is supported only on the mainnet.</p>
     * <p><b>Signing a transaction</b><br/>
     * When sending AVAX, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static avalancheBlockchainTransfer(
        requestBody: (TransferAvalancheBlockchain | TransferAvalancheBlockchainKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/avalanche/transaction`,
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
     * Invoke a method in a smart contract on Avalanche
     * <p><b>2 credits per API call</b></p>
     * <p>Invoke a method in an existing smart contract on Avalanche.</p>
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
    public static avalancheBlockchainSmartContractInvocation(
        requestBody: (CallSmartContractMethod | CallReadSmartContractMethod | CallAvalancheSmartContractMethodCaller | CallSmartContractMethodKMS),
    ): CancelablePromise<(TransactionHash | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/avalanche/smartcontract`,
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
     * Broadcast signed Avalanche transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Broadcast signed transaction to Avalanche blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchain.</p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    public static avalancheBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHash> {
        return __request({
            method: 'POST',
            path: `/v3/avalanche/broadcast`,
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