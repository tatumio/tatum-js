/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApproveCeloErc20 } from '../models/ApproveCeloErc20';
import type { ApproveCeloErc20KMS } from '../models/ApproveCeloErc20KMS';
import type { ApproveErc20 } from '../models/ApproveErc20';
import type { ApproveErc20KMS } from '../models/ApproveErc20KMS';
import type { ChainBurnAlgoErc20 } from '../models/ChainBurnAlgoErc20';
import type { ChainBurnAlgoErc20KMS } from '../models/ChainBurnAlgoErc20KMS';
import type { ChainBurnCeloErc20 } from '../models/ChainBurnCeloErc20';
import type { ChainBurnCeloErc20KMS } from '../models/ChainBurnCeloErc20KMS';
import type { ChainBurnErc20 } from '../models/ChainBurnErc20';
import type { ChainBurnErc20KMS } from '../models/ChainBurnErc20KMS';
import type { ChainBurnKcsErc20 } from '../models/ChainBurnKcsErc20';
import type { ChainBurnKcsErc20KMS } from '../models/ChainBurnKcsErc20KMS';
import type { ChainDeployAlgoErc20 } from '../models/ChainDeployAlgoErc20';
import type { ChainDeployAlgoErc20KMS } from '../models/ChainDeployAlgoErc20KMS';
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
import type { Erc20Balance } from '../models/Erc20Balance';
import type { Erc20BalanceForAddress } from '../models/Erc20BalanceForAddress';
import type { FungibleTx } from '../models/FungibleTx';
import type { SignatureId } from '../models/SignatureId';
import type { TestnetType } from '../models/TestnetType';
import type { TransactionHash } from '../models/TransactionHash';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FungibleTokensErc20OrCompatibleService {

    /**
     * Deploy a fungible token smart contract
     * <p><b>2 credits per API call</b></p>
     * <p>Deploy a fungible token smart contract on the blockchain. In a deployed smart contract, you can mint and burn fungible tokens. The whole supply of fungible tokens (the <code>supply</code> parameter in the request body) will be transferred to the specified blockchain address (the <code>address</code> parameter in the request body).</p>
     * <p>Additionally, you can specify the number of additional digits for the token amounts using the <code>digits</code> parameter. Please note that the maximum value for the <code>supply</code> parameter with added digits is within the range of <code>uint64</code>.</p>
     * <p>Smart contracts are standardized and audited.</p>
     * <p>This API is supported for the following blockchains:</p>
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
     * <li>Flare</li>
     * <li>Cronos</li>
     * <li>Base</li>
     * <li>Avalanche</li>
     * <li>Optimism</li>
     * </ul>
     * <p>You can review the code of a deployed smart contract <a href="https://github.com/tatumio/tatum-middleware/blob/master/src/contracts/token.sol" target="_blank">here</a>.</p>
     * <p><b>Signing a transaction</b><br/>
     * When deploying a fungible token smart contract, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Deploy(
        requestBody: (ChainDeployErc20 | ChainDeploySolanaSpl | ChainDeployCeloErc20 | ChainDeployKcsErc20 | ChainDeployAlgoErc20 | ChainDeployErc20KMS | ChainDeploySolanaSplKMS | ChainDeployCeloErc20KMS | ChainDeployKcsErc20KMS | ChainDeployAlgoErc20KMS),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/deploy`,
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
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Mint fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Create new fungible tokens in the smart contract (the <code>contractAddress</code> parameter in the request body) and transfer them to the specified blockchain address (the <code>to</code> parameter in the request body). You can mint new fungible tokens only if the current supply of tokens in the smart contract is lower than the total supply set for this contract.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>XinFin</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * <li>Base</li>
     * <li>Avalanche</li>
     * <li>Optimism</li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When minting fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Mint(
        requestBody: (ChainMintErc20 | ChainMintErc20KMS | ChainMintKcsErc20 | ChainMintKcsErc20KMS | ChainMintCeloErc20 | ChainMintCeloErc20KMS),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/mint`,
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
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Burn fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Burn fungible tokens. Burning fungible tokens deletes the specified supply of the tokens (the <code>amount</code> parameter in the request body) from the smart contract (the <code>contractAddress</code> parameter in the request body).</p>
     * <p>This API is supported for the following blockchains:</p>
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
     * <li>Flare</li>
     * <li>Cronos</li>
     * <li>Base</li>
     * <li>Avalanche</li>
     * <li>Optimism</li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When burning fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Burn(
        requestBody: (ChainBurnErc20 | ChainBurnErc20KMS | ChainBurnKcsErc20 | ChainBurnKcsErc20KMS | ChainBurnCeloErc20 | ChainBurnCeloErc20KMS | ChainBurnAlgoErc20 | ChainBurnAlgoErc20KMS),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/burn`,
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
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Allow a blockchain address to transfer and burn fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Allow a blockchain address (the <code>spender</code> parameter in the request body) to transfer and burn fungible tokens on behalf of the smart contract owner.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * <li>Base</li>
     * <li>Avalanche</li>
     * <li>Optimism</li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When allowing a blockchain address to transfer and burn fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Approve(
        requestBody: (ApproveErc20 | ApproveErc20KMS | ApproveCeloErc20 | ApproveCeloErc20KMS),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/approve`,
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
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Transfer fungible tokens
     * <p><b>2 credits per API call</b></p>
     * <p>Transfer a supply of fungible tokens existing in the smart contract (the <code>contractAddress</code> parameter in the request body) to the specified blockchain address (the <code>to</code> parameter in the request body).<br/>
     * Transferring fungible tokens invokes the <code>transfer()</code> method.</p>
     * <p>This API is supported for the following blockchains:</p>
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
     * <li>Flare</li>
     * <li>Cronos</li>
     * <li>Base</li>
     * <li>Avalanche</li>
     * <li>Optimism</li>
     * </ul>
     * <p><b>Transferring fungible tokens on Algorand</b><br/>
     * On Algorand, the recipient has to agree in advance to receive your fungible tokens because Algorand charges users for storing the tokens on their addresses, and an Algorand blockchain address by default does not receive the tokens unless explicitly agreed. Before transferring the fungible tokens, make sure that the recipient <a href="https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset" target="_blank">has agreed to receive the NFT</a> to their address.</p>
     * <p><b>Blockchain-specific APIs to transfer fungible tokens</b><br/>
     * You can also use blockchain-specific APIs for transferring fungible tokens on the following blockchains:
     * <ul>
     * <li><a href="https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscBlockchainTransfer" target="_blank">BNB Smart Chain</a></li>
     * <li><a href="https://apidoc.tatum.io/tag/Celo#operation/CeloBlockchainTransfer" target="_blank">Celo</a></li>
     * <li><a href="https://apidoc.tatum.io/tag/Ethereum#operation/EthBlockchainTransfer" target="_blank">Ethereum</a></li>
     * <li><a href="https://apidoc.tatum.io/tag/Harmony#operation/OneBlockchainTransfer" target="_blank">Harmony</a></li>
     * <li><a href="https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainTransfer" target="_blank">KuCoin Community Chain</a></li>
     * <li><a href="https://apidoc.tatum.io/tag/Polygon#operation/PolygonBlockchainTransfer" target="_blank">Polygon</a></li>
     * <li><a href="https://apidoc.tatum.io/tag/XinFin#operation/XdcBlockchainTransfer" target="_blank">XinFin</a></li>
     * </ul>
     * <p><b>Signing a transaction</b><br/>
     * When transferring fungible tokens, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
     * <p>When transferring a token on Solana blockchain, this call waits for maximum 45 seconds to check whether the transaction was confirmed on chain. If the transaction was successfully added it returns a success response. Otherwise error is returned with a message:
     * "Transaction {##tx_hash##} has not been confirmed yet. The transaction could still be accepted by the Solana network. We advise to manually check if the transaction has been dropped or accepted before you try to send the transaction again".</p>
     *
     * @param requestBody
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns any OK
     * @throws ApiError
     */
    public static erc20Transfer(
        requestBody: (ChainTransferEthErc20 | ChainTransferSolanaSpl | ChainTransferBscBep20 | ChainTransferCeloErc20Token | ChainTransferAlgoErc20 | ChainTransferKcsEthErc20 | ChainTransferEthErc20KMS | ChainTransferSolanaSplKMS | ChainTransferBscBep20KMS | ChainTransferCeloErc20TokenKMS | ChainTransferAlgoErc20KMS | ChainTransferKcsEthErc20KMS),
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<(TransactionHash | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/token/transaction`,
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
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get fungible token transactions on a blockchain address
     * <p><b>1 credit per API call</b></p>
     * <p>Get incoming and outgoing transactions related to fungible tokens on a blockchain address.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Polygon</li>
     * </ul>
     *
     * @param chain The blockchain to work with
     * @param address Account address you want to get balance of
     * @param tokenAddress Address of the token smart contract (or asset id in case of ALGO)
     * @param pageSize Max number of items per page is 50.
     * @param offset Offset to obtain next page of the data.
     * @param from Transactions from this block onwards will be included.
     * @param to Transactions up to this block will be included.
     * @param sort Sorting of the data. ASC - oldest first, DESC - newest first.
     * @returns FungibleTx OK
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the number of fungible tokens that a blockchain address holds in a smart contract
     * <p><b>1 credit per API call</b></p>
     * <p>Get the number of the fungible tokens minted on a specific smart contract (the <code>contractAddress</code> path parameter in the request endpoint URL) that a blockchain address holds.</p>
     * <p>This API is supported for the following blockchains:</p>
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
     * <li>XinFin</li>
     * <li>Flare</li>
     * <li>Cronos</li>
     * <li>Base</li>
     * <li>Avalanche</li>
     * <li>Optimism</li>
     * </ul>
     *
     * @param chain Network name
     * @param address The blockchain address that you want to get the token balance of
     * @param contractAddress The address of the fungible token smart contract
     * @param testnetType Type of testnet in query. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @param xTestnetType Type of testnet in header. The default type is based on the currency: ethereum-sepolia for ETH, and flare-coston for FLR. This parameter is valid only for ETH or FLR invocations with a testnet API Key. For mainnet API Key, this value is ignored. The currency/chain must be specified to determine the applicable set of testnet types.
     * @returns Erc20Balance OK
     * @throws ApiError
     */
    public static erc20GetBalance(
        chain: 'CELO' | 'ALGO' | 'MATIC' | 'ETH' | 'BSC' | 'XDC' | 'KLAY' | 'ONE' | 'EGLD' | 'KCS' | 'SOL' | 'FLR' | 'CRO' | 'BASE' | 'AVAX',
        address: string,
        contractAddress: string,
        testnetType?: TestnetType,
        xTestnetType?: TestnetType,
    ): CancelablePromise<Erc20Balance> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/token/balance/${chain}/${contractAddress}/${address}`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            query: {
                'testnetType': testnetType,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get the total number of fungible tokens that a blockchain address holds
     * <p><b>1 credit per API call</b></p>
     * <p>Get the number of all fungible tokens that a blockchain address holds across a blockchain. The tokens are returned grouped by the smart contracts they were minted on.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Polygon</li>
     * <li>Solana</li>
     * </ul>
     *
     * @param chain Network name
     * @param address The blockchain address that you want to get the token balance of
     * @returns Erc20BalanceForAddress OK
     * @throws ApiError
     */
    public static erc20GetBalanceAddress(
        chain: 'CELO' | 'ETH' | 'MATIC' | 'SOL' | 'ALGO',
        address: string,
    ): CancelablePromise<Array<Erc20BalanceForAddress>> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/token/address/${chain}/${address}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}