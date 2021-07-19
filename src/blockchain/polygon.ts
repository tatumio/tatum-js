import BigNumber from 'bignumber.js';
import {get, post} from '../connector/tatum';
import {EstimateGasEth, EthBlock, EthEstimateGas, EthTx, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonBroadcast" target="_blank">Tatum API documentation</a>
 */
export const polygonBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/polygon/broadcast`, {txData, signatureId});

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const polygonGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/polygon/transaction/count/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const polygonGetCurrentBlock = async (): Promise<number> => get(`/v3/polygon/block/current`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetBlock" target="_blank">Tatum API documentation</a>
 */
export const polygonGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/polygon/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetBalance" target="_blank">Tatum API documentation</a>
 */
export const polygonGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/polygon/account/balance/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const polygonGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/polygon/transaction/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/PolygonEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const polygonEstimateGas = (body: EstimateGasEth): Promise<EthEstimateGas> => post('/v3/polygon/gas', body, EstimateGasEth);
