/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BroadcastKMS } from '../models/BroadcastKMS';
import type { CallKcsSmartContractMethod } from '../models/CallKcsSmartContractMethod';
import type { CallKcsSmartContractMethodKMS } from '../models/CallKcsSmartContractMethodKMS';
import type { CallKcsSmartContractReadMethod } from '../models/CallKcsSmartContractReadMethod';
import type { Data } from '../models/Data';
import type { EthBlock } from '../models/EthBlock';
import type { KcsTx } from '../models/KcsTx';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { TransferKcsBlockchain } from '../models/TransferKcsBlockchain';
import type { TransferKcsBlockchainKMS } from '../models/TransferKcsBlockchainKMS';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class KuCoinService {

    /**
     * Generate Kcs wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Kcs wallet with derivation path m'/44'/966'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki">https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Kcs wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static kcsGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/kcs/wallet`,
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
     * Generate Kcs account address from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Kcs account deposit address from Extended public key. Deposit address is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static kcsGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Kcs address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/kcs/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Kcs private key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate private key of address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^31 private keys starting from index 0 until 2^31.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static kcsGenerateAddressPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/kcs/wallet/priv`,
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
     * <p>Use this endpoint URL as a http-based web3 driver to connect directly to the Kcs node provided by Tatum.
     * To learn more about Kcs Web3, please visit <a href="https://docs.kcc.io/" target="_blank">Kcs developer's guide.</a></p>
     * <br/><p><strong>This endpoint is deprecated</strong>, you should use <a href="#operation/NodeJsonPostRpcDriver">Blockchain/Node/RPC HTTP Driver</a></p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static kcsWeb3Driver(
        xApiKey: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/kcs/web3/${xApiKey}`,
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
     * <h4>1 credit per API call.</h4><br/><p>Get Kcs current block number. This is the number of the latest block in the blockchain.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static kcsGetCurrentBlock(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/kcs/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Kcs block by hash
     * <h4>1 credit per API call.</h4><br/><p>Get Kcs block by block hash or block number.</p>
     * @param hash Block hash or block number
     * @returns EthBlock OK
     * @throws ApiError
     */
    public static kcsGetBlock(
        hash: string,
    ): CancelablePromise<EthBlock> {
        return __request({
            method: 'GET',
            path: `/v3/kcs/block/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Kcs Account balance
     * <h4>1 credit per API call.</h4><br/><p>Get Kcs account balance in KCS. This method does not prints any balance of the ERC20 or ERC721 tokens on the account.</p>
     * @param address Account address you want to get balance of
     * @returns any OK
     * @throws ApiError
     */
    public static kcsGetBalance(
        address: string,
    ): CancelablePromise<{
        /**
         * Balance in KCS
         */
        balance?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/kcs/account/balance/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Kcs Transaction
     * <h4>2 credit per API call.</h4><br/><p>Get Kcs transaction by transaction hash.</p>
     * @param hash Transaction hash
     * @returns KcsTx OK
     * @throws ApiError
     */
    public static kcsGetTransaction(
        hash: string,
    ): CancelablePromise<KcsTx> {
        return __request({
            method: 'GET',
            path: `/v3/kcs/transaction/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get count of outgoing Kcs transactions
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get a number of outgoing Kcs transactions for the address. When a transaction is sent, there can be multiple outgoing transactions,
     * which are not yet processed by the blockchain. To distinguish between them, there is a counter called a nonce, which represents
     * the order of the transaction in the list of outgoing transactions.</p>
     *
     * @param address address
     * @returns number OK
     * @throws ApiError
     */
    public static kcsGetTransactionCount(
        address: string,
    ): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/kcs/transaction/count/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send KCS from account to account
     * <h4>2 credits per API call.</h4><br/>
     * <p>Send KCS from account to account.<br/><br/>
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
    public static kcsBlockchainTransfer(
        requestBody: (TransferKcsBlockchain | TransferKcsBlockchainKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/kcs/transaction`,
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
    public static kcsBlockchainSmartContractInvocation(
        requestBody: (CallKcsSmartContractReadMethod | CallKcsSmartContractMethod | CallKcsSmartContractMethodKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId | Data)> {
        return __request({
            method: 'POST',
            path: `/v3/kcs/smartcontract`,
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
     * Broadcast signed Kcs transaction
     * <h4>2 credits per API call.</h4><br/>
     * <p>Broadcast signed transaction to Kcs blockchain. This method is used internally from Tatum KMS or Tatum client libraries.
     * It is possible to create custom signing mechanism and use this method only for broadcasting data to the blockchian.</p>
     *
     * @param requestBody
     * @returns TransactionHashKMS OK
     * @throws ApiError
     */
    public static kcsBroadcast(
        requestBody: BroadcastKMS,
    ): CancelablePromise<TransactionHashKMS> {
        return __request({
            method: 'POST',
            path: `/v3/kcs/broadcast`,
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