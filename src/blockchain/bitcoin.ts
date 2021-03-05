import { get, post } from '../connector/tatum'
import {BlockHash, BtcBlock, BtcInfo, BtcTx, BtcUTXO, TransactionHash} from '../model';

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcBroadcast" target="_blank">Tatum API documentation</a>
 */
export const btcBroadcast = async (txData: string, signatureId?: string): Promise<TransactionHash> =>
  post(`/v3/bitcoin/broadcast`, { txData, signatureId });

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlockChainInfo" target="_blank">Tatum API documentation</a>
 */
export const btcGetCurrentBlock = async (): Promise<BtcInfo> => get('/v3/bitcoin/info');

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBalanceOfAddress" target="_blank">Tatum API documentation</a>
 */
export const btcGetBalance = async (address: string): Promise<{ incoming: string, outgoing: string }> => get(`/v3/bitcoin/address/balance/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlock" target="_blank">Tatum API documentation</a>
 */
export const btcGetBlock = async (hash: string): Promise<BtcBlock> => get(`/v3/bitcoin/block/${hash}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetBlockHash" target="_blank">Tatum API documentation</a>
 */
export const btcGetBlockHash = async (i: number): Promise<BlockHash> => get(`/v3/bitcoin/block/hash/${i}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetUTXO" target="_blank">Tatum API documentation</a>
 */
export const btcGetUTXO = async (hash: string, i: number): Promise<BtcUTXO> => get(`/v3/bitcoin/utxo/${hash}/${i}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetTxByAddress" target="_blank">Tatum API documentation</a>
 */
export const btcGetTxForAccount = async (address: string, pageSize: number = 50, offset: number = 0): Promise<BtcTx[]> =>
  get(`/v3/bitcoin/transaction/address/${address}?pageSize=${pageSize}&offset=${offset}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/BtcGetRawTransaction" target="_blank">Tatum API documentation</a>
 */
export const btcGetTransaction = async (hash: string): Promise<BtcTx> => get(`/v3/bitcoin/transaction/${hash}`);
