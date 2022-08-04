/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApproveTransferCustodialWallet } from '../models/ApproveTransferCustodialWallet';
import type { ApproveTransferCustodialWalletCelo } from '../models/ApproveTransferCustodialWalletCelo';
import type { ApproveTransferCustodialWalletCeloKMS } from '../models/ApproveTransferCustodialWalletCeloKMS';
import type { ApproveTransferCustodialWalletKMS } from '../models/ApproveTransferCustodialWalletKMS';
import type { GenerateCustodialWallet } from '../models/GenerateCustodialWallet';
import type { GenerateCustodialWalletBatch } from '../models/GenerateCustodialWalletBatch';
import type { GenerateCustodialWalletBatchCelo } from '../models/GenerateCustodialWalletBatchCelo';
import type { GenerateCustodialWalletBatchCeloKMS } from '../models/GenerateCustodialWalletBatchCeloKMS';
import type { GenerateCustodialWalletBatchKMS } from '../models/GenerateCustodialWalletBatchKMS';
import type { GenerateCustodialWalletBatchPayer } from '../models/GenerateCustodialWalletBatchPayer';
import type { GenerateCustodialWalletBatchTron } from '../models/GenerateCustodialWalletBatchTron';
import type { GenerateCustodialWalletBatchTronKMS } from '../models/GenerateCustodialWalletBatchTronKMS';
import type { GenerateCustodialWalletCelo } from '../models/GenerateCustodialWalletCelo';
import type { GenerateCustodialWalletCeloKMS } from '../models/GenerateCustodialWalletCeloKMS';
import type { GenerateCustodialWalletKMS } from '../models/GenerateCustodialWalletKMS';
import type { GenerateCustodialWalletTron } from '../models/GenerateCustodialWalletTron';
import type { GenerateCustodialWalletTronKMS } from '../models/GenerateCustodialWalletTronKMS';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { TransferCustodialWallet } from '../models/TransferCustodialWallet';
import type { TransferCustodialWalletBatch } from '../models/TransferCustodialWalletBatch';
import type { TransferCustodialWalletBatchCelo } from '../models/TransferCustodialWalletBatchCelo';
import type { TransferCustodialWalletBatchCeloKMS } from '../models/TransferCustodialWalletBatchCeloKMS';
import type { TransferCustodialWalletBatchKMS } from '../models/TransferCustodialWalletBatchKMS';
import type { TransferCustodialWalletBatchTron } from '../models/TransferCustodialWalletBatchTron';
import type { TransferCustodialWalletBatchTronKMS } from '../models/TransferCustodialWalletBatchTronKMS';
import type { TransferCustodialWalletCelo } from '../models/TransferCustodialWalletCelo';
import type { TransferCustodialWalletCeloKMS } from '../models/TransferCustodialWalletCeloKMS';
import type { TransferCustodialWalletKMS } from '../models/TransferCustodialWalletKMS';
import type { TransferCustodialWalletTron } from '../models/TransferCustodialWalletTron';
import type { TransferCustodialWalletTronKMS } from '../models/TransferCustodialWalletTronKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class GasPumpService {

    /**
     * @deprecated
     * Generate custodial wallet address
     * <h4>2 credits per API call.</h4><br/>
     * <p>Generate new gas pump smart contract address on the blockchain. It's possible to enable tokens, which should be detected and supported on that address. This address enables custodial providers to
     * receive native assets, ERC20 / ERC721 / ERC1155 tokens on behalf of their customers on dedicated blockchain address, but in the same time it can initiate transfer of those assets away.
     * Gas required for the transfer from that address is going to be deducted from the providers address - the one, which was used to generate the address on the blockchain.<br/>
     * There are multiple options, how this address can be setup - it cannot be changed in the future:
     * <ul>
     * <li>Native assets only - ETH, BSC, CELO, MATIC, ONE, TRX</li>
     * <li>Native assets + ERC20 tokens</li>
     * <li>Native assets + ERC721 tokens</li>
     * <li>Native assets + ERC1155 tokens - TRON does not support 1155 standard</li>
     * <li>Native assets + ERC20 + ERC721 tokens</li>
     * <li>Native assets + ERC20 + ERC1155 tokens - TRON does not support 1155 standard</li>
     * <li>Native assets + ERC721 + ERC1155 tokens - TRON does not support 1155 standard</li>
     * <li>Native assets + ERC20 + ERC721 + ERC1155 tokens - TRON does not support 1155 standard</li>
     * </ul><br/>
     * All of these options could be enabled with a batch mode as well - in 1 transaction, it is possible to transfer multiple different assets from that address, e.g. ETH + USDC + ERC721 token.
     * Without batch mode, 3 separate transaction must have been performed.<br/>
     * This operation deploys a smart contract on the blockchain. More assets you will support, more intial gas will be used for address creation. Batch mode adds more gas for every type.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>TRON - without 1155</li>
     * <li>Polygon (Matic)</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static generateCustodialWallet(
        requestBody: (GenerateCustodialWallet | GenerateCustodialWalletKMS | GenerateCustodialWalletCelo | GenerateCustodialWalletCeloKMS | GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/sc/custodial`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Generate gas pump wallet address
     * <h4>2 credits per API call.</h4><br/>
     * <p>Generate new gas pump smart contract address on the blockchain. This address enables custodial providers to
     * receive native assets, ERC20 / ERC721 / ERC1155 tokens on behalf of their customers on dedicated blockchain address, but in the same time it can initiate transfer of those assets away.
     * Gas required for the transfer from that address is going to be deducted from the providers address - the one, which was used to generate the address on the blockchain.<br/>
     * This operation deploys a smart contract on the blockchain.<br/>
     * For paid plans, it is possible to pay for the gas costs - you don't have to provide private key or signatureId. Blockchain fees will be covered by your credits.
     * Supported blockchains:
     * <ul>
     * <li>Ethereum</li>
     * <li>Binance Smart Chain</li>
     * <li>Celo</li>
     * <li>Polygon (Matic)</li>
     * <li>Klaytn</li>
     * <li>Harmony.ONE</li>
     * <li>XDC Network (XinFin)</li>
     * <li>Tron</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-sepolia.
     * @returns any OK
     * @throws ApiError
     */
    public static generateCustodialWalletBatch(
        requestBody: (GenerateCustodialWalletBatchPayer | GenerateCustodialWalletBatch | GenerateCustodialWalletBatchKMS | GenerateCustodialWalletBatchCelo | GenerateCustodialWalletBatchCeloKMS | GenerateCustodialWalletBatchTron | GenerateCustodialWalletBatchTronKMS),
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/sc/custodial/batch`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Get gas pump addresses from transaction
     * <h4>1 credit per API call.</h4><br/><p>Get gas pump smart contract addresses from deploy transaction.</p>
     * @param chain Blockchain to work with
     * @param hash Transaction hash
     * @returns string OK
     * @throws ApiError
     */
    public static scGetCustodialAddresses(
        chain: 'CELO' | 'MATIC' | 'KLAY' | 'ETH' | 'ONE' | 'BSC' | 'TRON',
        hash: string,
    ): CancelablePromise<Array<string>> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/sc/custodial/${chain}/${hash}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Approve transfer of assets from gas pump wallet
     * <h4>2 credits per API call.</h4><br/>
     * <p>Approve transfer of assets from the gas pump smart contract wallet.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Klaytn</li>
     * <li>Celo</li>
     * <li>Harmony.ONE</li>
     * <li>XDC Network (XinFin)</li>
     * <li>Polygon (Matic)</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static approveTransferCustodialWallet(
        requestBody: (ApproveTransferCustodialWallet | ApproveTransferCustodialWalletKMS | ApproveTransferCustodialWalletCelo | ApproveTransferCustodialWalletCeloKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/sc/custodial/approve`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Transfer assets from gas pump wallet
     * <h4>2 credits per API call.</h4><br/>
     * <p>Transfer assets from the gas pump smart contract wallet. Originator of this transaction must be the address which created the address.
     * It's possible to transfer only 1 assets in 1 transaction.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>Ethereum</li>
     * <li>Klaytn</li>
     * <li>Celo</li>
     * <li>TRON</li>
     * <li>XDC Network (XinFin)</li>
     * <li>Polygon (Matic)</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static transferCustodialWallet(
        requestBody: (TransferCustodialWallet | TransferCustodialWalletKMS | TransferCustodialWalletCelo | TransferCustodialWalletCeloKMS | TransferCustodialWalletTron | TransferCustodialWalletTronKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/sc/custodial/transfer`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * Transfer multiple assets from gas pump wallet
     * <h4>2 credits per API call.</h4><br/>
     * <p>Transfer assets from the gas pump smart contract wallet. Originator of this transaction must be the address which created the address.
     * It's possible to transfer any amount of different assets in 1 transaction, if the wallet was generated with the batch option enabled.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Binance Smart Chain</li>
     * <li>Harmony.ONE</li>
     * <li>XDC Network (XinFin)</li>
     * <li>Ethereum</li>
     * <li>Klaytn</li>
     * <li>Celo</li>
     * <li>Tron</li>
     * <li>Polygon (Matic)</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static transferCustodialWalletBatch(
        requestBody: (TransferCustodialWalletBatch | TransferCustodialWalletBatchKMS | TransferCustodialWalletBatchCelo | TransferCustodialWalletBatchCeloKMS | TransferCustodialWalletBatchTron | TransferCustodialWalletBatchTronKMS),
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/sc/custodial/transfer/batch`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the required operation due to a logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}