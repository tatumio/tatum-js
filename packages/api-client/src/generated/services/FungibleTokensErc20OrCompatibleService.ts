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
     * Deploy a fungible token smart contract
     * <p><b>2 credits per API call</b></p>
     * <p>Deploy a fungible token smart contract on the blockchain. In a deployed smart contract, you can mint and burn fungible tokens. The whole supply of fungible tokens (the <code>supply</code> parameter in the request body) will be transferred to the specified blockchain address (the <code>address</code> parameter in the request body).<br/>
     * Smart contracts are standardized and audited.</p>
     * <p>You can deploy a fungible token smart contract on the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Solana</li>
     * <li>XinFin</li>
     * </ul>
     * <p>You can review the code of a deployed smart contract <a href="https://github.com/tatumio/tatum-middleware/blob/master/src/contracts/token.sol" target="_blank">here</a>.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When deploying a fungible token smart contract, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Deploy(
        requestBody: (ChainDeployErc20 | ChainDeploySolanaSpl | ChainDeployCeloErc20 | ChainDeployKcsErc20 | ChainDeployErc20KMS | ChainDeploySolanaSplKMS | ChainDeployCeloErc20KMS | ChainDeployKcsErc20KMS),
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
     * Mint fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Create new fungible tokens in the smart contract (the <code>contractAddress</code> parameter in the request body) and transfer them to the specified blockchain address (the <code>to</code> parameter in the request body). You can mint new fungible tokens only if the current supply of tokens in the smart contract is lower than the total supply set for this contract.</p>
     * <p>You can mint fungible tokens on the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>XinFin</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When minting fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Mint(
        requestBody: (ChainMintErc20 | ChainMintErc20KMS | ChainMintKcsErc20 | ChainMintKcsErc20KMS | ChainMintCeloErc20 | ChainMintCeloErc20KMS),
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
     * Burn fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Burn fungible tokens. Burning fungible tokens deletes the specified supply of the tokens (the <code>amount</code> parameter in the request body) from the smart contract (the <code>contractAddress</code> parameter in the request body).</p>
     * <p>You can burn fungible tokens on the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>XinFin</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When burning fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Burn(
        requestBody: (ChainBurnErc20 | ChainBurnErc20KMS | ChainBurnKcsErc20 | ChainBurnKcsErc20KMS | ChainBurnCeloErc20 | ChainBurnCeloErc20KMS),
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
     * Approve spending of fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Allow another blockchain address (the <code>spender</code> parameter in the request body) to spend and burn fungible tokens on behalf of the smart contract owner.</p>
     * <p>You can approve spending of fungible tokens on the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * </ul>
     * <p><b>Signing a transaction</b></p>
     * <p>When approving spending of fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Approve(
        requestBody: (ApproveErc20 | ApproveErc20KMS | ApproveCeloErc20 | ApproveCeloErc20KMS),
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
     * Transfer fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Transfer a supply of fungible tokens existing in the smart contract (the <code>contractAddress</code> parameter in the request body) to the specified blockchain address (the <code>to</code> parameter in the request body).<br/>
     * Transferring fungible tokens invokes the <code>transfer()</code> method.</p>
     * <p>You can transfer fungible tokens on the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Solana</li>
     * <li>XinFin</li>
     * </ul>
     * <p><b>Transferring on Algorand</b></p>
     * Before transferring fungible tokens on Algorand, make sure that the blockchain address receiving the tokens is ready. To get ready, the receiving blockchain address should transfer a zero (0) supply of fungible tokens to itself using the same API as you are using to transfer the fungible tokens to this address. The only difference is that the <code>fromPrivateKey</code> parameter in the request body should be set to the private key of the receiving address in this case.</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When transferring fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Transfer(
        requestBody: (ChainTransferEthErc20 | ChainTransferSolanaSpl | ChainTransferBscBep20 | ChainTransferCeloErc20Token | ChainTransferAlgoErc20 | ChainTransferKcsEthErc20 | ChainTransferEthErc20KMS | ChainTransferSolanaSplKMS | ChainTransferBscBep20KMS | ChainTransferCeloErc20TokenKMS | ChainTransferAlgoErc20KMS | ChainTransferKcsEthErc20KMS),
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
     * Get fungible token transactions for a blockchain address
     * <p><b>1 credit per API call</b></p>
     * <p>Get incoming and outgoing transactions related to fungible tokens for a blockchain address.</p>
     * <p>You can get the transactions for a blockchain address on the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Polygon</li>
     * </ul>
     *
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
        chain: 'CELO' | 'ALGO' | 'MATIC' | 'ETH',
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
     * Get the number of fungible tokens a blockchain address holds in a smart contract
     * <p><b>1 credit per API call</b></p>
     * <p>Get the number of fungible tokens that a blockchain address holds in the smart contract (the <code>contractAddress</code> parameter in the request body).</p>
     * <p>You can get the number of fungible tokens in the smart contract for a blockchain address on the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Elrond</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>Solana</li>
     * <li>TRON</li>
     * <li>XinFin</li>
     * </ul>
     *
     * @param chain Network name
     * @param address Account address you want to get balance of
     * @param contractAddress ERC20 contract address
     * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20GetBalance(
        chain: 'CELO' | 'ALGO' | 'MATIC' | 'ETH' | 'SOL' | 'TRON' | 'BSC' | 'XDC' | 'KLAY' | 'ONE' | 'EGLD' | 'KCS',
        address: string,
        contractAddress: string,
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
     * Get the fungible token smart contracts and the number of tokens for a blockchain address
     * <p><b>1 credit per API call</b></p>
     * <p>For a blockchain address, get the fungible token smart contracts where the address holds tokens and the number of the tokens that the address holds in each of those contracts.</p>
     * <p>You can get the fungible token smart contracts and the number of the tokens for a blockchain address on the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Polygon</li>
     * <li>Solana</li>
     * </ul>
     *
     * @param chain Network name
     * @param address Account address you want to get balance of
     * @returns any OK
     * @throws ApiError
     */
    public static erc20GetBalanceAddress(
        chain: 'CELO' | 'ETH' | 'MATIC' | 'SOL' | 'ALGO',
        address: string,
    ): CancelablePromise<Array<{
        /**
         * Contract address of the owned ERC20/SPL/ASA token
         */
        contractAddress?: string;
        /**
         * Number of ERC20/SPL/ASA tokens.
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