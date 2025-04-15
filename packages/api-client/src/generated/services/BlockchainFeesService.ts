/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AvalancheEstimateGas } from '../models/AvalancheEstimateGas';
import type { BaseEstimateGas } from '../models/BaseEstimateGas';
import type { BlockchainFee } from '../models/BlockchainFee';
import type { BscEstimateGas } from '../models/BscEstimateGas';
import type { CeloEstimateGas } from '../models/CeloEstimateGas';
import type { CronosEstimateGas } from '../models/CronosEstimateGas';
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
import type { FeeBtcBased } from '../models/FeeBtcBased';
import type { FeeEvmBased } from '../models/FeeEvmBased';
import type { FlareEstimateGas } from '../models/FlareEstimateGas';
import type { GasEstimated } from '../models/GasEstimated';
import type { KcsEstimateGas } from '../models/KcsEstimateGas';
import type { KlaytnEstimateGas } from '../models/KlaytnEstimateGas';
import type { OneEstimateGas } from '../models/OneEstimateGas';
import type { OptimismEstimateGas } from '../models/OptimismEstimateGas';
import type { PolygonEstimateGas } from '../models/PolygonEstimateGas';
import type { TransactionFeeEgldBlockchain } from '../models/TransactionFeeEgldBlockchain';
import type { VetEstimateGas } from '../models/VetEstimateGas';
import type { XdcEstimateGas } from '../models/XdcEstimateGas';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';
import { SonicEstimateGas } from '../models/SonicEstimateGas'

export class BlockchainFeesService {

    /**
     * Get the recommended fee/gas price for a blockchain
     * <p><b>1 credit per API call</b></p>
     * <p>Get the recommended fee/gas price for a blockchain.</p>
     * <p>Fee is in satoshis(meaning currency(BTC, DOGE,... / 100 000 000) per byte
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Bitcoin</li>
     * <li>Dogecoin</li>
     * <li>Ethereum</li>
     * <li>Litecoin</li>
     * </ul>
     *
     * @param chain Chain
     * @returns BlockchainFee OK
     * @throws ApiError
     */
    public static getBlockchainFee(
        chain: 'ETH' | 'BTC' | 'LTC' | 'DOGE',
    ): CancelablePromise<BlockchainFee> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/fee/${chain}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Estimate the fee for a transaction on a blockchain
     * <p><b>10 credits per API call</b></p>
     * <p>Estimate the current fee for different types of transactions.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Bitcoin</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Dogecoin</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Litecoin</li>
     * <li>Polygon</li>
     * <li>XinFin</li>
     * </ul>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static estimateFeeBlockchain(
        requestBody: (EstimateFee | EstimateFeeBatchMintNft | EstimateFeeDeployCustodialWallet | EstimateFeeTransferFromCustodial | EstimateFeeFromAddress | EstimateFeeFromUTXO),
    ): CancelablePromise<(FeeBtcBased | FeeEvmBased)> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/estimate`,
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
     * Estimate the fee for a BNB Smart Chain transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a BNB Smart Chain transaction. The gas price is obtained from <a href="https://explorer.bitquery.io/bsc/gas" target="_blank">https://explorer.bitquery.io/bsc/gas</a>.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/BscBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static bscEstimateGas(
        requestBody: BscEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/bsc/gas`,
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
     * Estimate the fee for a Celo transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Celo transaction. The gas price is obtained from <a href="https://explorer.bitquery.io/celo_rc1/gas" target="_blank">https://explorer.bitquery.io/celo_rc1/gas</a>.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Celo#operation/CeloBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static celoEstimateGas(
        requestBody: CeloEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/celo/gas`,
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
     * Estimate the fee for an Elrond transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for an Elrond transaction. The gas price is obtained from <a href="https://gateway.elrond.com/network/config" target="_blank">https://gateway.elrond.com/network/config</a>. The gas limit is obtains from <a href="https://gateway.elrond.com/transaction/cost" target="_blank">https://gateway.elrond.com/transaction/cost</a>.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static egldEstimateGas(
        requestBody: TransactionFeeEgldBlockchain,
    ): CancelablePromise<{
        /**
         * The estimated price for one gas unit
         */
        gasPrice: number;
        /**
         * The number of the gas units needed to process the transaction at the estimated gas price
         */
        gasLimit: number;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/egld/gas`,
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
     * Estimate the fee for an Ethereum transaction
     * <p><b>10 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for an Ethereum transaction. The gas price is obtained from multiple sources and calculated based on the latest N blocks and the current mempool state.</p>
     * <p>The <code>fast</code> gas price is used by default.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Ethereum#operation/EthBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Estimate the fee for multiple Ethereum transactions
     * <p><b>10 credits per API call + 10 credits per each gas estimation</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for multiple Ethereum transactions. The gas price is obtained from multiple sources and calculated based on the latest N blocks and the current mempool state.</p>
     * <p>The estimations are returned in the same order as the transactions were submitted in the request.</p>
     * <p>The <code>fast</code> gas price is used by default.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Ethereum#operation/EthBlockchainTransfer" target="_blank">making a transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
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
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Estimate Harmony transaction fees
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Harmony transaction.</p>
     * <p><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Harmony#operation/OneBlockchainTransfer" target="_blank">making the transaction itself</a>, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static oneEstimateGas(
        requestBody: OneEstimateGas,
    ): CancelablePromise<{
        /**
         * The number of the gas units needed to process the transaction at the estimated gas price
         */
        gasLimit: string;
        /**
         * The estimated price for one gas unit (in wei)
         */
        gasPrice: string;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/one/gas`,
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
     * Estimate the fee for a Klaytn transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Klaytn transaction. The gas price is obtained from <a href="https://explorer.bitquery.io/klaytn/gas" target="_blank">https://explorer.bitquery.io/klaytn/gas</a>.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>peb</b>. However, when <a href="https://apidoc.tatum.io/tag/Klaytn#operation/KlaytnBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gpeb</b>. Make sure to convert the estimated gas price from peb to Gpeb before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static klaytnEstimateGas(
        requestBody: KlaytnEstimateGas,
    ): CancelablePromise<{
        /**
         * The estimated price for one gas unit (in peb)
         */
        gasPrice: string;
        /**
         * The number of the gas units needed to process the transaction at the estimated gas price
         */
        gasLimit: number;
    }> {
        return __request({
            method: 'POST',
            path: `/v3/klaytn/gas`,
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
     * Estimate the fee for a KuCoin Community Chain transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a KuCoin Community Chain transaction.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/KuCoin#operation/KcsBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static kcsEstimateGas(
        requestBody: KcsEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/kcs/gas`,
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
     * Estimate the fee for a Flare transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Flare transaction.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Flare#operation/FlareBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static flareEstimateGas(
        requestBody: FlareEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/flare/gas`,
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
     * Estimate the fee for a Cronos transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Cronos transaction.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Cronos#operation/CronosBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static cronosEstimateGas(
        requestBody: CronosEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/cronos/gas`,
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
     * Estimate the fee for a Avalanche transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Avalanche transaction.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Cronos#operation/AvalancheBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static avalancheEstimateGas(
        requestBody: AvalancheEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/avalanche/gas`,
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
     * Estimate the fee for a Cronos transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Base transaction.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Cronos#operation/CronosBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static baseEstimateGas(
        requestBody: BaseEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/base/gas`,
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
   * Estimate the fee for a Cronos transaction
   * <p><b>2 credits per API call</b></p>
   * <p>Get an estimated gas price and the number of gas units needed for a Base transaction.</p>
   * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Cronos#operation/CronosBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
   *
   * @param requestBody
   * @returns GasEstimated OK
   * @throws ApiError
   */
  public static sonicEstimateGas(
    requestBody: SonicEstimateGas,
  ): CancelablePromise<GasEstimated> {
    return __request({
      method: 'POST',
      path: `/v3/sonic/gas`,
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
     * Estimate the fee for a Polygon transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Polygon transaction. The gas price is obtained from <a href="https://gasstation-mainnet.matic.network/" target="_blank">https://gasstation-mainnet.matic.network/</a>.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Polygon#operation/PolygonBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static polygonEstimateGas(
        requestBody: PolygonEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/polygon/gas`,
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
     * Estimate the fee for a Optimism transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a Polygon transaction. The gas price is obtained from <a href="https://gasstation-mainnet.matic.network/" target="_blank">https://gasstation-mainnet.matic.network/</a>.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/Polygon#operation/PolygonBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static optimismEstimateGas(
        requestBody: OptimismEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/optimism/gas`,
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
     * Estimate the fee for a XinFin transaction
     * <p><b>2 credits per API call</b></p>
     * <p>Get an estimated gas price and the number of gas units needed for a XinFin transaction. The gas price is obtained from <a href="https://rpc.xinfin.network/gasPrice" target="_blank">https://rpc.xinfin.network/gasPrice</a>.</p>
     * <p style="border:4px solid DeepSkyBlue;"><b>NOTE:</b> The estimated gas price is returned in <b>wei</b>. However, when <a href="https://apidoc.tatum.io/tag/XinFin#operation/XdcBlockchainTransfer" target="_blank">making the transaction itself</a> and providing the custom fee, you have to provide the gas price in <b>Gwei</b>. Make sure to convert the estimated gas price from wei to Gwei before submitting your transaction.</p>
     *
     * @param requestBody
     * @returns GasEstimated OK
     * @throws ApiError
     */
    public static xdcEstimateGas(
        requestBody: XdcEstimateGas,
    ): CancelablePromise<GasEstimated> {
        return __request({
            method: 'POST',
            path: `/v3/xdc/gas`,
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
     * Estimate the gas needed for a VeChain transaction
     * <p><b>5 credits per API call</b></p>
     * <p>Get an estimated amount of gas needed for a VeChain transaction.</p>
     *
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
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
