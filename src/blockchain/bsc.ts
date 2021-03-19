import BigNumber from 'bignumber.js';
import {get, post} from '../connector/tatum';
import {EstimateGasEth, EthBlock, EthEstimateGas, EthTx, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscBroadcast" target="_blank">Tatum API documentation</a>
 */
export const bscBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
    post(`/v3/bsc/broadcast`, {txData, signatureId});

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const bscGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/bsc/transaction/count/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const bscGetCurrentBlock = async (): Promise<number> => get(`/v3/bsc/block/current`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetBlock" target="_blank">Tatum API documentation</a>
 */
export const bscGetBlock = async (hash: string): Promise<EthBlock> => get(`/v3/bsc/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetBalance" target="_blank">Tatum API documentation</a>
 */
export const bscGetAccountBalance = async (address: string): Promise<BigNumber> => get(`/v3/bsc/account/balance/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscBep20GetBalance" target="_blank">Tatum API documentation</a>
 */
export const bscGetAccountBep20Address = async (address: string, contractAddress: string): Promise<number> =>
    get(`/v3/bsc/account/balance/bep20/${address}?contractAddress=${contractAddress}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const bscGetTransaction = async (hash: string): Promise<EthTx> => get(`/v3/bsc/transaction/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BscEstimateGas" target="_blank">Tatum API documentation</a>
 */
export const bscEstimateGas = (body: EstimateGasEth): Promise<EthEstimateGas> => post('/v3/bsc/gas', body, EstimateGasEth);
