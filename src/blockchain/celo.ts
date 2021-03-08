import {get, post} from '../connector/tatum';
import BigNumber from 'bignumber.js';
import {Block, Transaction} from 'web3-eth';
import {TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloBroadcast" target="_blank">Tatum API documentation</a>
 */
export const celoBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> => post(`/v3/celo/broadcast`, {
    txData,
    signatureId
});

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloGetTransactionCount" target="_blank">Tatum API documentation</a>
 */
export const celoGetTransactionsCount = async (address: string): Promise<number> => get(`/v3/celo/transaction/count/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloGetCurrentBlock" target="_blank">Tatum API documentation</a>
 */
export const celoGetCurrentBlock = async (): Promise<number> => get(`/v3/celo/block/current`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloGetBlock" target="_blank">Tatum API documentation</a>
 */
export const celoGetBlock = async (hash: string): Promise<Block> => get(`/v3/celo/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloGetBalance" target="_blank">Tatum API documentation</a>
 */
export const celoGetAccountBalance = async (address: string): Promise<{ celo: BigNumber, cUsd: BigNumber }> => {
    const {data} = await get(`/v3/celo/account/balance/${address}`);
    return {celo: new BigNumber(data.celo), cUsd: new BigNumber(data.cUsd)};
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/CeloGetTransaction" target="_blank">Tatum API documentation</a>
 */
export const celoGetTransaction = async (hash: string): Promise<Transaction> => get(`/v3/celo/transaction/${hash}`);
