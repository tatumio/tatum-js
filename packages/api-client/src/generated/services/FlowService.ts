/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FlowAccount } from '../models/FlowAccount';
import type { FlowAddPubKeyMnemonic } from '../models/FlowAddPubKeyMnemonic';
import type { FlowAddPubKeySecret } from '../models/FlowAddPubKeySecret';
import type { FlowAddPubKeySecretKMS } from '../models/FlowAddPubKeySecretKMS';
import type { FlowAddressXpub } from '../models/FlowAddressXpub';
import type { FlowBlock } from '../models/FlowBlock';
import type { FlowCreateAddressFromPubKeyKMS } from '../models/FlowCreateAddressFromPubKeyKMS';
import type { FlowCreateAddressFromPubKeyMnemonic } from '../models/FlowCreateAddressFromPubKeyMnemonic';
import type { FlowCreateAddressFromPubKeySecret } from '../models/FlowCreateAddressFromPubKeySecret';
import type { FlowCustomTransactionKMS } from '../models/FlowCustomTransactionKMS';
import type { FlowCustomTransactionMnemonic } from '../models/FlowCustomTransactionMnemonic';
import type { FlowCustomTransactionPK } from '../models/FlowCustomTransactionPK';
import type { FlowEvent } from '../models/FlowEvent';
import type { FlowTransactionKMS } from '../models/FlowTransactionKMS';
import type { FlowTransactionMnemonic } from '../models/FlowTransactionMnemonic';
import type { FlowTransactionPK } from '../models/FlowTransactionPK';
import type { FlowTx } from '../models/FlowTx';
import type { PrivKey } from '../models/PrivKey';
import type { PrivKeyRequest } from '../models/PrivKeyRequest';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { Wallet } from '../models/Wallet';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FlowService {

    /**
     * Generate Flow wallet
     * <h4>1 credit per API call.</h4><br/><p>Tatum supports BIP44 HD wallets. It is very convenient and secure, since it can generate 2^31 addresses from 1 mnemonic phrase. Mnemonic phrase consists of 24 special words in defined order and can restore access to all generated addresses and private keys.<br/>Each address is identified by 3 main values:<ul><li>Private Key - your secret value, which should never be revealed</li><li>Public Key - public address to be published</li><li>Derivation index - index of generated address</li></ul></p><p>Tatum follows BIP44 specification and generates for Dogecoin wallet with derivation path m'/44'/3'/0'/0. More about BIP44 HD wallets can be found here - <a target="_blank" href="https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki">https://github.com/litecoin/bips/blob/master/bip-0044.mediawiki</a>.
     * Generate BIP44 compatible Dogecoin wallet.</p>
     *
     * @param mnemonic Mnemonic to use for generation of extended public and private keys.
     * @returns Wallet OK
     * @throws ApiError
     */
    public static flowGenerateWallet(
        mnemonic?: string,
    ): CancelablePromise<Wallet> {
        return __request({
            method: 'GET',
            path: `/v3/flow/wallet`,
            query: {
                'mnemonic': mnemonic,
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
     * Generate Flow address from Extended public key
     * <h4>1 credit for GET operation + 300 credits per address.</h4><br/>
     * <p>Generate Flow address from Extended public key. This operation internally creates public key and assigns it to the newly created address on the blockchain.
     * There is minimal amount, which must be sent to the FLOW address during creation - 0.001 FLOW, which will be used from Tatum service account.<br/>
     * <b>This operation is allowed on any Testnet plan and only on Paid Mainnet plans.</b>
     * Public key is generated for the specific index - each extended public key can generate up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static flowGenerateAddress(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Flow address
         */
        address?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/flow/address/${xpub}/${index}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Flow public key from Extended public key
     * <h4>1 credit per API call.</h4><br/>
     * <p>Generate Flow public key from Extended public key. This key is added to the address on the blockchain and can control the funds there. Public key is generated for the specific index - each extended public key can generate
     * up to 2^31 addresses starting from index 0 until 2^31 - 1.</p>
     *
     * @param xpub Extended public key of wallet.
     * @param index Derivation index of desired address to be generated.
     * @returns any OK
     * @throws ApiError
     */
    public static flowGeneratePubKey(
        xpub: string,
        index: number,
    ): CancelablePromise<{
        /**
         * Flow public key
         */
        pubKey?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/flow/pubkey/${xpub}/${index}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Generate Flow private key
     * <h4>2 credits per API call.</h4><br/>
     * <p>Generate private key for address from mnemonic for given derivation path index. Private key is generated for the specific index - each mnemonic
     * can generate up to 2^32 private keys starting from index 0 until 2^31 - 1.</p>
     *
     * @param requestBody
     * @returns PrivKey OK
     * @throws ApiError
     */
    public static flowGeneratePubKeyPrivateKey(
        requestBody: PrivKeyRequest,
    ): CancelablePromise<PrivKey> {
        return __request({
            method: 'POST',
            path: `/v3/flow/wallet/priv`,
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
     * Get Flow current block number
     * <h4>1 credit per API call.</h4><br/><p>Get Flow current block number.</p>
     * @returns number OK
     * @throws ApiError
     */
    public static flowGetBlockChainInfo(): CancelablePromise<number> {
        return __request({
            method: 'GET',
            path: `/v3/flow/block/current`,
            errors: {
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Flow Block by hash or height
     * <h4>1 credit per API call.</h4><br/><p>Get Flow Block detail by block hash or height.</p>
     * @param hash Block hash or height.
     * @returns FlowBlock OK
     * @throws ApiError
     */
    public static flowGetBlock(
        hash: string,
    ): CancelablePromise<FlowBlock> {
        return __request({
            method: 'GET',
            path: `/v3/flow/block/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Block not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Flow events from blocks
     * <h4>1 credit per API call.</h4><br/><p>Get Flow events from block.</p>
     * @param type Event type to search for
     * @param from Block height to start searching
     * @param to Block height to end searching
     * @returns FlowEvent OK
     * @throws ApiError
     */
    public static flowGetBlockEvents(
        type: string,
        from: number,
        to: number,
    ): CancelablePromise<Array<FlowEvent>> {
        return __request({
            method: 'GET',
            path: `/v3/flow/block/events`,
            query: {
                'type': type,
                'from': from,
                'to': to,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                404: `Block not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get Flow Transaction by hash
     * <h4>1 credit per API call.</h4><br/><p>Get Flow Transaction detail by transaction hash.</p>
     * @param hash Transaction hash
     * @returns FlowTx OK
     * @throws ApiError
     */
    public static flowGetRawTransaction(
        hash: string,
    ): CancelablePromise<FlowTx> {
        return __request({
            method: 'GET',
            path: `/v3/flow/transaction/${hash}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the balance of a Flow account
     * <h4>1 credit per API call.</h4><br/><p>Get Flow account details.</p>
     * @param address Account address you want to get balance of
     * @returns FlowAccount OK
     * @throws ApiError
     */
    public static flowGetAccount(
        address: string,
    ): CancelablePromise<FlowAccount> {
        return __request({
            method: 'GET',
            path: `/v3/flow/account/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Send Flow to blockchain addresses
     * <h4>100 credits per API call.</h4><br/>
     * <p>Send Flow or FUSD to blockchain addresses. Tatum covers the fee connected to the transaction costs in subscription credits. This operation can be done on mainnet only for paid plans.<br/>
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
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
    public static flowTransferBlockchain(
        requestBody: (FlowTransactionMnemonic | FlowTransactionPK | FlowTransactionKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/flow/transaction`,
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
     * Send arbitrary transaction to blockchain
     * <h4>100 credits per API call.</h4><br/>
     * <p>Send arbitrary blockchain transaction to FLOW blockchain. Tatum covers the fee connected to the transaction costs in subscription credits. This operation can be done on mainnet only for paid plans.<br/>
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
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
    public static flowTransferCustomBlockchain(
        requestBody: (FlowCustomTransactionMnemonic | FlowCustomTransactionPK | FlowCustomTransactionKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/flow/transaction/custom`,
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
     * Create Flow address from public key
     * <h4>100 credits per API call. Tatum covers the fee connected to the transaction costs in subscription credits. This operation can be done on mainnet only for paid plans.</h4><br/>
     * <p>Create Flow blockchain addresses from public key. This will generate address on the blockchain with public key. Private key for that public key can be used for signing transaction.
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
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
    public static flowCreateAddressFromPubKey(
        requestBody: (FlowCreateAddressFromPubKeyMnemonic | FlowCreateAddressFromPubKeySecret | FlowCreateAddressFromPubKeyKMS),
    ): CancelablePromise<(FlowAddressXpub | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/flow/account`,
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
     * Add public key to Flow address
     * <h4>100 credits per API call. Tatum covers the fee connected to the transaction costs in subscription credits. This operation can be done on mainnet only for paid plans.</h4><br/>
     * <p>Add public key to existing Flow blockchain addresses. Private key for that public key can be used for signing transaction.
     * There are two possibilites how the transaction on the blockchain can be created:
     * <ul>
     * <li>Using mnemonic and index - private key is generated based on the index in the mnemonic.</li>
     * <li>Using secret - private keys is entered manually.</li>
     * </ul><br/><br/>
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
    public static flowAddPubKeyToAddress(
        requestBody: (FlowAddPubKeyMnemonic | FlowAddPubKeySecret | FlowAddPubKeySecretKMS),
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'PUT',
            path: `/v3/flow/account`,
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