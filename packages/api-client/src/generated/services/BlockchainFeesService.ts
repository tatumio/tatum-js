/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BscEstimateGas } from '../models/BscEstimateGas';
import type { CeloEstimateGas } from '../models/CeloEstimateGas';
import type { EstimateFee } from '../models/EstimateFee';
import type { EstimateFeeBatchMintNft } from '../models/EstimateFeeBatchMintNft';
import type { EstimateFeeDeployCustodialWallet } from '../models/EstimateFeeDeployCustodialWallet';
import type { EstimateFeeFromAddress } from '../models/EstimateFeeFromAddress';
import type { EstimateFeeFromUTXO } from '../models/EstimateFeeFromUTXO';
import type { EstimateFeeTransferFromCustodial } from '../models/EstimateFeeTransferFromCustodial';
import type { EthEstimateGas } from '../models/EthEstimateGas';
import type { EthEstimateGasArray } from '../models/EthEstimateGasArray';
import type { EthGasEstimation } from '../models/EthGasEstimation';
import type { EthGasEstimationBatch } from '../models/EthGasEstimationBatch';
import type { FeeBtc } from '../models/FeeBtc';
import type { FeeETH } from '../models/FeeETH';
import type { KcsEstimateGas } from '../models/KcsEstimateGas';
import type { KlaytnEstimateGas } from '../models/KlaytnEstimateGas';
import type { OneEstimateGas } from '../models/OneEstimateGas';
import type { PolygonEstimateGas } from '../models/PolygonEstimateGas';
import type { TransactionFeeEgldBlockchain } from '../models/TransactionFeeEgldBlockchain';
import type { VetEstimateGas } from '../models/VetEstimateGas';
import type { XdcEstimateGas } from '../models/XdcEstimateGas';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class BlockchainFeesService {

    /**
     * Estimate the fee for a transaction
     * <h4>10 credits per API call.</h4><br/>
     * <p>Estimate current transaction fee for different operations.<br/>
     * Supported blockchains:
     * <ul>
     * <li>Bitcoin</li>
     * <li>Litecoin</li>
     * <li>Harmony.ONE</li>
     * <li>The XDC Network</li>
     * <li>Ethereum</li>
     * <li>Celo</li>
     * <li>Klaytn</li>
     * <li>Binance Smart Chain</li>
     * <li>Polygon</li>
     * </ul>
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static estimateFeeBlockchain(
        requestBody: (EstimateFee | EstimateFeeBatchMintNft | EstimateFeeDeployCustodialWallet | EstimateFeeTransferFromCustodial | EstimateFeeFromAddress | EstimateFeeFromUTXO),
    ): CancelablePromise<(FeeBtc | FeeETH)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/estimate`,
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
     * Estimate Ethereum transaction fees
     * <h4>10 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the Ethereum transaction. Gas price is obtained from multiple sources + calculated based on the latest N blocks and the current mempool state. The <b>fast</b> one is used by default.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-sepolia.
     * @returns EthGasEstimation OK
     * @throws ApiError
     */
    public static ethEstimateGas(
        requestBody: EthEstimateGas,
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
    ): CancelablePromise<EthGasEstimation> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/gas`,
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
     * Estimate multiple Ethereum transaction fees
     * <h4>10 credits per API call + 10 credits per each gas estimation.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the Ethereum transaction. Gas price is obtained from multiple sources + calculated based on the latest N blocks and the current mempool state.
     * The <b>fast</b> one is used by default.<br/>
     * Result is calculated  in the order of the request array items.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-sepolia.
     * @returns EthGasEstimationBatch OK
     * @throws ApiError
     */
    public static ethEstimateGasBatch(
        requestBody: EthEstimateGasArray,
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
    ): CancelablePromise<EthGasEstimationBatch> {
        return __request({
            method: 'POST',
            path: `/v3/ethereum/gas/batch`,
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
     * Estimate Polygon transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the Polygon transaction. Gas price is obtained from <a href="https://gasstation-mainnet.matic.network/" target="_blank">https://gasstation-mainnet.matic.network/</a>.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static polygonEstimateGas(
        requestBody: PolygonEstimateGas,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in wei.
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/polygon/gas`,
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
     * Estimate Celo Chain transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the CELO transaction. Gas price is obtained from <a href="https://explorer.bitquery.io/celo_rc1/gas" target="_blank">https://explorer.bitquery.io/celo_rc1/gas</a>.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static celoEstimateGas(
        requestBody: CeloEstimateGas,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: number;
        /**
         * Gas price in wei.
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/celo/gas`,
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
     * Estimate BNB Smart Chain transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the BSC transaction. Gas price is obtained from <a href="https://explorer.bitquery.io/bsc/gas" target="_blank">https://explorer.bitquery.io/bsc/gas</a>.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static bscEstimateGas(
        requestBody: BscEstimateGas,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in wei.
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/bsc/gas`,
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
     * Estimate Harmony transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the ONE transaction.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static oneEstimateGas(
        requestBody: OneEstimateGas,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in wei.
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/one/gas`,
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
     * Estimate Klaytn transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the Klaytn transaction. Gas price is obtained from <a href="https://explorer.bitquery.io/klaytn/gas" target="_blank">https://explorer.bitquery.io/klaytn/gas</a>.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static klaytnEstimateGas(
        requestBody: KlaytnEstimateGas,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in peb.
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/klaytn/gas`,
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
     * Estimate XinFin transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the XDC transaction. Gas price is obtained from <a href="https://rpc.xinfin.network/gasPrice" target="_blank">https://rpc.xinfin.network/gasPrice</a>.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static xdcEstimateGas(
        requestBody: XdcEstimateGas,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in wei.
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/xdc/gas`,
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
     * Estimate KuCoin Community Chain transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the Kcs transaction.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static kcsEstimateGas(
        requestBody: KcsEstimateGas,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: string;
        /**
         * Gas price in wei.
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/kcs/gas`,
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
     * Estimate VeChain Gas for transaction
     * <h4>5 credits per API call.</h4><br/><p>Estimate gas required for transaction.</p>
     * @param requestBody
     * @returns number OK
     * @throws ApiError
     */
    public static vetEstimateGas(
        requestBody: VetEstimateGas,
    ): CancelablePromise<number> {
        return __request({
            method: 'POST',
            path: `/v3/vet/transaction/gas`,
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
     * Estimate EGLD transaction fees
     * <h4>2 credits per API call.</h4><br/>
     * <p>Estimate gasLimit and gasPrice of the EGLD transaction. Gas limit is obtained from <a href="https://gateway.elrond.com/transaction/cost" target="_blank">https://gateway.elrond.com/transaction/cost</a>.
     * Gas price is obtained from <a href="https://gateway.elrond.com/network/config" target="_blank">https://gateway.elrond.com/network/config</a>.
     * </p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static egldEstimateGas(
        requestBody: TransactionFeeEgldBlockchain,
    ): CancelablePromise<{
        /**
         * Gas limit for transaction in gas price.
         */
        gasLimit: number;
        /**
         * Gas price.
         */
        gasPrice: number;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/egld/gas`,
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