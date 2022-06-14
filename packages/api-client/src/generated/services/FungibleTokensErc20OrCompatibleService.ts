/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApproveCeloErc20 } from '../models/ApproveCeloErc20';
import type { ApproveCeloErc20KMS } from '../models/ApproveCeloErc20KMS';
import type { ApproveErc20 } from '../models/ApproveErc20';
import type { ApproveErc20KMS } from '../models/ApproveErc20KMS';
import type { ChainBurnCeloErc20 } from '../models/ChainBurnCeloErc20';
import type { ChainBurnCeloErc20KMS } from '../models/ChainBurnCeloErc20KMS';
import type { ChainBurnErc20 } from '../models/ChainBurnErc20';
import type { ChainBurnErc20KMS } from '../models/ChainBurnErc20KMS';
import type { ChainBurnKcsErc20 } from '../models/ChainBurnKcsErc20';
import type { ChainBurnKcsErc20KMS } from '../models/ChainBurnKcsErc20KMS';
import type { ChainDeployCeloErc20 } from '../models/ChainDeployCeloErc20';
import type { ChainDeployCeloErc20KMS } from '../models/ChainDeployCeloErc20KMS';
import type { ChainDeployErc20 } from '../models/ChainDeployErc20';
import type { ChainDeployErc20KMS } from '../models/ChainDeployErc20KMS';
import type { ChainDeployKcsErc20 } from '../models/ChainDeployKcsErc20';
import type { ChainDeployKcsErc20KMS } from '../models/ChainDeployKcsErc20KMS';
import type { ChainDeploySolanaSpl } from '../models/ChainDeploySolanaSpl';
import type { ChainDeploySolanaSplKMS } from '../models/ChainDeploySolanaSplKMS';
import type { ChainMintCeloErc20 } from '../models/ChainMintCeloErc20';
import type { ChainMintCeloErc20KMS } from '../models/ChainMintCeloErc20KMS';
import type { ChainMintErc20 } from '../models/ChainMintErc20';
import type { ChainMintErc20KMS } from '../models/ChainMintErc20KMS';
import type { ChainMintKcsErc20 } from '../models/ChainMintKcsErc20';
import type { ChainMintKcsErc20KMS } from '../models/ChainMintKcsErc20KMS';
import type { ChainTransferAlgoErc20 } from '../models/ChainTransferAlgoErc20';
import type { ChainTransferAlgoErc20KMS } from '../models/ChainTransferAlgoErc20KMS';
import type { ChainTransferBscBep20 } from '../models/ChainTransferBscBep20';
import type { ChainTransferBscBep20KMS } from '../models/ChainTransferBscBep20KMS';
import type { ChainTransferCeloErc20Token } from '../models/ChainTransferCeloErc20Token';
import type { ChainTransferCeloErc20TokenKMS } from '../models/ChainTransferCeloErc20TokenKMS';
import type { ChainTransferEthErc20 } from '../models/ChainTransferEthErc20';
import type { ChainTransferEthErc20KMS } from '../models/ChainTransferEthErc20KMS';
import type { ChainTransferKcsEthErc20 } from '../models/ChainTransferKcsEthErc20';
import type { ChainTransferKcsEthErc20KMS } from '../models/ChainTransferKcsEthErc20KMS';
import type { ChainTransferSolanaSpl } from '../models/ChainTransferSolanaSpl';
import type { ChainTransferSolanaSplKMS } from '../models/ChainTransferSolanaSplKMS';
import type { FungibleTx } from '../models/FungibleTx';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FungibleTokensErc20OrCompatibleService {

    /**
     * Deploy ERC20 Smart Contract.
     * <p>Deploy ERC20 Smart Contract. This method creates new ERC20 (Fungible Tokens) Smart Contract on the blockchain. Smart contract is standardized and audited. It is possible to mint and burn tokens.
     * It is possible to see the code of the deployed contract <a href="https://github.com/tatumio/tatum-middleware/blob/master/src/contracts/token.sol" target="_blank">here</a>.
     * Whole predefined supply of the tokens will be transferred to the chosen address.
     * <br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Deploy(
        requestBody: (ChainDeployErc20 | ChainDeploySolanaSpl | ChainDeployCeloErc20 | ChainDeployKcsErc20 | ChainDeployErc20KMS | ChainDeploySolanaSplKMS | ChainDeployCeloErc20KMS | ChainDeployKcsErc20KMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/deploy`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Mint ERC20
     * <h4>2 credits per API call.</h4><br/>
     * <p>Create new ERC20 Fungible Tokens and transfer it to destination account. Tokens can be created only if current supply is lower then total supply. Create and transfer any ERC20 tokens from smart contract defined in contractAddress.
     * <br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Mint(
        requestBody: (ChainMintErc20 | ChainMintErc20KMS | ChainMintKcsErc20 | ChainMintKcsErc20KMS | ChainMintCeloErc20 | ChainMintCeloErc20KMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/mint`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Burn ERC20
     * <h4>2 credits per API call.</h4><br/>
     * <p>Burn ERC20 Fungible Tokens. This method destroys ERC20 tokens from smart contract defined in contractAddress.
     * <br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Burn(
        requestBody: (ChainBurnErc20 | ChainBurnErc20KMS | ChainBurnKcsErc20 | ChainBurnKcsErc20KMS | ChainBurnCeloErc20 | ChainBurnCeloErc20KMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/burn`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Approve spending of ERC20
     * <h4>2 credits per API call.</h4><br/>
     * <p>Approve ERC20 Fungible Tokens to be spendable by someone else. This method allows new address to transfer/burn ERC20 tokens on behalf of the owner.
     * <br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Approve(
        requestBody: (ApproveErc20 | ApproveErc20KMS | ApproveCeloErc20 | ApproveCeloErc20KMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/approve`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Transfer ERC20 Token
     * <h4>2 credits per API call.</h4><br/>
     * <p>Transfer ERC20 Fungible Tokens from account to account. Transfer any ERC20 tokens from smart contract defined in contractAddress. This method invokes ERC20 method transfer() to transfer tokens.
     * <br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * Algorand is unique a way that the receiving account should be ready before sending the FT(Erc20) asset.
     * To perform this, the receiving account should transfer the FT(Erc20) asset with 0 amount to itself.
     * During the process, it's using the same API as the main transaction: the only difference is that the "fromPrivateKey" should be the privateKey of the receiving account.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Transfer(
        requestBody: (ChainTransferEthErc20 | ChainTransferSolanaSpl | ChainTransferBscBep20 | ChainTransferCeloErc20Token | ChainTransferAlgoErc20 | ChainTransferKcsEthErc20 | ChainTransferEthErc20KMS | ChainTransferSolanaSplKMS | ChainTransferBscBep20KMS | ChainTransferCeloErc20TokenKMS | ChainTransferAlgoErc20KMS | ChainTransferKcsEthErc20KMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/transaction`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Get ERC20 transactions by address
     * <h4>1 credit per API call.</h4><br/><p>Get ERC20 transactions by address. This includes incoming and outgoing transactions for the address.</p>
     * @param chain Blockchain to work with
     * @param address Account address you want to get balance of
     * @param tokenAddress Address of the token smart contract
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwords will be included.
     * @param to Transactions up to this block will be included.
     * @param sort Sorting of the data. ASC - oldest first, DESC - newest first.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20GetTransactionByAddress(
        chain: 'CELO',
        address: string,
        tokenAddress: string,
        pageSize: number,
        offset?: number,
        from?: number,
        to?: number,
        sort: 'ASC' | 'DESC' = 'DESC',
    ): CancelablePromise<Array<FungibleTx>> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/token/transaction/${chain}/${address}/${tokenAddress}`,
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
     * Get ERC20 Account balance
     * <h4>1 credit per API call.</h4><br/><p>Get ERC20 Account balance. Returns number of tokens Account holds.</p>
     * @param chain Network name
     * @param address Account address you want to get balance of
     * @param contractAddress ERC20 contract address
     * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20GetBalance(
        chain: string,
        address: string,
        contractAddress: string,
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<{
        /**
         * Number of ERC20 tokens in smallest token unit. E.g. token has 10 decimal places, so data returned are 9*10^10.
         */
        balance?: string;
    }> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/token/balance/${chain}/${contractAddress}/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
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
     * Get ERC20 tokens by address
     * <h4>1 credit per API call.</h4><br/><p>Get ERC20 Account balance. Returns number of tokens Account holds.</p>
     * @param chain Network name
     * @param address Account address you want to get balance of
     * @returns any OK
     * @throws ApiError
     */
    public static erc20GetBalanceAddress(
        chain: 'CELO' | 'ETH' | 'MATIC',
        address: string,
    ): CancelablePromise<Array<{
        /**
         * Contract address of the owned ERC20 token
         */
        contractAddress?: string;
        /**
         * Number of ERC20 tokens.
         */
        balance?: string;
    }>> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/token/address/${chain}/${address}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}